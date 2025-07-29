import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

const PasswordResetEmail = (props: {
  userEmail: string;
  resetLink: string;
  expirationTime: string;
}) => {
  const { userEmail, resetLink, expirationTime } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password - Action required</Preview>
      <Tailwind>
        <Body className="bg-white font-sans py-[40px]">
          <Container className="mx-auto px-[20px] max-w-[580px]">
            <Section className="bg-white border border-solid border-black px-[40px] py-[40px]">
              {/* Header */}
              <Heading className="text-black text-[32px] font-bold text-center mb-[32px] mt-0">
                Password Reset Request
              </Heading>

              {/* Main Content */}
              <Text className="text-black text-[16px] leading-[24px] mb-[24px]">
                Hello,
              </Text>

              <Text className="text-black text-[16px] leading-[24px] mb-[24px]">
                We received a request to reset the password for your account
                associated with <strong>{userEmail}</strong>.
              </Text>

              <Text className="text-black text-[16px] leading-[24px] mb-[32px]">
                To reset your password, click the button below. This link will
                expire in {expirationTime} for security reasons.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={resetLink}
                  className="bg-black text-white px-[32px] py-[16px] text-[16px] font-semibold no-underline box-border border border-solid border-black"
                >
                  Reset Password
                </Button>
              </Section>

              {/* Alternative Link */}
              <Text className="text-black text-[14px] leading-[20px] mb-[24px]">
                If the button above doesn&apos;t work, copy and paste this link
                into your browser:
              </Text>

              <Text className="text-black text-[14px] leading-[20px] mb-[32px] break-all">
                <Link href={resetLink} className="text-black underline">
                  {resetLink}
                </Link>
              </Text>

              {/* Security Notice */}
              <Section className="border-t border-solid border-black pt-[24px] mb-[24px]">
                <Text className="text-black text-[14px] leading-[20px] mb-[16px]">
                  <strong>Security Notice:</strong>
                </Text>
                <Text className="text-black text-[14px] leading-[20px] mb-[8px]">
                  • If you didn&apos;t request this password reset, please
                  ignore this email
                </Text>
                <Text className="text-black text-[14px] leading-[20px] mb-[8px]">
                  • This link will expire automatically for your security
                </Text>
                <Text className="text-black text-[14px] leading-[20px] mb-[16px]">
                  • Never share this link with anyone
                </Text>
              </Section>

              <Text className="text-black text-[16px] leading-[24px] mb-[24px]">
                If you have any questions or concerns, please contact our
                support team immediately.
              </Text>

              <Text className="text-black text-[16px] leading-[24px]">
                Best regards,
                <br />
                The Security Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-[32px] text-center">
              <Text className="text-black text-[12px] leading-[16px] m-0 mb-[8px]">
                This is an automated security email. Please do not reply to this
                message.
              </Text>
              <Text className="text-black text-[12px] leading-[16px] m-0 mb-[8px]">
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
              </Text>
              <Text className="text-black text-[12px] leading-[16px] m-0">
                123 Security Street, Safe City, SC 12345 |
                <Link href="#" className="text-black underline ml-[4px]">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
