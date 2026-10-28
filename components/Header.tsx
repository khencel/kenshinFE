
"use client";

import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <header className="k-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container k-container k-nav-container">
          <img src="/logo.png" style={{width:"18%"}} alt="" />

          <button
            className="k-mobile-toggle d-lg-none"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>

          <div
            className={`k-nav-menu ${
              open ? "k-nav-menu-open" : ""
            }`}
          >
            <ul className="navbar-nav k-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="nav-item">
                  <a
                    href={link.href}
                    className={`k-nav-link ${
                      active === link.label ? "active" : ""
                    }`}
                    onClick={() => {
                      setActive(link.label);
                      setOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#reserve"
              className="btn-outline-kenshin k-mobile-reserve"
              onClick={() => setOpen(false)}
            >
              <User size={15} />
              Reserve a Table
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
