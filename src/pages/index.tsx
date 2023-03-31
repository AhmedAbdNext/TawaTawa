import styles from '@/styles/Home.module.css'
import ProductComponent from '@/components/ProductComponent'
import CategoriesNav from '@/components/CategoriesNav'


export default function Home() {
  return (
    <>
      <div className={styles.center}>
        <CategoriesNav />
      </div>
      <ProductComponent />
      
    </>
  )
}
