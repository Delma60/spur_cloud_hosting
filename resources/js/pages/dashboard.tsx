import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Globe, ShieldCheck, ArrowRight, Plus, ExternalLink } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';

interface Domain { id: number; name: string; status: string; expires_at: string | null }
interface Service { id: number; label: string; plan: string; status: string }
interface Stats { domains: number; active_domains: number; services: number }

const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
const badge: Record<string, string> = {
    active: 'bg-green-500/10 text-green-600 dark:text-green-500',
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-500',
    expired: 'bg-red-500/10 text-red-600 dark:text-red-500',
    suspended: 'bg-red-500/10 text-red-600 dark:text-red-500',
};

export default function Dashboard({
    stats = { domains: 0, active_domains: 0, services: 0 },
    recentDomains = [],
    recentServices = [],
}: {
    stats?: Stats;
    recentDomains?: Domain[];
    recentServices?: Service[];
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: route('dashboard') }]}>
            <Head title="Client Area | Spurs Cloud" />

            <div className="flex-1 space-y-8 p-4 md:p-8 md:pt-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {auth?.user?.name?.split(' ')[0]}</h2>
                        <p className="text-muted-foreground">Manage your domains, hosting and account in one place.</p>
                    </div>
                    <Button asChild><Link href={route('domains.register.get')}><Globe className="mr-2 h-4 w-4" /> Register a domain</Link></Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Stat icon={<Globe className="h-4 w-4" />} label="Domains" value={String(stats.domains)} hint={`${stats.active_domains} active`} />
                    <Stat icon={<Server className="h-4 w-4" />} label="Hosting plans" value={String(stats.services)} hint="Active services" />
                    <Stat icon={<ShieldCheck className="h-4 w-4 text-green-500" />} label="Account" value="Verified" hint="Signed in via Spurs SSO" />
                </div>

                <div className="grid gap-4 lg:grid-cols-7">
                    {/* Hosting */}
                    <Card className="lg:col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div><CardTitle>Your hosting</CardTitle><CardDescription>Web hosting services.</CardDescription></div>
                            <Button variant="ghost" size="sm" asChild className="text-primary"><Link href={route('services.shared-hosting')}>View all</Link></Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {recentServices.length === 0 ? (
                                <Empty label="No hosting yet" cta="Order hosting" href={route('services.order')} icon={<Server className="h-5 w-5" />} />
                            ) : (
                                recentServices.map((s) => (
                                    <Link key={s.id} href={route('services.show', s.id)} className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-primary/10 grid h-9 w-9 place-items-center rounded-full"><Server className="text-primary h-4 w-4" /></span>
                                            <div><div className="text-sm font-medium">{s.label}</div><div className="text-muted-foreground text-xs capitalize">{s.plan} plan</div></div>
                                        </div>
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${badge[s.status] ?? 'bg-muted'}`}>{s.status}</span>
                                    </Link>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick actions */}
                    <Card className="lg:col-span-3">
                        <CardHeader><CardTitle>Quick actions</CardTitle><CardDescription>Get things done fast.</CardDescription></CardHeader>
                        <CardContent className="space-y-3">
                            <Action href={route('domains.register.get')} icon={<Plus className="h-5 w-5" />} label="Register a new domain" />
                            <Action href={route('services.order')} icon={<Server className="h-5 w-5" />} label="Order web hosting" />
                            <Action href="http://127.0.0.1:8000/me" icon={<ExternalLink className="h-5 w-5" />} label="Manage Spurs Account" external />
                        </CardContent>
                    </Card>
                </div>

                {/* Domains */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div><CardTitle>Recent domains</CardTitle><CardDescription>Your latest registrations.</CardDescription></div>
                        <Button variant="ghost" size="sm" asChild className="text-primary"><Link href={route('domains.index')}>View all</Link></Button>
                    </CardHeader>
                    <CardContent>
                        {recentDomains.length === 0 ? (
                            <Empty label="No domains yet" cta="Find a domain" href={route('domains.register.get')} icon={<Globe className="h-5 w-5" />} />
                        ) : (
                            <div className="divide-y">
                                {recentDomains.map((d) => (
                                    <Link key={d.id} href={route('domains.show', d.id)} className="hover:bg-muted/30 -mx-2 flex items-center justify-between rounded px-2 py-3 transition">
                                        <div className="flex items-center gap-3">
                                            <Globe className="text-muted-foreground h-4 w-4" />
                                            <span className="text-sm font-medium">{d.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-muted-foreground hidden text-xs sm:inline">Expires {fmt(d.expires_at)}</span>
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${badge[d.status] ?? 'bg-muted'}`}>{d.status}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function Stat({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <span className="text-muted-foreground">{icon}</span>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div><p className="text-muted-foreground mt-1 text-xs">{hint}</p></CardContent>
        </Card>
    );
}

function Action({ href, icon, label, external }: { href: string; icon: React.ReactNode; label: string; external?: boolean }) {
    const inner = (
        <span className="flex w-full items-center justify-between">
            <span className="text-foreground flex items-center font-normal"><span className="text-primary mr-3">{icon}</span>{label}</span>
            <ArrowRight className="text-muted-foreground h-4 w-4" />
        </span>
    );
    return (
        <Button variant="outline" className="h-12 w-full justify-between" asChild>
            {external ? <a href={href}>{inner}</a> : <Link href={href}>{inner}</Link>}
        </Button>
    );
}

function Empty({ label, cta, href, icon }: { label: string; cta: string; href: string; icon: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center py-10 text-center">
            <span className="bg-muted text-muted-foreground grid h-11 w-11 place-items-center rounded-full">{icon}</span>
            <p className="mt-3 text-sm font-medium">{label}</p>
            <Button asChild size="sm" className="mt-3"><Link href={href}>{cta}</Link></Button>
        </div>
    );
}
