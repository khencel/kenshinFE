
"use client";

import { useEffect, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export default function SupabaseRealtimeTest() {
    const [channel, setChannel] = useState<RealtimeChannel | null>(null);
    const [status, setStatus] = useState("Connecting...");
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const realtimeChannel = supabase.channel("test-notifications");

        realtimeChannel
            .on(
                "broadcast",
                { event: "notification" },
                ({ payload }) => {
                    console.log("Received:", payload);

                    setMessages((prev) => [
                        `${payload.message} - ${new Date().toLocaleTimeString()}`,
                        ...prev,
                    ]);
                }
            )
            .subscribe((subscriptionStatus, err) => {
                console.log("Realtime Status:", subscriptionStatus);

                if (err) {
                    console.error("Realtime Error:", err);
                }

                setStatus(subscriptionStatus);

                if (subscriptionStatus === "SUBSCRIBED") {
                    setChannel(realtimeChannel);
                }
            });

        return () => {
            setChannel(null);
            supabase.removeChannel(realtimeChannel);
        };
    }, []);

    const sendNotification = async () => {
        if (!channel) return;

        const response = await channel.send({
            type: "broadcast",
            event: "notification",
            payload: {
                message: "Hello from Supabase Realtime!",
            },
        });

        if (response !== "ok") {
            console.error("Broadcast error:", response);
        }
    };

    return (
        <div className="p-5 border rounded-lg">
            <h2 className="text-xl font-bold">
                Supabase Realtime Test
            </h2>

            <p className="my-3">
                Status: <strong>{status}</strong>
            </p>

            <button
                onClick={sendNotification}
                disabled={!channel}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                Send Test Notification
            </button>

            <div className="mt-5">
                <h3 className="font-bold">Received Messages</h3>

                {messages.length === 0 ? (
                    <p>No messages yet.</p>
                ) : (
                    messages.map((message, index) => (
                        <div key={index} className="p-3 border-b">
                            {message}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
