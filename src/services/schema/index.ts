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
      : Yup.string().required("Password is required"),

    phone: Yup.string().required("Phone is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("Zipcode is required"),
    streetAddress: Yup.string().required("Street address is required"),
  });
};
