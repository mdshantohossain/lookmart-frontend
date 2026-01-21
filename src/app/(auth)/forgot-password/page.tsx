"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { forgotPasswordMutation } from "@/hooks/api/useAuth";
import FormSubmissionSuccess from "@/components/FormSubmissionSuccess";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [successResponse, setSuccessResponse] = useState<{
    status: string;
    title: string;
    message: string;
  }>({ status: "", title: "", message: "" });
  const [credentialError, setCredentialError] = useState<string | undefined>(
    undefined
  );

  // hooks
  const forgotMutation = forgotPasswordMutation();
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // handle click to go
  const handleClickToGo = () => {
    router.back();
  };

  const handleSubmit = async (
    values: { email: string },
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(true);
    setCredentialError(undefined);
    await forgotMutation.mutateAsync(values, {
      onSuccess: (res) => {
        setSuccessResponse((prevState) => ({
          ...prevState,
          status: "success",
          title: "Resent Password Link Sent!",
          message:
            res.message ||
            "A new verification email has been sent to your inbox. Please check your email.",
        }));

        resetForm();
      },
      onError: (error) => {
        setSubmitting(false);
        const axiosError = error as AxiosError<{ message?: string }>;
        if (
          axiosError.response?.status === 500 ||
          axiosError.response?.status === 404
        ) {
          setCredentialError(axiosError.response?.data?.message);
        }

        if (axiosError.response?.status === 409) {
          setCredentialError(axiosError.response?.data?.message);
        }
      },
    });
  };

  const renderElement =
    successResponse.status === "success" ? (
      <FormSubmissionSuccess
        title={successResponse.title}
        message={successResponse.message}
        buttonTitle="Go Back"
        href={handleClickToGo}
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
            initialValues={{ email: "" } as { email: string }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500">{errors.email}</div>
                  )}
                </div>

                <div className="flex justify-end  mt-3">
                  <Button
                    type="submit"
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {isSubmitting ? "Sending..." : "Send link"}
                  </Button>
                </div>
              </form>
            )}
          </Formik>

          <div className="text-center text-sm text-gray-600">
            {"Login with password? "}
            <span
              onClick={handleClickToGo}
              className="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
            >
              Go back
            </span>
          </div>
        </CardContent>
      </>
    );

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">{renderElement}</Card>
    </div>
  );
}
