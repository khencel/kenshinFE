
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa6";

import { login } from "@/services/auth.service";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const response = await login({ email, password });

      Cookies.set("access_token", response.access, {
        expires: rememberMe ? 7 : undefined,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Admin login failed:", err);

      setError(
        err?.response?.data?.detail ||
        "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.loginPage}>

      {/* Background overlay */}
      <div className={styles.overlay} />

      {/* LEFT BRANDING */}
      <section className={styles.brandSection}>

        <div className={styles.brandContent}>

          <Link href="/" className={styles.logo}>
            <img
              src="/logo.png"
              alt="Kenshin Japanese Izakaya"
            />
          </Link>

          <div className={styles.adminLabel}>
            <span />
            ADMIN PANEL
            <span />
          </div>

          <h1>
            Welcome to
            <br />
            <strong>Kenshin</strong>
          </h1>

          <p>
            Manage your restaurant operations
            <br />
            with ease and efficiency.
          </p>

        </div>

      </section>

      {/* RIGHT LOGIN SECTION */}
      <section className={styles.loginSection}>

        <div className={styles.loginCard}>

          <div className={styles.cardDecoration}>
            <span>❀</span>
          </div>

          <div className={styles.lockIcon}>
            <FaLock />
          </div>

          <div className={styles.cardHeader}>
            <h2>Admin Login</h2>
            <p>Access your admin dashboard</p>
          </div>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.inputIcon} />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className={styles.inputGroup}>
              <FaLock className={styles.inputIcon} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* ERROR */}
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            {/* OPTIONS */}
            <div className={styles.formOptions}>

              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/admin/forgot-password"
                className={styles.forgotPassword}
              >
                Forgot password?
              </Link>

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className={styles.loginButton}
              disabled={isLoading}
            >
              <span>
                {isLoading ? "SIGNING IN..." : "SIGN IN"}
              </span>

              {!isLoading && <FaArrowRight />}
            </button>

          </form>

          <div className={styles.cardFooter}>
            <span />
            <p>Authorized Personnel Only</p>
            <span />
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span />
        <p>
          © 2026 Kenshin Japanese Izakaya Restaurant. All Rights Reserved.
        </p>
        <span />
      </footer>

    </main>
  );
}
