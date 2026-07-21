import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, CreditCard, Landmark, Hash, ShieldCheck, ArrowRight, Plus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function PaymentMethods() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Billing', href: route('billing.invoices') }, { title: 'Payment Methods', href: route('billing.payment-methods') }]}>
            <Head title="Payment Methods | Spurs Cloud" />
            <div className="flex-1 space-y-8 p-4 md:p-8 md:pt-6">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Payment methods</h2>
                    <p className="text-muted-foreground text-sm md:text-lg">How you pay for domains, hosting and renewals.</p>
                </div>

                {/* Primary: Spurs Wallet */}
                <Card className="overflow-hidden">
                    <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white"><Wallet className="h-6 w-6" /></span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">Spurs Wallet</h3>
                                    <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-600">Primary</span>
                                </div>
                                <p className="text-muted-foreground text-sm">Prepay from your balance for instant, one-click checkout.</p>
                            </div>
                        </div>
                        <Button asChild><Link href={route('billing.add-funds')}><Plus className="mr-2 h-4 w-4" /> Add funds</Link></Button>
                    </div>
                </Card>

                {/* Pay-at-checkout methods */}
                <div>
                    <h3 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">Or pay at checkout</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            { icon: CreditCard, name: 'Card', desc: 'Debit & credit cards' },
                            { icon: Landmark, name: 'Bank transfer', desc: 'Dedicated account number' },
                            { icon: Hash, name: 'USSD', desc: 'Dial a code to pay' },
                        ].map((m) => (
                            <Card key={m.name}>
                                <CardContent className="p-5">
                                    <span className="bg-primary/10 text-primary grid h-10 w-10 place-items-center rounded-xl"><m.icon className="h-5 w-5" /></span>
                                    <div className="mt-3 font-medium">{m.name}</div>
                                    <p className="text-muted-foreground mt-1 text-sm">{m.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <Card className="bg-muted/40 border-dashed">
                    <CardHeader className="flex flex-row items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                        <div>
                            <CardTitle className="text-base">Payments are secured by Spurs Pay</CardTitle>
                            <CardDescription>Your card details are entered on the Spurs Pay hosted checkout and never touch Spurs Cloud. Saved cards and receipts are managed there.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" asChild><a href="http://localhost:3100" target="_blank" rel="noreferrer">Open Spurs Pay <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
