import * as Yup from "yup";

export const checkoutSchema = Yup.object({
  name: Yup.string().min(2).required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  country: Yup.string().required("Country is a required field"),
  state: Yup.string().required("State is a required field"),
  city: Yup.string().required(),
  zipCode: Yup.string().required("Zipcode field is required"),
  streetAddress: Yup.string().required("Street address field is required"),
});

export type CheckoutValues = Yup.InferType<typeof checkoutSchema>;