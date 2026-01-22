"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { ErrorMessage, Form, Formik } from "formik";
import {
  updatePasswordValidationSchema,
  updateProfileValidationSchema,
} from "@/utils/validationSchema";
import {
  usePasswordUpdateMutation,
  useProfileUpdateMutation,
} from "@/hooks/api/useAuth";
import { AxiosErrorResponse, UpdatePasswordType } from "@/types";
import { toast } from "react-toastify";
import { updateProfile } from "@/features/authSlice";
import { AxiosError } from "axios";

export default function AccountPage() {
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined,
  );
  const [profileUpdateError, setProfileUpdateError] = useState<
    string | undefined
  >(undefined);

  // hooks
  const { user } = useAppSelector((state) => state.auth);
  const {
    mutateAsync: profileUpdateMutation,
    isPending: isProfileUpdatePending,
  } = useProfileUpdateMutation();
  const {
    mutateAsync: passwordUpdateMutation,
    isPending: isPasswordUpdatePending,
  } = usePasswordUpdateMutation();
  const dispatch = useAppDispatch();

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  };

  // handle password update
  const handlePasswordUpdate = async (
    values: UpdatePasswordType,
    { resetForm }: { resetForm: () => void },
  ) => {
    await passwordUpdateMutation(values, {
      onSuccess: (res) => {
        if (res.success) {
          resetForm();
          toast.success(res.message);
        }
      },
      onError: (err: Error) => {
        const error = err as AxiosError<AxiosErrorResponse>;
        if (error.response?.status === 401 || error.response?.status === 422) {
          setPasswordError(error.response?.data?.message);
        }
        toast.error(err.message);
      },
    });
  };

  // handle profile udpate
  const handleProfileUpdate = async (values: typeof initialValues) => {
    await profileUpdateMutation(
      { ...values, user_id: user!.id },
      {
        onSuccess: (res) => {
          if (res.success) {
            dispatch(updateProfile(res.data));
            toast.success(res.message);
          }
        },
        onError: (err: Error) => {
          const error = err as AxiosError<AxiosErrorResponse>;
          if (
            error.response?.status === 401 ||
            error.response?.status === 422
          ) {
            setProfileUpdateError(error.response?.data?.message);
          }
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Account Details</h1>
        <p className="text-slate-500">
          Update your profile and security settings.
        </p>
      </div>

      <Card className="border-slate-100">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>

          {profileUpdateError && (
            <div className="bg-red-200 text-red-600 text-sm py-2 px-4 rounded-lg">
              {profileUpdateError}
            </div>
          )}
        </CardHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={handleProfileUpdate}
          validationSchema={updateProfileValidationSchema}>
          {({ handleBlur, handleChange, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John"
                    className="rounded-xl"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={values.email}
                    readOnly
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 890"
                    className="rounded-xl"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl px-8 hover:cursor-pointer"
                  disabled={
                    values.name === user?.name && values.phone === user?.phone
                  }>
                  {isProfileUpdatePending ? "Updating..." : "Update"} Changes
                </Button>
              </CardContent>
            </form>
          )}
        </Formik>
      </Card>

      <Card className="border-slate-100">
        <CardHeader>
          <CardTitle className="text-lg">Change Password</CardTitle>

          {passwordError && (
            <div className="bg-red-200 text-red-600 text-sm py-2 px-4 rounded-lg">
              {passwordError}
            </div>
          )}
        </CardHeader>
        <Formik
          onSubmit={handlePasswordUpdate}
          initialValues={{
            current_password: "",
            password: "",
            confirmation_password: "",
          }}
          validationSchema={updatePasswordValidationSchema}>
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPass">Current Password</Label>
                  <Input
                    id="currentPass"
                    type="password"
                    placeholder="Current password"
                    name="current_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.current_password}
                    className="rounded-xl"
                  />
                  <ErrorMessage
                    name="current_password"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPass">New Password</Label>
                    <Input
                      id="newPass"
                      type="password"
                      placeholder="New password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className="rounded-xl"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPass">Confirm New Password</Label>
                    <Input
                      id="confirmPass"
                      type="password"
                      placeholder="Confirm password"
                      name="confirmation_password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmation_password}
                      className="rounded-xl"
                    />
                    <ErrorMessage
                      name="confirmation_password"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl px-8">
                  {isPasswordUpdatePending ? "Updating..." : "Update Password"}
                </Button>
              </CardContent>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
