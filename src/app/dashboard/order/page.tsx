"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Package, Calendar, CreditCard, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useOrders } from "@/services/api/order.api";
import { OrderedType } from "@/types";
import { currency } from "@/services/helper";
import { formatDate } from "@/utils/helper";

// Mock Data
// const orders = [
//   {
//     id: "#1234",
//     date: "March 15, 2020",
//     status: "Processing",
//     total: "$78.00",
//     itemCount: 1,
//     statusColor: "bg-yellow-100 text-yellow-800",
//     items: [
//       {
//         name: "Premium Wireless Headphones",
//         price: "$70.00",
//         qty: 1,
//         image:
//           "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
//       },
//     ],
//     shipping: "$8.00",
//     address: "123 Business Ave, Silicon Valley, CA 94025",
//     paymentMethod: "Visa ending in 4242",
//   },
//   {
//     id: "#3421",
//     date: "August 12, 2020",
//     status: "Shipped",
//     total: "$156.00",
//     itemCount: 2,
//     statusColor: "bg-blue-100 text-blue-800",
//     items: [
//       {
//         name: "Ergonomic Mouse",
//         price: "$50.00",
//         qty: 1,
//         image:
//           "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
//       },
//       {
//         name: "Large Mousepad",
//         price: "$100.00",
//         qty: 1,
//         image:
//           "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&h=100&fit=crop",
//       },
//     ],
//     shipping: "$6.00",
//     address: "456 Corporate Towers, New York, NY 10001",
//     paymentMethod: "Apple Pay",
//   },
// ];

const statusConfig: { [key: number]: { label: string; className: string } } = {
  0: { label: "Pending", className: "bg-yellow-100 text-yellow-600" },
  1: { label: "Processing", className: "bg-blue-100 text-blue-600" },
  2: { label: "Delivered", className: "bg-green-100 text-green-600" },
  3: { label: "Canceled", className: "bg-red-100 text-red-600" },
};

const orderStatus = (status: number) => {
  const config = statusConfig[status];

  if (!config) {
    return <span className="text-gray-500">Unknown</span>;
  }

  return (
    <Badge className={`px-2 py-1 rounded text-xs ${config.className}`}>
      {config.label}
    </Badge>
  );
};

export default function OrderPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderedType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: orders } = useOrders();

  const handleViewDetails = (order: OrderedType) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1 px-2 md:px-0">
        <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
        <p className="text-slate-500 text-sm">
          View and track your previous orders.
        </p>
      </div>

      <Card className="border-slate-100 shadow-sm overflow-hidden rounded-2xl">
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-6 font-semibold">Date</th>
                  <th className="text-left py-4 px-6 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 font-semibold">Total</th>
                  <th className="text-right py-4 px-6 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders?.map((order: OrderedType) => (
                  <tr key={order.id} className=" transition-colors group">
                    <td className="py-4 px-6 font-bold">#{order.order_number}</td>
                    <td className="py-4 px-6">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="py-4 px-6">
                      {orderStatus(order.order_status)}
                    </td>
                    <td className="py-4 px-6 font-medium">
                      {currency}
                      {order.order_total}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-xl hover:cursor-pointer transition-opacity"
                        onClick={() => handleViewDetails(order)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-slate-100">
            {orders?.map((order: OrderedType) => (
              <div
                key={order.id}
                className="p-5 flex flex-col gap-3"
                onClick={() => handleViewDetails(order)}>
                <div className="flex justify-between items-center">
                  <span className="font-bold">#{order.order_number}</span>
                  {orderStatus(order.order_status!)}
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={order.order_details[0].product.image_thumbnail}
                    alt={order.order_details[0].product.name}
                    className="h-12 w-12 rounded-lg object-cover border bg-white"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {order.order_details[0].product.name}
                    </p>

                    {order.order_details.length > 1 ? (
                      <p className="text-xs text-slate-500">
                        +{order.order_details.length - 1} more item(s)
                      </p>
                    ) : (
                      <p className="text-xs text-slate-500">1 item(s)</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-sm space-y-1">
                    <p className="text-slate-500">
                      {formatDate(order.created_at)}
                    </p>
                    <p className="font-semibold ">
                      {order.order_total} • {order.order_details.length} items
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* --- ORDER DETAIL POPUP (DIALOG) --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
          {/* Dialog Header with Background */}
          <div className="bg-slate-900 p-6 text-white">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    Order {selectedOrder?.id}
                  </DialogTitle>
                  {orderStatus(selectedOrder?.order_status!)}

                  {selectedOrder?.created_at && (
                    <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Placed on{" "}
                      {formatDate(selectedOrder?.created_at)}
                    </p>
                  )}
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {/* Products */}
            <div className="space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" /> Order Items
              </h4>
              <div className="space-y-3">
                {selectedOrder?.order_details.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-card border border-slate-100">
                    <img
                      src={item.product.image_thumbnail}
                      alt={item.product.name}
                      className="h-14 w-14 rounded-xl object-cover bg-white p-1 border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold">
                      {currency}
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* Address & Payment Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <MapPin className="h-3 w-3" /> Delivery Address
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedOrder?.delivery_address}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <CreditCard className="h-3 w-3" /> Payment Type
                </h4>
                <p>
                  {selectedOrder?.payment_type === 0
                    ? "Cash on Delivery"
                    : "Online"}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <CreditCard className="h-3 w-3" /> Payment Method
                </h4>
                <p className="text-sm text-slate-700 bg-blue-200 self-center inline rounded-lg p-2 mx-auto">
                  {selectedOrder?.payment?.bank_type || "N/A"}
                </p>
              </div>
            </div>

            {/* Price Summary Box */}
            <div className="rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>
                  {currency}
                  {(
                    selectedOrder?.order_total! -
                    (selectedOrder?.delivery_charge || 0)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Delivery Charge</span>
                <span>
                  {selectedOrder?.delivery_charge
                    ? `${currency}${selectedOrder?.delivery_charge}`
                    : "Free delivery"}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold">Total Paid</span>
                <span className="text-xl font-extrabold text-primary">
                  {currency}
                  {selectedOrder?.order_total}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button className="flex-1 rounded-xl shadow-lg shadow-primary/20">
              Track Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
