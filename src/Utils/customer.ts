import { ProductType } from "@/Types/ProductType";
import { IResponse } from "@/Types/Response";
import Airtable, { FieldSet, Records } from "airtable";

export const createCustomerRecord = async (data: any) => {
  return new Promise<IResponse>((resolve, rejects) => {
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
    });
    var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
    const customerTable = base("Customer");
    customerTable.create(
      [
        {
          fields: { ...data },
        },
      ],
      (err: any, record: Records<FieldSet> | undefined) => {
        if (err) {
          rejects({
            status: "Failed",
            message: "Something went wrong, please try again!",
            error: err,
          });
        } else {
          resolve({
            status: "Success",
            message: "Thank you for contacting me.",
            record: record,
          });
        }
      }
    );
  });
};

// delete Customer Record
export const deleteCustomerRecord = async (id: string) => {
  return new Promise<IResponse>((resolve, rejects) => {
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
    });
    var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
    const customerTable = base("Customer");
    customerTable.destroy(id, (err: any, deletedRecord: any) => {
      if (err) {
        rejects({
          status: "Failed",
          message: "Something went wrong, please try again!",
          error: err,
        });
      } else {
        resolve({
          status: "Success",
          message: "Thank you for contacting me.",
          record: deletedRecord,
        });
      }
    });
  });
};

/**
 * Airtable delete customr and order on cascade
 */
export const deleteCustomerRecordOnCascade = async (id: string) => {
  return new Promise<IResponse>(async (resolve, rejects) => {
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
    });
    var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
    const customerTable = base("Customer");
    try {
      // First, get the customer that you want to delete
      const customer = await customerTable.find(id);
      // Check customer
      if (!customer || !customer.getId()) {
        throw new Error("Customer not found");
      }
      // Find all order with customer id
      const orderTable = base("Order");
      const orderRecords = await orderTable
        .select({
          filterByFormula: `customerId = "${customer.get("id")}"`,
        })
        .all();
      // Check order
      if (!orderRecords || orderRecords.length === 0) {
        // throw new Error("Order not found");
      }
      // Find all the order product with order ids
      const orderProductTable = base("OrderProduct");
      const orderProductRecords = await orderProductTable
        .select({
          filterByFormula: `OR(${orderRecords
            .map((order) => `orderId = "${order.get("id")}"`)
            .join(",")})`,
        })
        .all();
      // Check order product
      if (!orderProductRecords || orderProductRecords.length === 0) {
        // throw new Error("Order product not found");
      }
      // Delete all order product
      const promiseDeleteOrderProduct = orderProductRecords.map((orderProduct) => {
        return orderProductTable.destroy(orderProduct.getId())
      })
      await Promise.all(promiseDeleteOrderProduct)
      // Delete all order
      await orderTable.destroy(
        orderRecords.map((order) => order.getId())
      );
      // Delete customer
      await customerTable.destroy(customer.getId());
      resolve({
        status: "Success",
        message: "Thank you for contacting me.",
      });
      
    } catch (error) {
      rejects({
        status: "Failed",
        message: "Something went wrong, please try again!",
        error,
      });
    }
  });
};
