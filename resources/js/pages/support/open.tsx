import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function OpenTicket() {
    const form = useForm({ subject: '', department: 'general', priority: 'normal', message: '' });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('support.store'));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Support', href: route('support.tickets') }, { title: 'Open ticket', href: route('support.open') }]}>
            <Head title="Open a Ticket | Spurs Cloud" />
            <div className="mx-auto w-full max-w-2xl flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
                    <Link href={route('support.tickets')}><ArrowLeft className="mr-2 h-4 w-4" /> Back to tickets</Link>
                </Button>

                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Open a ticket</h2>
                    <p className="text-muted-foreground text-sm">Tell us what&apos;s going on — we typically reply within a few hours.</p>
                </div>

                <Card>
                    <CardHeader><CardTitle className="text-base">New ticket</CardTitle><CardDescription>Give us enough detail to help quickly.</CardDescription></CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" value={form.data.subject} onChange={(e) => form.setData('subject', e.target.value)} placeholder="Brief summary of the issue" className="h-11" />
                                {form.errors.subject && <p className="text-sm text-red-600">{form.errors.subject}</p>}
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label>Department</Label>
                                    <Select value={form.data.department} onValueChange={(v) => form.setData('department', v)}>
                                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General</SelectItem>
                                            <SelectItem value="billing">Billing</SelectItem>
                                            <SelectItem value="technical">Technical</SelectItem>
                                            <SelectItem value="domains">Domains</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Priority</Label>
                                    <Select value={form.data.priority} onValueChange={(v) => form.setData('priority', v)}>
                                        <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                    id="message" value={form.data.message} onChange={(e) => form.setData('message', e.target.value)} rows={6}
                                    placeholder="Describe your issue in detail…"
                                    className="border-input bg-background focus-visible:border-primary w-full rounded-md border px-3 py-2 text-sm outline-none"
                                />
                                {form.errors.message && <p className="text-sm text-red-600">{form.errors.message}</p>}
                            </div>
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />} Submit ticket
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
