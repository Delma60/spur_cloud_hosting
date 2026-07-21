import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Info, Save, Globe } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

// Mock data for the domain being edited
const domain = {
    id: 1,
    name: 'example-business.com.ng',
    currentNsType: 'custom', // 'default' or 'custom'
    nameservers: ['ns1.cloudflare.com', 'ns2.cloudflare.com', '', ''],
};

export default function EditNameservers() {
    const [nsType, setNsType] = useState<string>(domain.currentNsType);
    const [customNs, setCustomNs] = useState<string[]>(domain.nameservers);
    const [isSaving, setIsSaving] = useState(false);

    const handleNsChange = (index: number, value: string) => {
        const newNs = [...customNs];
        newNs[index] = value;
        setCustomNs(newNs);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            console.log('Saved nameservers:', nsType === 'default' ? 'Spurs Default' : customNs);
            // Here you would typically use Inertia.post or router.put to submit the data
        }, 1000);
    };

    return (
        <AppLayout>
            <Head title={`Nameservers: ${domain.name} | Spurs Cloud`} />

            <div className="flex-1 p-4 md:p-8 md:pt-6 space-y-6 md:space-y-8">

                {/* Back Navigation & Header */}
                <div>
                    <Button variant="ghost" size="sm" asChild className="-ml-3 mb-4 text-muted-foreground">
                        <Link href="/domains">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Domains
                        </Link>
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-lg shrink-0">
                            <Globe className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight break-all">
                                {domain.name}
                            </h2>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Manage Nameservers
                            </p>
                        </div>
                    </div>
                </div>

                <Alert className="bg-blue-50/50 border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-400">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertTitle>DNS Propagation Note</AlertTitle>
                    <AlertDescription>
                        Changes to nameservers can take anywhere from <strong>1 to 24 hours</strong> to fully propagate across the global internet. Your website or emails may be intermittently unavailable during this time.
                    </AlertDescription>
                </Alert>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Nameserver Configuration</CardTitle>
                            <CardDescription>
                                Determine where your domain's DNS zone is managed.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">

                            <RadioGroup
                                value={nsType}
                                onValueChange={setNsType}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                {/* Default Nameservers Option */}
                                <div>
                                    <RadioGroupItem value="default" id="ns-default" className="peer sr-only" />
                                    <Label
                                        htmlFor="ns-default"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                    >
                                        <div className="w-full text-left space-y-1">
                                            <p className="font-semibold text-foreground">Use Default Nameservers</p>
                                            <p className="text-xs text-muted-foreground font-normal">
                                                Manage your DNS records directly through your Spurs Cloud dashboard or cPanel.
                                            </p>
                                        </div>
                                    </Label>
                                </div>

                                {/* Custom Nameservers Option */}
                                <div>
                                    <RadioGroupItem value="custom" id="ns-custom" className="peer sr-only" />
                                    <Label
                                        htmlFor="ns-custom"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                    >
                                        <div className="w-full text-left space-y-1">
                                            <p className="font-semibold text-foreground">Use Custom Nameservers</p>
                                            <p className="text-xs text-muted-foreground font-normal">
                                                Point your domain to external providers like Cloudflare, Wix, or Shopify.
                                            </p>
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>

                            {/* Custom Nameserver Inputs (Only show if 'custom' is selected) */}
                            {nsType === 'custom' && (
                                <div className="space-y-4 pt-4 border-t border-dashed">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="ns1">Nameserver 1 <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="ns1"
                                                placeholder="e.g. ns1.example.com"
                                                value={customNs[0]}
                                                onChange={(e) => handleNsChange(0, e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="ns2">Nameserver 2 <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="ns2"
                                                placeholder="e.g. ns2.example.com"
                                                value={customNs[1]}
                                                onChange={(e) => handleNsChange(1, e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="ns3">Nameserver 3 <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                            <Input
                                                id="ns3"
                                                placeholder="e.g. ns3.example.com"
                                                value={customNs[2]}
                                                onChange={(e) => handleNsChange(2, e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="ns4">Nameserver 4 <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                                            <Input
                                                id="ns4"
                                                placeholder="e.g. ns4.example.com"
                                                value={customNs[3]}
                                                onChange={(e) => handleNsChange(3, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t px-6 py-4">
                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Nameservers
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
