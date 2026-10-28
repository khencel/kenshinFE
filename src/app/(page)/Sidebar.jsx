"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar({ open }) {

    const pathname = usePathname();

    const [managementOpen, setManagementOpen] = useState(
        pathname.startsWith("/management")
    );

    // Automatic open kapag nasa management route
    useEffect(() => {
        if (pathname.startsWith("/management")) {
            setManagementOpen(true);
        }
    }, [pathname]);


    const isActive = (path) => {
        return pathname === path;
    };

    const isSubActive = (path) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };


    const isManagementActive = () => {
        return pathname === "/management" ||
            pathname.startsWith("/management/");
    };


    return (
        <aside
            className={`admin-sidebar ${
                open ? "sidebar-open" : "sidebar-closed"
            }`}
        >

            {/* BRAND */}
            <div className="sidebar-brand">

                {!open && (
                    <span className="brand-icon">
                        L
                    </span>
                )}

                <span className="sidebar-text">
                    <img
                        src="/img/lnc-logo.png"
                        style={{ width: "150px" }}
                        alt="LNC Logo"
                    />
                </span>

            </div>


            {/* USER */}
            <div className="sidebar-user">

                <div className="user-avatar">
                    A
                </div>

                <div className="sidebar-text">

                    <div style={{ fontWeight: 600 }}>
                        Admin User
                    </div>

                    <small style={{ color: "#adb5bd" }}>
                        Administrator
                    </small>

                </div>
            </div>


            {/* MENU */}
            <div className="sidebar-menu">
                <div className="menu-title sidebar-text">
                    Main Navigation
                </div>


                {/* DASHBOARD */}
                <Link
                    href="/dashboard"
                    className={`menu-item ${
                        isActive("/dashboard")
                            ? "active"
                            : ""
                    }`}
                >

                    <span className="menu-icon">
                        📊
                    </span>

                    <span className="sidebar-text">
                        Dashboard
                    </span>

                </Link>


                {/* MANAGEMENT */}
                <div>

                    <div
                        className={`menu-item ${
                            isManagementActive()
                                ? "active"
                                : ""
                        }`}
                        onClick={() => {

                            if (!open) {
                                return;
                            }

                            setManagementOpen(
                                !managementOpen
                            );

                        }}
                    >

                        <span className="menu-icon">
                            🗂️
                        </span>

                        <span className="sidebar-text">
                            Management
                        </span>

                        {open && (
                            <span
                                className={`dropdown-arrow ${
                                    managementOpen
                                        ? "rotate"
                                        : ""
                                }`}
                            >
                                ▾
                            </span>
                        )}

                    </div>


                    {/* SUBMENU */}
                    {open && managementOpen && (

                        <div className="submenu">

                            {/* STUDENTS */}
                            <Link
                                href="/management/users"
                                className={`submenu-item ${
                                    isSubActive("/management/users")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    👨‍🎓
                                </span>

                                Users

                            </Link>


                            {/* TEACHERS */}
                            <Link
                                href="/management/roles"
                                className={`submenu-item ${
                                    isSubActive("/management/roles")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    👨‍🏫
                                </span>

                                Roles

                            </Link>


                            {/* CLASSES */}
                            <Link
                                href="/management/branch"
                                className={`submenu-item ${
                                    isSubActive("/management/branch")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    🏫
                                </span>

                                Branches

                            </Link>

                            <Link
                                href="/management/vehicle"
                                className={`submenu-item ${
                                    isSubActive("/management/vehicle")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    🏫
                                </span>

                                Vehicle

                            </Link>

                            <Link
                                href="/management/passenger"
                                className={`submenu-item ${
                                    isSubActive("/management/passenger")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    🏫
                                </span>

                                Passengers

                            </Link>

                        </div>

                    )}

                </div>



                {/* REPORTS */}
                <Link
                    href="/reports"
                    className={`menu-item ${
                        isActive("/reports")
                            ? "active"
                            : ""
                    }`}
                >

                    <span className="menu-icon">
                        📈
                    </span>

                    <span className="sidebar-text">
                        Reports
                    </span>

                </Link>


                {/* SYSTEM */}
                <div className="menu-title sidebar-text">
                    System
                </div>


                {/* SETTINGS */}
                <Link
                    href="/settings"
                    className={`menu-item ${
                        isActive("/settings")
                            ? "active"
                            : ""
                    }`}
                >

                    <span className="menu-icon">
                        ⚙️
                    </span>

                    <span className="sidebar-text">
                        Settings
                    </span>

                </Link>


                {/* LOGS */}
                <Link
                    href="/logs"
                    className={`menu-item ${
                        isActive("/logs")
                            ? "active"
                            : ""
                    }`}
                >

                    <span className="menu-icon">
                        📋
                    </span>

                    <span className="sidebar-text">
                        Activity Logs
                    </span>

                </Link>

            </div>

        </aside>
    );
}