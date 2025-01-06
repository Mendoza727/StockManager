import { tesloApi } from "@/config/api/tesloApi";
import { Gender, type ProductEntity } from "@/domain/entity/ProductEntity";
import type { ProductResponse } from "@/infrastructure/interfaces/Products.interfaces";
import { productMapper } from "@/infrastructure/mappers/products.mapper";

const emptyProduct: ProductEntity = {
    id: "",
    title: "",
    price: 0,
    description: "",
    slug: "",
    stock: 0,
    sizes: [],
    gender: Gender.unisex,
    tags: [],
    images: []
}

export const GetProductById = async(id: string): Promise<ProductEntity> => {
    if ( id === 'new') return emptyProduct;
    
    try {

        const { data } = await tesloApi.get<ProductResponse>(`/products/${id}`);

        return productMapper.ProductToEntity( data );
    } catch (error) {
        throw new Error(`has ocurried error in getting product by id ${id} ${error}`);
    }
}