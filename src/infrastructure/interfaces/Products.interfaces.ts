export interface ProductResponse {
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
    user:        UserCreated;
}

export type Gender = "men" | "unisex" | "women" | "kid";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface UserCreated {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
}