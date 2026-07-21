import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Loader2, Plus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Balance { asset: string; balance: string; display: string }
const QUICK = [1000, 5000, 10000, 25000];

export default function AddFunds({ balances = [] }: { balances?: Balance[] }) {
    const [amount, setAmount] = useState('');
    const form = useForm({ amount: '' });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.transform(() => ({ amount }));
        form.post(route('billing.topup'));
    };

    const ngn = balances.find((b) => b.asset === 'NGN');

    return (
        <AppLayout breadcrumbs={[{ title: 'Billing', href: route('billing.invoices') }, { title: 'Add Funds', href: route('billing.add-funds') }]}>
            <Head title="Add Funds | Spurs Cloud" />
            <div className="mx-auto w-full max-w-2xl flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Add funds</h2>
                    <p className="text-muted-foreground text-sm md:text-lg">Top up your Spurs Wallet to pay for services.</p>
                </div>

                <Card className="bg-gradient-to-br from-sky-500 to-indigo-600 text-white">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-white/80">Wallet balance</p>
                            <p className="mt-1 text-3xl font-bold">{ngn?.display ?? '₦0.00'}</p>
                        </div>
                        <Wallet className="h-10 w-10 text-white/70" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle className="text-base">Top up</CardTitle><CardDescription>Pay by card, transfer or USSD via Spurs Pay.</CardDescription></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="amount">Amount (₦)</Label>
                                <Input id="amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="h-11" required />
                                {form.errors.amount && <p className="text-sm text-red-600">{form.errors.amount}</p>}
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {QUICK.map((q) => (
                                    <Button key={q} type="button" variant="outline" size="sm" onClick={() => setAmount(String(q))}>₦{q.toLocaleString()}</Button>
                                ))}
                            </div>
                            <Button type="submit" className="w-full" disabled={form.processing}>
                                {form.processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />} Continue to payment
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {balances.length > 1 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {balances.map((b) => (
                            <Card key={b.asset}><CardContent className="p-4"><div className="text-muted-foreground text-xs">{b.asset}</div><div className="font-semibold">{b.display}</div></CardContent></Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
