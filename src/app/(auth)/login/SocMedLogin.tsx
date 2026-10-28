"use client";

import { signIn } from "next-auth/react";
import styles from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SocMedLogin() {

    const handleLogin = async () => {
        await signIn("google", {
            callbackUrl: "/dashboard",
        });
    };

    return (
        <>
            <button
                onClick={handleLogin}
                type="button"
                className={styles.googleButton}
            >
                <span className={styles.googleIcon}>
                    <FcGoogle />
                </span>

                <span>CONTINUE WITH GOOGLE</span>
            </button>

            <button
                type="button"
                className={styles.googleButton}
            >
                <span className={styles.googleIcon}>
                    <FaFacebook
                        style={{ color: "#0866FF" }}
                    />
                </span>

                <span>CONTINUE WITH FACEBOOK</span>
            </button>
        </>
    );
}