import { Attachment } from "airtable";
import { MCategoryType } from "./CategroyType";

export interface ProductType {
  id: number;
  name: string;
  categories: CategoryType;
  status: string;
  price: number;
  oldPrice: number;
  description: string;
  href: string;
  mainPicture: {
    alt: string;
    src: string;
  };
  pictures: {
    alt: string;
    src: string;
  }[];
  rating?:number;
  quantity?:number;
}

export interface CategoryType {
  ids: Attachment[];
  names: readonly string[];
}

export interface ImageType {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
}

export interface ProductComponentType {
  products: ProductType[];
}

export interface MainType {
  products: ProductType[];
  categories: MCategoryType[];
}