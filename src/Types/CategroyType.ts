export interface MCategoryType {
    id: number,
    name: string,
    current?: boolean,
    subCategoryIds?: number[],
    subCategoriesNames?: string[]
}


export interface CategoryComponentType {
    categories: MCategoryType[]
  }