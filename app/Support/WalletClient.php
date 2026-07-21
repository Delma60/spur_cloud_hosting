<?php

namespace App\Support;

use Illuminate\Support\Facades\Http;

/**
 * Talks to Spurs Wallet's private API. Cloud reads the user's balance and starts
 * fiat top-ups (which route through Spurs Pay under the hood).
 */
class WalletClient
{
    private static function base(): string
    {
        return config('services.wallet.url', 'http://localhost:3200');
    }

    private static function headers(): array
    {
        return ['x-internal-secret' => (string) config('services.internal_secret')];
    }

    /** @return array<int,array{asset:string,balance:string,display:string}> */
    public static function balances(string $user): array
    {
        $res = Http::withHeaders(self::headers())->acceptJson()->get(self::base().'/api/private/wallet', ['user' => $user]);

        return $res->successful() ? ($res->json('balances') ?? []) : [];
    }

    /** Start a fiat top-up; returns ['checkoutUrl'=>..., 'reference'=>...]. */
    public static function startTopup(string $user, int $amount, string $callbackUrl): array
    {
        $res = Http::withHeaders(self::headers())->acceptJson()->post(self::base().'/api/private/wallet/topup', [
            'user' => $user,
            'amount' => $amount,
            'callbackUrl' => $callbackUrl,
        ]);
        abort_unless($res->successful(), 502, 'Could not start top-up.');

        return $res->json();
    }

    /** Confirm + credit a top-up (idempotent). */
    public static function verifyTopup(string $reference): array
    {
        $res = Http::withHeaders(self::headers())->acceptJson()->post(self::base().'/api/private/wallet/topup/verify', [
            'reference' => $reference,
        ]);

        return $res->successful() ? $res->json() : ['status' => 'failed'];
    }
}
