import { User, CreateUserData } from "../../../types/user";
import { PaginatedResponse } from "../../../types/api";


const API_URL = process.env.NEXT_PUBLIC_API_URL

const getAuthHeaders = () => {
    const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("access_token="))
        ?.split("=")[1];

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};



export const getUsers = async (
    page: number = 1,
    pageSize: number = 10,
    search: string = ""
): Promise<PaginatedResponse<User>> => {

    const params = new URLSearchParams({
        page: String(page),
        page_size: String(pageSize),
    });

    if (search.trim()) {
        params.append("search", search.trim());
    }

    const response = await fetch(
        `${API_URL}/api/users/?${params.toString()}`,
        {
            
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
};

export const createUser = async (
    data: CreateUserData
): Promise<User> => {
    const response = await fetch(
        `${API_URL}/api/users/`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    )
    if (!response.ok) {

        const error = await response.json();

        console.error("Create user error:", error);

        throw new Error(
            error.detail || "Failed to create user"
        );
    }

    return response.json();
}

export const updateUser = async (id:number, data: CreateUserData):Promise<User> => {
    const response = await fetch(
        `${API_URL}/api/users/${id}/`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        }
    )

    if (!response.ok) {

        const error = await response.json();

        console.error("Update user error:", error);

        throw new Error(
            error.detail || "Failed to update user"
        );
    }

    return response.json();
}

export const deleteUser = async (
    id:number
): Promise<void> => {
    const respone = await fetch(
        `${API_URL}/api/users/${id}/`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );

    if (!respone.ok){
        const error = await respone.json().catch(() => null)

        throw new Error(
            error?.detail || "Failed to delete user"
        )
    }
}