import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Globe, FileText, ExternalLink, Mail, ArrowRight, ShieldCheck, Receipt, LifeBuoy, CreditCard } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AppLayout>
            <Head title="Client Area | Spurs Cloud" />

            <div className="flex-1 space-y-8 p-8 pt-6">
                {/* Page Header */}
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {auth.user.name}</h2>
                        <p className="text-muted-foreground">
                            Manage your hosting services, domains, and billing from your centralized dashboard.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button>
                            <Globe className="mr-2 h-4 w-4" />
                            Register a New Domain
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Hosting</CardTitle>
                            <Server className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Business Plan
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Registered Domains</CardTitle>
                            <Globe className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                1 expiring in 30 days
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unpaid Invoices</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-500">₦0.00</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Your account is up to date
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Account Security</CardTitle>
                            <ShieldCheck className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Verified</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Authenticated via Spurs SSO
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid: Top Row */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Active Services List */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Your Active Services</CardTitle>
                            <CardDescription>
                                Manage your web hosting and access your control panels.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-primary/10 p-2 rounded-full shrink-0">
                                            <Server className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium leading-none">Business Web Hosting</p>
                                            <p className="text-sm text-muted-foreground mt-1">spurs.com.ng</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="flex items-center text-sm text-green-500 mr-2 sm:mr-4">
                                            <span className="relative flex h-2 w-2 mr-2">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            Active
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">Manage</Button>
                                            <Button size="sm">
                                                cPanel <ExternalLink className="ml-2 h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-muted p-2 rounded-full shrink-0">
                                            <Globe className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium leading-none">Domain Registration</p>
                                            <p className="text-sm text-muted-foreground mt-1">spurs.com.ng</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="flex items-center text-sm text-yellow-500 mr-2 sm:mr-4">
                                            <span className="relative flex h-2 w-2 mr-2">
                                              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                            </span>
                                            Renews in 30 days
                                        </div>
                                        <Button variant="outline" size="sm">Manage Domain</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Shortcuts to your essential business tools.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full justify-between h-12" asChild>
                                <Link href="#">
                                    <span className="flex items-center font-normal text-foreground">
                                        <Mail className="mr-3 h-5 w-5 text-primary" />
                                        Login to Webmail
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </Link>
                            </Button>

                            <Button variant="outline" className="w-full justify-between h-12" asChild>
                                <Link href="#">
                                    <span className="flex items-center font-normal text-foreground">
                                        <Globe className="mr-3 h-5 w-5 text-primary" />
                                        Manage DNS Records
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </Link>
                            </Button>

                            <Button variant="outline" className="w-full justify-between h-12" asChild>
                                <Link href="#">
                                    <span className="flex items-center font-normal text-foreground">
                                        <CreditCard className="mr-3 h-5 w-5 text-primary" />
                                        Update Payment Method
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid: Bottom Row */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Recent Invoices */}
                    <Card className="col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Invoices</CardTitle>
                                <CardDescription>Your billing history for the last 90 days.</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-muted-foreground uppercase border-b">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Invoice #</th>
                                            <th className="px-4 py-3 font-medium">Date</th>
                                            <th className="px-4 py-3 font-medium">Amount</th>
                                            <th className="px-4 py-3 font-medium text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr className="hover:bg-muted/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-foreground">INV-10042</td>
                                            <td className="px-4 py-3 text-muted-foreground">July 15, 2026</td>
                                            <td className="px-4 py-3 text-foreground">₦4,000.00</td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                                                    Paid
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-muted/50 transition-colors">
                                            <td className="px-4 py-3 font-medium text-foreground">INV-09881</td>
                                            <td className="px-4 py-3 text-muted-foreground">June 15, 2026</td>
                                            <td className="px-4 py-3 text-foreground">₦4,000.00</td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                                                    Paid
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support Tickets */}
                    <Card className="col-span-3">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Support Tickets</CardTitle>
                                <CardDescription>Recent interactions with our team.</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary">Open Ticket</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Need help configuring SSL</p>
                                    <p className="text-xs text-muted-foreground">Ticket #4091 • Updated 2 days ago</p>
                                </div>
                                <div className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                                    Closed
                                </div>
                            </div>
                            <div className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Domain transfer inquiry</p>
                                    <p className="text-xs text-muted-foreground">Ticket #3812 • Updated 1 month ago</p>
                                </div>
                                <div className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                                    Closed
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
