import React from 'react'
import Image from 'next/image'
import { ProductComponentType } from '@/Types/ProductType'
import { myLoader } from '@/Utils/products'
import BodyLayer from './BodyLayer'


export default function ProductComponent({products}: ProductComponentType) {
  return (
    <BodyLayer>
      <ul className="grid grid-cols-4 gap-10">
            {products.map(product => (
              <li key={product.id} className="col-span-full sm:col-span-2 lg:col-span-1 group relative">
                <a href={product.href} className="w-full h-full flex flex-col">
                  {/* ::Container */}
                  <div className="relative">
                    {/* :::Picture container */}
                    <div className="aspect-w-1 aspect-h-1 shadow-sm rounded-lg overflow-hidden group-hover:shadow-md">
                      {/* ::::picture */}
                      <Image loader={()=>{return myLoader(product.mainPicture.src)}} unoptimized priority src={product.mainPicture.src} alt={product.mainPicture.alt} className="w-full h-full object-cover object-center"  width={100} height={100}/>
                      {/* ::::overlay background */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-gray-800 via-transparent opacity-70 group-hover:from-transparent" />
                    </div>
                    {/* :::price */}
                    <span className="z-20 absolute bottom-3 right-5 px-0.5 rounded-md text-2xl text-white font-semibold antialiased group-hover:text-gray-700 group-hover:bg-white group-hover:bg-opacity-70">{`$${product.price}`}</span>
                  </div>
                  {/* ::Product Details */}
                  <div className="flex-grow mt-2 px-3 h-full">
                    {/* :::Info container */}
                    <div className="relative flex flex-col">
                      {/* ::::name */}
                      <h3 className="truncate pb-6 text-base text-gray-800 font-semibold">{product.name}</h3>
                      {/* ::::colors description */}
                      <p className="line-clamp-3  mt-1 text-sm text-gray-500 font-medium">{product.description}</p>
                      {/* ::::add to cart button */}
                      <button className="mt-4 py-1.5 w-full rounded-md bg-gray-200 text-sm text-gray-600 font-semibold tracking-wide hover:bg-gray-300 hover:text-gray-800">Add to bag</button>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
    </BodyLayer>
  )
}

// tailwindcss text overflow ellipsis ?

