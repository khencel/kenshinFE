"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        if (loading) return;
        setLoading(true);

        // Remove Django JWT
        Cookies.remove("access_token", { path: "/" });

        // Remove NextAuth session
        await signOut({ redirect: false });

        // Redirect to login
        router.replace("/login");
    };

    return (
        <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
            disabled={loading}
            aria-label="Logout"
        >
            <LogOut size={16} />
            <span className="logout-text">
                {loading ? "Signing out…" : "Logout"}
            </span>
        </button>
    );
}