import { tesloApi } from "@/config/api/tesloApi";
import { ProductEntity } from "@/domain/entity/ProductEntity";

export const UpdateProductById = async (product: Partial<ProductEntity>) => {
  try {
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id && product.id !== "new") {
      return updateProduct(product);
    } else {
      return createProduct(product);
    }
  } catch (error) {
    throw new Error(`Error Updating product ${error}`);
  }
};

//TODO: revisar si viene el usuario
const updateProduct = async (product: Partial<ProductEntity>) => {
  try {
    const { id, images = [], ...rest } = product;
    const checkedImages = await prepareImage(images);

    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error(`error getting update product ${error}`);
  }
};

const createProduct = async (
  product: Partial<ProductEntity>
): Promise<ProductEntity> => {
  try {
    const { id, images = [], ...rest } = product;
    const checkedImages = await prepareImage(images);

    const { data } = await tesloApi.post(`/products/`, {
      images: checkedImages,
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error(`Error create product ${error}`);
  }
};

const prepareImage = async(images: string[]) => {
  //TODO: revisar los files
  const fileImages = images.filter((image) => image.includes("file://"));
  const currentImage = images.filter((image) => !image.includes("file://"));

  if (fileImages.length > 0) {
    const uploadPromise = fileImages.map( uploadImage );
    const uploadedImages = await Promise.all( uploadPromise )

    currentImage.push(...uploadedImages);
  } 

  return currentImage.map((image) => image.split("/").pop());
};

const uploadImage = async (image: string) => {
  const formData = new FormData();

  const file = {
    uri: image,
    type: "image/png",
    name: image.split("/").pop(),
  };

  formData.append("file", file as any);

  const { data } = await tesloApi.post<{ image: string }>('/files/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return data.image;
};
