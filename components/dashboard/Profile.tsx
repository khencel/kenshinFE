"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
    const { data: session } = useSession();

    if (!session) {
        return <div>Not logged in</div>;
    }

    return (
        <div>
            <h1>Welcome {session.user?.name}</h1>

            <p>{session.user?.email}</p>

            <img
                src={session.user?.image ?? ""}
                alt="Profile"
                width={50}
                height={50}
            />
        </div>
    );
}