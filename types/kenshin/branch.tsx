export interface Branch {
    id: number;
    name: string;
    address: string;
    map_link: string;
    is_active: boolean;
    image: string | null;
    image_url?: string | null;
}

export interface BranchForm {
    name: string;
    address: string;
    map_link: string;
    is_active: boolean;
    image: File | null;
    image_url?: string | null;
}