import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { CreditCard, Globe, LayoutDashboard, LifeBuoy, Mail, Server, Shield } from 'lucide-react';

// Define the main navigation items with nested sub-items
const mainNavItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        isActive: true,
    },
    {
        title: 'My Services',
        url: '#',
        icon: Server,
        items: [
            { title: 'Shared Hosting', url: route("services.shared-hosting")},
            { title: 'Cloud VPS', url: '#' },
            { title: 'Order New Service', url: route("services.order") },
        ],
    },
    {
        title: 'Domains',
        url: '#',
        icon: Globe,
        items: [
            { title: 'My Domains', url: route("domain.index") },
            { title: 'Register a New Domain', url: '#' },
            { title: 'Transfer Domains', url: '#' },
            { title: 'DNS Management', url: '#' },
        ],
    },
    {
        title: 'Business Email',
        url: '#',
        icon: Mail,
        items: [
            { title: 'Manage Inboxes', url: '#' },
            { title: 'Webmail Login', url: '#' },
        ],
    },
    {
        title: 'Billing',
        url: '#',
        icon: CreditCard,
        items: [
            { title: 'My Invoices', url: '#' },
            { title: 'Payment Methods', url: '#' },
            { title: 'Add Funds', url: '#' },
        ],
    },
    {
        title: 'Support',
        url: '#',
        icon: LifeBuoy,
        items: [
            { title: 'My Tickets', url: '#' },
            { title: 'Open New Ticket', url: '#' },
            { title: 'Knowledge Base', url: '#' },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* Sidebar Branding / Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" className="flex items-center gap-3">
                                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Shield className="size-5" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate text-base font-bold">Spurs Cloud</span>
                                    <span className="text-muted-foreground truncate text-xs">Client Area</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Navigation Links */}
            <SidebarContent className="mt-4 px-2">
                <div className="flex-1">
                    <NavMain items={mainNavItems} />
                </div>
            </SidebarContent>

            {/* User Profile Dropdown */}
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
