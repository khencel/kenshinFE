import { api } from "@/lib/api";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    user: User;
}

export async function login(
    payload: LoginPayload
): Promise<LoginResponse> {
    return api<LoginResponse>("/api/login/", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}