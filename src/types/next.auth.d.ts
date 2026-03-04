import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    user: any;
  }

  interface User {
    data: {
      access_token: string;
      refreshToken: string;
      user: any;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    user?: any;
  }
}
