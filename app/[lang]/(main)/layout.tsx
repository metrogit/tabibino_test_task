import type { Metadata } from "next";
import "@/app/globals.css";
import { getDictionary, Locale, LOCALES } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";
import { generatePageMetadata } from "@/lib/seo";
import Header from "@/components/landing/header";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  
  return generatePageMetadata('hero', dictionary, lang, `/${lang}`);
}

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const isRTL = lang === "fa";

  return (
    <div
      lang={lang}
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "min-h-screen bg-background text-foreground antialiased",
      )}
    >
      <Header dict={dictionary} lang={lang} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
