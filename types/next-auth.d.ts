import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        djangoAccessToken?: string;
        djangoRefreshToken?: string;
    }

    interface Account {
        djangoAccessToken?: string;
        djangoRefreshToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        djangoAccessToken?: string;
        djangoRefreshToken?: string;
    }
}