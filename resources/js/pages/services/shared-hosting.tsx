import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Plus, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Service {
    id: number;
    label: string;
    plan: string;
    status: string;
    price: number;
    renews_at: string | null;
}

const naira = (kobo: number) => '₦' + (kobo / 100).toLocaleString('en-NG');
const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');

const badge: Record<string, string> = {
    active: 'bg-green-500/10 text-green-600 dark:text-green-500',
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-500',
    suspended: 'bg-red-500/10 text-red-600 dark:text-red-500',
};

export default function SharedHosting({ services = [] }: { services?: Service[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Hosting', href: route('services.shared-hosting') }]}>
            <Head title="Shared Hosting | Spurs Cloud" />

            <div className="flex-1 space-y-6 p-4 md:space-y-8 md:p-8 md:pt-6">
                <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="mb-1 text-2xl font-extrabold tracking-tight md:text-3xl">Shared Hosting</h2>
                        <p className="text-muted-foreground text-sm md:text-lg">Your web hosting plans and control panels.</p>
                    </div>
                    <Button asChild size="lg" className="w-full shrink-0 sm:w-auto">
                        <Link href={route('services.order')}><Plus className="mr-2 h-5 w-5" /> Order Hosting</Link>
                    </Button>
                </div>

                {services.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center py-16 text-center">
                            <span className="bg-muted grid h-14 w-14 place-items-center rounded-full"><Server className="text-muted-foreground h-6 w-6" /></span>
                            <p className="mt-4 font-medium">No hosting yet</p>
                            <p className="text-muted-foreground mt-1 max-w-xs text-sm">Order a plan to launch your first website.</p>
                            <Button asChild className="mt-5"><Link href={route('services.order')}>View plans</Link></Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {services.map((s) => (
                            <Card key={s.id}>
                                <CardHeader className="flex flex-row items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-primary/10 grid h-10 w-10 place-items-center rounded-lg"><Server className="text-primary h-5 w-5" /></span>
                                        <div>
                                            <CardTitle className="text-base">{s.label}</CardTitle>
                                            <CardDescription className="capitalize">{s.plan} plan</CardDescription>
                                        </div>
                                    </div>
                                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${badge[s.status] ?? 'bg-muted'}`}>{s.status}</span>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Price</span><span className="font-medium">{naira(s.price)}/mo</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Renews</span><span className="font-medium">{fmt(s.renews_at)}</span></div>
                                    <Button asChild variant="outline" className="w-full"><Link href={route('services.show', s.id)}>Manage <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
