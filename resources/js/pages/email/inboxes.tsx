import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Check, Globe, ExternalLink, Inbox } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Domain { id: number; name: string }
interface Plan { name: string; price: number; inboxes: number | string; storage: string }
const naira = (kobo: number) => '₦' + (kobo / 100).toLocaleString('en-NG');

export default function EmailInboxes({ domains = [], plans = [] }: { domains?: Domain[]; plans?: Plan[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Business Email', href: route('email.inboxes') }]}>
            <Head title="Business Email | Spurs Cloud" />
            <div className="flex-1 space-y-10 pb-12">
                <div className="from-primary/10 border-b bg-gradient-to-b to-transparent px-4 py-14 text-center">
                    <div className="mx-auto max-w-2xl space-y-3">
                        <span className="bg-primary/10 text-primary mx-auto grid h-12 w-12 place-items-center rounded-2xl"><Mail className="h-6 w-6" /></span>
                        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Professional email for your domain</h1>
                        <p className="text-muted-foreground text-lg">you@yourbusiness.com — ad-free, secure, with generous storage.</p>
                    </div>
                </div>

                {/* Your domains */}
                <div className="mx-auto max-w-4xl px-4">
                    <h3 className="mb-3 font-semibold">Set up email on your domains</h3>
                    {domains.length === 0 ? (
                        <Card><CardContent className="flex flex-col items-center py-10 text-center">
                            <span className="bg-muted grid h-12 w-12 place-items-center rounded-full"><Globe className="text-muted-foreground h-5 w-5" /></span>
                            <p className="mt-3 text-sm font-medium">No active domains yet</p>
                            <p className="text-muted-foreground mt-1 text-sm">Register a domain to create matching inboxes.</p>
                            <Button asChild className="mt-4"><Link href={route('domains.register.get')}>Register a domain</Link></Button>
                        </CardContent></Card>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2">
                            {domains.map((d) => (
                                <Card key={d.id}><CardContent className="flex items-center justify-between p-5">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-primary/10 grid h-10 w-10 place-items-center rounded-lg"><Inbox className="text-primary h-5 w-5" /></span>
                                        <div><div className="font-medium">{d.name}</div><div className="text-muted-foreground text-xs">No inboxes yet</div></div>
                                    </div>
                                    <Button size="sm" variant="outline">Set up</Button>
                                </CardContent></Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Plans */}
                <div className="mx-auto max-w-5xl px-4">
                    <h3 className="mb-4 text-center font-semibold">Email plans</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                        {plans.map((plan, i) => (
                            <Card key={plan.name} className={i === 1 ? 'border-primary border-2 shadow-lg' : ''}>
                                <CardContent className="space-y-4 p-6">
                                    <div className="font-bold">{plan.name}</div>
                                    <div><span className="text-3xl font-extrabold">{naira(plan.price)}</span><span className="text-muted-foreground text-sm">/mo</span></div>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> {typeof plan.inboxes === 'number' ? `${plan.inboxes} inbox(es)` : `${plan.inboxes} inboxes`}</li>
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> {plan.storage} per inbox</li>
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Webmail & IMAP/SMTP</li>
                                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Spam & virus protection</li>
                                    </ul>
                                    <Button className="w-full" variant={i === 1 ? 'default' : 'outline'}>Choose {plan.name}</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-4">
                    <Card className="bg-muted/40 flex flex-col items-center justify-between gap-3 p-6 sm:flex-row">
                        <div className="flex items-center gap-3"><Mail className="text-primary h-5 w-5" /><span className="text-sm">Already have inboxes? Check your mail on the go.</span></div>
                        <Button variant="outline" asChild><Link href={route('email.webmail')}>Open Webmail <ExternalLink className="ml-2 h-4 w-4" /></Link></Button>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
