/* eslint-disable react/no-unescaped-entities */
import BodyLayer from './BodyLayer'

export default function UserFormula() {
  return (
    <BodyLayer>
      <section className="dark:bg-gray-800 dark:text-gray-50">
            <form action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
              <fieldset className="grid grid-cols-3 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Nom</label>
                    <input id="firstname" type="text" placeholder="Nom" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Prénom</label>
                    <input id="lastname" type="text" placeholder="Prénom" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Email</label>
                    <input id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Numéro de téléphone</label>
                    <input id="email" type="email" placeholder="Phone" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                  <div className="col-span-full">
                    <label className="text-sm">Adresse de livraison</label>
                    <input id="address" type="text" placeholder="Adresse" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Nom du quartier ou la ville </label>
                    <input id="city" type="text" placeholder="Ville" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Code Postal </label>
                    <input id="zip" type="text" placeholder="Postal" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                  <div className="col-span-full ">
                    <label className="text-sm">Addresse facturation (si différentes de l'adresse de livraison) </label>
                    <input id="zip" type="text" placeholder="Addresse facturation" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Date de livraison</label>
                    <input id="zip" type="text" placeholder="Postal" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label className="text-sm">Méthode de paiement</label>
                    <select id="category" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900">
                      <option value="0"></option>
                      <option value="1">Paiement en espèces</option>
                      <option value="2">Chèques bancaires </option>
                      <option value="3">Carte bancaire</option>
                    </select>
                  </div>
                  <div className="col-span-full">
                    <label className="text-sm">Message ou Instructions spéciales </label>
                    <textarea id="message" rows={4} placeholder="Message" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                  </div>
                </div>
              </fieldset>
            </form>
          </section>
      </BodyLayer>
  )
}
