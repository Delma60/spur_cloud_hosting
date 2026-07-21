<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailController extends Controller
{
    /** Business email plans + any inboxes tied to the user's active domains. */
    public function inboxes(Request $request)
    {
        return Inertia::render('email/inboxes', [
            'domains' => $request->user()->domains()->where('status', 'active')->get(['id', 'name']),
            'plans' => [
                ['name' => 'Starter', 'price' => 30000, 'inboxes' => 1, 'storage' => '5 GB'],
                ['name' => 'Business', 'price' => 80000, 'inboxes' => 10, 'storage' => '50 GB'],
                ['name' => 'Enterprise', 'price' => 200000, 'inboxes' => 'Unlimited', 'storage' => '200 GB'],
            ],
        ]);
    }

    public function webmail()
    {
        return Inertia::render('email/webmail');
    }
}
