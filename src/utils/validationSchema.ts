import * as yup from "yup";

export const registrationValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .required("Password is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const resetPasswordValidation = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password didn't match")
    .required("Confirm Password is required"),
});

// address

export const addressValidationSchema = yup.object({
  type: yup.string().required("Type is required"),
  phone: yup.string().required("Phone number is required"),
  street_address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipcode: yup.string().required("Zip Code is required"),
  is_default: yup.boolean().nullable(),
});
