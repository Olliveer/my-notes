"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { LogoIcon } from "@/components/logo";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email(),
});

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await authClient.forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      });
      toast("Check your email for reset link");
    } catch (error) {
      console.log(error);
      toast(`Something went wrong ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
            <div>
              <Link href="/" aria-label="go home">
                <LogoIcon />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Recover Password
              </h1>
              <p className="text-sm">
                Enter your email to receive a reset link
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send Reset Link
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                We&apos;ll send you a link to reset your password.
              </p>
            </div>
          </div>

          <div className="p-3">
            <p className="text-accent-foreground text-center text-sm">
              Remembered your password?
              <Button asChild variant="link" className="px-2">
                <Link href="/sign-in">Log in</Link>
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
}
