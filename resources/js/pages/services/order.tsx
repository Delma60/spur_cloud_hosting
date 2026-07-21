import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Check, Server, Globe, Database, Mail, Search, ArrowRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function OrderService() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
    const [searchQuery, setSearchQuery] = useState('');

    const handleDomainSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Domain search logic will go here
        console.log('Searching for:', searchQuery);
    };

    return (
        <AppLayout>
            <Head title="Order New Service | Spurs Cloud" />

            <div className="flex-1 space-y-12 pb-12">
                
                {/* --- HERO: Domain Search --- */}
                <div className="bg-primary/5 border-b px-4 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                            Find your perfect domain name
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Secure your brand online. Enter your ideal domain name below to check availability and claim it before someone else does.
                        </p>
                        
                        <form onSubmit={handleDomainSearch} className="max-w-3xl mx-auto mt-8 relative flex items-center">
                            <Search className="absolute left-4 h-6 w-6 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Find yourdomain.com.ng..."
                                className="w-full h-16 pl-14 pr-32 text-lg rounded-full border-2 border-primary/20 bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                            />
                            <Button size="lg" type="submit" className="absolute right-2 h-12 rounded-full px-8 text-md">
                                Search
                            </Button>
                        </form>
                        
                        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-muted-foreground mt-6">
                            <span><strong className="text-foreground">.com.ng</strong> ₦1,200</span>
                            <span className="text-border">|</span>
                            <span><strong className="text-foreground">.com</strong> ₦18,500</span>
                            <span className="text-border">|</span>
                            <span><strong className="text-foreground">.net</strong> ₦20,000</span>
                            <span className="text-border">|</span>
                            <span><strong className="text-foreground">.org</strong> ₦21,500</span>
                        </div>
                    </div>
                </div>

                {/* --- HOSTING PACKAGES --- */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-6 gap-6">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Web Hosting Plans</h2>
                            <p className="text-muted-foreground text-lg">
                                High-performance NVMe hosting designed for speed and reliability.
                            </p>
                        </div>

                        {/* Billing Toggle */}
                        <div className="flex items-center p-1 bg-muted rounded-lg border shrink-0">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                    billingCycle === 'monthly' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('annually')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                                    billingCycle === 'annually' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Annually <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold hidden sm:inline-block">Save 20%</span>
                            </button>
                        </div>
                    </div>

                    {/* Horizontal Plan List */}
                    <div className="space-y-4">
                        
                        {/* Starter Plan */}
                        <div className="flex flex-col lg:flex-row items-center justify-between p-6 bg-card border rounded-xl hover:border-primary/50 transition-colors shadow-sm gap-6">
                            <div className="w-full lg:w-1/4">
                                <h3 className="text-2xl font-bold text-foreground">Starter</h3>
                                <p className="text-sm text-muted-foreground mt-1">Ideal for personal blogs and simple portfolios.</p>
                            </div>
                            <div className="w-full lg:w-2/4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary shrink-0"/> 1 Website</div>
                                <div className="flex items-center gap-2"><Database className="w-4 h-4 text-primary shrink-0"/> 5GB NVMe Storage</div>
                                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary shrink-0"/> 2 Email Accounts</div>
                                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0"/> Free Let's Encrypt SSL</div>
                            </div>
                            <div className="w-full lg:w-1/4 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                                <div className="text-right">
                                    <div className="text-3xl font-extrabold text-foreground">
                                        {billingCycle === 'monthly' ? '₦1,500' : '₦14,400'}
                                        <span className="text-sm font-normal text-muted-foreground">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1 mb-4 hidden lg:block">
                                        Renews at {billingCycle === 'monthly' ? '₦2,000/mo' : '₦19,200/yr'}
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full lg:w-auto">Order Now</Button>
                            </div>
                        </div>

                        {/* Business Plan (Highlighted) */}
                        <div className="flex flex-col lg:flex-row items-center justify-between p-6 bg-card border-2 border-primary rounded-xl relative shadow-md gap-6 overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                                Most Popular
                            </div>
                            <div className="w-full lg:w-1/4">
                                <h3 className="text-2xl font-bold text-foreground">Business</h3>
                                <p className="text-sm text-muted-foreground mt-1">For growing businesses and e-commerce stores.</p>
                            </div>
                            <div className="w-full lg:w-2/4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2 text-foreground font-medium"><Globe className="w-4 h-4 text-primary shrink-0"/> Unlimited Websites</div>
                                <div className="flex items-center gap-2 text-foreground font-medium"><Database className="w-4 h-4 text-primary shrink-0"/> 20GB NVMe Storage</div>
                                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary shrink-0"/> Unlimited Email Accounts</div>
                                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0"/> Free Domain (1st Year)</div>
                            </div>
                            <div className="w-full lg:w-1/4 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 border-primary/20 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                                <div className="text-right">
                                    <div className="text-3xl font-extrabold text-foreground">
                                        {billingCycle === 'monthly' ? '₦4,000' : '₦38,400'}
                                        <span className="text-sm font-normal text-muted-foreground">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1 mb-4 hidden lg:block">
                                        Renews at {billingCycle === 'monthly' ? '₦5,000/mo' : '₦48,000/yr'}
                                    </div>
                                </div>
                                <Button className="w-full lg:w-auto group">
                                    Order Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>

                        {/* Cloud Developer Plan */}
                        <div className="flex flex-col lg:flex-row items-center justify-between p-6 bg-card border rounded-xl hover:border-primary/50 transition-colors shadow-sm gap-6">
                            <div className="w-full lg:w-1/4">
                                <h3 className="text-2xl font-bold text-foreground">Developer Cloud</h3>
                                <p className="text-sm text-muted-foreground mt-1">Dedicated resources for modern apps and APIs.</p>
                            </div>
                            <div className="w-full lg:w-2/4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2 text-foreground font-medium"><Server className="w-4 h-4 text-primary shrink-0"/> 2 Dedicated vCPUs</div>
                                <div className="flex items-center gap-2 text-foreground font-medium"><Database className="w-4 h-4 text-primary shrink-0"/> 80GB Block Storage</div>
                                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0"/> Full Root Access</div>
                                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500 shrink-0"/> Docker & Node.js Ready</div>
                            </div>
                            <div className="w-full lg:w-1/4 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                                <div className="text-right">
                                    <div className="text-3xl font-extrabold text-foreground">
                                        {billingCycle === 'monthly' ? '₦15,000' : '₦144,000'}
                                        <span className="text-sm font-normal text-muted-foreground">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1 mb-4 hidden lg:block">
                                        Cancel anytime
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full lg:w-auto">Order Now</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}