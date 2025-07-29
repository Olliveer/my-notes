import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import EmailVerification from "@/components/emails/verification-email";
import PasswordResetEmail from "@/components/emails/reset-password-reset";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      const { error } = await resend.emails.send({
        from: "My notes <onboarding@resend.dev>",
        to: [user.email],
        subject: "Reset your password",
        react: PasswordResetEmail({
          userEmail: user.email,
          resetLink: url,
          expirationTime: "24 hours",
        }),
      });

      if (error) {
        throw new Error("Failed to send verification email");
      }
    },
  },
  requireEmailVerification: true,
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const { error } = await resend.emails.send({
        from: "My notes <onboarding@resend.dev>",
        to: [user.email],
        subject: "Verify your email address",
        react: EmailVerification({
          firstName: user.name,
          verificationUrl: url,
        }),
      });

      if (error) {
        throw new Error("Failed to send verification email");
      }
    },
    sendOnSignUp: true,
  },
  plugins: [nextCookies()],
});
