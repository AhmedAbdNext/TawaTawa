import React from 'react'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil';
// Types
import { ProductComponentType, ProductType } from '@/Types/ProductType'
// Utils
import { myLoader } from '@/Utils/products'
// Components
import BodyLayer from '../App/BodyLayer'
// Recoil
import { recoilProductsInShoppingCart } from '@/Utils/recoilAtoms'
import { toast } from 'react-toastify';


export default function ProductComponent({ products }: ProductComponentType) {
  // Recoil
  const setShoppingCart = useSetRecoilState(recoilProductsInShoppingCart)
  // Handle add to bag
  const handleAddToBag = (product: ProductType) => {
    // Add the quantity if the product exist in oldProducts list
    setShoppingCart((oldProducts) => {
      const productExist = oldProducts.find((oldProduct) => oldProduct.id === product.id)
      if (productExist) {
        const newProducts = oldProducts.map((oldProduct) => {
          if (oldProduct.id === product.id) {
            return {
              ...oldProduct,
              quantity: (oldProduct.quantity || 1) + 1
            }
          } else {
            return oldProduct
          }
        })
        return newProducts
      } else {
        return [...oldProducts, { ...product, quantity: 1 }]
      }
    })
    // Toast display that the product was added french
    toast.success("Le produit a été ajouté au panier")
  }


  return (
    <BodyLayer>
      <ul className="grid grid-cols-4 gap-10">
        {products.map(product => (
          <li key={product.id} className="col-span-full sm:col-span-2 lg:col-span-1 group relative">
            <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 border-gray-300 border-2">
              <Image loader={() => { return myLoader(product.mainPicture.src) }} unoptimized priority src={product.mainPicture.src} alt={product.mainPicture.alt}
                className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" width={100} height={100} />
              <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-wide truncate pb-6  text-gray-800">{
                  product.name
                }</h2>
                  <p className="dark:text-gray-100 line-clamp-3 ">{
                    product.description
                  }</p>
                </div>
                <button 
                onClick={(e)=> {
                  e.preventDefault()
                  handleAddToBag(product)
                }}
                type="button"
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-gray-900 text-white">
                  Ajouter au panier
                 </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </BodyLayer>
  )
}

// tailwindcss text overflow ellipsis ?

