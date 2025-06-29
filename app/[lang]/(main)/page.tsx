import { getDictionary, type Locale } from "@/lib/dictionaries";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@/types/roles";
import Hero from "@/components/landing/hero";
import DoctorHome from "@/components/landing/doctor-home";
import AdminHome from "@/components/landing/admin-home";
import type { Session } from "next-auth";

interface ExtendedSession extends Session {
  user: {
    email: string;
    accessToken: string;
    role: UserRole;
  };
}

export default async function HomePage({
  params,
  searchParams
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await getServerSession(authOptions) as ExtendedSession | null;

  const userRole = session?.user?.role;

  if (userRole === UserRole.DOCTOR) {
    return <DoctorHome dictionary={dict} />;
  }

  if (userRole === UserRole.ADMIN) {
    return <AdminHome dictionary={dict} />;
  }

  return <Hero dictionary={dict} />;
} 