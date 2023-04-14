import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { ProductType } from '@/Types/ProductType'
import { myLoader } from '@/Utils/products'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail(product: ProductType) {

    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

                        <li>
                            <div className="flex items-center">
                                {
                                    // TODO ADD the link to the categories in this HREF
                                }
                                <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                                    {product.categories.names[0]}
                                </a>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li className="text-sm">
                            <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
                        <Image
                            loader={(p) => { return myLoader(product.mainPicture.src) }} src={product.mainPicture.src} alt={product.mainPicture.alt}
                            className="h-full w-full object-cover object-center"
                            width={100}
                            height={100}
                        />
                    </div>
                    {
                        product.pictures.length > 0 && (
                            <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                                <Image
                                    loader={(p) => { return myLoader(product.pictures[0].src) }} src={product.pictures[0].src} alt={product.pictures[0].alt}
                                    className="h-full w-full object-cover object-center"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        )
                    }
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        {
                            product.pictures.length > 1 && (
                                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                                    <Image
                                        loader={(p) => { return myLoader(product.pictures[1].src) }} src={product.pictures[1].src} alt={product.pictures[1].alt}
                                        className="h-full w-full object-cover object-center"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            )
                        }
                        {
                            product.pictures.length > 2 && (
                                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                                    <Image
                                        loader={(p) => { return myLoader(product.pictures[2].src) }} src={product.pictures[2].src} alt={product.pictures[2].alt}
                                        className="h-full w-full object-cover object-center"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* Product Name */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>
                    {/* Options and Rating */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{product.price} DT</p>
                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Note</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                (product.rating || 0) > rating ? 'text-gray-900' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* 
                        Quantity and add bag
                         */}
                        <form className="mt-10">
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Quantité</h3>
                                </div>
                                <div className="mt-4">
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="1"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Ajouter au panier
                            </button>
                        </form>
                    </div>
                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
