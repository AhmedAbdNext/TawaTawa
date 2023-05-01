import { ProductType } from "@/Types/ProductType";

// create a total price  products  with quatity 
export const getTotalPrice = (products: any) => {
    // check products list
    if (!products) return 0;
    // return the total price of products
    return products.reduce((acc, product) => acc + 
    product.price * (product.quantity || 1), 0).toFixed(3)
}
// remove product from list of set of products
export const removeProductForProductsInSHoppingCart = (setProductsInShoppingCart: any, product: ProductType) => {
    const { confirm } = window
    if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return
    // remove product from productsInShoppoingCart
    setProductsInShoppingCart((oldCart) => {
      return oldCart.filter((oldProduct) => oldProduct.id !== product.id)
    })
}