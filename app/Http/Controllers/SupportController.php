<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function tickets(Request $request)
    {
        return Inertia::render('support/tickets', [
            'tickets' => $request->user()->supportTickets()->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('support/open');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'subject' => ['required', 'string', 'max:150'],
            'department' => ['required', 'in:general,billing,technical,domains'],
            'priority' => ['required', 'in:low,normal,high'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $user = $request->user();
        $ref = 'TCK-'.str_pad((string) ($user->supportTickets()->count() + 1), 4, '0', STR_PAD_LEFT);
        $ticket = $user->supportTickets()->create([...$data, 'ref' => $ref]);

        return redirect()->route('support.show', $ticket)->with('status', 'Ticket opened.');
    }

    public function show(Request $request, SupportTicket $ticket)
    {
        abort_unless($ticket->user_id === $request->user()->id, 403);

        return Inertia::render('support/show', ['ticket' => $ticket]);
    }

    public function kb()
    {
        return Inertia::render('support/kb', [
            'articles' => [
                ['title' => 'How to point your domain to Spurs hosting', 'category' => 'Domains', 'minutes' => 4],
                ['title' => 'Setting up business email inboxes', 'category' => 'Email', 'minutes' => 6],
                ['title' => 'Adding DNS records (A, CNAME, MX, TXT)', 'category' => 'DNS', 'minutes' => 5],
                ['title' => 'Understanding your invoices and billing', 'category' => 'Billing', 'minutes' => 3],
                ['title' => 'Installing WordPress on shared hosting', 'category' => 'Hosting', 'minutes' => 7],
                ['title' => 'Enabling SSL for your website', 'category' => 'Security', 'minutes' => 4],
            ],
        ]);
    }
}
