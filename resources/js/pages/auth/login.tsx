import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export default function Login() {
    return (
        <>
            <Head title="Log in | Spurs Cloud" />

            <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground p-6">
                <div className="w-full max-w-md p-8 bg-card border border-border rounded-2xl shadow-lg text-center">

                    {/* Brand / Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight mb-2">Sign in to Spurs Cloud</h2>
                    <p className="text-muted-foreground mb-8 text-sm">
                        Authentication is managed securely through your centralized Spurs Account.
                    </p>

                    {/* SSO Redirect Button */}
                    <Button
                        asChild
                        size="lg"
                        className="w-full text-md h-12"
                    >
                        {/* Point this href to the Socialite redirect route we created earlier */}
                        <a href="/auth/spurs">
                            Continue with Spurs SSO
                        </a>
                    </Button>

                    <div className="mt-8 text-xs text-muted-foreground">
                        <p>Secure Single Sign-On provided by Spurs.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
