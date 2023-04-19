import { ProductType } from "@/Types/ProductType";
import Airtable, { Attachment, FieldSet } from "airtable";
import { QueryParams } from "airtable/lib/query_params";
import { Records } from "airtable/lib/records";

const PAGE_SIZE = 10;
export const myLoader = (src: string) => {
  return src;
};
// TODO getProductsByPages
const getResultFunction = (records: Records<FieldSet> | undefined) => {
  if (!records) {
    return [];
  }
  const results: ProductType[] = [];
  records?.forEach(function (record) {
    const imagesFieldValue = record.get("images");
    const imagesResults: { alt: string; src: string }[] = [];
    if (
      Array.isArray(imagesFieldValue) &&
      typeof imagesFieldValue !== "undefined"
    ) {
      imagesFieldValue.forEach((image: Attachment) => {
        imagesResults.push({
          alt: image.filename,
          src: myLoader(image.url),
        });
      });
    }
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
        alt: imagesResults[0].alt,
        src: imagesResults[0].src,
      },
      pictures: imagesResults.slice(1),
      description: record.get("description") + "",
      rating: Number(record.get("rating")),
    });
  });
  return results;
};

type TfetchProductFromAirtable = {
  (currentCategoryId?: number, searchWord?: string): Promise<ProductType[]>;
};

const fetchProductFromAirtable: TfetchProductFromAirtable = (
  currentCategoryId,
  searchWord
) => {
  return new Promise((resolve, rejects) => {
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
    });
    var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");
    const querySelector: {
      view: string;
      maxRecords: number;
      sort: { field: string; direction: string }[];
      offset: number;
      filterByFormula: string;
    } = {
      view: "Products",
      maxRecords: 8,
      sort: [{ field: "name", direction: "asc" }],
      offset: 0,
      filterByFormula: "",
    };
    if (currentCategoryId) {
      querySelector.filterByFormula = `{categoryId} = ${
        currentCategoryId + ""
      }`;
    }
    if (searchWord && searchWord.length) {
      if (querySelector.filterByFormula.length) {
        querySelector.filterByFormula =`AND(`+querySelector.filterByFormula + ` , ` + `SEARCH(UPPER("${searchWord}"),{name}))`;
      }else {
        querySelector.filterByFormula = `SEARCH(UPPER("${searchWord}"),{name})`;
      }
    }
    base("Products")
      .select(querySelector as QueryParams<FieldSet>)
      .eachPage((records, fetchNextPage) => {
        resolve(getResultFunction(records));
        fetchNextPage();
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
