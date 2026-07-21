import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Server, ExternalLink, Plus, MoreHorizontal, MoreVertical, Key, ArrowUpCircle, XCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

// Mock data to represent a user's purchased hosting plans
const myServices = [
    {
        id: 1,
        domain: 'example-business.com.ng',
        plan: 'Business Shared Hosting',
        ipAddress: '192.168.1.45',
        status: 'Active',
        billingCycle: 'Annually',
        nextDueDate: 'July 15, 2027',
        price: '₦38,400',
    },
    {
        id: 2,
        domain: 'personal-blog.com',
        plan: 'Starter Shared Hosting',
        ipAddress: '192.168.1.88',
        status: 'Suspended',
        billingCycle: 'Monthly',
        nextDueDate: 'July 01, 2026',
        price: '₦1,500',
    }
];

export default function MySharedHosting() {
    return (
        <AppLayout>
            <Head title="My Shared Hosting | Spurs Cloud" />

            <div className="flex-1 p-4 md:p-8 md:pt-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1 md:mb-2">My Shared Hosting</h2>
                        <p className="text-muted-foreground text-sm md:text-lg">
                            Manage your active hosting accounts and access control panels.
                        </p>
                    </div>

                    {/* Order New Service Button */}
                    <Button asChild size="lg" className="shrink-0 w-full sm:w-auto">
                        <Link href="/services/order">
                            <Plus className="mr-2 h-5 w-5" />
                            Order New Service
                        </Link>
                    </Button>
                </div>

                {/* Inventory Card */}
                <Card>
                    <CardHeader className="px-4 md:px-6">
                        <CardTitle>Hosting Accounts</CardTitle>
                        <CardDescription>You have {myServices.length} shared hosting service(s) on your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        {myServices.length > 0 ? (
                            <>
                                {/* --- DESKTOP VIEW (Table) --- */}
                                <div className="hidden md:block overflow-x-auto border rounded-lg">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <thead className="bg-muted/50 text-muted-foreground">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Product / Domain</th>
                                                <th className="px-6 py-4 font-medium">Pricing</th>
                                                <th className="px-6 py-4 font-medium">Next Due Date</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y border-t">
                                            {myServices.map((service) => (
                                                <tr key={`desktop-${service.id}`} className="hover:bg-muted/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-primary/10 p-2 rounded-md shrink-0">
                                                                <Server className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-foreground">{service.domain}</div>
                                                                <div className="text-xs text-muted-foreground mt-0.5">{service.plan}</div>
                                                                <div className="text-xs text-muted-foreground mt-0.5">IP: {service.ipAddress}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-foreground">{service.price}</div>
                                                        <div className="text-xs text-muted-foreground mt-0.5">{service.billingCycle}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-muted-foreground">
                                                        {service.nextDueDate}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            service.status === 'Active'
                                                                ? 'bg-green-500/10 text-green-500'
                                                                : 'bg-red-500/10 text-red-500'
                                                        }`}>
                                                            {service.status === 'Active' && (
                                                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                                                            )}
                                                            {service.status === 'Suspended' && (
                                                                <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                                                            )}
                                                            {service.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {service.status === 'Active' && (
                                                                <Button variant="outline" size="sm">
                                                                    cPanel <ExternalLink className="ml-2 h-3 w-3" />
                                                                </Button>
                                                            )}
                                                            <Button variant="secondary" size="sm" onClick={() => window.location.href = route("services.show", 2)}>
                                                                Manage
                                                            </Button>

                                                            {/* Fully Functional Desktop Dropdown */}
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="sr-only">Open menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-48">
                                                                    <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem>
                                                                        <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                                                                        Change Password
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <ArrowUpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                                                                        Upgrade/Downgrade
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950 dark:focus:text-red-400">
                                                                        <XCircle className="mr-2 h-4 w-4" />
                                                                        Request Cancellation
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* --- MOBILE VIEW (Stacked Cards) --- */}
                                <div className="md:hidden flex flex-col divide-y">
                                    {myServices.map((service) => (
                                        <div key={`mobile-${service.id}`} className="flex flex-col gap-4 p-4">

                                            {/* Mobile Header: Icon, Domain, Options */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 p-2 rounded-md shrink-0">
                                                        <Server className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-foreground break-all leading-tight">{service.domain}</div>
                                                        <div className="text-xs text-muted-foreground mt-1">{service.plan}</div>
                                                    </div>
                                                </div>

                                                {/* Fully Functional Mobile Dropdown */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -mr-2">
                                                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                                                            Change Password
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <ArrowUpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                                                            Upgrade/Downgrade
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950 dark:focus:text-red-400">
                                                            <XCircle className="mr-2 h-4 w-4" />
                                                            Request Cancellation
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                            </div>

                                            {/* Mobile Body: Grid Details */}
                                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 bg-muted/20 p-3 rounded-lg border">
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Status</div>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                            service.status === 'Active'
                                                                ? 'bg-green-500/20 text-green-600'
                                                                : 'bg-red-500/20 text-red-600'
                                                        }`}>
                                                        {service.status}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Price</div>
                                                    <div className="text-sm font-medium">{service.price} <span className="font-normal text-xs text-muted-foreground">/{service.billingCycle}</span></div>
                                                </div>
                                                <div className="col-span-2 border-t pt-3 mt-1">
                                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Next Due Date</div>
                                                    <div className="text-sm">{service.nextDueDate}</div>
                                                </div>
                                            </div>

                                            {/* Mobile Footer: Actions */}
                                            <div className="flex gap-2 pt-1">
                                                <Button variant="secondary" size="sm" className="flex-1">
                                                    Manage
                                                </Button>
                                                {service.status === 'Active' && (
                                                    <Button variant="outline" size="sm" className="flex-1">
                                                        cPanel <ExternalLink className="ml-2 h-3 w-3" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            /* Empty State if user has no services */
                            <div className="text-center py-16 px-6">
                                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                    <Server className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">No active hosting plans</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                                    You don't have any shared hosting accounts yet. Order a new plan to get your website online.
                                </p>
                                <Button asChild className="w-full sm:w-auto">
                                    <Link href="/services/order">Order New Service</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}




