import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

const EmailVerification = (props: {
  firstName: string;
  verificationUrl: string;
}) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white mx-auto px-[40px] py-[40px] max-w-[600px]">
            {/* Header */}
            <Section className="text-center mb-[40px]">
              <Text className="text-[32px] font-bold text-black m-0 mb-[8px]">
                Verify Your Email
              </Text>
              <Text className="text-[16px] text-gray-600 m-0">
                Complete your account setup
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[40px]">
              <Text className="text-[16px] text-black mb-[16px]">
                Hello {props.firstName},
              </Text>
              <Text className="text-[16px] text-black mb-[16px] leading-[24px]">
                Thank you for signing up! To complete your account setup and
                start using our services, please verify your email address by
                clicking the button below.
              </Text>
              <Text className="text-[16px] text-black mb-[32px] leading-[24px]">
                This verification link will expire in 24 hours for security
                purposes.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center mb-[40px]">
              <Button
                href={props.verificationUrl}
                className="bg-black text-white px-[32px] py-[16px] text-[16px] font-semibold no-underline border-solid border-[2px] border-black box-border"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[40px]">
              <Text className="text-[14px] text-gray-600 mb-[8px]">
                Can&apos;t click the button? Copy and paste this link into your
                browser:
              </Text>
              <Text className="text-[14px] text-black break-all">
                {props.verificationUrl}
              </Text>
            </Section>

            <Hr className="border-gray-300 my-[32px]" />

            {/* Footer */}
            <Section>
              <Text className="text-[12px] text-gray-500 mb-[8px]">
                If you didn&apos;t create an account, you can safely ignore this
                email.
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mb-[16px]">
                This is an automated message, please do not reply to this email.
              </Text>

              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                © 2025 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mb-[4px]">
                123 Business Street, Suite 100
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                Curitiba, PR 80000-000, Brazil
              </Text>
              <Text className="text-[12px] text-gray-500 m-0">
                <a href="#" className="text-gray-500 underline">
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerification;
