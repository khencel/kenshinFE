"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "./AdminSidebar";
import Navbar from "./AdminNavbar";
import "../../src/app/admin.css"

type AdminLayoutProps = {
    children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="admin-wrapper">

            <Sidebar open={sidebarOpen} />

            <div
                className={`admin-main ${
                    sidebarOpen
                        ? "sidebar-open"
                        : "sidebar-closed"
                }`}
            >
                <Navbar
                    onMenuClick={() =>
                        setSidebarOpen((prev) => !prev)
                    }
                />

                <main className="admin-content">
                    {children}
                </main>
            </div>

        </div>
    );
}