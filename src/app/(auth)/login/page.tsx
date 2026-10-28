"use client";

import { useState } from "react";
import { login } from "@/services/auth.service";
import { signIn } from "next-auth/react";
import styles from "./login.module.css";
import { CiLock, CiMail, CiUser, CiNoWaitingSign } from "react-icons/ci";
import { FaGoogle, FaDumbbell, FaShieldAlt, FaHeart, FaUsers } from "react-icons/fa";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleLoginForm = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await login({
                email,
                password,
            });

            Cookies.set("access_token", response.access, {
                expires: rememberMe ? 7 / 24 : undefined,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });

            console.log("Login successful:", response.user);

            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await signIn("google", {
            callbackUrl: "/dashboard",
        });
    };

    return (
        <main className={styles.loginPage}>

            {/* Background Overlay */}
            <div className={styles.overlay}></div>

            <div className={styles.pageContent}>

                {/* ================= HEADER / LOGO ================= */}
                <header className={styles.logo}>
                    <Link href="/" className={styles.logoLink}>

                        <div className={styles.logoMark}>
                            <img src="/Metallic LJ Fitness Gym Logo (1).png" style={{width:"120px"}} alt="" />
                        </div>

                        {/* <div className={styles.logoText}>
                            <div className={styles.logoTitle}>
                                FITNESS GYM
                            </div>
                        </div> */}

                    </Link>
                </header>


                {/* ================= LOGIN CONTENT ================= */}
                <section className={styles.loginSection}>

                    <div className={styles.loginContent}>

                        <div className={styles.welcome}>
                            WELCOME BACK
                        </div>

                        <h1>
                            LOG IN TO YOUR
                            <br />
                            <span>FITNESS JOURNEY</span>
                        </h1>

                        <p className={styles.description}>
                            Track your progress, manage your training,
                            <br />
                            and stay connected with your fitness goals.
                        </p>


                        {/* ================= FORM ================= */}
                        <form onSubmit={handleLoginForm}>

                            {/* EMAIL */}
                            <div className={styles.inputBox}>
                                <CiMail className={styles.inputIcon} />

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
                            <div className={styles.inputBox}>
                                <CiLock className={styles.inputIcon} />

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
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <CiNoWaitingSign />
                                    ) : (
                                        <CiNoWaitingSign />
                                    )}
                                </button>
                            </div>


                            {/* REMEMBER / FORGOT */}
                            <div className={styles.formOptions}>

                                <label className={styles.remember}>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(e.target.checked)
                                        }
                                    />

                                    <span className={styles.checkmark}></span>

                                    <span>
                                        Remember me
                                    </span>
                                </label>

                                <Link
                                    href="/forgot-password"
                                    className={styles.forgotPassword}
                                >
                                    Forgot password?
                                </Link>

                            </div>


                            {/* LOGIN BUTTON */}
                            <button
                                type="submit"
                                className={styles.loginButton}
                                disabled={isLoading}
                            >
                                <span>
                                    {isLoading ? "LOGGING IN..." : "LOG IN"}
                                </span>

                                {!isLoading && (
                                    <span className={styles.arrow}>
                                        →
                                    </span>
                                )}
                            </button>

                        </form>


                        {/* ================= OR ================= */}
                        <div className={styles.divider}>
                            <span></span>
                            <label>OR</label>
                            <span></span>
                        </div>


                        {/* ================= GOOGLE ================= */}
                        {/* <button
                            type="button"
                            className={styles.googleButton}
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle className={styles.googleIcon} />

                            <span>
                                Continue with Google
                            </span>
                        </button> */}


                        {/* ================= SIGN UP ================= */}
                        <div className={styles.signup}>
                            <span>
                                Don’t have an account?
                            </span>

                            <Link href="/sign-up">
                                Sign up
                            </Link>
                        </div>

                    </div>

                </section>


                {/* ================= FEATURES ================= */}
                <section className={styles.features}>

                    <div className={styles.feature}>

                        <FaDumbbell />

                        <div>
                            CERTIFIED
                            <br />
                            TRAINERS
                        </div>

                    </div>


                    <div className={styles.feature}>

                        <FaShieldAlt />

                        <div>
                            SAFE &
                            <br />
                            SUPPORTIVE
                            <br />
                            ENVIRONMENT
                        </div>

                    </div>


                    <div className={styles.feature}>

                        <FaHeart />

                        <div>
                            PERSONALIZED
                            <br />
                            PROGRAMS
                        </div>

                    </div>


                    <div className={styles.feature}>

                        <FaUsers />

                        <div>
                            REAL
                            <br />
                            RESULTS
                        </div>

                    </div>

                </section>


                {/* ================= FOOTER ================= */}
                <footer className={styles.footer}>

                    <div>

                        <div className={styles.footerLogo}>
                            <span>LJ</span>
                            FITNESS GYM
                        </div>

                        <div className={styles.footerTagline}>
                            Train. Sweat. Transform.
                        </div>

                    </div>

                    <div className={styles.copyright}>
                        © 2025 LJ FITNESS GYM. All Rights Reserved.
                    </div>

                </footer>

            </div>

        </main>
    );
}