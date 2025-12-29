"use client";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { useAppSelector } from "@/features/hooks";
import BrandSectionSkeleton from "@/components/skeleton/BrandSectionSkeleton";
import AppLogo from "@/components/AppLogo";

export default function Footer() {
  const usefulLinks = [
    { title: "FAQS", href: "/faqs" },
    { title: "Privacy & Policy", href: "/privacy-policy" },
  ];

  const accountLinks = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Orders History", href: "/orders" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", color: "bg-blue-600 hover:bg-blue-700" },
    { name: "Twitter", href: "#", color: "bg-sky-500 hover:bg-sky-600" },
    { name: "Google+", href: "#", color: "bg-red-500 hover:bg-red-600" },
    { name: "YouTube", href: "#", color: "bg-red-600 hover:bg-red-700" },
    {
      name: "Instagram",
      href: "#",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  const { data: appInfo, isLoading } = useAppSelector((state) => state.app);

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      {/* Main Footer Content */}
      <div className="mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          {isLoading ? (
            <BrandSectionSkeleton />
          ) : (
            <div className="lg:col-span-1">
             <AppLogo />
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {appInfo?.description}
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {appInfo?.address}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <Link
                    href="mailto:info@sitename.com"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {appInfo?.email}
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <Link
                    href="tel:+457789789665"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {appInfo?.phone}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Useful Links
            </h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              My Account
            </h4>
            <ul className="space-y-3">
              {accountLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App & Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Social
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`w-8 h-8 rounded flex items-center justify-center text-white text-sm font-medium transition-colors ${social.color}`}
                >
                  {social.name.charAt(0)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t bg-muted/30">
        <div className="mx-auto px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All Rights Reserved by Algo Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
