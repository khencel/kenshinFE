import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],

    callbacks: {
    async signIn({ account }) {
        if (account?.provider !== "google") {
            return true;
        }

        if (!account.id_token) {
            // console.error("❌ NO GOOGLE ID TOKEN");
            return false;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_token: account.id_token,
                    }),
                }
            );

            const data = await response.json();

            // console.log("DJANGO RESPONSE:", data);

            if (!response.ok) {
                return false;
            }

            account.djangoAccessToken = data.access;
            account.djangoRefreshToken = data.refresh;

            // console.log(
            //     "DJANGO ACCESS TOKEN:",
            //     account.djangoAccessToken
            // );

            return true;

        } catch (error) {
            // console.error("❌ FETCH ERROR:", error);
            return false;
        }
    },

    async jwt({ token, account }) {

        // console.log("JWT ACCOUNT:", account);

        if (account?.djangoAccessToken) {
            token.djangoAccessToken = account.djangoAccessToken;
        }

        if (account?.djangoRefreshToken) {
            token.djangoRefreshToken = account.djangoRefreshToken;
        }

        // console.log("JWT TOKEN:", token);

        return token;
    },

    async session({ session, token }) {

        // console.log("SESSION TOKEN:", token);

        session.djangoAccessToken =
            token.djangoAccessToken;

        session.djangoRefreshToken =
            token.djangoRefreshToken;

        // console.log("FINAL SESSION:", session);

        return session;
    },
}
});