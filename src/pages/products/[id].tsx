import { ProductType } from "@/Types/ProductType";
import { fetchAllProducstsFromAirtable, getProductById } from "@/Utils/products";
import ProductDetail from "@/components/ProductDetail"
import { GetStaticPaths, GetStaticProps } from "next";

interface ProductComponent {
    data: ProductType
}
export default function Product({ data }: ProductComponent) {
    return <ProductDetail  {...data}/>
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products: ProductType[] | unknown = await fetchAllProducstsFromAirtable()
    if (products instanceof Array) {
        const paths = products.map((product) => ({
            params: {
                id: product.id+""
            }
        }))
        return {
            paths,
            fallback: false
        }
    }
    return {
        paths: [],
        fallback: false
    }

}

interface GetStaticParam {
    params: {
        id: string
    }
}

export const getStaticProps: GetStaticProps = async ({ params}) => {
    const mId = params && params.id
    if (mId && typeof mId !== "string" && Array.isArray(mId)) {
        return {
            notFound: true
        }
    }
    const result = await getProductById(mId || "-1" )
    return {
        props: {
            data: result[0]
        }
    }
}
