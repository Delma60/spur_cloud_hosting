import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Receipt, CheckCircle2, Clock } from 'lucide-react';

interface Invoice { ref: string; description: string; amount: number; status: string; date: string }

const naira = (kobo: number) => '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 2 });
const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const badge: Record<string, string> = {
    paid: 'bg-green-500/10 text-green-600 dark:text-green-500',
    unpaid: 'bg-amber-500/10 text-amber-600 dark:text-amber-500',
};

export default function Invoices({ invoices = [], totalPaid = 0, totalDue = 0 }: { invoices?: Invoice[]; totalPaid?: number; totalDue?: number }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Billing', href: route('billing.invoices') }, { title: 'Invoices', href: route('billing.invoices') }]}>
            <Head title="Invoices | Spurs Cloud" />
            <div className="flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Invoices</h2>
                    <p className="text-muted-foreground text-sm md:text-lg">Your billing history across domains and hosting.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Card><CardContent className="flex items-center gap-3 p-5"><span className="grid h-10 w-10 place-items-center rounded-lg bg-green-500/10 text-green-600"><CheckCircle2 className="h-5 w-5" /></span><div><div className="text-muted-foreground text-xs">Total paid</div><div className="text-xl font-bold">{naira(totalPaid)}</div></div></CardContent></Card>
                    <Card><CardContent className="flex items-center gap-3 p-5"><span className="grid h-10 w-10 place-items-center rounded-lg bg-amber-500/10 text-amber-600"><Clock className="h-5 w-5" /></span><div><div className="text-muted-foreground text-xs">Outstanding</div><div className="text-xl font-bold">{naira(totalDue)}</div></div></CardContent></Card>
                </div>

                <Card>
                    <CardHeader><CardTitle>All invoices</CardTitle></CardHeader>
                    <CardContent>
                        {invoices.length === 0 ? (
                            <div className="flex flex-col items-center py-12 text-center">
                                <span className="bg-muted grid h-12 w-12 place-items-center rounded-full"><Receipt className="text-muted-foreground h-5 w-5" /></span>
                                <p className="mt-3 text-sm font-medium">No invoices yet</p>
                                <p className="text-muted-foreground mt-1 text-sm">Purchases will show up here.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted/50 text-muted-foreground"><tr>
                                        <th className="px-6 py-3 font-medium">Invoice</th>
                                        <th className="px-6 py-3 font-medium">Description</th>
                                        <th className="px-6 py-3 font-medium">Date</th>
                                        <th className="px-6 py-3 font-medium">Amount</th>
                                        <th className="px-6 py-3 text-right font-medium">Status</th>
                                    </tr></thead>
                                    <tbody className="divide-y border-t">
                                        {invoices.map((inv) => (
                                            <tr key={inv.ref} className="hover:bg-muted/20">
                                                <td className="px-6 py-3 font-mono text-xs">{inv.ref}</td>
                                                <td className="px-6 py-3 font-medium">{inv.description}</td>
                                                <td className="px-6 py-3 text-muted-foreground">{fmt(inv.date)}</td>
                                                <td className="px-6 py-3 font-semibold">{naira(inv.amount)}</td>
                                                <td className="px-6 py-3 text-right"><span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${badge[inv.status] ?? 'bg-muted text-muted-foreground'}`}>{inv.status}</span></td>
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
