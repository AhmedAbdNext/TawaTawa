import { IResponse } from "@/Types/Response";
import Airtable, { FieldSet, Records } from "airtable";

export const createOrderRecord = async (data:any) => {
    return new Promise<IResponse>((resolve, rejects) => {
      Airtable.configure({
        apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
      });
      var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
      const orderTable = base("Order");
      orderTable.create(
        [
          {
            fields: {...data}
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
  // Delete Order Record 
  export const deleteOrderRecord = async (id:string) => {
    return new Promise<IResponse>((resolve, rejects) => {
      Airtable.configure({
        apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
      });
      var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
      const orderTable = base("Order");
      orderTable.destroy(id, (err: any, deletedRecord: any) => {
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