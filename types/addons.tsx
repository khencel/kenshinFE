export interface AddOns{
    id: number,
    name: string,
    price: number,
    is_active:boolean,
    category:number
}

export interface CreateAddons{
    name: string,
    price: number,
    is_active:boolean,
    category:number
}