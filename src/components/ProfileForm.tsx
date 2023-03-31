import Image from 'next/image'

export default function Profile() {
  return (
    <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
    <form action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="font-medium">Personal Inormation</p>
          <p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
        </div>
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">First name</label>
            <input id="firstname" type="text" placeholder="First name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Last name</label>
            <input id="lastname" type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Email</label>
            <input id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
          <div className="col-span-full">
            <label className="text-sm">Address</label>
            <input id="address" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label className="text-sm">City</label>
            <input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label className="text-sm">State / Province</label>
            <input id="state" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
          <div className="col-span-full sm:col-span-2">
            <label className="text-sm">ZIP / Postal</label>
            <input id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
        </div>
      </fieldset>
      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
        <div className="space-y-2 col-span-full lg:col-span-1">
          <p className="font-medium">Profile</p>
          <p className="text-xs">Adipisci fuga autem eum!</p>
        </div>
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Username</label>
            <input id="username" type="text" placeholder="Username" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label className="text-sm">Website</label>
            <input id="website" type="text" placeholder="https://" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
          <div className="col-span-full">
            <label className="text-sm">Bio</label>
            <textarea id="bio" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"></textarea>
          </div>
          <div className="col-span-full">
            <label className="text-sm">Photo</label>
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.svg" alt="" className="w-10 h-10 rounded-full dark:bg-gray-700" width={10} height={10} />
              <button type="button" className="px-4 py-2 border rounded-md dark:border-gray-100">Change</button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </section>
  )
}
