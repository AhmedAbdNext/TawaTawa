/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
// Utils
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// Components
import BodyLayer from './BodyLayer'
import axios from 'axios';
import Snackbar from './Snackbar';

export default function UserFormula() {
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [response, setResponse] = useState<IResponse | null>(null);
  // handle submit button
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Create the customer object
    const customer = {
      firstName: e.target[1],
      lastName: e.target[2],
      email: e.target[3],
      phone: e.target[4],
      address: e.target[5],
      city: e.target[5],
      zip: e.target[7],
      billingAddress: e.target[8],
      date: e.target[9],
      payment: e.target[10],
      message: e.target[11],
    }

    Object.values(customer).forEach(item => {
      if (item.validity.valid === false && item.validity.valid) {
        return;
      }
    });

    setBtnDisabled(true);

    if (!executeRecaptcha) {
      return;
    }
    try {
      const token = await executeRecaptcha();
      if (!token) {
        setResponse({ message: "Failed to Send!!!", status: "Failed" });
        return;
      }
      const updatedCustomer = Object.fromEntries(
        Object.entries(customer).map(([customerKey, customerValue]) => [customerKey, customerValue.value])
      );
      const result = await axios.post("/api/captcha", {
        token,
        ...updatedCustomer
      });

      if (result.data) {
        setResponse({
          message: result.data.message,
          status: result.data.status,
        });
      }
      setBtnDisabled(false);
    } catch (error) {
      setResponse({ message: "Failed to Send!!!", status: "Failed" });
      setBtnDisabled(false);
    }
  }

  return (
    <BodyLayer>
      <section className="dark:bg-gray-800 dark:text-gray-50">
        <form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit}>
          <fieldset className="grid grid-cols-3 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Nom *</label>
                <input required id="firstname" type="text" placeholder="Nom" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Prénom *</label>
                <input required id="lastname" type="text" placeholder="Prénom" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Email *</label>
                <input required id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Numéro de téléphone *</label>
                <input required id="phone" type="number" placeholder="Phone" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="col-span-full">
                <label className="text-sm">Adresse de livraison *</label>
                <input required id="address" type="text" placeholder="Adresse" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Nom du quartier ou la ville *</label>
                <input required id="city" type="text" placeholder="Ville" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Code Postal *</label>
                <input required id="zip" type="text" placeholder="Postal" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="col-span-full ">
                <label className="text-sm">Addresse facturation (si différentes de l'adresse de livraison) </label>
                <input id="billing" type="text" placeholder="Addresse facturation" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Date de livraison</label>
                <input id="date" type="date" placeholder="Postal" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Méthode de paiement</label>
                <select id="payment" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900">
                  <option value="0"></option>
                  <option value="1">Paiement en espèces</option>
                  <option value="2">Chèques bancaires </option>
                  <option value="3">Carte bancaire</option>
                </select>
              </div>
              <div className="col-span-full">
                <label className="text-sm">Message ou Instructions spéciales </label>
                <textarea id="message" rows={8} placeholder="Message" cols={30}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
              </div>
            </div>
            <div className="col-span-full">
              {response?.status === "Failed" && <Snackbar message={response.message} type="error" />}
            </div>
            <div className="col-span-full flex justify-end">
              <button type="submit" disabled={isBtnDisabled} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-md shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                <span>Submit{isBtnDisabled && "ting"}</span>
                {isBtnDisabled && <span className="loader"></span>}
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </BodyLayer>
  )
}
