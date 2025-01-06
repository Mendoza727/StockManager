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

export enum Gender { men = "men", unisex = "unisex", women = "women", kid = "kid" };

export enum Size { XS = 'XS', S = 'S', M = 'M', L = 'L', XL = 'XL', XXL = 'XXL' }