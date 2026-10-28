"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="feng-navbar navbar navbar-expand-lg">
      <div className="container-fluid px-4 px-lg-5">

        {/* LOGO */}
        <Link href="/" className="feng-brand">
          <div className="feng-logo">
            <span>◈</span>
          </div>

          <div className="feng-brand-text">
            <div className="feng-title">FENG SHUI</div>
            <div className="feng-tagline">
              HARMONY · BALANCE · PROSPERITY
            </div>
          </div>
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler feng-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#fengNavbar"
          aria-controls="fengNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div
          className="collapse navbar-collapse"
          id="fengNavbar"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link href="/" className="feng-nav-link active">
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/about" className="feng-nav-link">
                ABOUT US
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/services" className="feng-nav-link">
                DATA PRIVACY
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/insights" className="feng-nav-link">
                COPYRIGHT NOTICE
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/login" className="feng-nav-link">
                SIGN IN
              </Link>
            </li>

            <li className="nav-item ms-lg-4">
              <Link
                href="/sign-up"
                className="feng-consultation-btn"
              >
                SIGN UP NOW
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}