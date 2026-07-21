<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Entry/exit points for the shared Spurs SSO session. Actual authentication is
 * transparent (see HydrateSpursSession middleware) — this just bounces the user
 * to accounts to sign in, and ends the local session on sign out.
 */
class SpursController extends Controller
{
    /** Send an unauthenticated user to accounts to sign in, then back here. */
    public function login(Request $request)
    {
        $issuer = config('services.spurs.issuer');
        $returnTo = $request->query('return_to', route('dashboard'));

        return redirect($issuer.'/login?return_to='.urlencode($returnTo));
    }

    /** End the local session. The shared cookie is cleared by accounts on full sign-out. */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(config('services.spurs.issuer'));
    }
}
