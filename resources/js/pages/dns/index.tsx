import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Network, Globe, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Domain { id: number; name: string; status: string; dns_records_count: number }

export default function DnsIndex({ domains = [] }: { domains?: Domain[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'DNS Management', href: route('dns.index') }]}>
            <Head title="DNS Management | Spurs Cloud" />
            <div className="flex-1 space-y-6 p-4 md:p-8 md:pt-6">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">DNS Management</h2>
                    <p className="text-muted-foreground text-sm md:text-lg">Choose a domain to manage its DNS records.</p>
                </div>

                {domains.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center py-16 text-center">
                            <span className="bg-muted grid h-14 w-14 place-items-center rounded-full"><Network className="text-muted-foreground h-6 w-6" /></span>
                            <p className="mt-4 font-medium">No domains to manage</p>
                            <p className="text-muted-foreground mt-1 max-w-xs text-sm">Register a domain first, then manage its DNS here.</p>
                            <Button asChild className="mt-5"><Link href={route('domains.register.get')}>Register a domain</Link></Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2">
                        {domains.map((d) => (
                            <Link key={d.id} href={route('dns.show', d.id)}>
                                <Card className="hover:border-primary/50 transition">
                                    <CardContent className="flex items-center justify-between p-5">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-primary/10 grid h-10 w-10 place-items-center rounded-lg"><Globe className="text-primary h-5 w-5" /></span>
                                            <div>
                                                <div className="font-medium">{d.name}</div>
                                                <div className="text-muted-foreground text-xs">{d.dns_records_count} record(s)</div>
                                            </div>
                                        </div>
                                        <ArrowRight className="text-muted-foreground h-4 w-4" />
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
