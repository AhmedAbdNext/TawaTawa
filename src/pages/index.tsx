import { useState } from 'react'
import { GetStaticProps } from 'next'
// Compoents
import ProductComponent from '@/components/MainIndex/ProductComponent'
import CategoriesNav from '@/components/MainIndex/CategoriesNav'
// Utils
import { fetchProductsFromAirtable } from '@/Utils/products'
import fetchCategoriesFromAirtable from '@/Utils/categories'
// Types & Styles
import { MainType, ProductType } from '@/Types/ProductType'
import styles from '@/styles/Home.module.css'

interface IFetcher {
  (
    selectedCategoryId: number,
    searchQuery: string
  ): Promise<unknown>
}

export const getStaticProps: GetStaticProps = async () => {
  const productsPromise = fetchProductsFromAirtable()
  const categoriesPromise = fetchCategoriesFromAirtable()
  const [products, categories] = await Promise.all([productsPromise, categoriesPromise])
  return {
    props: {
      products,
      categories,
    }
  }
}

const Home = ({ products, categories }: MainType) => {
  // States
  const [isLoading, setIsLoading] = useState(false)
  const [stateProducts, setStateProducts] = useState<ProductType[]>(products)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(0)
  // Fetcher
  const fetcher: IFetcher = async () => {
    const productsByFilter = await fetchProductsFromAirtable()
  };
  // Handle func's
  const handleCategory = async (currentCategoryId: number) => {
    setIsLoading(true)
    setSelectedCategoryId(currentCategoryId)
    const productsByFilter = await fetchProductsFromAirtable(currentCategoryId, searchQuery)
    setStateProducts(productsByFilter)
    setIsLoading(false)
  }
  const handleSearch = async (currentSearchQuery: string) => {
    setIsLoading(true)
    setSearchQuery(currentSearchQuery)
    const productsByFilter = await fetchProductsFromAirtable(selectedCategoryId, currentSearchQuery)
    setStateProducts(productsByFilter)
    setIsLoading(false)
  }

  return (
    <>
      <div className={styles.center}>
        <CategoriesNav categories={categories}
          handleCategory={handleCategory}
          handleSearch={handleSearch}
          currentCategoryId={selectedCategoryId}
        />
      </div>
      {stateProducts.length === 0 && <p className="text-center text-2xl">No products found</p>}
      {isLoading ? (<p className="text-center text-2xl">Loading...</p>) :
        (
          <ProductComponent products={stateProducts} />
        )
      }
    </>
  )
}

export default Home
