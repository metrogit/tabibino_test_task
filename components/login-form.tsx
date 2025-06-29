"use client"

import { useState, memo, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Eye, EyeOff } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';

interface LoginFormProps {
  dict: Dictionary['auth'];
}

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export const LoginForm = memo(({ dict }: LoginFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleFormSubmit = useCallback(async (values: FormData) => {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        let errorMessage: string;
        
        switch (result.error) {
          case "CredentialsSignin":
            errorMessage = dict.invalidCredentials || "Invalid email or password";
            break;
          case "AccessDenied":
            errorMessage = dict.accessDenied || "Access denied";
            break;
          default:
            errorMessage = dict.error || "An error occurred during login";
        }
        
        toast.error(errorMessage);
        form.setFocus("email");
        return;
      }

      toast.success(dict.loginSuccess || "Successfully logged in!");
      router.refresh();
      router.push("/" as any);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(dict.error || "An error occurred during login");
      form.setFocus("email");
    } finally {
      setIsLoading(false);
    }
  }, [dict, router, form]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {dict.title || "Login to your account"}
          </CardTitle>
          <CardDescription>
            {dict.description || "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(handleFormSubmit)} 
              className="space-y-6"
              noValidate
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">{dict.email}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        required
                        aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                        className="transition-colors focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage id="email-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel htmlFor="password">{dict.password}</FormLabel>
                      <button
                        type="button"
                        className="text-sm text-muted-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                        onClick={() => {}}
                        tabIndex={0}
                      >
                        {dict.forgotPassword || "Forgot password?"}
                      </button>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoCapitalize="none"
                          autoComplete="current-password"
                          autoCorrect="off"
                          disabled={isLoading}
                          required
                          aria-describedby={form.formState.errors.password ? "password-error" : undefined}
                          className="pr-10 transition-colors focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          onClick={togglePasswordVisibility}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          tabIndex={0}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage id="password-error" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full relative"
                  disabled={isLoading}
                  aria-describedby={isLoading ? "loading-text" : undefined}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                      <span id="loading-text" className="sr-only">
                        {dict.signingIn}
                      </span>
                      {dict.signingIn}
                    </>
                  ) : (
                    dict.submit
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
});

LoginForm.displayName = 'LoginForm';
