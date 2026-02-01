"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin, User, Clock } from "lucide-react";
import { useAppSelector } from "@/features/hooks";

export default function DashboardPage() {
    const { user, addresses } = useAppSelector(state => state.auth)

    const status = user?.status === 1 ? "Active": user?.status === 2 ? "Blocked" : "Inactive";

  const stats = [
    { title: "Total Orders", value: user?.orders_count, icon: Package, color: "text-blue-600" },
    { title: "Saved Addresses", value: addresses.length, icon: MapPin, color: "text-green-600" },
    { title: "Account Status", value: status, icon: User, color: "text-purple-600" },
  ];


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hello, {user?.name}!</h1>
        <p className="text-slate-500">Welcome back to your account dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-100">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Order #ORD-2938{i} was placed</p>
                  <p className="text-xs text-slate-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}