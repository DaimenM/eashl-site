'use client';
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function Home() {
  const handleClick = () => {
    console.log('clicked');
    fetch('api/stats?clubId=PGL+Reapers')
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-bold px-2">EASHL Leagues</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/leagues">Leagues</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/login">Login</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 bg-gradient-to-b from-blue-800 to-black-500 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r text-white">
                Welcome to EASHL Leagues
              </h1>
              
              <div className="space-y-6 text-lg">
                <p className="text-blue-200">
                  Your ultimate destination for tracking and analyzing NHL 25 EASHL league statistics
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-blue-800/30 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3">Real-Time Stats</h3>
                    <p className="text-blue-100">Track player and team statistics as they happen in your league</p>
                  </div>
                  
                  <div className="bg-blue-800/30 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3">League Management</h3>
                    <p className="text-blue-100">Organize and manage your EASHL leagues with ease</p>
                  </div>
                  
                  <div className="bg-blue-800/30 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
                    <p className="text-blue-100">Dive deep into player and team performance metrics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}