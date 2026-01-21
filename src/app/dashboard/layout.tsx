"use client";
import { Button } from "@/components/ui/button";
import React, { PropsWithChildren, useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  MapPin,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { toast } from "react-toastify";
import { logoutMutation } from "@/hooks/api/useAuth";
import { logout } from "@/features/authSlice";
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

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", pageUrl: "/dashboard" },
  { icon: ShoppingCart, label: "Orders", pageUrl: "/dashboard/order" },
  { icon: MapPin, label: "My Address", pageUrl: "/dashboard/address" },
  { icon: User, label: "Account Details", pageUrl: "/dashboard/account" },
  { icon: LogOut, label: "Logout" },
];

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // hooks
  const mutation = logoutMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const handleNavigation = (label: string, url?: string) => {
    if (label === "Logout") {
      setIsLogoutDialogOpen(true);
      return;
    }
    if (url) {
      setActiveItem(label);
      setSidebarOpen(false);
      router.push(url);
    }
  };

  const confirmLogout = async () => {
    try {
      const res = await mutation.mutateAsync(token!);
      if (res.success) {
        dispatch(logout());
        toast.success(res.message);
        return router.replace("/");
      }
    } catch (err) {
      toast.error("Logout failed");
    } finally {
      setIsLogoutDialogOpen(false);
    }
  };

  return (
    // 1. Centered background wrapper
    <div className="relative flex items-center justify-center p-0 md:p-6 lg:p-10 bg-background">
      {/* 2. The "Big Card" Container */}
      <div className="w-full max-w-7xl md:rounded-3xl md:shadow-2xl md:border overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar for Desktop & Mobile Overlay */}
        <aside
          className={`absolute top-0 bottom-0 bg-background inset-y-0 left-0 z-50 w-72   transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="p-6 flex justify-between items-center lg:block">
            <h2 className="text-2xl font-bold text-foreground">My Account</h2>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="mt-2 px-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;
              return (
                <Button
                  key={item.label}
                  variant={"default"}
                  className={`w-full justify-start py-6 text-base font-medium transition-all hover:cursor-pointer ${
                    isActive
                      ? "bg-red-500 text-white shadow-md scale-[1.02]"
                      : "text-slate-500 bg-card hover:bg-red-500/50"
                  }`}
                  onClick={() => handleNavigation(item.label, item.pageUrl)}>
                  <Icon className="mr-4 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-slate-50 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <span className="font-semibold text-slate-700">{activeItem}</span>
            <div className="w-10" /> {/* Spacer */}
          </header>

          {/* Breadcrumb - Desktop only */}
          <div className="hidden lg:flex px-8 pt-8 items-center space-x-2 text-sm text-slate-400">
            <span className="hover:text-primary cursor-pointer">Home</span>
            <span>/</span>
            <span className="font-medium">{activeItem}</span>
          </div>

          {/* Dynamic Content */}
          <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will need to enter your credentials again to access your
              dashboard and orders.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmLogout}
              className="bg-destructive  hover:bg-destructive/90 rounded-xl">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
