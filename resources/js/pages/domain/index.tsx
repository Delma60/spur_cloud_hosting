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
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { AlertCircle, Globe, MoreHorizontal, MoreVertical, Plus, RefreshCw, Settings, ShieldCheck } from 'lucide-react';

// Mock data to represent a user's registered domains
const myDomains = [
    {
        id: 1,
        name: 'example-business.com.ng',
        registrationDate: 'July 15, 2026',
        expirationDate: 'July 15, 2027',
        status: 'Active',
        autoRenew: true,
        privacy: true,
    },
    {
        id: 2,
        name: 'personal-blog.com',
        registrationDate: 'July 01, 2025',
        expirationDate: 'July 01, 2026',
        status: 'Expired',
        autoRenew: false,
        privacy: false,
    },
];

export default function MyDomains() {
    return (
        <AppLayout>
            <Head title="My Domains | Spurs Cloud" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-8 md:pt-6">
                {/* Page Header */}
                <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="mb-1 text-2xl font-extrabold tracking-tight md:mb-2 md:text-3xl">My Domains</h2>
                        <p className="text-muted-foreground text-sm md:text-lg">Manage your registered domains, nameservers, and DNS records.</p>
                    </div>

                    {/* Register New Domain Button */}
                    <Button asChild size="lg" className="w-full shrink-0 sm:w-auto">
                        <Link href="/services/order">
                            <Plus className="mr-2 h-5 w-5" />
                            Register New Domain
                        </Link>
                    </Button>
                </div>

                {/* Inventory Card */}
                <Card>
                    <CardHeader className="px-4 md:px-6">
                        <CardTitle>Registered Domains</CardTitle>
                        <CardDescription>You have {myDomains.length} domain(s) registered in your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 sm:p-6 sm:pt-0">
                        {myDomains.length > 0 ? (
                            <>
                                {/* --- DESKTOP VIEW (Table) --- */}
                                <div className="hidden overflow-x-auto rounded-lg border md:block">
                                    <table className="w-full border-collapse text-left text-sm">
                                        <thead className="bg-muted/50 text-muted-foreground">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Domain Name</th>
                                                <th className="px-6 py-4 font-medium">Auto Renew</th>
                                                <th className="px-6 py-4 font-medium">Expiration Date</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 text-right font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y border-t">
                                            {myDomains.map((domain) => (
                                                <tr key={`desktop-${domain.id}`} className="hover:bg-muted/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-primary/10 shrink-0 rounded-md p-2">
                                                                <Globe className="text-primary h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <div className="text-foreground text-base font-semibold">{domain.name}</div>
                                                                <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                                                                    {domain.privacy ? (
                                                                        <span className="flex items-center text-green-600 dark:text-green-500">
                                                                            <ShieldCheck className="mr-1 h-3 w-3" /> ID Protection ON
                                                                        </span>
                                                                    ) : (
                                                                        <span className="flex items-center text-red-500">
                                                                            <AlertCircle className="mr-1 h-3 w-3" /> ID Protection OFF
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                                domain.autoRenew ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
                                                            }`}
                                                        >
                                                            {domain.autoRenew ? 'Enabled' : 'Disabled'}
                                                        </span>
                                                    </td>
                                                    <td className="text-muted-foreground px-6 py-4">{domain.expirationDate}</td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                                domain.status === 'Active'
                                                                    ? 'bg-green-500/10 text-green-500'
                                                                    : 'bg-red-500/10 text-red-500'
                                                            }`}
                                                        >
                                                            {domain.status === 'Active' && (
                                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                                            )}
                                                            {domain.status === 'Expired' && (
                                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                                            )}
                                                            {domain.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button variant="secondary" size="sm" onClick={() => router.get(route("domains.show", domain.id))}>
                                                                Manage
                                                            </Button>

                                                            {/* Desktop Dropdown */}
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                        <MoreHorizontal className="text-muted-foreground h-4 w-4" />
                                                                        <span className="sr-only">Open menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-48">
                                                                    <DropdownMenuLabel>Domain Tools</DropdownMenuLabel>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem asChild>
                                                                        <Link
                                                                            href={`/domains/${domain.id}/nameservers`}
                                                                            className="flex w-full cursor-pointer items-center"
                                                                        >
                                                                            <Settings className="text-muted-foreground mr-2 h-4 w-4" />
                                                                            Edit Nameservers
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Globe className="text-muted-foreground mr-2 h-4 w-4" />
                                                                        Manage DNS
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-primary focus:bg-primary/10 focus:text-primary">
                                                                        <RefreshCw className="mr-2 h-4 w-4" />
                                                                        Renew Domain Now
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
                                <div className="flex flex-col divide-y md:hidden">
                                    {myDomains.map((domain) => (
                                        <div key={`mobile-${domain.id}`} className="flex flex-col gap-4 p-4">
                                            {/* Mobile Header */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 shrink-0 rounded-md p-2">
                                                        <Globe className="text-primary h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="text-foreground leading-tight font-semibold break-all">{domain.name}</div>
                                                        <div className="mt-1 flex items-center gap-1 text-[10px]">
                                                            {domain.privacy ? (
                                                                <span className="font-medium text-green-600 dark:text-green-500">ID Protect: ON</span>
                                                            ) : (
                                                                <span className="font-medium text-red-500">ID Protect: OFF</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Mobile Dropdown */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 shrink-0">
                                                            <MoreVertical className="text-muted-foreground h-4 w-4" />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuLabel>Domain Tools</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Settings className="text-muted-foreground mr-2 h-4 w-4" />
                                                            Edit Nameservers
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Globe className="text-muted-foreground mr-2 h-4 w-4" />
                                                            Manage DNS
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-primary focus:bg-primary/10 focus:text-primary">
                                                            <RefreshCw className="mr-2 h-4 w-4" />
                                                            Renew Now
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            {/* Mobile Body: Details */}
                                            <div className="bg-muted/20 grid grid-cols-2 gap-x-2 gap-y-4 rounded-lg border p-3">
                                                <div>
                                                    <div className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wider uppercase">
                                                        Status
                                                    </div>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                            domain.status === 'Active'
                                                                ? 'bg-green-500/20 text-green-600'
                                                                : 'bg-red-500/20 text-red-600'
                                                        }`}
                                                    >
                                                        {domain.status}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wider uppercase">
                                                        Auto Renew
                                                    </div>
                                                    <div className="text-sm font-medium">{domain.autoRenew ? 'Enabled' : 'Disabled'}</div>
                                                </div>
                                                <div className="col-span-2 mt-1 border-t pt-3">
                                                    <div className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wider uppercase">
                                                        Expiration Date
                                                    </div>
                                                    <div className="text-sm">{domain.expirationDate}</div>
                                                </div>
                                            </div>

                                            {/* Mobile Footer */}
                                            <div className="pt-1">
                                                <Button variant="secondary" size="sm" className="w-full">
                                                    Manage Domain
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            /* Empty State */
                            <div className="px-6 py-16 text-center">
                                <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <Globe className="text-muted-foreground h-8 w-8" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">No active domains</h3>
                                <p className="text-muted-foreground mx-auto mb-6 max-w-sm">
                                    You don't have any domains registered with us yet. Secure your brand name today.
                                </p>
                                <Button asChild className="w-full sm:w-auto">
                                    <Link href="/services/order">Search for a Domain</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
