import type { AppProps } from 'next/app'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import {RecoilRoot} from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Styles 
import '@/styles/globals.css'
// Components
import Layout from '../components/App/Layout'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        scriptProps={{
          async: false, // optional, default to false,
          defer: true, // optional, default to false
          appendTo: "body", // optional, default to "head", can be "head" or "body",
          nonce: undefined,
        }}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer position="bottom-right" />
        </Layout>
      </GoogleReCaptchaProvider>
    </RecoilRoot>
  )
}
