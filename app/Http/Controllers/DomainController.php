<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DomainController extends Controller
{
    /**
     * Display the client area dashboard.
     */
    public function dashboard(): Response
    {
        // This renders the resources/js/pages/dashboard.tsx file
        return Inertia::render('dashboard');
    }

    public function index()
    {
        return Inertia::render('dashboard');
    }
}
