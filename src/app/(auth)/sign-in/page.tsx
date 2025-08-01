"use client";

import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
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
import { signIn } from "@/server/auth-user";
import { Component, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await signIn({ email: data.email, password: data.password });
      toast("Sign in successful");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast(`Something went wrong ${error}`);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      const data = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
      if (data.error) {
        toast(data.error.message);
        return;
      }

      toast("Sign in successful");
    } catch (error) {
      console.log(error);
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
            <div className="text-center">
              <Link
                href="/"
                aria-label="go home"
                className="mx-auto block w-fit"
              >
                <LogoIcon />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Sign In to Tailark
              </h1>
              <p className="text-sm">Welcome back! Sign in to continue</p>
            </div>

            <div className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="pwd"
                        className="text-title text-sm"
                      >
                        Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="link intent-info variant-ghost text-sm"
                      >
                        Forgot your Password ?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && (
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </div>

            <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <hr className="border-dashed" />
              <span className="text-muted-foreground text-xs">
                Or continue With
              </span>
              <hr className="border-dashed" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGithubSignIn}
              >
                <FaGithub className="mr-2 size-4" />
                <span>Github</span>
              </Button>
              <Button
                disabled
                type="button"
                variant="outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#f1511b"
                    d="M121.666 121.666H0V0h121.666z"
                  ></path>
                  <path
                    fill="#80cc28"
                    d="M256 121.666H134.335V0H256z"
                  ></path>
                  <path
                    fill="#00adef"
                    d="M121.663 256.002H0V134.336h121.663z"
                  ></path>
                  <path
                    fill="#fbbc09"
                    d="M256 256.002H134.335V134.336H256z"
                  ></path>
                </svg>
                <span>Microsoft</span>
              </Button>
            </div>
          </div>

          <div className="p-3">
            <p className="text-accent-foreground text-center text-sm">
              Don&apos;t have an account ?
              <Button
                asChild
                variant="link"
                className="px-2"
              >
                <Link href="/sign-up">Create account</Link>
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
}
