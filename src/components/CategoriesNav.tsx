import { CategoryComponentType } from "@/Types/CategroyType";
import Link from "next/link";



export default function CategoriesNav({categories}: CategoryComponentType) {

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container flex flex-wrap items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        {
          categories.map((category) => {
            return category.current ? (
              <Link href={`/category/${category.id}`} key={category.id} className="border-b-2 text-gray-800 transition-colors duration-300 transform dark:text-gray-200  border-blue-500 mx-1.5 sm:mx-6">{
                category.name
              }</Link>
            ) : (
              <Link href={`/category/${category.id}`} key={category.id}
                className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
                {category.name}
              </Link>
            )
          })
        }
        <input type="text" className="w-full mt-5 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search"></input>
      </div>
    </nav>
  )
}