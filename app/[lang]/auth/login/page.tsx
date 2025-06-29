import { LoginForm } from "@/components/login-form";
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/types";
import { headers } from "next/headers";

export default async function LoginPage({
    params
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm dict={dict.auth} />
      </div>
    </div>
  );
}
