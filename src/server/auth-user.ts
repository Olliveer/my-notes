"use server";

import { auth } from "@/lib/auth";

interface SignInProps {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInProps) {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: false,
    });

    return response;
  } catch (error) {
    console.log("signIn error", error);
    return error;
  }
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export async function signUp({ name, email, password }: SignUpProps) {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: false,
    });

    return response;
  } catch (error) {
    console.log("signUp error", error);
    return error;
  }
}
