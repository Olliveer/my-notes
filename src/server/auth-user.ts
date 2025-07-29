"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
    throw error;
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
    throw error;
  }
}

export async function signOut() {
  try {
    const response = await auth.api.signOut({
      headers: await headers(),
    });
    return response;
  } catch (error) {
    console.log("signOut error", error);
    throw error;
  }
}

export async function forgotPassword({ email }: { email: string }) {
  try {
    const response = await auth.api.forgetPassword({
      body: {
        email,
      },
      asResponse: false,
    });

    return response;
  } catch (error) {
    console.log("forgotPassword error", error);
    throw error;
  }
}
