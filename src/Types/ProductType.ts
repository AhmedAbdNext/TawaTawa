import { Attachment } from "airtable";

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
export interface ProductType {
  id: number;
  name: string;
  categories: CategoryType;
  status: string;
  price: number;
  oldPrice: number;
  description: string;
  href: string;
  pictureAlt: string;
  picture: string;
}
export interface ProductComponentType {
  products: ProductType[];
}

export interface MainType {
  products: ProductType[];
  categories: CategoryType[]
}

