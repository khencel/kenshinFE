"use client";

import { useEffect } from "react";

export function BootstrapClient() {
    useEffect(() => {
        import("bootstrap");
    }, []);

    return null;
}