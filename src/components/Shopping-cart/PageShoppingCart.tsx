import CustomerFormInShoppingCart from "./CustomerFormInShoppingCart"
import ListOfProductsForPageShoppingCart from "./ListOfProductsForPageShoppingCart"

const PageShoppingCart = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>
                    <CustomerFormInShoppingCart/>
                </section>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <ListOfProductsForPageShoppingCart/>
            </div>
        </div>

    )
}

export default PageShoppingCart