export interface Member  {
    id: number;
    personal_info: {
        first_name: string;
        last_name: string;
        date_of_birth: string;
        gender: string;
        contact_number: string;
        email: string;
        address: string;
        
    };

    emergency_contact: {
        contact_person: string;
        relationship: string;
        contact_number: string;
        address: string;
    };

    additional_info: {
        medical_note: string;
        special_note: string;
    };
    profile_picture?: string | null;
    is_active: boolean;
    
}

export interface CreateMemberData {
    personal_info: {
        first_name: string;
        last_name: string;
        date_of_birth: string;
        gender: string;
        contact_number: string;
        email: string;
        address: string;
    };

    emergency_contact: {
        contact_person: string;
        relationship: string;
        contact_number: string;
        address: string;
    };

    additional_info: {
        medical_note: string;
        special_note: string;
    };
    profile_picture?: string | null;
    is_active: boolean;
}