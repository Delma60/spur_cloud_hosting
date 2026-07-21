<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('services/order');
    }

    public function sharedHosting(): Response
    {
        return Inertia::render('services/shared-hosting');
    }

    public function show($id)
    {
        return Inertia::render('services/show');
    }
}
