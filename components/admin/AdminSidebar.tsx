"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Sidebar({ open }: { open: boolean }) {
    const { data: session } = useSession();
    const pathname = usePathname();

    const [managementOpen, setManagementOpen] = useState(
        pathname.startsWith("/management")
    );

    const [chartsOpen, setChartsOpen] = useState(
        pathname.startsWith("/charts")
    )

    // Automatic open kapag nasa management route
    useEffect(() => {
        if (pathname.startsWith("/management")) {
            setManagementOpen(true);
        }

        if (pathname.startsWith("/charts")) {
            setChartsOpen(true);
        }
    }, [pathname]);


    const isActive = (path: string) => {
        return pathname === path;
    };

    const isSubActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };


    const isManagementActive = () => {
        return pathname === "/management" ||
            pathname.startsWith("/management/");
    };

    const isChartsActive = () => {
        return pathname === "/charts" ||
            pathname.startsWith("/charts/");
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
                        LJ
                    </span>
                )}

                <span className="sidebar-text">
                    <img
                        src="/logo.png"
                        style={{ width: "180px" }}
                        alt="LNC Logo"
                    />
                </span>

            </div>


            {/* USER */}
            <div className="sidebar-user">

                <div className="user-avatar">
                    {/* {session?.user?.name?.charAt(0) || "A"} */}
                    {session?.user?.image ? (
                        <img
                            className="user-avatar"
                            src={session.user.image}
                            alt="Profile"
                        />
                    ) : (
                        <span>
                            {session?.user?.name?.charAt(0) || "A"}
                        </span>
                    )}
                </div>

                <div className="sidebar-text">

                    <div style={{ fontWeight: 600 }}>
                        {session?.user?.name || "Admin"}
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

                            {/* CLASSES */}
                            <Link
                                href="/management/members"
                                className={`submenu-item ${
                                    isSubActive("/management/members")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    🏫
                                </span>

                                Members

                            </Link>

                            <Link
                                href="/management/membership"
                                className={`submenu-item ${
                                    isSubActive("/management/membership")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    🏫
                                </span>

                                Membership

                            </Link>

                            <Link
                                href="/management/add-ons"
                                className={`submenu-item ${
                                    isSubActive("/management/add-ons")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    🏫
                                </span>

                                Add-ons

                            </Link>
                        </div>

                    )}

                </div>
                


                {/* Chart Management */}
                {/* <div>

                    <div
                        className={`menu-item ${
                            isChartsActive()
                                ? "active"
                                : ""
                        }`}
                        onClick={() => {

                            if (!open) {
                                return;
                            }

                            setChartsOpen(
                                !chartsOpen
                            );

                        }}
                    >

                        <span className="menu-icon">
                            🗂️
                        </span>

                        <span className="sidebar-text">
                            Chart Management
                        </span>

                        {open && (
                            <span
                                className={`dropdown-arrow ${
                                    chartsOpen
                                        ? "rotate"
                                        : ""
                                }`}
                            >
                                ▾
                            </span>
                        )}

                    </div>


                   
                    {open && chartsOpen && (

                        <div className="submenu">

                            
                            <Link
                                href="/charts/upper"
                                className={`submenu-item ${
                                    isSubActive("/charts/upper")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    👨‍🎓
                                </span>

                                Upper

                            </Link>

                            <Link
                                href="/charts/middle"
                                className={`submenu-item ${
                                    isSubActive("/charts/middle")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    👨‍🎓
                                </span>

                                Middle

                            </Link>

                            <Link
                                href="/charts/lower"
                                className={`submenu-item ${
                                    isSubActive("/charts/lower")
                                        ? "sub-active"
                                        : ""
                                }`}
                            >

                                <span>
                                    👨‍🎓
                                </span>

                                Lower

                            </Link>


                          
                            

                        </div>

                    )}

                </div> */}

                <Link
                    href="/pos"
                    className={`menu-item ${
                        isActive("/pos")
                            ? "active"
                            : ""
                    }`}
                >

                    <span className="menu-icon">
                        📈
                    </span>

                    <span className="sidebar-text">
                        POS
                    </span>

                </Link>

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