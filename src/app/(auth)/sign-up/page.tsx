"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {login} from "@/services/auth.service";
import styles from "@/app/(auth)/login/login.module.css"
import { CiLock } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import SocMedLogin from "../login/SocMedLogin";
import { FaEnvelope, FaUserAlt, FaTransgender, FaBirthdayCake    } from "react-icons/fa";


export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await login({
                email,
                password
            })

            console.log("Login successful:", response.user);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <section className="home-hero">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-5">
                            <div className="mt-4 mb-4">
                                <div className="row">
                                    <div className="col text-center mb-4">
                                        
                                        <Link href={"/"} style={{
                                            textDecoration:"none"
                                        }}>
                                        <div className={styles.loginTop}>
                                            <div className="feng-logo m-auto">
                                                <span>◈</span>
                                            </div>

                                            <div className="feng-brand-text">
                                                <div className="feng-title">FENG SHUI</div>
                                                <div className="feng-tagline">
                                                HARMONY · BALANCE · PROSPERITY
                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                        
                                    </div>
                                </div>
                                <div className={`row p-4 ${styles.logincontainer}`}>
                                    <div className="col">
                                        <div className="row mb-3">
                                            <div className="col text-center">
                                        
                                                <span className={styles.loginYellow}>CREATE YOUR ACCOUNT</span>
                                                 <br />
                                                 <span style={{color:"white"}}><small>Begin your journey to better energy, <br /> balance and a more prosperous life.</small></span>
                                            </div>
                                        </div>
                                        <form onSubmit={handleLoginForm}>
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><FaUserAlt /></span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="First Name" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <br />
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><FaUserAlt /></span>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    placeholder="Last Name" 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <br />
                                            <div className="row ">
                                                <div className="col-md-6">
                                                    <div className={styles.inputBox}>
                                                        <span className={styles.inputIcon}><FaTransgender  /></span>
                                                
                                                        <select className="form-control" >
                                                            <option value="" hidden >Selelect Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={styles.inputBox}>
                                                        <span className={styles.inputIcon}><FaBirthdayCake  /></span>
                                                        <input 
                                                            type="date" 
                                                            className="form-control" 
                                                            placeholder="Confirm Password" 
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            disabled={isLoading}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><FaEnvelope /></span>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    placeholder="Email Address" 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <br />
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><CiLock /></span>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    placeholder="Password" 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <br />
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><CiLock /></span>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    placeholder="Confirm Password" 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            
                                            <br />

                                            <SocMedLogin />
                                        </form>
                                        <div className="row mt-3">
                                            <div className="col position-relative">
                                                <hr style={{
                                                    width:"100%",
                                                    background:"white",
                                                    height:"3px"
                                                }} />
                                                <div style={{
                                                    color:"white",
                                                    background:"rgba(0, 29, 8, 0.9)",
                                                    width:"10%",
                                                    position:"absolute",
                                                    top:"20%",
                                                    textAlign:"center",
                                                    left:"45%"
                                                }}>
                                                    <span>OR</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col">
                                                <Link href={"/login"} style={{textDecoration:"none"}}>
                                                <button className={styles.googleButton} style={{
                                                    borderColor:"#F0D071",
                                                    color:"#F0D071"
                                                }}>
                                                    <span className={`${styles.googleIcon}`}><FaUser /></span>
                                                    <span>SIGN IN</span>
                                                </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            
        </main>
    );
}