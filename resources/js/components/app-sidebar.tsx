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
            { title: 'Cloud VPS', url: route('services.vps') },
            { title: 'Order New Service', url: route("services.order") },
        ],
    },
    {
        title: 'Domains',
        url: '#',
        icon: Globe,
        items: [
            { title: 'My Domains', url: route("domains.index") },
            { title: 'Register a New Domain', url: route("domains.register.get") },
            { title: 'Transfer Domains', url: route('domains.transfer') },
            { title: 'DNS Management', url: route('dns.index') },
        ],
    },
    {
        title: 'Business Email',
        url: '#',
        icon: Mail,
        items: [
            { title: 'Manage Inboxes', url: route('email.inboxes') },
            { title: 'Webmail Login', url: route('email.webmail') },
        ],
    },
    {
        title: 'Billing',
        url: '#',
        icon: CreditCard,
        items: [
            { title: 'My Invoices', url: route('billing.invoices') },
            { title: 'Payment Methods', url: route('billing.payment-methods') },
            { title: 'Add Funds', url: route('billing.add-funds') },
        ],
    },
    {
        title: 'Support',
        url: '#',
        icon: LifeBuoy,
        items: [
            { title: 'My Tickets', url: route('support.tickets') },
            { title: 'Open New Ticket', url: route('support.open') },
            { title: 'Knowledge Base', url: route('support.kb') },
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
