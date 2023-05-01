import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NavType } from '@/Types/NavigationTypes'

interface NavigationType {
    name: string
    href: string
    current: boolean
}

const navigation: NavigationType[] = [
    { name: 'Accueil', href: '/', current: true },
    { name: 'Catégories', href: '/categories', current: false },
    { name: 'Nouveautés', href: '/news', current: false },
    { name: 'Contactez-nous', href: '/contact-us', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbars({ handleContinueShopping }: NavType) {
    const router = useRouter()
    const [disabled, setDisabled] = useState(false);
    const { pathname } = router

    const restAll = (navigation: NavigationType[]) => {
        navigation.forEach((nav: NavigationType) => {
            nav.current = false
        })
    }
    switch (pathname) {
        case "/contact-us":
            restAll(navigation)
            navigation[3].current = true
            break;
        case "/news":
            restAll(navigation)
            navigation[2].current = true
            break;
        case "/categories":
            restAll(navigation)
            navigation[1].current = true
            break;
        case "/":
            restAll(navigation)
            navigation[0].current = true
            break;
        default:
            break;
    }

    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white pt-4 pr-4 pb-4">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href={navigation[0].href}>
                                        <Image
                                            className="block h-8 w-auto lg:hidden"
                                            src="/images/logo.svg"
                                            alt="Your Company"
                                            width={30}
                                            height={30}
                                        />
                                        <Image
                                            className="hidden h-8 w-auto lg:block"
                                            src="/images/logo.svg"
                                            alt="Your Company"
                                            width={30}
                                            height={30}
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-gray-900 hover:text-white',
                                                    'block rounded-md px-3 py-2 text-base font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="rounded-full bg-gray-900 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={() => {
                                        setDisabled(true);
                                        setTimeout(() => {
                                            setDisabled(false);
                                        }, 3000);
                                        handleContinueShopping()
                                    }}
                                    disabled={disabled}
                                >
                                    <span className="sr-only">View notifications</span>
                                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.href}>
                                    <Disclosure.Button
                                        as="a"
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-gray-900 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                </Link>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
