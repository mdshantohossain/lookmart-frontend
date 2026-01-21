"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Account Details</h1>
        <p className="text-slate-500">Update your profile and security settings.</p>
      </div>

      <Card className="border-slate-100">
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" className="rounded-xl" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 234 567 890" className="rounded-xl" />
          </div>

          <Button className="w-full sm:w-auto rounded-xl px-8">Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="border-slate-100">
        <CardHeader>
          <CardTitle className="text-lg">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPass">Current Password</Label>
            <Input id="currentPass" type="password" className="rounded-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPass">New Password</Label>
              <Input id="newPass" type="password" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPass">Confirm New Password</Label>
              <Input id="confirmPass" type="password" className="rounded-xl" />
            </div>
          </div>
          <Button variant="outline" className="w-full sm:w-auto rounded-xl px-8">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}