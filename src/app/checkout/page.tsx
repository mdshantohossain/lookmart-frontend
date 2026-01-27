"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Truck, X } from "lucide-react";
import OrderSummary from "@/components/page/checkout/OrderSummary";
import AuthModal from "@/components/modals/auth-modal";
import { useAppSelector } from "@/features/hooks";
import { checkoutSchema, CheckoutValues } from "@/services/schema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import VariantConfirmationModal from "@/components/page/checkout/VariantConfirmationModal";

import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("online");
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // States for Variant Confirmation
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingValues, setPendingValues] = useState<CheckoutValues | null>(
    null
  );
  const initialValues: CheckoutValues = {
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    streetAddress: "",
  };

  // submit form after check confirmation
  const handleFinalOrder = () => {
    setIsProcessing(true);
    console.log("FINAL ORDER SUBMITTED WITH:", pendingValues);
    setIsConfirmModalOpen(false);
  };

  // handle form submit for user information
  const handleSubmit = (values: CheckoutValues) => {
    setPendingValues(values);
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* 🔐 Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-card rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 cursor-pointer hover:text-red-500">
              <X />
            </button>
            <AuthModal />
          </div>
        </div>
      )}

      {/* 📦 Variant & Quantity Confirmation Modal */}
      {isConfirmModalOpen && (
        <VariantConfirmationModal
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleFinalOrder}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}

          <div>
            {isAuthenticated && (
              <p className="text-gray-600 mb-5">
                Please{" "}
                <span
                  onClick={() => setIsModalOpen(true)}
                  className="text-red-500 font-semibold cursor-pointer">
                  login
                </span>{" "}
                to place order.
              </p>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              onSubmit={handleSubmit}>
              {({ values, setFieldValue }) => (
                <Form className="space-y-5">
                  {/* First Name */}
                  <div>
                    <label>Full Name *</label>
                    <Field
                      as={Input}
                      name="name"
                      value={values.name}
                      placeholder="John Doe"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label>Email *</label>
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      value={values.email}
                      placeholder="email@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label>Phone *</label>
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={values.phone}
                      onChange={(v) => setFieldValue("phone", v)}
                      className="border rounded-md px-3 py-2 w-full"
                      placeholder="Enter phone number"
                    />
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label>Country *</label>
                    <CountryDropdown
                      value={values.country}
                      onChange={(val) => {
                        setFieldValue("country", val);
                        setFieldValue("state", "");
                      }}
                      className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
                    />
                    <ErrorMessage
                      name="country"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label>State *</label>
                    <RegionDropdown
                      country={values.country}
                      value={values.state}
                      onChange={(val) => setFieldValue("state", val)}
                      className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
                    />
                    <ErrorMessage
                      name="state"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label>City *</label>
                    <Field
                      as={Input}
                      name="city"
                      value={values.city}
                      placeholder="New York"
                    />
                    <ErrorMessage
                      name="city"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* ZIP */}
                  <div>
                    <label>ZIP *</label>
                    <Field
                      as={Input}
                      type="number"
                      name="zipCode"
                      value={values.zipCode}
                      placeholder="12345"
                    />
                    <ErrorMessage
                      name="zipCode"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label>Street Address *</label>
                    <Field
                      as={Input}
                      name="streetAddress"
                      value={values.streetAddress}
                      placeholder="123 Main St"
                    />
                    <ErrorMessage
                      name="streetAddress"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Payment Method */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Payment</h2>
              <RadioGroup
                value={paymentMethod}
                // onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label
                    htmlFor="cash"
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Cash On Delivery</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="online" id="online" />
                  <Label
                    htmlFor="online"
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Online Payment</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors hover:cursor-grab">
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>

          {/* RIGHT */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
