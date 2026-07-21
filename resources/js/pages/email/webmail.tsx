import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, LogIn } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function Webmail() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Business Email', href: route('email.inboxes') }, { title: 'Webmail', href: route('email.webmail') }]}>
            <Head title="Webmail Login | Spurs Cloud" />
            <div className="grid flex-1 place-items-center p-4 md:p-8">
                <div className="w-full max-w-sm">
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground mb-4 -ml-2">
                        <Link href={route('email.inboxes')}><ArrowLeft className="mr-2 h-4 w-4" /> Business Email</Link>
                    </Button>
                    <Card>
                        <CardContent className="space-y-5 p-6">
                            <div className="text-center">
                                <span className="bg-primary/10 text-primary mx-auto grid h-12 w-12 place-items-center rounded-2xl"><Mail className="h-6 w-6" /></span>
                                <h2 className="mt-3 text-lg font-semibold">Spurs Webmail</h2>
                                <p className="text-muted-foreground text-sm">Sign in to your mailbox.</p>
                            </div>
                            <div className="space-y-3">
                                <div className="space-y-1.5"><Label htmlFor="email">Email address</Label><Input id="email" type="email" placeholder="you@yourbusiness.com" className="h-11" /></div>
                                <div className="space-y-1.5"><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="••••••••" className="h-11" /></div>
                            </div>
                            <Button className="w-full"><LogIn className="mr-2 h-4 w-4" /> Sign in to Webmail</Button>
                            <p className="text-muted-foreground text-center text-xs">Mailbox passwords are separate from your Spurs account.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
