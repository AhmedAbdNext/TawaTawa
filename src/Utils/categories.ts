import { MCategoryType } from "@/Types/CategroyType";
import Airtable from "airtable";

const fetchCategoriesFromAirtable: () => Promise<MCategoryType[]> = () => {
  return new Promise((resolve, rejects) => {
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
    });
    var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
    base("Categories")
      .select({ view: "Categories" })
      .firstPage((error, records) => {
        if (error) {
          rejects(error);
        } else {
          const results: MCategoryType[] = [];
          records?.forEach(function (record) {
            const { fields } = record;
            const { id, name } = fields;
            if (typeof id === "number" && typeof name === "string")
              results.push({ id, name, current: false });
          });
          resolve(results);
        }
      });
  });
};

export default fetchCategoriesFromAirtable;