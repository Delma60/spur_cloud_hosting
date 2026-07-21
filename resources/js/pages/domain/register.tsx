import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, CheckCircle2, XCircle, ShoppingCart, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

// Types for our mock search results
interface DomainResult {
    domain: string;
    available: boolean;
    price?: number;
    originalPrice?: number; // For strikethrough sales
}

export default function RegisterDomain() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    
    // Search Results State
    const [exactMatch, setExactMatch] = useState<DomainResult | null>(null);
    const [suggestions, setSuggestions] = useState<DomainResult[]>([]);
    
    // Cart State
    const [cart, setCart] = useState<DomainResult[]>([]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setHasSearched(false);

        // Simulate an API call to a domain registrar (e.g., eNom, ResellerClub, Namecheap API)
        setTimeout(() => {
            const baseName = searchQuery.split('.')[0].toLowerCase();
            
            // Mock exact match (randomly available or taken for demonstration)
            setExactMatch({
                domain: `${baseName}.com.ng`,
                available: true,
                price: 1200,
            });

            // Mock suggestions
            setSuggestions([
                { domain: `${baseName}.com`, available: false },
                { domain: `${baseName}.ng`, available: true, price: 5000 },
                { domain: `${baseName}.net`, available: true, price: 18000, originalPrice: 20000 },
                { domain: `${baseName}.org`, available: true, price: 19500 },
                { domain: `${baseName}.africa`, available: true, price: 4500 },
            ]);

            setIsSearching(false);
            setHasSearched(true);
        }, 1500);
    };

    const toggleCart = (domain: DomainResult) => {
        if (cart.find(item => item.domain === domain.domain)) {
            setCart(cart.filter(item => item.domain !== domain.domain));
        } else {
            setCart([...cart, domain]);
        }
    };

    const isInCart = (domainName: string) => {
        return cart.some(item => item.domain === domainName);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price || 0), 0);

    console.log("register")
    return (
        <AppLayout>
            <Head title="Register New Domain | Spurs Cloud" />

            <div className="flex-1 space-y-8 pb-24">
                
                {/* --- HERO SEARCH SECTION --- */}
                <div className="bg-primary/5 border-b px-4 py-12 md:py-20 relative overflow-hidden">
                    {/* Optional back button for navigation flow */}
                    <div className="absolute top-4 left-4 md:top-8 md:left-8">
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                            <Link href="/domains">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Domains
                            </Link>
                        </Button>
                    </div>

                    <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                            Search for your perfect domain
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Instantly check availability across hundreds of extensions. Secure your brand name before it's gone.
                        </p>
                        
                        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mt-8 relative flex items-center shadow-lg rounded-full">
                            <Search className="absolute left-6 h-6 w-6 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter your business name or idea..."
                                className="w-full h-16 pl-16 pr-36 text-lg rounded-full border-2 border-primary/20 bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                                required
                            />
                            <Button 
                                size="lg" 
                                type="submit" 
                                disabled={isSearching}
                                className="absolute right-2 h-12 rounded-full px-6 md:px-8 text-md font-bold"
                            >
                                {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* --- SEARCH RESULTS SECTION --- */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {isSearching && (
                        <div className="text-center py-12">
                            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-muted-foreground text-lg animate-pulse">Checking global domain registries...</p>
                        </div>
                    )}

                    {hasSearched && !isSearching && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            {/* Exact Match Result */}
                            {exactMatch && (
                                <Card className={`border-2 ${exactMatch.available ? 'border-green-500/50 bg-green-50/30 dark:bg-green-950/10' : 'border-muted'}`}>
                                    <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4 text-center md:text-left">
                                            {exactMatch.available ? (
                                                <div className="bg-green-500/20 p-3 rounded-full shrink-0">
                                                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
                                                </div>
                                            ) : (
                                                <div className="bg-muted p-3 rounded-full shrink-0">
                                                    <XCircle className="h-8 w-8 text-muted-foreground" />
                                                </div>
                                            )}
                                            
                                            <div>
                                                <h3 className="text-2xl font-bold tracking-tight text-foreground break-all">
                                                    {exactMatch.domain}
                                                </h3>
                                                {exactMatch.available ? (
                                                    <p className="text-green-600 dark:text-green-500 font-medium mt-1">Available! Get it before it's gone.</p>
                                                ) : (
                                                    <p className="text-muted-foreground font-medium mt-1">Sorry, this domain is already taken.</p>
                                                )}
                                            </div>
                                        </div>

                                        {exactMatch.available && (
                                            <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                                                <div className="text-3xl font-extrabold text-foreground">
                                                    ₦{exactMatch.price?.toLocaleString()}
                                                    <span className="text-sm font-normal text-muted-foreground ml-1">/yr</span>
                                                </div>
                                                <Button 
                                                    size="lg" 
                                                    className="w-full md:w-40"
                                                    variant={isInCart(exactMatch.domain) ? 'secondary' : 'default'}
                                                    onClick={() => toggleCart(exactMatch)}
                                                >
                                                    {isInCart(exactMatch.domain) ? 'Remove' : 'Add to Cart'}
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Suggested Extensions */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-bold text-foreground pl-1">Suggested Extensions</h4>
                                
                                <div className="border rounded-xl bg-card overflow-hidden divide-y">
                                    {suggestions.map((item, index) => (
                                        <div key={index} className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 hover:bg-muted/30 transition-colors gap-4">
                                            
                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <div className="w-8 flex justify-center shrink-0">
                                                    {item.available ? (
                                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 text-muted-foreground/50" />
                                                    )}
                                                </div>
                                                <span className={`font-semibold text-lg ${item.available ? 'text-foreground' : 'text-muted-foreground line-through decoration-muted-foreground/50'}`}>
                                                    {item.domain}
                                                </span>
                                            </div>

                                            {item.available ? (
                                                <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8">
                                                    <div className="text-right flex flex-col items-end">
                                                        {item.originalPrice && (
                                                            <span className="text-xs text-muted-foreground line-through">
                                                                ₦{item.originalPrice.toLocaleString()}
                                                            </span>
                                                        )}
                                                        <span className="font-bold text-lg">₦{item.price?.toLocaleString()}</span>
                                                    </div>
                                                    <Button 
                                                        variant={isInCart(item.domain) ? 'secondary' : 'outline'}
                                                        className="w-28 shrink-0"
                                                        onClick={() => toggleCart(item)}
                                                    >
                                                        {isInCart(item.domain) ? 'Added' : 'Add to Cart'}
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="w-full sm:w-auto text-right sm:text-left">
                                                    <span className="text-sm font-medium bg-muted text-muted-foreground px-3 py-1 rounded-md">Taken</span>
                                                </div>
                                            )}

                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                {/* --- FLOATING CART ACTION BAR --- */}
                {cart.length > 0 && (
                    <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-background border-t shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)] p-4 z-50 animate-in slide-in-from-bottom-full duration-300">
                        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full relative">
                                    <ShoppingCart className="h-6 w-6 text-primary" />
                                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cart.length}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Order Total</p>
                                    <p className="text-2xl font-extrabold text-foreground">₦{cartTotal.toLocaleString()}</p>
                                </div>
                            </div>
                            
                            <Button size="lg" className="w-full sm:w-auto group">
                                Continue to Cart 
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}