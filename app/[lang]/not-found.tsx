import { getDictionary } from "@/lib/dictionaries";
import { Locale, LOCALES, DEFAULT_LOCALE } from "@/lib/types";
import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  try {
    // Extract language from URL pathname since not-found doesn't receive params
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || "";
    
    // Extract language from the pathname
    const pathSegments = pathname.split("/");
    const potentialLang = pathSegments[1] as Locale;
    const lang = LOCALES.includes(potentialLang) ? potentialLang : DEFAULT_LOCALE;
    
    const dict = await getDictionary(lang);

    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          {dict.error["404"].title}
        </h2>
        <p className="text-muted-foreground">{dict.error["404"].description}</p>
        <Link
          href={`/${lang}`}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {dict.error["404"].goHome}
        </Link>
      </div>
    );
  } catch (error) {
    // Fallback for any other errors - try to detect language
    try {
      const headersList = await headers();
      const pathname = headersList.get("x-pathname") || "";
      const pathSegments = pathname.split("/");
      const potentialLang = pathSegments[1] as Locale;
      const lang = LOCALES.includes(potentialLang) ? potentialLang : DEFAULT_LOCALE;
      
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {lang === 'fa' ? 'صفحه پیدا نشد' : 'Page Not Found'}
          </h2>
          <p className="text-muted-foreground">
            {lang === 'fa' 
              ? 'صفحه مورد نظر شما وجود ندارد.' 
              : "The page you're looking for doesn't exist."
            }
          </p>
          <Link
            href={`/${lang}`}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {lang === 'fa' ? 'بازگشت به خانه' : 'Go Home'}
          </Link>
        </div>
      );
    } catch {
      // Ultimate fallback
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
          <Link
            href={`/en`}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Go Home
          </Link>
        </div>
      );
    }
  }
} 