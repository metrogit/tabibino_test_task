import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { UserRole, isValidRole } from "@/types/roles";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authOptions = {
  // HARDCODED IT JUS FOR VERCEL I WILL FIX IT SOON I DID NOT HAVE MUCH TIME FOR THAT SORRYYYYYY! -------
  secret: process.env.AUTH_SECRET,
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
          const baseUrl = process.env.NEXTAUTH_URL;

          // HARDCODED IT JUS FOR VERCEL I WILL FIX IT SOON I DID NOT HAVE MUCH TIME FOR THAT SORRYYYYYY! -------
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

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
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        email: token.email,
        accessToken: token.accessToken,
        role: token.role,
      };
      return session;
    },
  },
};

// Utility function to check if user has required role
export async function requireRole(requiredRole: UserRole, locale: string = 'en') {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect(`/${locale}/auth/login`);
  }
  
  if (session.user.role !== requiredRole) {
    // Redirect to appropriate page based on user's actual role
    switch (session.user.role) {
      case UserRole.ADMIN:
        redirect(`/${locale}/admin`);
      case UserRole.DOCTOR:
        redirect(`/${locale}/doctor`);
      case UserRole.CLIENT:
        redirect(`/${locale}/client`);
      default:
        redirect(`/${locale}/auth/login`);
    }
  }
  
  return session;
}

// Utility function to get current user session
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

// Utility function to check if user is authenticated
export async function requireAuth(locale: string = 'en') {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect(`/${locale}/auth/login`);
  }
  
  return session;
}
