"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function DjangoTokenCookie() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== "authenticated") {
            return;
        }

        const token = session?.djangoAccessToken;

        if (!token) {
            return;
        }

        const currentToken = Cookies.get("access_token");

        // Don't rewrite the cookie if it is already correct
        if (currentToken === token) {
            return;
        }

        Cookies.set("access_token", token, {
            expires: 1,
            secure: false,
            sameSite: "lax",
            path: "/",
        });

        // console.log("✅ Django access token synced");
    }, [status, session?.djangoAccessToken]);

    return null;
}