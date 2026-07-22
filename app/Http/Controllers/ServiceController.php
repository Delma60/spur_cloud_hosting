<?php

namespace App\Http\Controllers;

use App\Models\HostingService;
use SpursCloud\Pay\SpursPayInternal;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /** Web hosting plans. Prices are minor units (kobo) per month. */
    public const PLANS = [
        'starter' => ['name' => 'Starter', 'price' => 400000, 'sites' => 1, 'storage' => '10 GB'],
        'business' => ['name' => 'Business', 'price' => 800000, 'sites' => 10, 'storage' => '50 GB'],
        'pro' => ['name' => 'Pro', 'price' => 2000000, 'sites' => 'Unlimited', 'storage' => '200 GB'],
    ];

    public function order(Request $request)
    {
        return Inertia::render('services/order', [
            'plans' => self::PLANS,
            'services' => $request->user()->hostingServices()->latest()->get(),
        ]);
    }

    public function sharedHosting(Request $request)
    {
        return Inertia::render('services/shared-hosting', [
            'plans' => self::PLANS,
            'services' => $request->user()->hostingServices()->where('status', 'active')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'plan' => ['required', 'string'],
            'label' => ['required', 'string', 'max:120'],
        ]);
        abort_unless(isset(self::PLANS[$data['plan']]), 422, 'Unknown plan');

        $user = $request->user();
        $plan = self::PLANS[$data['plan']];

        $service = $user->hostingServices()->create([
            'label' => $data['label'],
            'plan' => $data['plan'],
            'status' => 'pending',
            'price' => $plan['price'],
            'currency' => 'NGN',
        ]);

        $payment = app(SpursPayInternal::class)->createPayment([
            'merchant' => $user->spurs_sub,
            'businessName' => $user->name,
            'amount' => $plan['price'],
            'currency' => 'NGN',
            'description' => "{$plan['name']} hosting — {$data['label']}",
            'reference' => 'svc_'.Str::random(18),
            'callbackUrl' => route('services.return', $service),
        ]);

        $service->update(['pay_reference' => $payment['reference']]);

        return Inertia::location($payment['checkoutUrl']);
    }

    public function paymentReturn(Request $request, HostingService $service)
    {
        abort_unless($service->user_id === $request->user()->id, 403);

        $payment = $service->pay_reference ? app(SpursPayInternal::class)->getPayment($service->pay_reference) : null;
        if (($payment['status'] ?? null) === 'successful' && $service->status !== 'active') {
            $service->update(['status' => 'active', 'renews_at' => now()->addMonth()]);
        }

        return redirect()->route('services.show', $service)->with(
            'status',
            $service->status === 'active' ? 'Hosting activated.' : 'Payment is still processing.'
        );
    }

    public function show(Request $request, HostingService $service)
    {
        abort_unless($service->user_id === $request->user()->id, 403);

        return Inertia::render('services/show', [
            'service' => $service,
            'plan' => self::PLANS[$service->plan] ?? null,
        ]);
    }
}
