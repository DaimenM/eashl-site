import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { AuthProvider } from "@/lib/providers/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EASHL Leagues",
  description: "Track and manage your NHL 25 EASHL league statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <div className="flex h-full">
          <AuthProvider>
          <SidebarProvider defaultOpen>
            <AppSidebar />
            <SidebarTrigger/>
            <div className="flex-1 flex flex-col min-h-screen">
              {children}
            </div>
          </SidebarProvider>
          </AuthProvider>
          
        </div>
      </body>
    </html>
  );
}
