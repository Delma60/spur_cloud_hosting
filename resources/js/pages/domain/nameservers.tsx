import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Info, Save, Loader2, CheckCircle2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Domain {
    id: number;
    name: string;
    nameservers: string[] | null;
}

export default function EditNameservers({ domain }: { domain: Domain }) {
    const initial = [...(domain.nameservers ?? []), '', '', '', ''].slice(0, 4);
    const { data, setData, post, processing, recentlySuccessful } = useForm<{ nameservers: string[] }>({ nameservers: initial });

    const setNs = (i: number, v: string) => setData('nameservers', data.nameservers.map((n, idx) => (idx === i ? v : n)));
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('domains.nameservers.update', domain.id), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Domains', href: route('domains.index') }, { title: domain.name, href: route('domains.show', domain.id) }, { title: 'Nameservers', href: route('domains.nameservers', domain.id) }]}>
            <Head title={`Nameservers · ${domain.name}`} />

            <div className="flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
                    <Link href={route('domains.show', domain.id)}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {domain.name}</Link>
                </Button>

                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Nameservers</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Point <span className="font-medium">{domain.name}</span> to your hosting provider.</p>
                </div>

                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>Nameserver changes can take up to 24 hours to propagate. Leave blank to use Spurs defaults.</AlertDescription>
                </Alert>

                <Card>
                    <form onSubmit={submit}>
                        <CardHeader><CardTitle className="text-base">Custom nameservers</CardTitle><CardDescription>Enter at least two.</CardDescription></CardHeader>
                        <CardContent className="space-y-3">
                            {data.nameservers.map((ns, i) => (
                                <div key={i} className="space-y-1.5">
                                    <Label htmlFor={`ns${i}`}>Nameserver {i + 1}</Label>
                                    <Input id={`ns${i}`} value={ns} onChange={(e) => setNs(i, e.target.value)} placeholder={`ns${i + 1}.example.com`} className="font-mono" />
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="flex items-center gap-3">
                            <Button type="submit" disabled={processing}>
                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Save nameservers
                            </Button>
                            {recentlySuccessful && <span className="flex items-center gap-1.5 text-sm text-green-600"><CheckCircle2 className="h-4 w-4" /> Saved</span>}
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
