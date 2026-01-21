"use client";
import ErrorMessage from "@/components/ErrorMessage";
import FormSubmissionSuccess from "@/components/FormSubmissionSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { resetPasswordMutation } from "@/hooks/api/useAuth";
import { resetPasswordValidation } from "@/utils/validationSchema";
import { AxiosError } from "axios";
import { Formik } from "formik";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type PasswordResetType = {
  token: string;
  password: string;
  confirm_password: string;
};

export default function ResetPasswordPage() {
  const [credentialError, setCredentialError] = useState<string | null>(null);
  const [contentState, setContentState] = useState<{
    status: string;
    message: string;
  }>({ status: "", message: "" });
  const { status, message } = contentState;

  // hooks
  const token = useSearchParams().get("token");
  const resetMutation = resetPasswordMutation();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setContentState({
        status: "error",
        message: "Reset password failed. Please try again.",
      });
    }
  }, [token]);

  const handleSubmit = (
    values: PasswordResetType,
    { resetForm }: { resetForm: () => void }
  ) => {
    resetMutation.mutateAsync(values, {
      onSuccess: (res) => {
        if (res.success === true) {
          setContentState({ status: "success", message: res.message });
          resetForm();
        }
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message?: string }>;
        if (axiosError.status === 422) {
          setContentState({
            status: "error",
            message:
              axiosError.response?.data?.message ||
              "Reset password failed. Please try again.",
          });
        }

        if (axiosError.status === 400) {
          setContentState({
            status: "error",
            message:
              axiosError.response?.data?.message ||
              "Reset password failed. Please try again.",
          });
        } else {
          setCredentialError("Reset password failed. Please try again.");
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        {status === "success" ? (
          <FormSubmissionSuccess
            title={"Password Reset Successfully!"}
            message={message}
            buttonTitle="Go to login"
            href={() => router.push("/login")}
          />
        ) : status === "error" ? (
          <FormSubmissionSuccess
            icon="circle-x"
            title={"Password Reset Failed!"}
            message={message}
          />
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Reset password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {credentialError && (
                <div className="bg-red-200 rounded-md py-2 px-4 w-full">
                  <p className="text-red-600">{credentialError}</p>
                </div>
              )}
              <Formik
                initialValues={{
                  token: token || "",
                  password: "",
                  confirm_password: "",
                }}
                validationSchema={resetPasswordValidation}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  handleBlur,
                  handleChange,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <Input
                          type="password"
                          placeholder="Your Password"
                          className="w-full"
                          value={values.password}
                          onChange={handleChange("password")}
                          onBlur={handleBlur("password")}
                        />
                        {touched.password && errors.password && (
                          <ErrorMessage message={errors.password} />
                        )}
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          className="w-full"
                          value={values.confirm_password}
                          onChange={handleChange("confirm_password")}
                          onBlur={handleBlur("confirm_password")}
                        />
                        {touched.confirm_password &&
                          errors.confirm_password && (
                            <ErrorMessage message={errors.confirm_password} />
                          )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 text-white mt-3"
                      disabled={resetMutation.isPending}
                    >
                      {resetMutation.isPending
                        ? "Resetting..."
                        : "Reset Password"}
                    </Button>
                  </form>
                )}
              </Formik>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
