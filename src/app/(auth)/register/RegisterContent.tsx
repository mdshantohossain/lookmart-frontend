import SocialAuthentication from "@/components/SocialAuthentication";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { Formik } from "formik";
import { RegisterValuesType } from "@/types";
import { registrationValidationSchema } from "@/utils/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import { registerUserMutation } from "@/hooks/api/useAuth";
import FormSubmissionSuccess from "@/components/FormSubmissionSuccess";
import { useRouter } from "next/navigation";

export default function RegisterContent({
  handleLogin,
  onPressSignUp,
  fromModal,
}: {
  handleLogin?: () => void;
  onPressSignUp: () => void;
  fromModal?: boolean;
}) {
  const [credentialError, setCredentialError] = useState<string | null>(null);
  const [registered, setRegistered] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // hooks
  const registerMutation = registerUserMutation();
  const router = useRouter();

  const handleSubmit = (
    values: RegisterValuesType,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);
    registerMutation.mutate(values, {
      onSuccess: (res) => {
        setIsSubmitting(false);
        if (res.status === "success") {
          setRegistered(true);
          resetForm();
        }
      },
      onError: (error: any) => {
        setRegistered(false);
        setIsSubmitting(false);
        if (error.status === 422) {
          setCredentialError(error.response?.data?.errors.email);
        } else {
          setCredentialError("Registration failed. Please try again.");
        }
      },
    });
  };

  // handle press on login
  const handlePressOnLogin = () => {
    if (handleLogin) {
      handleLogin();
    } else {
      return router.push("/login");
    }
  };

  const renderElement = registered ? (
    <FormSubmissionSuccess
      title="Registration Successful!"
      message="We’ve sent a password reset link to your email address. Please check
              your inbox and follow the instructions to reset your password."
      buttonTitle="Go to login"
      href={handlePressOnLogin}
    />
  ) : (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">
          Registration
        </CardTitle>
      </CardHeader>
      {fromModal && <div className="w-full py-3"></div>}
      <CardContent className="space-y-4">
        {credentialError && (
          <div className="bg-red-200 rounded-md py-2 px-4 w-full">
            <p className="text-red-600">{credentialError}</p>
          </div>
        )}
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={registrationValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    className="w-full"
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <ErrorMessage message={errors.name} />
                  )}
                </div>

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
                    <ErrorMessage message={errors.email} />
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <ErrorMessage message={errors.password} />
                  )}
                </div>
              </div>

              <Button
                type="submit"
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white mt-3"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </form>
          )}
        </Formik>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2">OR</span>
          </div>
        </div>

        <SocialAuthentication />

        <div className="text-center text-sm text-gray-600">
          {"Don't Have an Account? "}
          <span
            onClick={onPressSignUp}
            className="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </div>
      </CardContent>
    </>
  );

  return renderElement;
}
