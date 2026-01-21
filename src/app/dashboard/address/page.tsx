"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Home, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorMessage, Formik } from "formik";
import { AddressType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { addressValidationSchema } from "@/utils/validationSchema";
import {
  useDeleteAddress,
  useSaveAddressMutaion,
  useUpdateAddressMutaion,
} from "@/hooks/api/useAddress";
import { toast } from "react-toastify";
import { addAddress, filterAddress } from "@/features/authSlice";

export default function AddressPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<AddressType | null>(
    null,
  );

  // initial state
  const initialState: Omit<AddressType, "user_id" | "id"> = {
    type: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    zipcode: "",
    is_default: false,
  };

  // hooks
  const { user, addresses } = useAppSelector((state) => state.auth);

  const saveAddressMutation = useSaveAddressMutaion();
  const deleteMutation = useDeleteAddress();
  const updateMutation = useUpdateAddressMutaion();
  const dispatch = useAppDispatch();

  const handleOpenForm = (open: boolean) => {
    setIsFormOpen(open);
    setCurrentAddress(null);
  };

  const handleEdit = (addr: AddressType) => {
    setCurrentAddress(addr);
    setIsFormOpen(true);
  };

  // handle cancel form
  const handleCancel = () => {
    setCurrentAddress(null);
    setIsFormOpen(false);
  };

  const handleDeleteClick = (addr: AddressType) => {
    setCurrentAddress(addr);
    setIsDeleteOpen(true);
  };

  // confirmation delete
  const confirmDelete = () => {
    deleteMutation.mutateAsync(currentAddress!.id, {
      onSuccess: (res) => {
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          dispatch(filterAddress(currentAddress!.id));
          setIsDeleteOpen(false);
          setCurrentAddress(null);
        }
      },
      onError: (err) => {
        console.error(err);
        toast.error(err.message);
      },
    });
  };

  const handleAddOrUpdateAddress = (
    values: AddressType,
    { resetForm }: { resetForm: () => void },
  ) => {
    if (currentAddress?.id) {
      updateMutation.mutateAsync(values, {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message);
            dispatch(addAddress(res.data));
            setIsFormOpen(false);
            setCurrentAddress(null);
          }
        },
        onError: (err: Error) => {
          toast.error(err.message);
        },
      });

      return;
    }

    saveAddressMutation.mutateAsync(
      { ...values, user_id: user?.id! },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message);
            dispatch(addAddress(res.data));
            setIsFormOpen(false);
            resetForm();
          }
        },
        onError: (err: Error) => {
          console.error(err);
          toast.error(err.message);
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Addresses</h1>
          <p className="text-slate-500">
            Manage your shipping and billing locations.
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="rounded-xl hover:cursor-pointer">
          <Plus className="mr-2 h-4 w-4" /> Add New Address
        </Button>
      </div>

      {/* Address Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {addresses?.map((addr) => (
          <Card
            key={addr.id}
            className={`group relative overflow-hidden border-2 transition-all hover:shadow-md ${addr.is_default ? "border-primary/20 bg-primary/5" : "border-slate-100"}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg shadow-sm">
                  {addr.type === "Home" ? (
                    <Home className="h-4 w-4" />
                  ) : (
                    <Briefcase className="h-4 w-4 text-primary" />
                  )}
                </div>
                <Badge variant={addr.is_default ? "secondary" : "outline"}>
                  {addr.type}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-background hover:cursor-pointer"
                  onClick={() => handleEdit(addr)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-background hover:cursor-pointer"
                  onClick={() => handleDeleteClick(addr)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <h3 className="font-bold">{addr.type}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {addr.street_address}, {addr.city}, {addr.state} {addr.zipcode}
              </p>
              <p className="text-sm font-medium pt-2 flex items-center gap-2">
                <span className="text-slate-400 font-normal">Phone:</span>{" "}
                {addr.phone}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- ADD / EDIT DIALOG --- */}
      <Dialog open={isFormOpen} onOpenChange={handleOpenForm}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentAddress?.id ? "Edit Address" : "Add New Address"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below to save your address.
            </DialogDescription>
          </DialogHeader>

          <Formik
            enableReinitialize
            initialValues={(currentAddress as AddressType) ?? initialState}
            validationSchema={addressValidationSchema}
            onSubmit={handleAddOrUpdateAddress}>
            {({
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Type</Label>
                      <Input
                        placeholder="John Doe"
                        className="rounded-xl"
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="type"
                      />
                      <ErrorMessage
                        name="type"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="+880..."
                        className="rounded-xl"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="phone"
                      />
                      <ErrorMessage
                        name="phone"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label>Street Address</Label>
                    <Input
                      placeholder="123 Main St"
                      className="rounded-xl"
                      value={values.street_address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="street_address"
                    />
                    <ErrorMessage
                      name="street_address"
                      component="p"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label>City</Label>
                      <Input
                        className="rounded-xl"
                        placeholder="London, Barcelona etc."
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="city"
                      />
                      <ErrorMessage
                        name="city"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>State</Label>
                      <Input
                        className="rounded-xl"
                        placeholder="Fl, NY, etc."
                        value={values.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="state"
                      />

                      <ErrorMessage
                        name="state"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Zip Code</Label>
                      <Input
                        className="rounded-xl"
                        value={values.zipcode}
                        placeholder="13245"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="zipcode"
                      />

                      <ErrorMessage
                        name="zipcode"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="default"
                      checked={values.is_default}
                      onCheckedChange={(checked) =>
                        setFieldValue("is_default", checked === true)
                      }
                      onBlur={handleBlur}
                      name="is_default"
                    />
                    <label
                      htmlFor="default"
                      className="text-sm font-medium leading-none cursor-pointer">
                      Set as default address
                    </label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-xl px-8 bg-red-500">
                    {currentAddress?.id ? "Update Address" : "Add Address"}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* --- DELETE CONFIRMATION --- */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Address?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              <strong>{currentAddress?.type}'s</strong> address from your
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90 rounded-xl">
              Delete Address
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
