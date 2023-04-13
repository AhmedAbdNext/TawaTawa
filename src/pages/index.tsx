import styles from '@/styles/Home.module.css'
import ProductComponent from '@/components/ProductComponent'
import CategoriesNav from '@/components/CategoriesNav'
import Airtable, { Attachment } from 'airtable'
import { MainType, ProductType } from '@/Types/ProductType'
import { GetStaticProps } from 'next'
import { MCategoryType } from '@/Types/CategroyType'


const fetchProductFromAirtable = () => {
  return new Promise((resolve, rejects) =>{
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "", 
    })
    var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');
    base('Products').select({ view: "Products" }).firstPage((error, records) => {
      if (error) {
        rejects(error)
      } else {
        const results :ProductType[] = []
        records?.forEach(function (record) {
          results.push({
            id: Number(record.get('id')),
            name: record.get('name') + '',
            categories: { ids: record.get('categoryId') as Attachment[], names: record.get('categoryName') as readonly string[] },
            status: record.get('status') + '',
            price: Number(record.get('price')),
            oldPrice: Number(record.get('oldPrice')),
            href: "\products\\" + Number(record.get('id')),
            picture:  record.get('images')[0].url as string || '',
            pictureAlt: record.get('images')[0].fileName as string || '',
            description: record.get('description') + '',
          })
        });
        resolve(results)
      }
    })
  })
}

const fetchCategoriesFromAirtable: () => Promise<MCategoryType[]> = () => {
  return new Promise((resolve, rejects) => {
    Airtable.configure({
      apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY || "",
    })
    var base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');
    base('Categories').select({ view: "Categories" }).firstPage((error, records) => {
      if (error) {
        rejects(error)
      } else {
        const results: MCategoryType[] = []
        records?.forEach(function (record) {
          const { fields } = record
          const { id, name } = fields
          if (typeof id === "number" && typeof name === "string")
            results.push({ id, name, current: false })
        });
        resolve(results)
      }
    })
  })
}

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
