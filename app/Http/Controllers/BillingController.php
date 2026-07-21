<?php

namespace App\Http\Controllers;

use App\Support\WalletClient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingController extends Controller
{
    /** Invoices = every domain/hosting purchase, unified. */
    public function invoices(Request $request)
    {
        $user = $request->user();

        $domainRows = $user->domains()->latest()->get()->map(fn ($d) => [
            'ref' => strtoupper(substr($d->pay_reference ?? 'dom'.$d->id, 0, 12)),
            'description' => "Domain — {$d->name}",
            'amount' => $d->price,
            'status' => $d->status === 'active' ? 'paid' : ($d->status === 'pending' ? 'unpaid' : $d->status),
            'date' => $d->created_at,
        ]);

        $serviceRows = $user->hostingServices()->latest()->get()->map(fn ($s) => [
            'ref' => strtoupper(substr($s->pay_reference ?? 'svc'.$s->id, 0, 12)),
            'description' => ucfirst($s->plan)." hosting — {$s->label}",
            'amount' => $s->price,
            'status' => $s->status === 'active' ? 'paid' : ($s->status === 'pending' ? 'unpaid' : $s->status),
            'date' => $s->created_at,
        ]);

        $invoices = $domainRows->concat($serviceRows)->sortByDesc('date')->values();

        return Inertia::render('billing/invoices', [
            'invoices' => $invoices,
            'totalPaid' => $invoices->where('status', 'paid')->sum('amount'),
            'totalDue' => $invoices->where('status', 'unpaid')->sum('amount'),
        ]);
    }

    public function paymentMethods()
    {
        return Inertia::render('billing/payment-methods');
    }

    public function addFunds(Request $request)
    {
        return Inertia::render('billing/add-funds', [
            'balances' => WalletClient::balances($request->user()->spurs_sub ?? ''),
        ]);
    }

    public function topup(Request $request)
    {
        $data = $request->validate(['amount' => ['required', 'numeric', 'min:100']]);
        $amount = (int) round($data['amount'] * 100); // kobo

        $result = WalletClient::startTopup(
            $request->user()->spurs_sub,
            $amount,
            route('billing.topup.return'),
        );

        return Inertia::location($result['checkoutUrl']);
    }

    public function topupReturn(Request $request)
    {
        if ($ref = $request->query('ref')) {
            WalletClient::verifyTopup($ref);
        }

        return redirect()->route('billing.add-funds')->with('status', 'Wallet updated.');
    }
}
