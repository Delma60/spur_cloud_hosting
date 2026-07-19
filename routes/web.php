<?php

use App\Http\Controllers\Auth\SpursController;
use App\Http\Controllers\DomainController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Spurs SSO (OIDC client of accounts).
Route::get('auth/spurs', [SpursController::class, 'redirect'])->name('spurs.redirect');
Route::get('auth/callback', [SpursController::class, 'callback'])->name('spurs.callback');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DomainController::class, 'dashboard'])->name('dashboard');

    // Domains
    Route::get('domains', [DomainController::class, 'index'])->name('domains.index');
    Route::get('domains/search', [DomainController::class, 'search'])->name('domains.search');
    Route::post('domains/register', [DomainController::class, 'register'])->name('domains.register');
    Route::get('domains/{domain}', [DomainController::class, 'show'])->name('domains.show');
    Route::get('domains/{domain}/return', [DomainController::class, 'paymentReturn'])->name('domains.return');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
