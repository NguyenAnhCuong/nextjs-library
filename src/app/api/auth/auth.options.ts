import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { sendRequest } from "../api";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                username: credentials?.username || "",
                password: credentials?.password || "",
              }),
            }
          );

          const data = await res.json();
          console.log("Login API response:", data);

          if (res.ok && data?.data?.user) {
            return data;
          }

          return null;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider !== "credentials") {
        // const res = await sendRequest<IBackendRes<JWT>>({
        //   url: `${process.env.DB_HOST}/auth/social-media`,
        //   method: "POST",
        //   body: {
        //     username: user?.email,
        //     type: account?.provider?.toLocaleUpperCase(),
        //   },
        // });
        // if (res.data) {
        //   token.access_token = res.data?.access_token;
        //   token.refresh_token = res.data?.refresh_token;
        //   token.user = res.data?.user;
        // }
      }
      if (trigger === "signIn" && account?.provider === "credentials") {
        console.log(user);

        //@ts-ignore
        token.access_token = user.data.access_token;

        //@ts-ignore
        token.refresh_token = user.data.refreshToken;
        //@ts-ignore
        token.user = user.data.user;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.user = token.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
