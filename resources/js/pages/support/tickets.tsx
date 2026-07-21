import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifeBuoy, Plus, BookOpen, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Ticket { id: number; ref: string; subject: string; department: string; priority: string; status: string; created_at: string }

const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const status: Record<string, string> = {
    open: 'bg-green-500/10 text-green-600 dark:text-green-500',
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-500',
    closed: 'bg-muted text-muted-foreground',
};

export default function Tickets({ tickets = [] }: { tickets?: Ticket[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Support', href: route('support.tickets') }]}>
            <Head title="Support | Spurs Cloud" />
            <div className="flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Support</h2>
                        <p className="text-muted-foreground text-sm md:text-lg">Get help from the Spurs Cloud team.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild><Link href={route('support.kb')}><BookOpen className="mr-2 h-4 w-4" /> Knowledge base</Link></Button>
                        <Button asChild><Link href={route('support.open')}><Plus className="mr-2 h-4 w-4" /> Open ticket</Link></Button>
                    </div>
                </div>

                {tickets.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center py-16 text-center">
                            <span className="bg-muted grid h-14 w-14 place-items-center rounded-full"><LifeBuoy className="text-muted-foreground h-6 w-6" /></span>
                            <p className="mt-4 font-medium">No tickets yet</p>
                            <p className="text-muted-foreground mt-1 max-w-xs text-sm">Open a ticket and we&apos;ll get back to you fast.</p>
                            <Button asChild className="mt-5"><Link href={route('support.open')}>Open your first ticket</Link></Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {tickets.map((t) => (
                                    <Link key={t.id} href={route('support.show', t.id)} className="hover:bg-muted/30 flex items-center justify-between gap-4 p-4 transition sm:p-5">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-xs text-muted-foreground">{t.ref}</span>
                                                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${status[t.status] ?? 'bg-muted'}`}>{t.status}</span>
                                            </div>
                                            <div className="mt-0.5 truncate font-medium">{t.subject}</div>
                                            <div className="text-muted-foreground text-xs capitalize">{t.department} · {fmt(t.created_at)}</div>
                                        </div>
                                        <ArrowRight className="text-muted-foreground h-4 w-4 shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
