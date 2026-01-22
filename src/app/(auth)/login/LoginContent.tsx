import ErrorMessage from "@/components/ErrorMessage";
import SocialAuthentication from "@/components/SocialAuthentication";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/features/authSlice";
import { useAppDispatch } from "@/features/hooks";
import { loginUserMutation } from "@/hooks/api/useAuth";
import { LoginValuesType } from "@/types";
import { loginValidationSchema } from "@/utils/validationSchema";
import { Checkbox } from "@radix-ui/react-checkbox";
import { AxiosError } from "axios";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function LoginContent({
  onPressSignUp,
  fromModal = false,
}: {
  onPressSignUp: () => void;
  fromModal?: boolean;
}) {
  const [credentialError, setCredentialError] = useState<string | undefined>(
    undefined,
  );

  // hooks
  const dispatch = useAppDispatch();
  const { mutateAsync, isPending } = loginUserMutation();
  const router = useRouter();

  const handleSubmit = (
    values: LoginValuesType,
    { resetForm }: { resetForm: () => void },
  ) => {
    mutateAsync(values, {
      onSuccess: (res) => {
        setCredentialError(undefined);
        if (res.success) {
          dispatch(
            login({
              user: res.data.user,
              token: res.data.token,
              addresses: res.data.user.addresses,
            }),
          );
          resetForm();
          toast.success(res.message);
          if (fromModal) {
          } else {
            return router.replace("/");
          }
        }
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{
          message?: string | undefined;
        }>;

        const status = axiosError.response?.status;

        status === 422 || status === 400
          ? setCredentialError(axiosError.response?.data.message)
          : setCredentialError("Login failed. Please try again.");
      },
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">
          Login
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
          initialValues={{ email: "", password: "" } as LoginValuesType}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
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

              <div className="flex items-center justify-between my-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-red-500 hover:bg-red-600 text-white">
                {isPending ? "Logging in..." : "Login"}
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
            className="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline">
            Sign up
          </span>
        </div>
      </CardContent>
    </>
  );
}
