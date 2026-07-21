<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use SpursCloud\Accounts\Facades\Spurs;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Shared Spurs SSO is handled by spurs-cloud/accounts-laravel: its service
        // provider prepends the session-hydrating middleware to the web group and
        // exempts the shared cookie from this app's encryption.
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Guests hitting a protected route go to accounts, which (re)issues the
        // shared cookie and bounces them back here — signed in.
        $middleware->redirectGuestsTo(fn (Request $request) => Spurs::loginUrl($request->fullUrl()));
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
