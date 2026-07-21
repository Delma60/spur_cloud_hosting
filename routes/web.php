<?php

use App\Http\Controllers\Auth\SpursController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Spurs SSO — cloud reads the shared session cookie set by accounts. No token
// flow: this app is first-party, so it never appears under "Connected apps".
Route::get('login', [SpursController::class, 'login'])->name('login');
Route::post('logout', [SpursController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DomainController::class, 'dashboard'])->name('dashboard');

    // Domains
    Route::get('domains', [DomainController::class, 'index'])->name('domains.index');
    Route::get('domains/register', [DomainController::class, 'registerForm'])->name('domains.register.get');
    Route::post('domains/register', [DomainController::class, 'register'])->name('domains.register');
    Route::get('domains/search', [DomainController::class, 'search'])->name('domains.search');
    Route::get('domains/{domain}', [DomainController::class, 'show'])->name('domains.show');
    Route::get('domains/{domain}/return', [DomainController::class, 'paymentReturn'])->name('domains.return');
    Route::get('domains/{domain}/nameservers', [DomainController::class, 'nameservers'])->name('domains.nameservers');

    // Hosting / services
    Route::get('services/order', [ServiceController::class, 'order'])->name('services.order');
    Route::get('services/shared-hosting', [ServiceController::class, 'sharedHosting'])->name('services.shared-hosting');
    Route::post('services', [ServiceController::class, 'store'])->name('services.store');
    Route::get('services/{service}', [ServiceController::class, 'show'])->name('services.show');
    Route::get('services/{service}/return', [ServiceController::class, 'paymentReturn'])->name('services.return');
});

require __DIR__.'/settings.php';
