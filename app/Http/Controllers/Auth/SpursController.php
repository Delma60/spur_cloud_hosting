<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

/**
 * Spurs SSO — cloud is an OpenID Connect client of the `accounts` provider.
 * Authorization-code flow with PKCE. No external package needed.
 */
class SpursController extends Controller
{
    public function redirect(Request $request)
    {
        $cfg = config('services.spurs');

        $state = Str::random(40);
        $verifier = Str::random(64);
        $challenge = rtrim(strtr(base64_encode(hash('sha256', $verifier, true)), '+/', '-_'), '=');

        $request->session()->put('spurs_state', $state);
        $request->session()->put('spurs_verifier', $verifier);

        $params = http_build_query([
            'response_type' => 'code',
            'client_id' => $cfg['client_id'],
            'redirect_uri' => $cfg['redirect'],
            'scope' => 'openid profile email',
            'state' => $state,
            'code_challenge' => $challenge,
            'code_challenge_method' => 'S256',
        ]);

        return redirect($cfg['issuer'].'/oauth/authorize?'.$params);
    }

    public function callback(Request $request)
    {
        $cfg = config('services.spurs');

        if ($request->query('state') !== $request->session()->pull('spurs_state')) {
            return redirect('/login')->withErrors(['spurs' => 'Sign-in expired. Please try again.']);
        }
        $verifier = $request->session()->pull('spurs_verifier');
        $code = $request->query('code');
        if (! $code || ! $verifier) {
            return redirect('/login')->withErrors(['spurs' => 'Sign-in failed. Please try again.']);
        }

        $token = Http::asForm()->post($cfg['issuer'].'/oauth/token', [
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => $cfg['redirect'],
            'client_id' => $cfg['client_id'],
            'client_secret' => $cfg['client_secret'],
            'code_verifier' => $verifier,
        ]);
        if (! $token->ok()) {
            return redirect('/login')->withErrors(['spurs' => 'Could not complete sign-in with Spurs.']);
        }

        $info = Http::withToken($token->json('access_token'))
            ->acceptJson()
            ->get($cfg['issuer'].'/oauth/userinfo');
        if (! $info->ok()) {
            return redirect('/login')->withErrors(['spurs' => 'Could not load your Spurs profile.']);
        }

        $sub = (string) $info->json('sub');
        $user = User::updateOrCreate(
            ['spurs_sub' => $sub],
            [
                'name' => $info->json('name') ?? $info->json('email') ?? 'Spurs user',
                'email' => $info->json('email') ?? $sub.'@spurs.local',
                'email_verified_at' => now(),
            ],
        );

        Auth::login($user, remember: true);
        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }
}
