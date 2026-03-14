"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Truck, X } from "lucide-react";
import OrderSummary from "@/components/page/checkout/OrderSummary";
import AuthModal from "@/components/modals/auth-modal";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { checkoutSchema } from "@/services/schema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import VariantConfirmationModal from "@/components/page/checkout/VariantConfirmationModal";

import { useOrderPlace } from "@/hooks/api/useOrder";
import { DynamicIcon } from "lucide-react/dynamic";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useShipping } from "@/lib/api/get-shipping";
import { CheckoutPayload, ShippingType } from "@/types";
import { useCart } from "@/hooks/useCart";
import { AxiosError } from "axios";
import { currency } from "@/services/helper";
import { toast } from "react-toastify";
import { addPhoneNumber, login } from "@/features/authSlice";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // States for Variant Confirmation
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [orderPayload, setOrderPayload] = useState<CheckoutPayload | null>(
    null,
  );
  const [orderError, setOrderError] = useState<string>("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(0);

  // hooks
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items, cartTotal } = useCart();
  const { data: shipping } = useShipping();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // default delivery hooks
  const defaultDeliveryMethod = useMemo(() => {
    if (!shipping || shipping.length === 0) return 0;

    const dhaka = shipping.find((s: ShippingType) =>
      s.city_name.toLowerCase().includes("dhaka"),
    );

    const shippingid = dhaka ? dhaka.id : shipping[0].id;

    setSelectedDeliveryMethod(shippingid);
    return shippingid;
  }, [shipping]);

  useEffect(() => {
    setSelectedDeliveryMethod(selectedDeliveryMethod);
  }, [selectedDeliveryMethod]);

  // calculate shipping cost
  const shippingCost = useMemo(() => {
    if (!shipping || shipping.length === 0) return 0;

    const selected = shipping.find(
      (s: ShippingType) => s.id === selectedDeliveryMethod,
    );

    if (!selected) return 0;

    return selected.is_free ? 0 : selected.charge;
  }, [shipping, selectedDeliveryMethod]);

  const initialValues: CheckoutPayload = isAuthenticated
    ? {
        user_id: user?.id,
        phone: user?.phone!,
        delivery_address: "",
        payment_type: "1",
        delivery_method: defaultDeliveryMethod,
      }
    : {
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        phone: "",
        delivery_address: "",
        payment_type: "1",
        delivery_method: defaultDeliveryMethod,
      };

  // hooks
  const { mutateAsync, isPending } = useOrderPlace();

  // submit form after check confirmation
  const handleFinalOrder = () => {
    if (!orderPayload) return;
    setOrderError("");

    if (isAuthenticated && !user?.phone) {
      dispatch(addPhoneNumber(orderPayload.phone));
    }
    // Map cart items to only what backend needs
    if (items.length === 0) return;
    const products = items.map((item) => ({
      product_id: item.product_id,
      variant_id: item.variant_id!,
      quantity: item.quantity,
    }));

    // calculate order total
    const orderTotal = cartTotal + shippingCost;

    mutateAsync(
      {
        ...orderPayload,
        order_total: orderTotal,
        products,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            const { auth_response, payment_url, token } = res.data;

            // show order success message
            toast.success(res.message);

            // auth configuration
            if (auth_response) {
              if (auth_response.type === "login") {
                dispatch(
                  login({
                    user: auth_response.data.user,
                    token: auth_response.data.token,
                    addresses: auth_response.data.user.addresses,
                  }),
                );
              }
            }

            // redirect to paymentgateway
            if (payment_url) {
              window.location.href = payment_url;
            }

            if (token) {
              router.push("/order-success?token=" + token);
            }
          } else {
            toast.error(res.message);
          }
        },
        onError: (err) => {
          const error = err as AxiosError<{ message: string }>;
          if (
            error.response?.status === 500 ||
            error.response?.status === 401 ||
            error.response?.status === 422
          ) {
            setOrderError(error.response.data?.message);
          }

          if (error.response?.status === 400) {
            setOrderError(error.response.data?.message);
          }
        },
      },
    );
    setIsConfirmModalOpen(false);
  };

  // handle form submit for user information
  const handleSubmit = (values: CheckoutPayload) => {
    setOrderPayload(values);
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="bg-background">
      {/* 🔐 Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-card rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 cursor-pointer hover:text-red-500">
              <X />
            </button>
            <AuthModal onCloseModal={() => setIsModalOpen(false)} />
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
            {!isAuthenticated && (
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

            {orderError && (
              <div className="bg-red-200 p-3 mb-2 rounded-md">
                <p className="text-red-600">{orderError}</p>
              </div>
            )}

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={checkoutSchema(isAuthenticated)}
              onSubmit={handleSubmit}>
              {({ values, setFieldValue, handleChange }) => (
                <Form className="space-y-5">
                  {!isAuthenticated && (
                    <>
                      {/* First Name */}
                      <div>
                        <label>Full Name*</label>
                        <Field
                          as={Input}
                          name="name"
                          value={values.name}
                          placeholder="Enter your name"
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
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      {/* Password */}
                      <div>
                        <label>Password *</label>
                        <Field
                          as={Input}
                          name="password"
                          type="password"
                          value={values.password}
                          placeholder="Enter your password"
                        />
                        <ErrorMessage
                          name="password"
                          component="p"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </>
                  )}

                  {/* Phone */}
                  <div>
                    <label>Phone*</label>
                    <Field
                      value={values.phone}
                      name="phone"
                      className="border rounded-md px-3 py-2 w-full"
                      placeholder="+8801*********"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("phone", e.target.value)
                      }
                    />
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label>Delivery Address*</label>
                    <Field
                      as={Textarea}
                      name="delivery_address"
                      placeholder="123 Main St"
                    />
                    <ErrorMessage
                      name="delivery_address"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {shipping && shipping.length > 0 && (
                    <div className="bg-card border rounded-lg p-6">
                      <h2 className="text-xl font-semibold mb-6">
                        Delivery Method
                      </h2>

                      <RadioGroup
                        value={values.delivery_method?.toString()}
                        onValueChange={(val) => {
                          const id = Number(val);
                          setFieldValue("delivery_method", id);
                          setSelectedDeliveryMethod(id);
                        }}
                        name="delivery_method"
                        className="">
                        {shipping?.map((ship: ShippingType, index: number) => (
                          <div
                            className="flex items-center space-x-3"
                            key={index}>
                            <RadioGroupItem
                              value={ship.id.toString()}
                              id={`ship-${ship.id}`}
                            />
                            <Label
                              htmlFor={`ship-${ship.id}`}
                              className="w-full flex items-center justify-between cursor-pointer">
                              <span>{ship.city_name}</span>
                              <span>
                                {ship.is_free == 1
                                  ? "Free Delivery"
                                  : `${currency}${ship.charge}`}
                              </span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      <ErrorMessage
                        name="delivery_method"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  )}

                  {/* Payment Method */}
                  <div className="bg-card border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-6">
                      Payment Method
                    </h2>
                    <RadioGroup
                      value={values.payment_type}
                      onValueChange={(val) =>
                        setFieldValue("payment_type", val)
                      }
                      name="payment_type">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="0" id="cash" />
                        <Label
                          htmlFor="cash"
                          className="flex items-center space-x-2 cursor-pointer">
                          <Truck className="w-4 h-4" />
                          <span>Cash On Delivery</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="1" id="online" />
                        <Label
                          htmlFor="online"
                          className="flex items-center space-x-2 cursor-pointer">
                          <CreditCard className="w-4 h-4" />
                          <span>Online Payment</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors hover:cursor-grab">
                    {isPending ? "Order Processing" : "Place Order"}

                    {isPending && (
                      <div
                        className={`flex justify-center items-center animate-spin`}>
                        <DynamicIcon
                          name="loader"
                          className={`w-4 h-4 ml-2 text-white`}
                        />
                      </div>
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>

          {/* RIGHT */}
          <OrderSummary shippingCost={shippingCost} />
        </div>
      </div>
    </div>
  );
}
