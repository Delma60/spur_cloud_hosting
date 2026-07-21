<?php

namespace App\Support;

/**
 * Verifies the shared Spurs SSO cookie issued by `accounts`. First-party apps
 * read this cookie instead of running an OAuth token flow — sign in once at
 * accounts and you're signed in here too. Secret must match accounts.
 */
class SpursSession
{
    public static function cookieName(): string
    {
        return config('services.spurs.cookie', 'spurs_session');
    }

    private static function b64(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /** Verify a shared session token; returns its claims or null. */
    public static function verify(?string $token): ?array
    {
        if (! $token || substr_count($token, '.') !== 2) {
            return null;
        }
        [$header, $payload, $sig] = explode('.', $token);

        $expected = self::b64(hash_hmac('sha256', "$header.$payload", (string) config('services.spurs.secret'), true));
        if (! hash_equals($expected, $sig)) {
            return null;
        }

        $claims = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
        if (! is_array($claims) || empty($claims['sub'])) {
            return null;
        }
        if (isset($claims['exp']) && time() >= (int) $claims['exp']) {
            return null;
        }

        return $claims;
    }
}
