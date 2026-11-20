"use client";

import { useCallback, useEffect, useState } from "react";
import LogoutButton from "../Logout";
import { getData } from "@/lib/api/apiEndpoint";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [unread, setUnread] = useState(0);

  const loadCount = useCallback(async () => {
    try {

        const res = await getData(
            "booking/unread-count",
            1,
            100
        )
  
        if (!res) return;
        const data = await res;
        setUnread(data.count);
    } catch {}
  }, []);

  useEffect(() => {
    loadCount();

    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "NEW_BOOKING") loadCount();
    };
    navigator.serviceWorker?.addEventListener("message", onMessage);

    const id = setInterval(loadCount, 5000); // fallback

    return () => {
      navigator.serviceWorker?.removeEventListener("message", onMessage);
      clearInterval(id);
    };
  }, [loadCount]);

  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <button type="button" className="menu-button" onClick={onMenuClick}>☰</button>
        <span>Admin Panel</span>
      </div>

      <div className="navbar-right">
        <div className="notification">
          🔔
          {unread > 0 && (
            <span className="notification-badge">{unread > 99 ? "99+" : unread}</span>
          )}
        </div>
        <div><LogoutButton /></div>
      </div>
    </nav>
  );
}