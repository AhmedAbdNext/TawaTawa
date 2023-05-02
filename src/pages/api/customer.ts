import { IResponse } from "@/Types/Response";
import { createCustomerRecord, deleteCustomerRecord, deleteCustomerRecordOnCascade } from "@/Utils/customer";
import { createOrderRecord, deleteOrderRecord } from "@/Utils/order";
import { createOrderProductRecord } from "@/Utils/orderProduct";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// Verify Recaptcha
const verifyRecaptcha = async token => {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    token;

  return await axios.post(verificationUrl);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  var customerRecordId : string|undefined = ""
  try {
    const {token ,customer, products}= req.body;
    // Recaptcha response
    const response = await verifyRecaptcha(token);

    // Checking if the reponse sent by reCaptcha success or not and if the score is above 0.5
    // In ReCaptcha v3, a score sent which tells if the data sent from front end is from Human or from Bots. If score above 0.5 then it is human otherwise it is bot
    // For more info check, https://developers.google.com/recaptcha/docs/v3
    // ReCaptcha v3 response, {
    //     "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
    //     "score": number             // the score for this request (0.0 - 1.0)
    //     "action": string            // the action name for this request (important to verify)
    //     "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    //     "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
    //     "error-codes": [...]        // optional
    //   }
    if (response.data.success && response.data.score >= 0.5) {
      // Create Customer Record
      const customerRecord = await createCustomerRecord(customer)
      if(customerRecord.status === "Failed"){
        return res.status(400).json(customerRecord)
      }
      // Check Customer Record ID
      customerRecordId = customerRecord.record?.[0].id
      if(!customerRecordId){
        return res.status(400).json({
          status: "Failed",
          message: "Un problème s'est produit, lors de la création d'un compte, veuillez réessayer !",
        })
      }
      // Create Order Record
      const orderRecord = await createOrderRecord({
        customerId: [customerRecordId],
        status: "Pending",
        totalAmount: Number(products.reduce((acc, product) => acc + (product.price * (product.quantity || 1) ), 0).toFixed(3)),
        createAt: new Date()
      })
      // Check Order Status
      if(orderRecord.status === "Failed"){
        // delete customer 
        await deleteCustomerRecord(customerRecordId)
        return res.status(400).json(orderRecord)
      }
      // Check Order Record ID
      const orderRecordId = orderRecord.record?.[0].id
      if(!orderRecordId){
        await deleteCustomerRecord(customerRecordId)
        return res.status(400).json({
          status: "Failed",
          message: "Un problème s'est produit, lors de la création d'une commande, veuillez réessayer !",
        })
      }
      // Create  multi Order Product Record
      const orderProductPromise = products.map(async( product ) => {
        return await createOrderProductRecord({
          orderId: [orderRecordId],
          productId: [product.mId],
          quantity: product.quantity || 1,
          price: product.price, 
        })
      })
      const orderProductRecord = await Promise.all(orderProductPromise)
      // Check Order Product Status
      if(orderProductRecord.some( orderProduct => orderProduct.status === "Failed")){
        await deleteCustomerRecord(customerRecordId)
        await deleteOrderRecord(orderRecordId)
        return res.status(400).json({
          status: "Failed",
          message: "Un problème s'est produit, lors de la création d'un produit de commande, veuillez réessayer !!",
        })
      }
      return res
        .status(200)
        .json({
        status: "Success", 
        message: "Votre commande a été enregistrée avec succès. Vous recevrez un email de confirmation dans quelques instants." });
    } else {
      return res.json({
        status: "Failed",
        message: "Un problème s'est produit, veuillez réessayer !!",
      });
    }
  } catch (error) {
    deleteCustomerRecordOnCascade(customerRecordId||"")
    res.json({
      status: "Failed",
      message: "Un problème s'est produit, veuillez réessayer !!!",
    });
  }
}