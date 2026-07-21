import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, CheckCircle2, XCircle, ArrowLeft, Loader2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Result {
    fqdn: string;
    tld: string;
    available: boolean;
    price: number;
}

const naira = (kobo: number) => '₦' + (kobo / 100).toLocaleString('en-NG', { minimumFractionDigits: 0 });

export default function RegisterDomain({ query = '', results = [] }: { query?: string; results?: Result[] }) {
    const [q, setQ] = useState(query);
    const [searching, setSearching] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!q.trim()) return;
        setSearching(true);
        router.get(route('domains.search'), { q }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setSearching(false),
        });
    };

    const exact = results[0];
    const suggestions = results.slice(1);

    return (
        <AppLayout breadcrumbs={[{ title: 'Domains', href: route('domains.index') }, { title: 'Register', href: route('domains.register.get') }]}>
            <Head title="Register New Domain | Spurs Cloud" />

            <div className="flex-1 space-y-8 pb-16">
                {/* Hero search */}
                <div className="bg-primary/5 relative overflow-hidden border-b px-4 py-12 md:py-20">
                    <div className="absolute top-4 left-4 md:top-8 md:left-8">
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                            <Link href={route('domains.index')}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Domains</Link>
                        </Button>
                    </div>

                    <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
                        <h1 className="text-foreground text-3xl font-extrabold tracking-tight md:text-5xl">Search for your perfect domain</h1>
                        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                            Instantly check availability and secure your brand name before it&apos;s gone.
                        </p>

                        <form onSubmit={handleSearch} className="relative mx-auto mt-8 flex max-w-3xl items-center rounded-full shadow-lg">
                            <Search className="text-muted-foreground absolute left-6 h-6 w-6" />
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Enter your business name or idea..."
                                className="border-primary/20 bg-background focus:border-primary focus:ring-primary/10 h-16 w-full rounded-full border-2 pr-36 pl-16 text-lg transition-all focus:ring-4 focus:outline-none"
                                required
                            />
                            <Button size="lg" type="submit" disabled={searching} className="text-md absolute right-2 h-12 rounded-full px-6 font-bold md:px-8">
                                {searching ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Results */}
                <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
                    {exact && (
                        <Card className={`border-2 ${exact.available ? 'border-green-500/50 bg-green-50/30 dark:bg-green-950/10' : 'border-muted'}`}>
                            <CardContent className="flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:p-8">
                                <div className="flex items-center gap-4 text-center md:text-left">
                                    <div className={`shrink-0 rounded-full p-3 ${exact.available ? 'bg-green-500/20' : 'bg-muted'}`}>
                                        {exact.available ? <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" /> : <XCircle className="text-muted-foreground h-8 w-8" />}
                                    </div>
                                    <div>
                                        <h3 className="text-foreground text-2xl font-bold break-all">{exact.fqdn}</h3>
                                        <p className={`mt-1 font-medium ${exact.available ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                                            {exact.available ? "Available! Get it before it's gone." : 'Sorry, this domain is already taken.'}
                                        </p>
                                    </div>
                                </div>
                                {exact.available && <RegisterButton result={exact} big />}
                            </CardContent>
                        </Card>
                    )}

                    {suggestions.length > 0 && (
                        <div className="space-y-4">
                            <h4 className="text-foreground pl-1 text-lg font-bold">More extensions</h4>
                            <div className="bg-card divide-y overflow-hidden rounded-xl border">
                                {suggestions.map((item) => (
                                    <div key={item.fqdn} className="hover:bg-muted/30 flex flex-col items-center justify-between gap-4 p-4 transition-colors sm:flex-row sm:p-5">
                                        <div className="flex w-full items-center gap-3 sm:w-auto">
                                            <div className="flex w-8 shrink-0 justify-center">
                                                {item.available ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="text-muted-foreground/50 h-5 w-5" />}
                                            </div>
                                            <span className={`text-lg font-semibold ${item.available ? 'text-foreground' : 'text-muted-foreground line-through'}`}>{item.fqdn}</span>
                                        </div>
                                        {item.available ? (
                                            <div className="flex w-full items-center justify-between gap-6 sm:w-auto sm:gap-8">
                                                <span className="text-lg font-bold">{naira(item.price)}<span className="text-muted-foreground text-sm font-normal">/yr</span></span>
                                                <RegisterButton result={item} />
                                            </div>
                                        ) : (
                                            <span className="bg-muted text-muted-foreground rounded-md px-3 py-1 text-sm font-medium">Taken</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {query && results.length === 0 && (
                        <p className="text-muted-foreground py-12 text-center">No results. Try a different name.</p>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

function RegisterButton({ result, big }: { result: Result; big?: boolean }) {
    const form = useForm({ fqdn: result.fqdn, tld: result.tld, years: 1 });
    const buy = () => form.post(route('domains.register'));

    if (big) {
        return (
            <div className="flex w-full flex-col items-center gap-3 md:w-auto md:items-end">
                <div className="text-foreground text-3xl font-extrabold">{naira(result.price)}<span className="text-muted-foreground ml-1 text-sm font-normal">/yr</span></div>
                <Button size="lg" className="w-full md:w-44" disabled={form.processing} onClick={buy}>
                    {form.processing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Register & Pay'}
                </Button>
            </div>
        );
    }

    return (
        <Button variant="outline" className="w-28 shrink-0" disabled={form.processing} onClick={buy}>
            {form.processing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Register'}
        </Button>
    );
}
