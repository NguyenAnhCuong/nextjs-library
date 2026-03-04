import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    user: unknow;
  }

  interface User {
    data: {
      access_token: string;
      refreshToken: string;
      user: unknow;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    user?: unknow;
  }
}
