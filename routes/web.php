<?php

use App\Http\Controllers\Auth\SpursController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\DnsController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\VpsController;
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
    Route::post('domains/{domain}/nameservers', [DomainController::class, 'updateNameservers'])->name('domains.nameservers.update');

    // Domain transfer
    Route::get('transfer', [DomainController::class, 'transferForm'])->name('domains.transfer');
    Route::post('transfer', [DomainController::class, 'transfer'])->name('domains.transfer.store');

    // DNS management
    Route::get('dns', [DnsController::class, 'index'])->name('dns.index');
    Route::get('dns/{domain}', [DnsController::class, 'show'])->name('dns.show');
    Route::post('dns/{domain}', [DnsController::class, 'store'])->name('dns.store');
    Route::delete('dns/{domain}/{record}', [DnsController::class, 'destroy'])->name('dns.destroy');

    // Hosting / services
    Route::get('services/order', [ServiceController::class, 'order'])->name('services.order');
    Route::get('services/shared-hosting', [ServiceController::class, 'sharedHosting'])->name('services.shared-hosting');
    Route::get('services/vps', [VpsController::class, 'index'])->name('services.vps');
    Route::post('services', [ServiceController::class, 'store'])->name('services.store');
    Route::get('services/{service}', [ServiceController::class, 'show'])->name('services.show');
    Route::get('services/{service}/return', [ServiceController::class, 'paymentReturn'])->name('services.return');

    // Business email
    Route::get('email', [EmailController::class, 'inboxes'])->name('email.inboxes');
    Route::get('email/webmail', [EmailController::class, 'webmail'])->name('email.webmail');

    // Billing
    Route::get('billing/invoices', [BillingController::class, 'invoices'])->name('billing.invoices');
    Route::get('billing/payment-methods', [BillingController::class, 'paymentMethods'])->name('billing.payment-methods');
    Route::get('billing/add-funds', [BillingController::class, 'addFunds'])->name('billing.add-funds');
    Route::post('billing/add-funds', [BillingController::class, 'topup'])->name('billing.topup');
    Route::get('billing/add-funds/return', [BillingController::class, 'topupReturn'])->name('billing.topup.return');

    // Support
    Route::get('support', [SupportController::class, 'tickets'])->name('support.tickets');
    Route::get('support/new', [SupportController::class, 'create'])->name('support.open');
    Route::post('support', [SupportController::class, 'store'])->name('support.store');
    Route::get('support/kb', [SupportController::class, 'kb'])->name('support.kb');
    Route::get('support/{ticket}', [SupportController::class, 'show'])->name('support.show');
});

require __DIR__.'/settings.php';
