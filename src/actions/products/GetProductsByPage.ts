import { tesloApi } from "@/config/api/tesloApi";
import type { ProductResponse } from "@/infrastructure/interfaces/Products.interfaces";
import { productMapper } from "@/infrastructure/mappers/products.mapper";

export const GetProductByPage = async(page: number, limit: number = 20) => {

    console.log(page, limit);

    try {
        const { data } = await tesloApi.get<ProductResponse[]>(`/products?offset=${page * 10}&limit=${limit}`);
        const products = data.map(productMapper.ProductToEntity);
        
        return products;
    } catch (error) {
        throw new Error(`Error: has ocurred new error in products ${error}`);
    }
}