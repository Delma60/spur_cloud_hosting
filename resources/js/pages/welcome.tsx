import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageProps } from '@/types';
import { Search, Globe, Server, Mail, Shield, Check, LayoutDashboard, Zap } from 'lucide-react';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Spurs Cloud | Domains, Web Hosting & Business Email" />

            <div className="min-h-screen bg-background text-foreground flex flex-col">
                {/* Navigation */}
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto flex h-16 items-center justify-between px-6">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold tracking-tighter text-primary">Spurs Cloud.</span>
                        </div>

                        <nav className="flex items-center gap-6">
                            <div className="hidden md:flex space-x-6 text-sm font-medium text-muted-foreground">
                                <Link href="#domains" className="hover:text-foreground transition-colors">Domains</Link>
                                <Link href="#hosting" className="hover:text-foreground transition-colors">Web Hosting</Link>
                                <Link href="#email" className="hover:text-foreground transition-colors">Business Email</Link>
                                <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                            </div>

                            <div className="flex items-center space-x-4 ml-4">
                                {auth.user ? (
                                    <Link href="/dashboard">
                                        <Button variant="default">Client Area</Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button>Get Started</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                <main className="flex-1">
                    {/* Hero Section with Domain Search */}
                    <section className="container mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto mb-6">
                            Everything you need to <br className="hidden md:block" />
                            <span className="text-primary">get your business online.</span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
                            Fast, secure, and affordable web hosting. Register your perfect domain name and launch your website in minutes with Spurs Cloud.
                        </p>

                        {/* Domain Search Component */}
                        <div id="domains" className="max-w-3xl mx-auto bg-card border rounded-xl p-2 shadow-sm flex flex-col sm:flex-row items-center gap-2 mb-8">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Find your perfect .com, .com.ng, or .africa..."
                                    className="w-full pl-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                                />
                            </div>
                            <Button size="lg" className="w-full sm:w-auto px-8">
                                Search Domain
                            </Button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground">
                            <span>.com <strong className="text-foreground">₦15,000</strong></span>
                            <span>&bull;</span>
                            <span>.net <strong className="text-foreground">₦18,000</strong></span>
                            <span>&bull;</span>
                            <span>.com.ng <strong className="text-foreground">₦5,000</strong></span>
                        </div>
                    </section>

                    {/* Core Services Grid */}
                    <section id="hosting" className="bg-muted/30 border-t py-24">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Powerful Tools, Simple Management</h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                                    We provide the industry-standard tools you need to build, manage, and protect your online presence.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card className="bg-background border-muted hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <LayoutDashboard className="h-10 w-10 text-primary mb-4" />
                                        <CardTitle>cPanel Included</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            Manage your website, files, databases, and domains easily from the world's most popular control panel.
                                        </CardDescription>
                                    </CardContent>
                                </Card>

                                <Card className="bg-background border-muted hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <Zap className="h-10 w-10 text-primary mb-4" />
                                        <CardTitle>1-Click WordPress</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            Install WordPress, Joomla, or over 300 other applications instantly with our Softaculous auto-installer.
                                        </CardDescription>
                                    </CardContent>
                                </Card>

                                <Card id="email" className="bg-background border-muted hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <Mail className="h-10 w-10 text-primary mb-4" />
                                        <CardTitle>Business Email</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            Look professional with custom email addresses (you@yourdomain.com) included with every hosting plan.
                                        </CardDescription>
                                    </CardContent>
                                </Card>

                                <Card className="bg-background border-muted hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <Shield className="h-10 w-10 text-primary mb-4" />
                                        <CardTitle>Free SSL Certificates</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            Keep your visitors safe and boost your Google rankings with free, auto-renewing SSL certificates.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Shared Hosting Pricing */}
                    <section id="pricing" className="bg-muted/30 border-t py-24">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Affordable Web Hosting</h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                                    Choose the perfect plan for your blog, portfolio, or business website.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                {/* Starter Plan */}
                                <Card className="bg-background flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Starter</CardTitle>
                                        <CardDescription>Perfect for personal blogs and portfolios.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="mb-6">
                                            <span className="text-4xl font-extrabold">₦1,500</span>
                                            <span className="text-muted-foreground">/month</span>
                                        </div>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 1 Website</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 5GB NVMe Storage</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unmetered Bandwidth</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 2 Professional Emails</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Free SSL Certificate</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">Choose Starter</Button>
                                    </CardFooter>
                                </Card>

                                {/* Professional Plan (Highlighted) */}
                                <Card className="bg-background border-primary shadow-lg flex flex-col relative scale-105 z-10">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Best Value
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Business</CardTitle>
                                        <CardDescription>For growing businesses and online stores.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="mb-6">
                                            <span className="text-4xl font-extrabold">₦4,000</span>
                                            <span className="text-muted-foreground">/month</span>
                                        </div>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Websites</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 20GB NVMe Storage</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unmetered Bandwidth</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Emails</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Free .com.ng Domain (1st Year)</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Choose Business</Button>
                                    </CardFooter>
                                </Card>

                                {/* Premium/Scale Plan */}
                                <Card className="bg-background flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Premium</CardTitle>
                                        <CardDescription>Maximum performance for heavy traffic.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="mb-6">
                                            <span className="text-4xl font-extrabold">₦9,000</span>
                                            <span className="text-muted-foreground">/month</span>
                                        </div>
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Websites</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 50GB NVMe Storage</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Free Daily Backups</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Advanced Security Tools</li>
                                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Priority 24/7 Support</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">Choose Premium</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t py-12 mt-auto">
                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
                        <div>
                            <h3 className="font-bold mb-4 text-foreground">Spurs Cloud</h3>
                            <p className="text-muted-foreground">Reliable web hosting and domain registration for businesses of all sizes.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 text-foreground">Services</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><Link href="#" className="hover:text-primary">Domain Registration</Link></li>
                                <li><Link href="#" className="hover:text-primary">Shared Web Hosting</Link></li>
                                <li><Link href="#" className="hover:text-primary">WordPress Hosting</Link></li>
                                <li><Link href="#" className="hover:text-primary">Professional Email</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 text-foreground">Support</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><Link href="#" className="hover:text-primary">Knowledge Base</Link></li>
                                <li><Link href="#" className="hover:text-primary">Submit a Ticket</Link></li>
                                <li><Link href="#" className="hover:text-primary">System Status</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 text-foreground">Company</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                                <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
                                <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="container mx-auto px-6 text-center text-sm text-muted-foreground border-t pt-8">
                        <p>&copy; {new Date().getFullYear()} Spurs Cloud. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
