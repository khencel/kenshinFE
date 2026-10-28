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


const buildRequest = (data: unknown) => {
    const isFormData = data instanceof FormData;

    const headers = { ...getAuthHeaders() } as Record<string, string>;

    // hayaan ang browser ang mag-set ng multipart boundary
    if (isFormData) {
        delete headers["Content-Type"];
        delete headers["content-type"];
    }

    return {
        headers,
        body: isFormData ? (data as FormData) : JSON.stringify(data),
    };
};

export const getData = async <T,>(
    endpoint: string,
    page: number = 1,
    pageSize: number = 10,
    search: string = ""
): Promise<PaginatedResponse<T>> => {

    const [path, existingQuery] = endpoint.split("?");

    const params = new URLSearchParams(existingQuery ?? "");

    params.set("page", String(page));
    params.set("page_size", String(pageSize));

    if (search.trim()) {
        params.set("search", search.trim());
    }

    const response = await fetch(
        `${API_URL}/api/${path}?${params.toString()}`,
        {
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(
            error?.detail || "Failed to fetch data"
        );
    }

    return response.json();
};

export const createRecord = async <T, TData>(
    endpoint: string,
    data: TData
): Promise<T> => {
    const { headers, body } = buildRequest(data);

    const response = await fetch(
        `${API_URL}/api/${endpoint}/`,
        {
            method: "POST",
            headers,
            body,
        }
    );

    if (!response.ok) {
        const error = await response.json();
        console.error("Create record error:", error);
        throw new Error(error.detail || "Failed to create record");
    }

    return response.json();
};

export const updateRecord = async <T, TData>(
    endPoint: string,
    id: number,
    data: T
): Promise<TData> => {
    const { headers, body } = buildRequest(data);

    const response = await fetch(
        `${API_URL}/api/${endPoint}/${id}/`,
        {
            method: "PUT",
            headers,
            body,
        }
    );

    if (!response.ok) {
        const error = await response.json();
        console.error("Update record error:", error);
        throw new Error(error.detail || "Failed to update record");
    }

    return response.json();
};

export const patchRecord = async <T, TData>(
    endPoint: string,
    id: number,
    data: T
): Promise<TData> => {
    const { headers, body } = buildRequest(data);

    const response = await fetch(
        `${API_URL}/api/${endPoint}/${id}/`,
        {
            method: "PATCH",
            headers,
            body,
        }
    );

    if (!response.ok) {
        const error = await response.json();
        console.error("Patch record error:", error);
        throw new Error(error.detail || "Failed to patch record");
    }

    return response.json();
};

export const deleteRecord = async (
    endpoint:string,
    id:number
): Promise<void> => {
    const respone = await fetch(
        `${API_URL}/api/${endpoint}/${id}/`,
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

function async<T>(endpoint: any, string: any, page: any, arg3: number, pageSize: any, arg5: number, search: any, arg7: string) {
    throw new Error("Function not implemented.");
}
