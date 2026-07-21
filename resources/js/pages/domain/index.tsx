import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Globe, Plus, ArrowRight } from 'lucide-react';

interface Domain {
    id: number;
    name: string;
    status: string;
    expires_at: string | null;
    auto_renew: boolean;
    price: number;
}

const badge: Record<string, string> = {
    active: 'bg-green-500/10 text-green-600 dark:text-green-500',
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-500',
    expired: 'bg-red-500/10 text-red-600 dark:text-red-500',
};

const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');

export default function MyDomains({ domains = [] }: { domains?: Domain[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Domains', href: route('domains.index') }]}>
            <Head title="My Domains | Spurs Cloud" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-8 md:pt-6">
                <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="mb-1 text-2xl font-extrabold tracking-tight md:mb-2 md:text-3xl">My Domains</h2>
                        <p className="text-muted-foreground text-sm md:text-lg">Manage your registered domains, nameservers, and DNS.</p>
                    </div>
                    <Button asChild size="lg" className="w-full shrink-0 sm:w-auto">
                        <Link href={route('domains.register.get')}><Plus className="mr-2 h-5 w-5" /> Register New Domain</Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Registered Domains</CardTitle>
                        <CardDescription>You have {domains.length} domain(s) in your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {domains.length === 0 ? (
                            <div className="flex flex-col items-center py-14 text-center">
                                <span className="bg-muted grid h-14 w-14 place-items-center rounded-full"><Globe className="text-muted-foreground h-6 w-6" /></span>
                                <p className="mt-4 font-medium">No domains yet</p>
                                <p className="text-muted-foreground mt-1 max-w-xs text-sm">Register your first domain to get started.</p>
                                <Button asChild className="mt-5"><Link href={route('domains.register.get')}>Find a domain</Link></Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border">
                                <table className="w-full border-collapse text-left text-sm">
                                    <thead className="bg-muted/50 text-muted-foreground">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Domain</th>
                                            <th className="px-6 py-4 font-medium">Auto renew</th>
                                            <th className="px-6 py-4 font-medium">Expires</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y border-t">
                                        {domains.map((d) => (
                                            <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Globe className="text-muted-foreground h-4 w-4 shrink-0" />
                                                        <span className="font-medium">{d.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-muted-foreground">{d.auto_renew ? 'On' : 'Off'}</td>
                                                <td className="px-6 py-4 text-muted-foreground">{fmt(d.expires_at)}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${badge[d.status] ?? 'bg-muted text-muted-foreground'}`}>{d.status}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={route('domains.show', d.id)}>Manage <ArrowRight className="ml-1 h-3 w-3" /></Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
