"use client";

import UserInformation from "./UserInformation"
import style from "./UserDetails.module.css"
import ActiveVoucher from "./ActiveVoucher"
import { useState } from "react";
import PaymentListPage from "./PaymentList";
import VoucherListPage from "./VoucherList";



export default function UserDetails(){
    const [activeTab, setActiveTab] = useState<"payments" | "vouchers">(
        "payments"
    );

    
    const vouchers = [
        {
            id: 1,
            code: "WELCOME100",
            description: "Welcome Voucher",
            discount: "₱100",
            expiry: "2026-12-31",
            status: "Active",
        },
        {
            id: 2,
            code: "SAVE20",
            description: "20% Discount",
            discount: "20%",
            expiry: "2026-10-31",
            status: "Active",
        },
        {
            id: 3,
            code: "SUMMER500",
            description: "Summer Discount",
            discount: "₱500",
            expiry: "2026-08-31",
            status: "Expired",
        },
    ];

    return (
        <>
        <section>
            <div className="row">
                <div className="col-md-8">
                    <div className={style.userInformation}>
                        <UserInformation />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={style.userInformation}>
                        <ActiveVoucher />
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col">
                    <div className={style.userInformation}>
                        <div>
                            <ul className="nav nav-tabs" style={{fontSize:"14px"}}>

                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`nav-link ${
                                            activeTab === "payments" ? style.active : ""
                                        }`}
                                        onClick={() => setActiveTab("payments")}
                                        style={{color:"black"}}
                                    >
                                        Payment List
                                    </button>
                                </li>

                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`nav-link ${
                                            activeTab === "vouchers" ? style.active : ""
                                        }`}
                                        onClick={() => setActiveTab("vouchers")}
                                        style={{color:"black"}}
                                    >
                                        Voucher List
                                    </button>
                                </li>

                            </ul>

                            <div className="pt-3">

                                {activeTab === "payments" && (

                                    <PaymentListPage
                                    />

                                )}

                                {activeTab === "vouchers" && (
                                    <VoucherListPage 
                                        vouchers={vouchers}
                                    />
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}