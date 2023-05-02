import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import DialogShoppingCard from '../MainIndex/DialogShoppingCart'
import { useState } from 'react'
import Navbars from './Navbars'
import Footer from './Footer'


interface LayoutType {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutType) => {
    const [isShoppingCardOpen, setIsShoppingCardOpen] = useState<boolean>(false)
    const  handleContinueShopping = () => {
        setIsShoppingCardOpen(!isShoppingCardOpen)
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbars handleContinueShopping={handleContinueShopping} />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
            <DialogShoppingCard isOpen={isShoppingCardOpen} handleContinueShopping={handleContinueShopping}/>
        </>

    )
}

export default Layout

 // create a Next JS layout ?