import styles from '@/styles/Home.module.css'
import ProductComponent from '@/components/ProductComponent'
import CategoriesNav from '@/components/CategoriesNav'
import { MainType, ProductType } from '@/Types/ProductType'
import { GetStaticProps } from 'next'
import fetchProductFromAirtable from '@/Utils/products'
import fetchCategoriesFromAirtable from '@/Utils/categories'
import { useEffect, useState } from 'react'



export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchProductFromAirtable()
  const categories = await fetchCategoriesFromAirtable()
  return {
    props: {
      products,
      categories
    }
  }
}

export default function Home({ products, categories }: MainType) {
  const [categoryId, setCategoryId] = useState(0)
  const [search, setSearch] = useState("")
  const [productsByFilter, setProductsByFilter] = useState<ProductType[]>(products)
  // Get Category Selected
  const handleCategory = (categoryId: number) => {
    setCategoryId(categoryId)
  }
  // Get Search Input
  const handleSearch = (search: string) => {
    setSearch(search)
  }
  // UseEffect in filters apply
  useEffect(() => {
    if(categoryId=== 0 && search === ""){
      return;
    }
    async function fetchData () {
      const productsByFilter = await fetchProductFromAirtable(categoryId,search)
      setProductsByFilter(productsByFilter)
    } 
    fetchData()
    
  }, [categoryId, search])



  return (
    <>
      <div className={styles.center}>
        <CategoriesNav categories={categories}
          handleCategory={handleCategory}
          handleSearch={handleSearch}
          currentCategoryId={categoryId}

        />
      </div>
      {productsByFilter.length === 0 && <p className="text-center text-2xl">No products found</p>}  
      <div className="container mx-auto">
      <ProductComponent products={productsByFilter} />
      </div>

    </>
  )
}
