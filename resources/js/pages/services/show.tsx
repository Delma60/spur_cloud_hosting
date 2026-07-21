import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Server, 
    ExternalLink, 
    ArrowLeft, 
    HardDrive, 
    Activity, 
    Globe, 
    Mail, 
    FolderOpen, 
    Database, 
    Key,
    ShieldAlert
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

// Mock data for the specific service being viewed
const service = {
    id: 1,
    domain: 'example-business.com.ng',
    plan: 'Business Shared Hosting',
    status: 'Active',
    registrationDate: 'July 15, 2026',
    nextDueDate: 'July 15, 2027',
    billingCycle: 'Annually',
    price: '₦38,400',
    server: {
        name: 'vps-node-04.spurs.com.ng',
        ip: '192.168.1.45',
        nameserver1: 'ns1.spurs.com.ng',
        nameserver2: 'ns2.spurs.com.ng',
    },
    usage: {
        disk: { used: 12, total: 20, unit: 'GB', percentage: 60 },
        bandwidth: { used: 45, total: 100, unit: 'GB', percentage: 45 } // 100 representing 'unlimited' cap warning
    }
};

export default function ManageService() {
    return (
        <AppLayout>
            <Head title={`Manage ${service.domain} | Spurs Cloud`} />

            <div className="flex-1 p-4 md:p-8 md:pt-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
                
                {/* Back Navigation & Status */}
                <div>
                    <Button variant="ghost" size="sm" asChild className="-ml-3 mb-4 text-muted-foreground">
                        <Link href="/services">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Services
                        </Link>
                    </Button>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight break-all">
                                    {service.domain}
                                </h2>
                                <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    service.status === 'Active' 
                                        ? 'bg-green-500/10 text-green-500' 
                                        : 'bg-red-500/10 text-red-500'
                                }`}>
                                    {service.status === 'Active' && <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>}
                                    {service.status}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm md:text-base">
                                {service.plan}
                            </p>
                        </div>
                        
                        <div className="flex gap-2">
                            <Button className="w-full sm:w-auto">
                                Login to cPanel <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    
                    {/* LEFT COLUMN: Main Information */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        
                        {/* Quick Shortcuts */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors">
                                <Mail className="h-5 w-5 text-primary" />
                                <span className="text-xs">Webmail</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors">
                                <FolderOpen className="h-5 w-5 text-primary" />
                                <span className="text-xs">File Manager</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors">
                                <Database className="h-5 w-5 text-primary" />
                                <span className="text-xs">phpMyAdmin</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors">
                                <Globe className="h-5 w-5 text-primary" />
                                <span className="text-xs">Addon Domains</span>
                            </Button>
                        </div>

                        {/* Server Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Server Information</CardTitle>
                                <CardDescription>Technical details required for configuring your website.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Server IP Address</div>
                                        <div className="font-mono text-sm">{service.server.ip}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Server Name</div>
                                        <div className="font-mono text-sm">{service.server.name}</div>
                                    </div>
                                    <div className="sm:col-span-2 border-t pt-4">
                                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Nameservers</div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="bg-muted/50 p-3 rounded-md border font-mono text-sm flex justify-between items-center">
                                                {service.server.nameserver1}
                                            </div>
                                            <div className="bg-muted/50 p-3 rounded-md border font-mono text-sm flex justify-between items-center">
                                                {service.server.nameserver2}
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-3">
                                            Point your domain to these nameservers to connect it to this hosting account. DNS propagation may take up to 24 hours.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* RIGHT COLUMN: Usage & Billing */}
                    <div className="space-y-6 md:space-y-8">
                        
                        {/* Usage Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Resource Usage</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Disk Space */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex items-center gap-2">
                                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Disk Usage</span>
                                        </div>
                                        <span className="text-sm font-semibold">{service.usage.disk.used} / {service.usage.disk.total} {service.usage.disk.unit}</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${service.usage.disk.percentage > 80 ? 'bg-red-500' : 'bg-primary'}`} 
                                            style={{ width: `${service.usage.disk.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Bandwidth */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Bandwidth</span>
                                        </div>
                                        <span className="text-sm font-semibold">{service.usage.bandwidth.used} {service.usage.bandwidth.unit}</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full rounded-full bg-primary" 
                                            style={{ width: `${service.usage.bandwidth.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Billing Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Billing Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-sm text-muted-foreground">Registration Date</span>
                                    <span className="text-sm font-medium">{service.registrationDate}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-sm text-muted-foreground">Recurring Amount</span>
                                    <span className="text-sm font-medium">{service.price} ({service.billingCycle})</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-muted-foreground">Next Due Date</span>
                                    <span className="text-sm font-medium">{service.nextDueDate}</span>
                                </div>
                                
                                <div className="pt-4 space-y-3">
                                    <Button variant="default" className="w-full">
                                        Renew Now
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Upgrade/Downgrade
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Danger Zone */}
                        <Card className="border-red-500/20">
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-start gap-3 text-red-600 dark:text-red-400">
                                    <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-semibold mb-1">Request Cancellation</p>
                                        <p className="text-muted-foreground text-xs leading-relaxed">
                                            If you no longer need this hosting service, you can request a cancellation to prevent future billing.
                                        </p>
                                    </div>
                                </div>
                                <Button variant="destructive" className="w-full" size="sm">
                                    Request Cancellation
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}