import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRightLeft, Unlock, KeyRound, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function TransferDomain() {
    const form = useForm({ domain: '', auth_code: '' });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('domains.transfer.store'));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Domains', href: route('domains.index') }, { title: 'Transfer', href: route('domains.transfer') }]}>
            <Head title="Transfer a Domain | Spurs Cloud" />
            <div className="flex-1 space-y-10 pb-12">
                <div className="from-primary/10 border-b bg-gradient-to-b to-transparent px-4 py-14 text-center">
                    <div className="mx-auto max-w-2xl space-y-3">
                        <span className="bg-primary/10 text-primary mx-auto grid h-12 w-12 place-items-center rounded-2xl"><ArrowRightLeft className="h-6 w-6" /></span>
                        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Transfer your domain to Spurs</h1>
                        <p className="text-muted-foreground text-lg">Move your domain in — we&apos;ll add a free year of registration and keep your site online.</p>
                    </div>
                </div>

                <div className="mx-auto grid max-w-4xl gap-8 px-4 lg:grid-cols-5">
                    {/* Form */}
                    <Card className="lg:col-span-3">
                        <CardHeader><CardTitle className="text-base">Start a transfer</CardTitle><CardDescription>Enter your domain and its authorization (EPP) code.</CardDescription></CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="domain">Domain name</Label>
                                    <Input id="domain" value={form.data.domain} onChange={(e) => form.setData('domain', e.target.value)} placeholder="yourdomain.com" className="h-11" />
                                    {form.errors.domain && <p className="text-sm text-red-600">{form.errors.domain}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="auth">Authorization / EPP code</Label>
                                    <Input id="auth" value={form.data.auth_code} onChange={(e) => form.setData('auth_code', e.target.value)} placeholder="Get this from your current registrar" className="h-11 font-mono" />
                                    {form.errors.auth_code && <p className="text-sm text-red-600">{form.errors.auth_code}</p>}
                                </div>
                                <Button type="submit" className="w-full" disabled={form.processing}>
                                    {form.processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRightLeft className="mr-2 h-4 w-4" />} Start transfer &amp; pay
                                </Button>
                                <p className="text-muted-foreground flex items-center gap-1.5 text-xs"><ShieldCheck className="h-3.5 w-3.5" /> Includes 1 year registration renewal.</p>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Steps */}
                    <div className="space-y-5 lg:col-span-2">
                        <h3 className="font-semibold">How it works</h3>
                        {[
                            { icon: Unlock, title: 'Unlock the domain', desc: 'Disable the transfer lock at your current registrar.' },
                            { icon: KeyRound, title: 'Get the EPP code', desc: 'Request the authorization code and paste it here.' },
                            { icon: CheckCircle2, title: 'Approve & done', desc: 'Confirm the transfer email — it completes in a few days.' },
                        ].map((s, i) => (
                            <div key={s.title} className="flex gap-3">
                                <span className="bg-primary/10 text-primary grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold">{i + 1}</span>
                                <div>
                                    <div className="flex items-center gap-1.5 font-medium"><s.icon className="text-muted-foreground h-4 w-4" /> {s.title}</div>
                                    <p className="text-muted-foreground mt-0.5 text-sm">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
