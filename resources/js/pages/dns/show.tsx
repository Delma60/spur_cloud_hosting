import { Head, Link, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, Trash2, Network, Loader2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface DnsRow { id: number; type: string; name: string; value: string; ttl: number; priority: number | null }
interface Domain { id: number; name: string }

const TYPE_COLOR: Record<string, string> = {
    A: 'bg-sky-500/10 text-sky-600',
    AAAA: 'bg-indigo-500/10 text-indigo-600',
    CNAME: 'bg-violet-500/10 text-violet-600',
    TXT: 'bg-amber-500/10 text-amber-600',
    MX: 'bg-emerald-500/10 text-emerald-600',
};

export default function DnsShow({ domain, records = [] }: { domain: Domain; records?: DnsRow[] }) {
    const form = useForm({ type: 'A', name: '@', value: '', ttl: 3600, priority: 10 });
    const add = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('dns.store', domain.id), { preserveScroll: true, onSuccess: () => form.reset('value') });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'DNS', href: route('dns.index') }, { title: domain.name, href: route('dns.show', domain.id) }]}>
            <Head title={`DNS · ${domain.name}`} />
            <div className="flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
                    <Link href={route('dns.index')}><ArrowLeft className="mr-2 h-4 w-4" /> All domains</Link>
                </Button>

                <div className="flex items-center gap-3">
                    <span className="bg-primary/10 grid h-11 w-11 place-items-center rounded-xl"><Network className="text-primary h-5 w-5" /></span>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">DNS records</h2>
                        <p className="text-muted-foreground text-sm">{domain.name}</p>
                    </div>
                </div>

                {/* Add record */}
                <Card>
                    <CardHeader><CardTitle className="text-base">Add a record</CardTitle><CardDescription>Create A, AAAA, CNAME, TXT or MX records.</CardDescription></CardHeader>
                    <CardContent>
                        <form onSubmit={add} className="grid gap-3 sm:grid-cols-12">
                            <div className="sm:col-span-2">
                                <Label className="mb-1.5 block text-xs">Type</Label>
                                <Select value={form.data.type} onValueChange={(v) => form.setData('type', v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>{['A', 'AAAA', 'CNAME', 'TXT', 'MX'].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="sm:col-span-3">
                                <Label className="mb-1.5 block text-xs">Host</Label>
                                <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder="@ or www" />
                            </div>
                            <div className={form.data.type === 'MX' ? 'sm:col-span-3' : 'sm:col-span-5'}>
                                <Label className="mb-1.5 block text-xs">Value</Label>
                                <Input value={form.data.value} onChange={(e) => form.setData('value', e.target.value)} placeholder="76.76.21.21" className="font-mono" />
                            </div>
                            {form.data.type === 'MX' && (
                                <div className="sm:col-span-2">
                                    <Label className="mb-1.5 block text-xs">Priority</Label>
                                    <Input type="number" value={form.data.priority} onChange={(e) => form.setData('priority', Number(e.target.value))} />
                                </div>
                            )}
                            <div className="flex items-end sm:col-span-2">
                                <Button type="submit" className="w-full" disabled={form.processing}>
                                    {form.processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="mr-1 h-4 w-4" /> Add</>}
                                </Button>
                            </div>
                        </form>
                        {form.errors.value && <p className="mt-2 text-sm text-red-600">{form.errors.value}</p>}
                    </CardContent>
                </Card>

                {/* Records */}
                <Card>
                    <CardHeader><CardTitle className="text-base">Records ({records.length})</CardTitle></CardHeader>
                    <CardContent>
                        {records.length === 0 ? (
                            <p className="text-muted-foreground py-8 text-center text-sm">No records yet. Add one above.</p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted/50 text-muted-foreground"><tr>
                                        <th className="px-4 py-3 font-medium">Type</th>
                                        <th className="px-4 py-3 font-medium">Host</th>
                                        <th className="px-4 py-3 font-medium">Value</th>
                                        <th className="px-4 py-3 font-medium">TTL</th>
                                        <th className="px-4 py-3"></th>
                                    </tr></thead>
                                    <tbody className="divide-y border-t">
                                        {records.map((r) => (
                                            <tr key={r.id} className="hover:bg-muted/20">
                                                <td className="px-4 py-3"><span className={`rounded px-2 py-0.5 text-xs font-semibold ${TYPE_COLOR[r.type] ?? 'bg-muted'}`}>{r.type}</span></td>
                                                <td className="px-4 py-3 font-mono text-xs">{r.name}</td>
                                                <td className="px-4 py-3 font-mono text-xs break-all">{r.priority ? `${r.priority} ` : ''}{r.value}</td>
                                                <td className="text-muted-foreground px-4 py-3">{r.ttl}s</td>
                                                <td className="px-4 py-3 text-right">
                                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-600" onClick={() => router.delete(route('dns.destroy', [domain.id, r.id]), { preserveScroll: true })}>
                                                        <Trash2 className="h-4 w-4" />
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
