"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        // Remove Django JWT
        Cookies.remove("access_token", {
            path: "/",
        });

        // Remove NextAuth session
        await signOut({
            redirect: false,
        });

        // Redirect to login
        router.replace("/login");
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}