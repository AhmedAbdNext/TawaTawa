import styles from '@/styles/Home.module.css'
import ProductComponent from '@/components/ProductComponent'
import CategoriesNav from '@/components/CategoriesNav'
import { MainType, ProductType } from '@/Types/ProductType'
import { GetStaticProps } from 'next'
import fetchProductFromAirtable from '@/Utils/products'
import fetchCategoriesFromAirtable from '@/Utils/categories'



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

export default function Home({products, categories}: MainType) {
  return (
    <>
      <div className={styles.center}>
        <CategoriesNav categories={categories} />
      </div>
      <ProductComponent products={products} />
      
    </>
  )
}
