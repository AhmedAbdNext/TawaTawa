const CustomerFormInShoppingCart = () => { 
    
    return (
        <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="firstName">Nom</label>
                <input id="FirstName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="LastName">Prénom</label>
                <input id="LastName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="emailAddress">Address Email</label>
                <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="phone">Téléphone</label>
                <input id="phone" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="address">Adresse</label>
                <input id="address" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="city">Ville</label>
                <input id="city" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="zip">Code Postal</label>
                <input id="zip" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="billingAddress">Adresse de facturation</label>
                <input id="billingAddress" type="text" placeholder="Si différente de l'adresse de livraison" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="payment">Moyen de paiement</label>
                <select id="payment" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900">
                  <option value=""></option>
                  <option value="Paiement en espèces">Paiement en espèces</option>
                  <option value="Chèques bancaires">Chèques bancaires </option>
                  <option value="Carte bancaire">Carte bancaire</option>
                </select>
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" id="message">Message</label>
                <textarea id="message"  placeholder="Si vous avez un message à nous laisser" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring h-24" />
            </div>
        </div>

        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
    </form>
    )
 }

export default CustomerFormInShoppingCart;
