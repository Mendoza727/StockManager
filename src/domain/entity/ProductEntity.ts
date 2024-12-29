export interface ProductEntity {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      Gender;
    tags:        string[];
    images:      string[];
}

export type Gender = "men" | "unisex" | "women" | "kid";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";