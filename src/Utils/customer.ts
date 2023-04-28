import { ProductType } from "@/Types/ProductType";
import Airtable, { FieldSet, Records } from "airtable";

export const createCustomerRecord = async (data:any) => {
    return new Promise<IResponse>((resolve, rejects) => {
      Airtable.configure({
        apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
      });
      var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
      const table = base("Customer");
      table.create(
        [
          {
            fields: {...data}
          },
        ],
        (err: any, records: Records<FieldSet> | undefined) => {
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
            });
          }
        }
      );
    });
  }