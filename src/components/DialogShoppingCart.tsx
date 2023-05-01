/* eslint-disable react/no-unescaped-entities */
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { ShippingCardType } from '@/Types/NavigationTypes'

import { useRecoilState } from 'recoil';
import { recoilProductsInShoppingCart } from '@/Utils/recoilAtoms'
import { myLoader } from '@/Utils/products'
import Link from 'next/link'
import { getTotalPrice, removeProductForProductsInSHoppingCart } from '@/Utils/shoppingCart'


export default function DialogShoppingCard({ isOpen, handleContinueShopping }: ShippingCardType) {
  // Recoil
  const [productsInShoppoingCart, setProductsInShoppingCart] = useRecoilState(recoilProductsInShoppingCart)
  // TotalPrice
  const totalPrice = getTotalPrice(productsInShoppoingCart)
  // function to remove products from productsInShoppoingCart
  const handleRemoveProduct = (product) => {
    removeProductForProductsInSHoppingCart(
      setProductsInShoppingCart,
      product,
    )
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleContinueShopping}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Votre Panier</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleContinueShopping}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      {
                        // Check if products are not empty 
                        productsInShoppoingCart.length === 0 ? (
                          <div className="flex flex-col items-center justify-center w-full h-full">
                            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Votre panier est vide</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Il semble que vous n'ayez aucun article dans votre panier.</p>
                          </div>
                        ) : (
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {productsInShoppoingCart.map((product) => (
                                  <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <Image
                                        loader={() => { return myLoader(product.mainPicture.src) }} src={product.mainPicture.src} alt={product.mainPicture.alt}
                                        className="h-full w-full object-cover object-center"
                                        width={30}
                                        height={30}
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href={product.href}>{product.name}</a>
                                          </h3>
                                          <p className="ml-4">{
                                            (product.price * (product.quantity||1)).toFixed(3) }</p>
                                        </div>
                                        {/**
                                    * <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    */}
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty {product?.quantity || 1}</p>
                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() => handleRemoveProduct(product)}
                                          >
                                            Retirer le produit
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )
                      }


                    </div>
                    {
                      // Check if products are not empty
                      productsInShoppoingCart.length > 0 && (
                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total</p>
                            <p>{totalPrice}</p>
                          </div>
                          <div className="mt-6">
                            <Link href="/shopping-cart"
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Passer commande
                            </Link>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={
                                  handleContinueShopping
                                }
                              >
                                Poursuivre les achats
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      )
                    }

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


