import * as Yup from "yup";

export const checkoutSchema = (isAuthenticated: boolean) => {
  return Yup.object({
    name: isAuthenticated
      ? Yup.string().optional()
      : Yup.string().min(2).required("Name is required"),

    email: isAuthenticated
      ? Yup.string().optional()
      : Yup.string().email().required("Email is required"),

    password: isAuthenticated
      ? Yup.string().optional()
      : Yup.string()
          .min(8, "Password must be at least 8 characters")
          .max(16, "Password must be at most 16 characters")
          .required("Password is required"),

    phone: Yup.string()
      .matches(/^(?:\+88|88)?01[3-9]\d{8}$/, "Phone number is not valid")
      .required("Phone is required"),
    delivery_address: Yup.string().required("Street address is required"),
    payment_type: Yup.string().required("Payment method is required"),
    delivery_method: Yup.number().required("Delivery method is required"),
  });
};
