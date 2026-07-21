import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Ticket { id: number; ref: string; subject: string; department: string; priority: string; status: string; message: string; created_at: string }

const fmt = (d: string) => new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const status: Record<string, string> = {
    open: 'bg-green-500/10 text-green-600 dark:text-green-500',
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-500',
    closed: 'bg-muted text-muted-foreground',
};

export default function ShowTicket({ ticket }: { ticket: Ticket }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Support', href: route('support.tickets') }, { title: ticket.ref, href: route('support.show', ticket.id) }]}>
            <Head title={`${ticket.ref} · Support`} />
            <div className="mx-auto w-full max-w-3xl flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
                    <Link href={route('support.tickets')}><ArrowLeft className="mr-2 h-4 w-4" /> All tickets</Link>
                </Button>

                <div className="flex flex-col justify-between gap-3 border-b pb-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground">{ticket.ref}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${status[ticket.status] ?? 'bg-muted'}`}>{ticket.status}</span>
                        </div>
                        <h2 className="mt-1 text-xl font-bold tracking-tight">{ticket.subject}</h2>
                        <p className="text-muted-foreground text-sm capitalize">{ticket.department} · {ticket.priority} priority · {fmt(ticket.created_at)}</p>
                    </div>
                </div>

                {/* Thread */}
                <Card>
                    <CardHeader className="flex flex-row items-center gap-3 border-b">
                        <span className="bg-primary/10 grid h-9 w-9 place-items-center rounded-full"><MessageSquare className="text-primary h-4 w-4" /></span>
                        <div><div className="text-sm font-medium">You</div><div className="text-muted-foreground text-xs">{fmt(ticket.created_at)}</div></div>
                    </CardHeader>
                    <CardContent className="pt-5">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{ticket.message}</p>
                    </CardContent>
                </Card>

                <div className="bg-muted/40 flex items-center gap-3 rounded-lg border border-dashed p-4 text-sm">
                    <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" /></span>
                    <span className="text-muted-foreground">A support agent will reply here shortly. You&apos;ll get an email when they do.</span>
                </div>
            </div>
        </AppLayout>
    );
}
