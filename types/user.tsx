export interface User  {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    date_of_birth: string;
    gender: string;
    is_admin:boolean
}

export interface CreateUserData {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    date_of_birth: string;
    is_active: boolean;
    is_admin:boolean
}