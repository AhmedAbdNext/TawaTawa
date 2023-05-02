import { CategoryComponentType } from "@/Types/CategroyType";
import { SetStateAction, useState } from "react";

export default function CategoriesNav({ categories, handleCategory, handleSearch, currentCategoryId }: CategoryComponentType) {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value+"");
    if (searchTerm.length >= 3) {
      
    }
  };

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container flex flex-wrap items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        {
          categories.map((category) => {
            return category.id === currentCategoryId ? (
              <p onClick={() => { handleCategory(category.id) }} key={category.id}
                className="border-b-2 text-gray-800 transition-colors duration-300 transform dark:text-gray-200  
                border-blue-500 mx-1.5 sm:mx-6">{category.name}</p>
            ) : (
              <p onClick={() => { handleCategory(category.id) }} key={category.id}
                className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">
                {category.name}
              </p>
            )
          })
        }
        <fieldset className="w-full space-y-1 dark:text-gray-100">
          <label htmlFor="Search" className="hidden">Search</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-100">
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input type="search" name="Search" placeholder="Search..." onChange={handleChange}
             className="w-full space-y-1 py-2 pl-10 text-sm rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400" />
          </div>
        </fieldset>
      </div>
    </nav>
  )
}