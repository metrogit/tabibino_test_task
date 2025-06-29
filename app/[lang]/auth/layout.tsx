import type { Metadata } from "next";
import "@/app/globals.css";
import { getDictionary, Locale, LOCALES } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Tabibino - Auth",
  description: "Authentication - Your Medical Platform",
};

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const isRTL = lang === "fa";

  return (
    <div
      lang={lang}
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "min-h-screen bg-background text-foreground",
      )}
    >
      {children}
    </div>
  );
} 