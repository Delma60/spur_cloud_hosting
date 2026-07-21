<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\HydrateSpursSession;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Hydrate the shared Spurs SSO session before anything else in the web stack.
        $middleware->web(prepend: [
            HydrateSpursSession::class,
        ]);
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Guests hitting a protected route go to accounts to sign in, then return.
        $middleware->redirectGuestsTo(function (Request $request) {
            $issuer = config('services.spurs.issuer');

            return $issuer.'/login?return_to='.urlencode($request->fullUrl());
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
