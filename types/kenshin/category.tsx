export interface CategoryForm {
    name: string;
    branch:number,
    is_active: boolean;
}

export interface Category {
    id:number,
    name: string;
    branch:number,
    is_active: boolean;
}


export interface Menu {
    id: number;
    category: number;
    category_name?: string;
    image: string | null;
    name: string;
    description: string;
    price: string;
    is_active: boolean;
}

export interface MenuForm {
    id?: number;
    category: number;
    image: File | string | null;
    name: string;
    description: string;
    price: string;
    is_active: boolean;
}