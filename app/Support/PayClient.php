<?php

namespace App\Support;

use Illuminate\Support\Facades\Http;

/**
 * Talks to Spurs Pay's private API to take payment for domains/hosting. Cloud is
 * a trusted first-party service, so it authenticates with the shared secret.
 * Cloud never learns which processor Spurs Pay used underneath.
 */
class PayClient
{
    private static function base(): string
    {
        return config('services.pay.url', 'http://localhost:3100');
    }

    private static function secret(): string
    {
        return (string) config('services.internal_secret');
    }

    /**
     * Create a payment for a Spurs user. Returns ['reference'=>..., 'checkoutUrl'=>...]
     * @param  array<string,mixed>  $data
     * @return array<string,mixed>
     */
    public static function createPayment(array $data): array
    {
        $res = Http::withHeaders(['x-internal-secret' => self::secret()])
            ->acceptJson()
            ->post(self::base().'/api/private/payments', $data);

        abort_unless($res->successful(), 502, 'Payment could not be started.');

        return $res->json('data');
    }

    /** Fetch a payment by reference (to verify status). */
    public static function getPayment(string $reference): ?array
    {
        $res = Http::withHeaders(['x-internal-secret' => self::secret()])
            ->acceptJson()
            ->get(self::base().'/api/private/payments', ['reference' => $reference]);

        if ($res->status() === 404) {
            return null;
        }
        abort_unless($res->successful(), 502, 'Could not verify payment.');

        return $res->json('data');
    }
}
