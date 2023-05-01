/* eslint-disable react/no-unescaped-entities */
import { useRecoilState } from 'recoil'
// Recoil
import { recoilProductsInShoppingCart } from '@/Utils/recoilAtoms'
import Image from 'next/image'
import { myLoader } from '@/Utils/products'

const ListOfProductsForPageShoppingCart = () => {
    // State products for the Atomic instance
    // Recoil
    const [productsInShoppoingCart, setProductsInShoppingCart] = useRecoilState(recoilProductsInShoppingCart)
    // TotalPrice
    const totalPrice = productsInShoppoingCart.reduce((acc, product) => acc + product.price, 0).toFixed(3)
    // function to remove products from productsInShoppoingCart
    const handleRemoveProduct = (product) => {
        setProductsInShoppingCart((oldCart) => {
            return oldCart.filter((oldProduct) => oldProduct.id !== product.id)
        })
    }
    // function to increment and decrement product quantity 
    const handleIncrementAndDecrementProductQuantity = (product, type) => {
        setProductsInShoppingCart((oldCart) => {
            return oldCart.map((oldProduct) => {
                if (oldProduct.id === product.id) {
                    // quantity
                    return type === "increment" 
                    ? { ...oldProduct, quantity: oldProduct.quantity||1 + 1 } 
                    : { ...oldProduct, quantity: oldProduct.quantity||1 - 1 }
                } else {
                    return oldProduct
                }
            })
        })
    }
    return (
        <div className="flex flex-col ">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Votre panier</h2>
            <ul className="flex flex-col divide-y  divide-gray-700">
                {productsInShoppoingCart.map((product) => (
                    <li className="flex flex-col py-6 sm:flex-row sm:justify-between" key={product.id}>
                        <div className="flex w-full space-x-2 sm:space-x-4">
                            <Image loader={() => { return myLoader(product.mainPicture.src) }} src={product.mainPicture.src} alt={product.mainPicture.alt}
                                className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                                width={30}
                                height={30}
                            />
                            <div className="flex flex-col justify-between w-full pb-4">
                                <div className="flex justify-between w-full pb-2 space-x-2">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">{
                                            product.name
                                        }</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold">{
                                            product.price
                                        }</p>
                                        <p className="text-sm line-through dark:text-gray-600">{
                                            product.oldPrice ? product.oldPrice : ''
                                        }</p>
                                    </div>
                                </div>
                                <div className="flex text-sm divide-x">
                                    <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1" onClick={
                                        () => handleRemoveProduct(product)
                                    }>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                            <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                            <rect width="32" height="200" x="168" y="216"></rect>
                                            <rect width="32" height="200" x="240" y="216"></rect>
                                            <rect width="32" height="200" x="312" y="216"></rect>
                                            <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                        </svg>
                                        <span>
                                            Retirer le produit
                                        </span>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between w-full pt-4 space-x-2">
                                    <div className="flex items-center space-x-2">
                                        {/**
                                         * increment button
                                         */}
                                        <button type="button" className="flex items-center justify-center w-8 h-8 text-gray-600 border rounded-full dark:border-gray-600 dark:text-gray-400 focus:outline-none" onClick={
                                            () => handleIncrementAndDecrementProductQuantity(product, "increment")
                                        }>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                <path d="M464,240H48a16,16,0,0,0,0,32H464a16,16,0,0,0,0-32Z"></path>
                                                <path d="M256,112a16,16,0,0,0-16,16V368a16,16,0,0,0,32,0V128A16,16,0,0,0,256,112Z"></path>
                                            </svg>
                                        </button>
                                        <input type="number" disabled={false} className="w-12 h-8 text-center border rounded dark:border-gray-600 focus:outline-none" value={ product.quantity } />
                                        {/**
                                         * decrement button
                                         */}
                                        <button type="button" className="flex items-center justify-center w-8 h-8 text-gray-600 border rounded-full dark:border-gray-600 dark:text-gray-400 focus:outline-none" onClick={
                                            () => handleIncrementAndDecrementProductQuantity(product, "decrement")
                                        }>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                <path d="M464,240H48a16,16,0,0,0,0,32H464a16,16,0,0,0,0-32Z"></path>
                                            </svg>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))
                }</ul>
            {
                // Check if products are not empty 
                productsInShoppoingCart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Votre panier est vide</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Il semble que vous n'ayez aucun article dans votre panier.</p>
                    </div>
                ) : (
                    <div className="space-y-1 text-right">
                        <p>
                            <span className="font-semibold">Total:</span>
                            <span className="font-semibold">{
                                totalPrice
                            }</span>
                        </p>
                    </div>
                )
            }
        </div>
    )
}
export default ListOfProductsForPageShoppingCart