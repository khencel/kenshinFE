export interface Membership {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    is_active: boolean;
}

export interface CreateMembershipData {
    name: string;
    description: string;
    price: number;
    duration: number; 
    is_active: boolean;
}