import { ProductType } from "@/Types/ProductType";
import Airtable, { Attachment, FieldSet } from "airtable";
import { Records } from "airtable/lib/records";

export const myLoader=(src:string)=>{
  return src
}
// TODO getProductsByPages
const getResultFunction = (records :Records<FieldSet>|undefined) => {
  if(!records){
    return [];
  }
  const results: ProductType[] = [];
  records?.forEach(function (record) {
    results.push({
      id: Number(record.get("id")),
      name: record.get("name") + "",
      categories: {
        ids: record.get("categoryId") as Attachment[],
        names: record.get("categoryName") as readonly string[],
      },
      status: record.get("status") + "",
      price: Number(record.get("price")),
      oldPrice: Number(record.get("oldPrice")),
      href: "products\\" + Number(record.get("id")),
      mainPicture: {
        alt: record.get("images")[0].filename,
        src: myLoader(record.get("images")[0].url),
      },
      pictures: record.get("images").slice(1).map((picture: Attachment) => {
        return {
          alt: picture.filename,
          src: myLoader(picture.url),
        };
      }),
      description: record.get("description") + "",
      rating: Number(record.get("rating")),
    });
  });
  return results;
}

const fetchProductFromAirtable = () => {
  return new Promise((resolve, rejects) => {
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
    });
    var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
    base("Products")
      .select({ view: "Products" })
      .all((error, records) => {
        if (error) {
          rejects(error);
        } else {
          resolve(getResultFunction(records));
        }
      });
  });
};

export const getProductById = (id: string) => {
  return new Promise<ProductType[]>((resolve, rejects) => {
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
    });
    var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
    base("Products")
      .select({
        view: "Products",
        filterByFormula: `{id} = ${id + ""}`,
        maxRecords: 1,
      })
      .firstPage((error, records) => {
        if (error) {
          rejects(error);
        } else {
          resolve(getResultFunction(records));
        }
      });
  });
};

export default fetchProductFromAirtable;