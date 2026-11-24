export interface User  {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role:number,
    is_active: boolean;
    is_admin:boolean
}

export interface CreateUserData {
    first_name: string;
    last_name: string;
    email: string;
    role:number,
    is_active: boolean;
    is_admin:boolean
}