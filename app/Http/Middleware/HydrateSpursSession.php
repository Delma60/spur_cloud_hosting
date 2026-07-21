<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Support\SpursSession;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

/**
 * If the visitor carries a valid shared Spurs SSO cookie but isn't logged into
 * this app yet, sign them in (mirroring the Spurs user locally). This is what
 * makes "sign in once at accounts → signed in everywhere" work.
 */
class HydrateSpursSession
{
    public function handle(Request $request, Closure $next): Response
    {
        // Only ever sign the user IN from a valid shared cookie — never force a
        // logout here (that would eject already-authenticated users during the
        // transition, or whenever the cookie host doesn't match).
        if (! Auth::check()) {
            $claims = SpursSession::verify($request->cookie(SpursSession::cookieName()));

            if ($claims) {
                $user = User::updateOrCreate(
                    ['spurs_sub' => (string) $claims['sub']],
                    [
                        'name' => $claims['name'] ?? 'Spurs user',
                        'email' => $claims['email'] ?? $claims['sub'].'@spurs.local',
                        'email_verified_at' => now(),
                    ],
                );
                Auth::login($user);
            }
        }

        return $next($request);
    }
}
