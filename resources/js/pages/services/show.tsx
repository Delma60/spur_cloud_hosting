import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, ExternalLink, ArrowLeft, HardDrive, Globe, Mail, Database, Activity } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Service {
    id: number;
    label: string;
    plan: string;
    status: string;
    price: number;
    renews_at: string | null;
    created_at: string;
}
interface Plan { name: string; price: number; sites: number | string; storage: string }

const naira = (kobo: number) => '₦' + (kobo / 100).toLocaleString('en-NG');
const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');

const badge: Record<string, string> = {
    active: 'bg-green-500/10 text-green-600 dark:text-green-500',
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-500',
    suspended: 'bg-red-500/10 text-red-600 dark:text-red-500',
};

export default function ShowService({ service, plan }: { service: Service; plan: Plan | null }) {
    const active = service.status === 'active';
    return (
        <AppLayout breadcrumbs={[{ title: 'Hosting', href: route('services.shared-hosting') }, { title: service.label, href: route('services.show', service.id) }]}>
            <Head title={`${service.label} | Spurs Cloud`} />

            <div className="flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
                    <Link href={route('services.shared-hosting')}><ArrowLeft className="mr-2 h-4 w-4" /> All hosting</Link>
                </Button>

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <span className="bg-primary/10 grid h-11 w-11 place-items-center rounded-xl"><Server className="text-primary h-5 w-5" /></span>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{service.label}</h2>
                            <div className="mt-1 flex items-center gap-2">
                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${badge[service.status] ?? 'bg-muted'}`}>{service.status}</span>
                                <span className="text-muted-foreground text-sm capitalize">{service.plan} plan</span>
                            </div>
                        </div>
                    </div>
                    <Button disabled={!active}>Open cPanel <ExternalLink className="ml-2 h-3.5 w-3.5" /></Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Stat icon={<Activity className="h-4 w-4" />} label="Status" value={active ? 'Running' : 'Provisioning'} />
                    <Stat icon={<HardDrive className="h-4 w-4" />} label="Storage" value={plan?.storage ?? '—'} />
                    <Stat icon={<Globe className="h-4 w-4" />} label="Websites" value={String(plan?.sites ?? '—')} />
                    <Stat icon={<Database className="h-4 w-4" />} label="Renews" value={fmt(service.renews_at)} />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader><CardTitle className="text-base">Quick tools</CardTitle><CardDescription>Manage your hosting.</CardDescription></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-3">
                            {[['File Manager', FolderTool], ['Databases', Database], ['Email', Mail], ['Domains', Globe]].map(([label, Icon]) => {
                                const I = Icon as React.ElementType;
                                return (
                                    <Button key={label as string} variant="outline" className="h-12 justify-start" disabled={!active}>
                                        <I className="mr-3 h-4 w-4" /> {label as string}
                                    </Button>
                                );
                            })}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Billing</CardTitle></CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Plan</span><span className="font-medium capitalize">{service.plan}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-medium">{naira(service.price)}/mo</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Since</span><span className="font-medium">{fmt(service.created_at)}</span></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

function FolderTool(props: React.SVGProps<SVGSVGElement>) {
    return <HardDrive {...props} />;
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-5">
                <span className="bg-muted text-muted-foreground grid h-9 w-9 place-items-center rounded-lg">{icon}</span>
                <div><div className="text-muted-foreground text-xs">{label}</div><div className="font-semibold">{value}</div></div>
            </CardContent>
        </Card>
    );
}
