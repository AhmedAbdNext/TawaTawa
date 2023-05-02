import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Snackbar from "../Snackbar";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { recoilProductsInShoppingCart } from "@/Utils/recoilAtoms";
import { IResponse } from "@/Types/Response"
import LoadingModal from "../LoadingModal";
import MessageModal from "../MessageModal";

const CustomerFormInShoppingCart = () => {
    // Recoil get Product List from shoppingCart
    const productsInShoppoingCart = useRecoilValue(recoilProductsInShoppingCart);
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [response, setResponse] = useState<IResponse | null>(null);
    // handle submit button
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        if (productsInShoppoingCart.length === 0) {
            setResponse({ message: "Votre panier est vide", status: "Failed" });
            return;
        }
        // Create the customer object
        const customer = {
            firstName: e.target[0],
            lastName: e.target[1],
            email: e.target[2],
            phone: e.target[3],
            address: e.target[4],
            city: e.target[5],
            zip: e.target[6],
            billingAddress: e.target[7],
            date: e.target[8],
            payment: e.target[9],
            message: e.target[10],
        }
        Object.values(customer).forEach(item => {
            if (item.validity.valid === false && item.validity.valid) {
                return;
            }
        });
        if (!executeRecaptcha) {
            return;
        }
        try {
            const token = await executeRecaptcha();
            if (!token) {
                setResponse({ message:"Votre code reçu n'est pas valide, veuillez vérifier votre code reçu", status: "Failed" });
                return;
            }
            const updatedCustomer = Object.fromEntries(
                Object.entries(customer).map(([customerKey, customerValue]) => [customerKey, customerValue.value])
            );
            const {data}:{data:IResponse} = await axios.post("/api/order", {
                token,
                customer : updatedCustomer,
                products: productsInShoppoingCart
            });
            setResponse(data);
            setLoading(false)
            setShowModal(true);
        } catch (error) {
            setResponse({ message: "Un problème s'est produit, veuillez réessayer !!!", status: "Failed" });
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="firstName">Nom (*)</label>
                    <input required id="FirstName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="LastName">Prénom (*)</label>
                    <input  required id="LastName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="emailAddress">Address Email (*)</label>
                    <input required  id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="phone">Téléphone (*)</label>
                    <input required min={20000000} max={99999999} id="phone" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="address">Adresse (*)</label>
                    <input required  id="address" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="city">Ville (*)</label>
                    <input required  id="city" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="zip">Code Postal (*)</label>
                    <input required id="zip" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="billingAddress">Adresse de facturation</label>
                    <input id="billingAddress" type="text" placeholder="Si différente de l'adresse de livraison" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
                 <div>
                    <label className="text-gray-700 dark:text-gray-200" id="date">Date de livraison (*)</label>
                    <input required  id="date" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                 </div>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="payment">Moyen de paiement (*)</label>
                    <select  required  id="payment" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900">
                        <option value=""></option>
                        <option value="Paiement en espèces">Paiement en espèces</option>
                        <option value="Chèques bancaires">Chèques bancaires </option>
                        <option value="Carte bancaire">Carte bancaire</option>
                    </select>
                </div>
                <div>
                    <label className="text-gray-700 dark:text-gray-200" id="message">Message</label>
                    <textarea id="message" placeholder="Si vous avez un message à nous laisser" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring h-24" />
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button type="submit"  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-400 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-600">Save</button>
            </div>
            {
                isLoading && (<LoadingModal/>)
            }
            {
                response && showModal && <MessageModal
                message={ response.message }
                status={ response.status}
                 closeModal={() => { 
                    setShowModal(false)
                        setResponse(null)
                    } } />
            }
        </form>
    )
}

export default CustomerFormInShoppingCart;
