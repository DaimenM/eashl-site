import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarTrigger,
    SidebarRail
} from "@/components/ui/sidebar";
import Link from "next/link";
import {  
    TrophyIcon, 
    LogInIcon,
    HomeIcon 
} from "lucide-react";

export function AppSidebar() {
	return (
        <>
			<Sidebar className="bg-sidebar text-sidebar-foreground w-64 h-screen shadow-lg fixed top-0 left-0 z-50">
            <SidebarRail className="bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/75">
            <SidebarTrigger className="fixed left-4 top-4 z-[60] bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 shadow-lg transition-transform duration-200 ease-in-out hover:scale-105">
            </SidebarTrigger>
            </SidebarRail>
				<SidebarHeader className="p-4 bg-gradient-to-b from-blue-900 to-slate-900 text-white rounded-t-lg shadow-lg">
                    <div className="flex items-center gap-2 ">
					<h2 className="text-xl font-bold">EASHL Leagues</h2>
                    </div>
				</SidebarHeader>
				<SidebarContent className="p-4 bg-gradient-to-b from-blue-900 to-slate-900 text-white rounded-b-lg shadow-lg">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/" className="flex items-center gap-2">
									<HomeIcon className="h-5 w-5" />
									<span>Home</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/leagues" className="flex items-center gap-2">
									<TrophyIcon className="h-5 w-5" />
									<span>Leagues</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/login" className="flex items-center gap-2">
									<LogInIcon className="h-5 w-5" />
									<span>Login</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarContent>
			</Sidebar>
		</>
	);
}