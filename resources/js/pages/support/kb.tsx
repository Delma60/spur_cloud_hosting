import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Clock, ArrowLeft, FileText } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Article { title: string; category: string; minutes: number }

const catColor: Record<string, string> = {
    Domains: 'bg-sky-500/10 text-sky-600',
    Email: 'bg-violet-500/10 text-violet-600',
    DNS: 'bg-indigo-500/10 text-indigo-600',
    Billing: 'bg-amber-500/10 text-amber-600',
    Hosting: 'bg-emerald-500/10 text-emerald-600',
    Security: 'bg-red-500/10 text-red-600',
};

export default function KnowledgeBase({ articles = [] }: { articles?: Article[] }) {
    const [q, setQ] = useState('');
    const filtered = articles.filter((a) => (a.title + a.category).toLowerCase().includes(q.toLowerCase()));

    return (
        <AppLayout breadcrumbs={[{ title: 'Support', href: route('support.tickets') }, { title: 'Knowledge base', href: route('support.kb') }]}>
            <Head title="Knowledge Base | Spurs Cloud" />
            <div className="flex-1 space-y-8 pb-12">
                <div className="from-primary/10 border-b bg-gradient-to-b to-transparent px-4 py-14 text-center">
                    <div className="mx-auto max-w-2xl space-y-4">
                        <span className="bg-primary/10 text-primary mx-auto grid h-12 w-12 place-items-center rounded-2xl"><BookOpen className="h-6 w-6" /></span>
                        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">How can we help?</h1>
                        <div className="relative mx-auto max-w-lg">
                            <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="border-input bg-background focus:border-primary h-12 w-full rounded-full border-2 pr-4 pl-12 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl space-y-4 px-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{q ? `${filtered.length} result(s)` : 'Popular articles'}</h3>
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground"><Link href={route('support.tickets')}><ArrowLeft className="mr-1 h-4 w-4" /> Back to support</Link></Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {filtered.map((a) => (
                            <Card key={a.title} className="hover:border-primary/50 cursor-pointer transition">
                                <CardContent className="flex items-start gap-3 p-5">
                                    <span className="bg-muted text-muted-foreground grid h-9 w-9 shrink-0 place-items-center rounded-lg"><FileText className="h-4 w-4" /></span>
                                    <div className="min-w-0">
                                        <div className="font-medium">{a.title}</div>
                                        <div className="mt-1.5 flex items-center gap-2">
                                            <span className={`rounded px-2 py-0.5 text-[11px] font-medium ${catColor[a.category] ?? 'bg-muted'}`}>{a.category}</span>
                                            <span className="text-muted-foreground flex items-center gap-1 text-xs"><Clock className="h-3 w-3" /> {a.minutes} min read</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {filtered.length === 0 && <p className="text-muted-foreground py-10 text-center">No articles match &quot;{q}&quot;. <Link href={route('support.open')} className="text-primary underline">Open a ticket</Link> instead.</p>}
                </div>
            </div>
        </AppLayout>
    );
}
