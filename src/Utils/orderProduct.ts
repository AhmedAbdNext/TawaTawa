
// Create Order Product Record
import { IResponse } from "@/Types/Response";
import Airtable, { FieldSet, Records } from "airtable";

export const createOrderProductRecord = async (orderProduct: any) => {
    return new Promise<IResponse>((resolve, rejects) => {
      Airtable.configure({
        apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
      });
      var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
      const orderProductTable = base("OrderProduct");
      orderProductTable.create(
        [
          {
            fields: {...orderProduct}
          },
        ],
        (err: any, record: Records<FieldSet> | undefined) => {
          if (err) {
            rejects({
              status: "Failed",
              message: "Something went wrong, please try again!",
              error: err
            });
          } else {
            resolve({
              status: "Success",
              message: "Thank you for contacting me.",
              record: record
            });
          }
        }
      );
    });
  }
  // Delete Order Product Record 
  export const deleteOrderProductRecord = async (id:string) => {
    return new Promise<IResponse>((resolve, rejects) => {
      Airtable.configure({
        apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
      });
      var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
      const orderProductTable = base("OrderProduct");
      orderProductTable.destroy(id, (err: any, deletedRecord: any) => {
        if (err) {
          rejects({
            status: "Failed",
            message: "Something went wrong, please try again!",
            error: err
          });
        } else {
          resolve({
            status: "Success",
            message: "Thank you for contacting me.",
            record: deletedRecord
          });
        }
      });
    });
  }