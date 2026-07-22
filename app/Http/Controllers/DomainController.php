<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use App\Support\DomainRegistry;
use SpursCloud\Pay\SpursPayInternal;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DomainController extends Controller
{
    public function dashboard(Request $request)
    {
        $user = $request->user();

        return Inertia::render('dashboard', [
            'stats' => [
                'domains' => $user->domains()->count(),
                'active_domains' => $user->domains()->where('status', 'active')->count(),
                'services' => $user->hostingServices()->where('status', 'active')->count(),
            ],
            'recentDomains' => $user->domains()->latest()->take(5)->get(),
            'recentServices' => $user->hostingServices()->latest()->take(5)->get(),
        ]);
    }

    public function index(Request $request)
    {
        return Inertia::render('domain/index', [
            'domains' => $request->user()->domains()->latest()->get(),
        ]);
    }

    public function transferForm()
    {
        return Inertia::render('domain/transfer');
    }

    public function transfer(Request $request)
    {
        $data = $request->validate([
            'domain' => ['required', 'string', 'max:253'],
            'auth_code' => ['required', 'string', 'max:100'],
        ]);

        $user = $request->user();
        $name = strtolower(trim($data['domain']));
        $tld = str_contains($name, '.') ? substr($name, strpos($name, '.') + 1) : 'com';

        if ($user->domains()->where('name', $name)->exists()) {
            return back()->withErrors(['domain' => 'That domain is already in your account.']);
        }

        // Transfers include one year of registration; record as pending.
        $price = DomainRegistry::priceFor($tld);
        $domain = $user->domains()->create([
            'name' => $name, 'tld' => $tld, 'status' => 'pending',
            'price' => $price, 'currency' => 'NGN', 'years' => 1,
        ]);

        $payment = app(SpursPayInternal::class)->createPayment([
            'merchant' => $user->spurs_sub,
            'businessName' => $user->name,
            'amount' => $price,
            'currency' => 'NGN',
            'description' => "Domain transfer — {$name}",
            'reference' => 'trf_'.Str::random(18),
            'callbackUrl' => route('domains.return', $domain),
        ]);
        $domain->update(['pay_reference' => $payment['reference']]);

        return Inertia::location($payment['checkoutUrl']);
    }

    public function registerForm()
    {
        return Inertia::render('domain/register', ['query' => '', 'results' => []]);
    }

    public function search(Request $request)
    {
        $query = (string) $request->query('q', '');

        return Inertia::render('domain/register', [
            'query' => $query,
            'results' => DomainRegistry::search($query),
        ]);
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'fqdn' => ['required', 'string', 'max:253'],
            'tld' => ['required', 'string'],
            'years' => ['nullable', 'integer', 'min:1', 'max:10'],
        ]);

        $user = $request->user();
        $years = $data['years'] ?? 1;
        $price = DomainRegistry::priceFor($data['tld']) * $years;

        if ($user->domains()->where('name', $data['fqdn'])->exists()) {
            return back()->withErrors(['fqdn' => 'You already own that domain.']);
        }

        $domain = $user->domains()->create([
            'name' => $data['fqdn'],
            'tld' => $data['tld'],
            'status' => 'pending',
            'price' => $price,
            'currency' => 'NGN',
            'years' => $years,
        ]);

        $payment = app(SpursPayInternal::class)->createPayment([
            'merchant' => $user->spurs_sub,
            'businessName' => $user->name,
            'amount' => $price,
            'currency' => 'NGN',
            'description' => "Domain registration — {$data['fqdn']} ({$years}yr)",
            'reference' => 'dom_'.Str::random(18),
            'callbackUrl' => route('domains.return', $domain),
        ]);

        $domain->update(['pay_reference' => $payment['reference']]);

        // Off to the hosted Spurs Pay checkout (external app).
        return Inertia::location($payment['checkoutUrl']);
    }

    public function paymentReturn(Request $request, Domain $domain)
    {
        abort_unless($domain->user_id === $request->user()->id, 403);

        $payment = $domain->pay_reference ? app(SpursPayInternal::class)->getPayment($domain->pay_reference) : null;

        if (($payment['status'] ?? null) === 'successful' && $domain->status !== 'active') {
            $domain->update([
                'status' => 'active',
                'expires_at' => now()->addYears($domain->years),
                'nameservers' => ['ns1.spurscloud.ng', 'ns2.spurscloud.ng'],
            ]);
        }

        return redirect()->route('domains.show', $domain)->with(
            'status',
            $domain->status === 'active' ? 'Domain registered successfully.' : 'Payment is still processing.'
        );
    }

    public function show(Request $request, Domain $domain)
    {
        abort_unless($domain->user_id === $request->user()->id, 403);

        return Inertia::render('domain/show', ['domain' => $domain]);
    }

    public function nameservers(Request $request, Domain $domain)
    {
        abort_unless($domain->user_id === $request->user()->id, 403);

        return Inertia::render('domain/nameservers', ['domain' => $domain]);
    }

    public function updateNameservers(Request $request, Domain $domain)
    {
        abort_unless($domain->user_id === $request->user()->id, 403);

        $data = $request->validate([
            'nameservers' => ['array'],
            'nameservers.*' => ['nullable', 'string', 'max:253'],
        ]);
        $ns = array_values(array_filter(
            array_map('trim', $data['nameservers'] ?? []),
            fn ($n) => $n !== '',
        ));

        $domain->update(['nameservers' => $ns]);

        return back()->with('status', 'Nameservers updated.');
    }
}

