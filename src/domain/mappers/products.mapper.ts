import type { ProductResponse } from "@/infrastructure/interfaces/Products.interfaces";
import type { ProductEntity } from "../entity/ProductEntity";
import { API_URL } from "@/config/api/tesloApi";

export class productMapper {
  static ProductToEntity(product: ProductResponse): ProductEntity {



    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      slug: product.slug,
      stock: product.stock,
      sizes: product.sizes,
      gender: product.gender,
      tags: product.tags,
      images: product.images.map(
        images => `${ API_URL }/files/product/${images}`
      ),
    };
  }
}
