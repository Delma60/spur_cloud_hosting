import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, ArrowLeft, Server, Calendar, RefreshCw, ShieldCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Domain {
    id: number;
    name: string;
    status: string;
    tld: string;
    price: number;
    years: number;
    auto_renew: boolean;
    expires_at: string | null;
    created_at: string;
    nameservers: string[] | null;
}

const naira = (kobo: number) => '₦' + (kobo / 100).toLocaleString('en-NG');
const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');

const badge: Record<string, string> = {
    active: 'bg-green-500/10 text-green-600 dark:text-green-500',
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-500',
    expired: 'bg-red-500/10 text-red-600 dark:text-red-500',
};

export default function ShowDomain({ domain }: { domain: Domain }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Domains', href: route('domains.index') }, { title: domain.name, href: route('domains.show', domain.id) }]}>
            <Head title={`${domain.name} | Spurs Cloud`} />

            <div className="flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
                    <Link href={route('domains.index')}><ArrowLeft className="mr-2 h-4 w-4" /> All domains</Link>
                </Button>

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <span className="bg-primary/10 grid h-11 w-11 place-items-center rounded-xl"><Globe className="text-primary h-5 w-5" /></span>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{domain.name}</h2>
                            <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${badge[domain.status] ?? 'bg-muted'}`}>{domain.status}</span>
                        </div>
                    </div>
                    <Button asChild variant="outline"><Link href={route('domains.nameservers', domain.id)}><Server className="mr-2 h-4 w-4" /> Nameservers</Link></Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Info icon={<Calendar className="h-4 w-4" />} label="Registered" value={fmt(domain.created_at)} />
                    <Info icon={<RefreshCw className="h-4 w-4" />} label="Expires" value={fmt(domain.expires_at)} />
                    <Info icon={<ShieldCheck className="h-4 w-4" />} label="Auto renew" value={domain.auto_renew ? 'Enabled' : 'Disabled'} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Registration</CardTitle><CardDescription>Billing for this domain.</CardDescription></CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <Row label="Term" value={`${domain.years} year(s)`} />
                            <Row label="Price" value={`${naira(domain.price)} / term`} />
                            <Row label="Extension" value={`.${domain.tld}`} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle className="text-base">Nameservers</CardTitle><CardDescription>Where this domain points.</CardDescription></CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            {(domain.nameservers ?? []).length > 0 ? (
                                (domain.nameservers ?? []).map((ns) => <div key={ns} className="text-muted-foreground font-mono">{ns}</div>)
                            ) : (
                                <p className="text-muted-foreground">Using default Spurs nameservers.</p>
                            )}
                            <Button asChild variant="link" className="px-0"><Link href={route('domains.nameservers', domain.id)}>Manage nameservers</Link></Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-5">
                <span className="bg-muted text-muted-foreground grid h-9 w-9 place-items-center rounded-lg">{icon}</span>
                <div>
                    <div className="text-muted-foreground text-xs">{label}</div>
                    <div className="font-semibold">{value}</div>
                </div>
            </CardContent>
        </Card>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}
