import { FieldSet, Records } from "airtable";

export interface IResponse {
    message: string;
    status: "Success" | "Failed";
    record?: Records<FieldSet>|undefined;
    error?: any;
}