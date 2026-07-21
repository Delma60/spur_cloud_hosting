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
import { Globe, Plus, MoreHorizontal, MoreVertical, Settings, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

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
    }
];

export default function MyDomains() {
    return (
        <AppLayout>
            <Head title="My Domains | Spurs Cloud" />

            <div className="flex-1 p-4 md:p-8 md:pt-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1 md:mb-2">My Domains</h2>
                        <p className="text-muted-foreground text-sm md:text-lg">
                            Manage your registered domains, nameservers, and DNS records.
                        </p>
                    </div>

                    {/* Register New Domain Button */}
                    <Button asChild size="lg" className="shrink-0 w-full sm:w-auto">
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
                                <div className="hidden md:block overflow-x-auto border rounded-lg">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <thead className="bg-muted/50 text-muted-foreground">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Domain Name</th>
                                                <th className="px-6 py-4 font-medium">Auto Renew</th>
                                                <th className="px-6 py-4 font-medium">Expiration Date</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y border-t">
                                            {myDomains.map((domain) => (
                                                <tr key={`desktop-${domain.id}`} className="hover:bg-muted/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-primary/10 p-2 rounded-md shrink-0">
                                                                <Globe className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-foreground text-base">{domain.name}</div>
                                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                                    {domain.privacy ? (
                                                                        <span className="flex items-center text-green-600 dark:text-green-500"><ShieldCheck className="w-3 h-3 mr-1"/> ID Protection ON</span>
                                                                    ) : (
                                                                        <span className="flex items-center text-red-500"><AlertCircle className="w-3 h-3 mr-1"/> ID Protection OFF</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            domain.autoRenew ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
                                                        }`}>
                                                            {domain.autoRenew ? 'Enabled' : 'Disabled'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-muted-foreground">
                                                        {domain.expirationDate}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            domain.status === 'Active' 
                                                                ? 'bg-green-500/10 text-green-500' 
                                                                : 'bg-red-500/10 text-red-500'
                                                        }`}>
                                                            {domain.status === 'Active' && <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>}
                                                            {domain.status === 'Expired' && <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>}
                                                            {domain.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button variant="secondary" size="sm">
                                                                Manage
                                                            </Button>
                                                            
                                                            {/* Desktop Dropdown */}
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                                                        <span className="sr-only">Open menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-48">
                                                                    <DropdownMenuLabel>Domain Tools</DropdownMenuLabel>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem>
                                                                        <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                                                                        Edit Nameservers
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
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
                                <div className="md:hidden flex flex-col divide-y">
                                    {myDomains.map((domain) => (
                                        <div key={`mobile-${domain.id}`} className="flex flex-col gap-4 p-4">
                                            
                                            {/* Mobile Header */}
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 p-2 rounded-md shrink-0">
                                                        <Globe className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-foreground break-all leading-tight">{domain.name}</div>
                                                        <div className="flex items-center gap-1 text-[10px] mt-1">
                                                            {domain.privacy ? (
                                                                <span className="text-green-600 dark:text-green-500 font-medium">ID Protect: ON</span>
                                                            ) : (
                                                                <span className="text-red-500 font-medium">ID Protect: OFF</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Mobile Dropdown */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 -mr-2">
                                                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuLabel>Domain Tools</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                                                            Edit Nameservers
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
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
                                            <div className="grid grid-cols-2 gap-y-4 gap-x-2 bg-muted/20 p-3 rounded-lg border">
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Status</div>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                            domain.status === 'Active' 
                                                                ? 'bg-green-500/20 text-green-600' 
                                                                : 'bg-red-500/20 text-red-600'
                                                        }`}>
                                                        {domain.status}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Auto Renew</div>
                                                    <div className="text-sm font-medium">{domain.autoRenew ? 'Enabled' : 'Disabled'}</div>
                                                </div>
                                                <div className="col-span-2 border-t pt-3 mt-1">
                                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Expiration Date</div>
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
                            <div className="text-center py-16 px-6">
                                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                    <Globe className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">No active domains</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
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