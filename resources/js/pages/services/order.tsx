import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Server, Loader2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Plan { name: string; price: number; sites: number | string; storage: string }
type Plans = Record<string, Plan>;

const naira = (kobo: number) => '₦' + (kobo / 100).toLocaleString('en-NG');

export default function OrderService({ plans }: { plans: Plans }) {
    const entries = Object.entries(plans);
    const [label, setLabel] = useState('');
    const form = useForm({ plan: '', label: '' });

    const choose = (planKey: string) => {
        form.transform(() => ({ plan: planKey, label }));
        form.post(route('services.store'));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Hosting', href: route('services.shared-hosting') }, { title: 'Order', href: route('services.order') }]}>
            <Head title="Order Hosting | Spurs Cloud" />

            <div className="flex-1 space-y-10 pb-12">
                <div className="bg-primary/5 border-b px-4 py-14 text-center">
                    <div className="mx-auto max-w-2xl space-y-4">
                        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Web hosting that scales with you</h1>
                        <p className="text-muted-foreground text-lg">Fast, secure hosting for your sites — pay with Spurs Pay.</p>
                        <div className="mx-auto max-w-md space-y-1.5 text-left">
                            <Label htmlFor="label">Primary domain / site name</Label>
                            <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="yoursite.com.ng" className="h-11" />
                            {form.errors.label && <p className="text-sm text-red-600">{form.errors.label}</p>}
                        </div>
                    </div>
                </div>

                <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-3">
                    {entries.map(([key, plan], i) => (
                        <Card key={key} className={i === 1 ? 'border-primary border-2 shadow-lg' : ''}>
                            <CardHeader>
                                {i === 1 && <span className="bg-primary text-primary-foreground mb-2 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium">Most popular</span>}
                                <CardTitle className="flex items-center gap-2"><Server className="text-primary h-5 w-5" /> {plan.name}</CardTitle>
                                <div className="pt-2"><span className="text-3xl font-extrabold">{naira(plan.price)}</span><span className="text-muted-foreground text-sm">/mo</span></div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-2 text-sm">
                                    <Feature>{typeof plan.sites === 'number' ? `${plan.sites} website${plan.sites > 1 ? 's' : ''}` : `${plan.sites} websites`}</Feature>
                                    <Feature>{plan.storage} SSD storage</Feature>
                                    <Feature>Free SSL & email</Feature>
                                    <Feature>24/7 support</Feature>
                                </ul>
                                <Button
                                    className="w-full"
                                    variant={i === 1 ? 'default' : 'outline'}
                                    disabled={form.processing}
                                    onClick={() => choose(key)}
                                >
                                    {form.processing && form.data.plan === key ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Choose ' + plan.name}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

function Feature({ children }: { children: React.ReactNode }) {
    return <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" /> {children}</li>;
}
