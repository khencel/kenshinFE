"use client";

import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

interface CustomToastProps {
    show: boolean;
    message: string;
    type?: "success" | "error" | "warning" | "info";
    onClose: () => void;
    duration?: number;
}

export default function CustomToast({
    show,
    message,
    type = "success",
    onClose,
    duration = 3000,
}: CustomToastProps) {

    useEffect(() => {
        if (!show) return;

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [show, duration, onClose]);

    if (!show) return null;

    const toastConfig = {
        success: {
            icon: <FaCheckCircle />,
            title: "Success",
            className: "toast-success",
        },
        error: {
            icon: <FaExclamationCircle />,
            title: "Error",
            className: "toast-error",
        },
        warning: {
            icon: <FaExclamationCircle />,
            title: "Warning",
            className: "toast-warning",
        },
        info: {
            icon: <FaInfoCircle />,
            title: "Information",
            className: "toast-info",
        },
    };

    const config = toastConfig[type];

    return (
        <div className={`custom-toast ${config.className}`}>
            <div className="toast-icon">
                {config.icon}
            </div>

            <div className="toast-content">
                <strong>{config.title}</strong>
                <span>{message}</span>
            </div>

            <button
                type="button"
                className="toast-close"
                onClick={onClose}
            >
                <FaTimes />
            </button>
        </div>
    );
}