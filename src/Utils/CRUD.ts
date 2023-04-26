import { useQuery, useMutation } from "react-query";
import Airtable from "airtable";

const airtable = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "");

const useGetRecords = (table: string) =>
  useQuery(`table-${table}`, async () => {
    const records = await airtable(table).select(
        {
            view: table,
        }
    ).all();
    return records;
  });

const useCreateRecord = (table: string) =>
  useMutation(async (data: any) => {
    const record = await airtable(table).create(data);
    return record;
  });

const useUpdateRecord = (table: string) =>
  useMutation(async (data: any) => {
    const { id, fields } = data;
    const record = await airtable(table).update(id, fields);
    return record;
  });

const useDeleteRecord = (table: string) =>
  useMutation(async (id: string) => {
    await airtable(table).destroy(id);
    return id;
  });

export { useGetRecords, useCreateRecord, useUpdateRecord, useDeleteRecord };
