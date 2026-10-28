"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get("access_token");

        if (!token) {
            router.replace("/login");
            return;
        }

        setIsAuthenticated(true);
        setIsChecking(false);
    }, [router]);

    if (isChecking) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}