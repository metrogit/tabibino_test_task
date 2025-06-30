import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { UserRole, isValidRole } from "@/types/roles";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        try {
          const { email, password } = credentials;
          const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";

          const res = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (res.ok && data.token) {
            // Validate that the role from the API is a valid UserRole
            if (!isValidRole(data.user.role)) {
              throw new Error("Invalid role received from server");
            }

            return {
              id: email,
              email,
              role: data.user.role,
              accessToken: data.token,
            };
          } else {
            throw new Error(data.error || "Invalid credentials");
          }
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }:any) {
      session.user = {
        email: token.email,
        accessToken: token.accessToken,
        role: token.role,
      };
      return session;
    },
  },
};
