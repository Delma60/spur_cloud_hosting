import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
    Globe,
    ArrowLeft,
    Lock,
    ShieldCheck,
    RefreshCw,
    Settings,
    Key,
    Server,
    ExternalLink
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

// Mock data for the specific domain being viewed
const domain = {
    id: 1,
    name: 'example-business.com.ng',
    status: 'Active',
    registrationDate: 'July 15, 2026',
    expirationDate: 'July 15, 2027',
    price: '₦1,200/yr',
    autoRenew: true,
    registrarLock: true,
    idProtection: true,
    nameservers: ['ns1.spurs.com.ng', 'ns2.spurs.com.ng'],
};

export default function ManageDomain() {
    // State for interactive toggles
    const [autoRenew, setAutoRenew] = useState(domain.autoRenew);
    const [registrarLock, setRegistrarLock] = useState(domain.registrarLock);
    const [idProtection, setIdProtection] = useState(domain.idProtection);

    return (
        <AppLayout>
            <Head title={`Manage ${domain.name} | Spurs Cloud`} />

            <div className="flex-1 p-4 md:p-8 md:pt-6 max-w-7xl mx-auto space-y-6 md:space-y-8">

                {/* Back Navigation & Header */}
                <div>
                    <Button variant="ghost" size="sm" asChild className="-ml-3 mb-4 text-muted-foreground">
                        <Link href="/domains">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Domains
                        </Link>
                    </Button>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                                <Globe className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight break-all">
                                        {domain.name}
                                    </h2>
                                    <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        domain.status === 'Active'
                                            ? 'bg-green-500/10 text-green-500'
                                            : 'bg-red-500/10 text-red-500'
                                    }`}>
                                        {domain.status === 'Active' && <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>}
                                        {domain.status}
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Domain Registration Overview
                                </p>
                            </div>
                        </div>

                        <Button className="w-full sm:w-auto">
                            <RefreshCw className="mr-2 h-4 w-4" /> Renew Domain
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* LEFT COLUMN: Main Configurations */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">

                        {/* Domain Overview Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Card className="bg-muted/30 border-none shadow-none">
                                <CardContent className="p-4 sm:p-6">
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Registration Date</p>
                                    <p className="font-medium text-foreground">{domain.registrationDate}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/30 border-none shadow-none">
                                <CardContent className="p-4 sm:p-6">
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Expiration Date</p>
                                    <p className="font-medium text-foreground">{domain.expirationDate}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/30 border-none shadow-none col-span-2 md:col-span-1">
                                <CardContent className="p-4 sm:p-6">
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Renewal Price</p>
                                    <p className="font-medium text-foreground">{domain.price}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Security & Settings Toggles */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Security & Settings</CardTitle>
                                <CardDescription>Manage the administrative protections for your domain.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {/* Auto Renew Toggle */}
                                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center text-base font-semibold text-foreground">
                                            <RefreshCw className="mr-2 h-4 w-4 text-muted-foreground" />
                                            Auto-Renewal
                                        </div>
                                        <p className="text-sm text-muted-foreground max-w-[85%]">
                                            Automatically invoice and renew this domain before it expires.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={autoRenew}
                                        onCheckedChange={setAutoRenew}
                                    />
                                </div>

                                {/* Registrar Lock Toggle */}
                                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center text-base font-semibold text-foreground">
                                            <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                                            Registrar Lock
                                        </div>
                                        <p className="text-sm text-muted-foreground max-w-[85%]">
                                            Prevent unauthorized transfers of your domain to another registrar.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={registrarLock}
                                        onCheckedChange={setRegistrarLock}
                                    />
                                </div>

                                {/* ID Protection Toggle */}
                                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center text-base font-semibold text-foreground">
                                            <ShieldCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                                            ID Protection (WHOIS Privacy)
                                        </div>
                                        <p className="text-sm text-muted-foreground max-w-[85%]">
                                            Hide your personal contact information from the public WHOIS database.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={idProtection}
                                        onCheckedChange={setIdProtection}
                                    />
                                </div>

                            </CardContent>
                        </Card>

                    </div>

                    {/* RIGHT COLUMN: Nameservers & Advanced */}
                    <div className="space-y-6 md:space-y-8">

                        {/* Nameservers Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Server className="h-5 w-5 text-muted-foreground" /> Nameservers
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {domain.nameservers.map((ns, index) => (
                                    <div key={index} className="bg-muted/50 p-3 rounded-md border font-mono text-sm text-center">
                                        {ns}
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={`/domains/${domain.id}/nameservers`}>
                                        <Settings className="mr-2 h-4 w-4" /> Manage Nameservers
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* DNS Management Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-muted-foreground" /> DNS Management
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Manage your domain's host records (A, CNAME, TXT, MX) directly from our custom control panel.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary" className="w-full" asChild>
                                    <Link href={`/domains/${domain.id}/dns`}>
                                        DNS Zone Editor <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Advanced / Transfer */}
                        <Card className="border-red-500/20">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                                    <Key className="h-5 w-5 text-muted-foreground" /> Transfer Domain
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    To transfer this domain to another registrar, you will need to unlock the domain and request an Authorization (EPP) Code.
                                </p>
                                <Button variant="destructive" variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-950">
                                    Get EPP Code
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
