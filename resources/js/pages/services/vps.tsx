import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, MemoryStick, HardDrive, Gauge, Check, Zap, ShieldCheck, Server } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Plan { name: string; price: number; cpu: string; ram: string; storage: string; bandwidth: string }
const naira = (kobo: number) => '₦' + (kobo / 100).toLocaleString('en-NG');

export default function Vps({ plans = [] }: { plans?: Plan[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Services', href: route('services.shared-hosting') }, { title: 'Cloud VPS', href: route('services.vps') }]}>
            <Head title="Cloud VPS | Spurs Cloud" />
            <div className="flex-1 space-y-12 pb-12">
                {/* Hero */}
                <div className="from-primary/10 border-b bg-gradient-to-b to-transparent px-4 py-16 text-center md:py-20">
                    <div className="mx-auto max-w-2xl space-y-4">
                        <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"><Zap className="h-3.5 w-3.5" /> NVMe · Root access · Deploy in seconds</span>
                        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">Cloud VPS built for speed</h1>
                        <p className="text-muted-foreground text-lg">Full root access, blazing NVMe storage and dedicated resources. Scale up any time.</p>
                    </div>
                </div>

                {/* Plans */}
                <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-3">
                    {plans.map((plan, i) => (
                        <Card key={plan.name} className={i === 1 ? 'border-primary relative border-2 shadow-lg' : ''}>
                            {i === 1 && <span className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-medium">Recommended</span>}
                            <CardContent className="space-y-5 p-6">
                                <div className="flex items-center gap-2">
                                    <span className="bg-primary/10 text-primary grid h-9 w-9 place-items-center rounded-lg"><Server className="h-5 w-5" /></span>
                                    <span className="text-lg font-bold">{plan.name}</span>
                                </div>
                                <div><span className="text-3xl font-extrabold">{naira(plan.price)}</span><span className="text-muted-foreground text-sm">/mo</span></div>
                                <ul className="space-y-2.5 text-sm">
                                    <Spec icon={<Cpu className="h-4 w-4" />}>{plan.cpu}</Spec>
                                    <Spec icon={<MemoryStick className="h-4 w-4" />}>{plan.ram} RAM</Spec>
                                    <Spec icon={<HardDrive className="h-4 w-4" />}>{plan.storage}</Spec>
                                    <Spec icon={<Gauge className="h-4 w-4" />}>{plan.bandwidth} bandwidth</Spec>
                                </ul>
                                <Button className="w-full" variant={i === 1 ? 'default' : 'outline'} asChild>
                                    <Link href={route('services.order')}>Deploy {plan.name}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Feature strip */}
                <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:grid-cols-3">
                    {[
                        { icon: Check, title: 'Full root access', desc: 'Install anything, your way.' },
                        { icon: Zap, title: 'NVMe SSD', desc: 'Up to 10× faster disk I/O.' },
                        { icon: ShieldCheck, title: 'Free snapshots', desc: 'Back up and restore in a click.' },
                    ].map((f) => (
                        <div key={f.title} className="text-center">
                            <span className="bg-muted text-primary mx-auto grid h-11 w-11 place-items-center rounded-full"><f.icon className="h-5 w-5" /></span>
                            <h4 className="mt-3 font-semibold">{f.title}</h4>
                            <p className="text-muted-foreground mt-1 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

function Spec({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return <li className="flex items-center gap-2.5"><span className="text-muted-foreground">{icon}</span>{children}</li>;
}
