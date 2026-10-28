"use client";

import { SessionProvider } from "next-auth/react";
import DjangoTokenCookie from "../../types/DjangoTokenCookies";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider
            refetchOnWindowFocus={false}
            refetchInterval={0}
        >
            <DjangoTokenCookie />
            {children}
        </SessionProvider>
    );
}