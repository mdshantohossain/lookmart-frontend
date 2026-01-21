import FormSubmissionSuccess from "@/components/FormSubmissionSuccess";
import { Card } from "@/components/ui/card";
import { useResendVerificationEmail, useVerifyEmail } from "@/hooks/api/useAuth";
import { AxiosError } from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import React, { memo, useEffect, useMemo, useState } from "react";

type StatusType = "loading" | "success" | "error";

const  VerifyEmailContent = () => {
  const [contentState, setContentState] = useState<{
    status: StatusType | "";
    title: string;
    message: string;
  }>({ status: "", title: "", message: "" });

  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const { data: response, isLoading, isError, error } = useVerifyEmail(token!);
  const resendMutation = useResendVerificationEmail();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setContentState({
        status: "error",
        title: "Invalid Verification Link",
        message:
          "The verification link is invalid or missing. Please request a new verification email.",
      });
      return;
    }

    if (isLoading) {
      setContentState({
        status: "loading",
        title: "Verifying Your Email",
        message: "Please wait while we confirm your email address...",
      });
      return;
    }

    if (isError && error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const code = axiosError?.response?.status;

      setContentState({
        status: "error",
        title: "Email Verification Failed",
        message:
          axiosError?.response?.data?.message ||
          (code === 400
            ? "Your verification link has expired or is invalid. Please request a new one."
            : "Something went wrong while verifying your email. Please try again."),
      });
      return;
    }

    if (response && response.success) {
      setContentState({
        status: "success",
        title: "Email Verified Successfully!",
        message:
          response.message ||
          "Your email address has been verified. You can now log in to your account.",
      });
    }
  }, [isLoading, isError, response, error, token]);

  const handleSuccessClick = () => router.push("/login");

  const handleErrorClick = async () => {
    if (!token) return;

    try {
      setContentState({
        status: "loading",
        title: "Resending Verification Email",
        message: "Please wait while we send you a new verification email...",
      });

      await resendMutation.mutate(token, {
        onSuccess: (res) => {
          if (res.success) {
            setContentState({
              status: "success",
              title: "Verification Email Sent!",
              message:
                res.message ||
                "A new verification email has been sent to your inbox. Please check your email.",
            });
          }
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ message?: string }>;
          const code = axiosError?.response?.status;

          setContentState({
            status: "error",
            title: "Failed to Resend Verification Email",
            message:
              axiosError?.response?.data?.message ||
              (code === 400
                ? "Your verification link is invalid or expired. Please try again."
                : "We couldn’t resend the email. Please check your connection and try again."),
          });
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const code = axiosError?.response?.status;

      setContentState({
        status: "error",
        title: "Resend Request Failed",
        message:
          axiosError?.response?.data?.message ||
          (code === 400
            ? "Unable to resend the verification email. Please try again."
            : "An unexpected error occurred. Please refresh and try again."),
      });
    }
  };

  const renderContent =
    contentState.status === "success" ? (
      <FormSubmissionSuccess
        icon="check-circle-2"
        title={contentState.title}
        message={contentState.message}
        buttonTitle="Go to Login"
        href={handleSuccessClick}
      />
    ) : contentState.status === "error" ? (
      <FormSubmissionSuccess
        icon="circle-x"
        title={contentState.title}
        message={contentState.message}
        buttonTitle={
          resendMutation.isPending
            ? "Resending..."
            : "Resend Verification Email"
        }
        href={handleErrorClick}
      />
    ) : (
      <FormSubmissionSuccess
        icon="loader"
        title={contentState.title}
        message={contentState.message}
      />
    );

  return (
    <div className="flex items-center justify-center bg-background-50 px-4 py-10">
      <Card className="w-full max-w-md">{renderContent}</Card>
    </div>
  );
}

export default memo(VerifyEmailContent);
