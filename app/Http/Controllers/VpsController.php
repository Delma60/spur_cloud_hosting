<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class VpsController extends Controller
{
    /** Cloud VPS plans. Prices are minor units (kobo) per month. */
    public function index()
    {
        return Inertia::render('services/vps', [
            'plans' => [
                ['name' => 'VPS 1', 'price' => 600000, 'cpu' => '1 vCPU', 'ram' => '2 GB', 'storage' => '40 GB NVMe', 'bandwidth' => '2 TB'],
                ['name' => 'VPS 2', 'price' => 1200000, 'cpu' => '2 vCPU', 'ram' => '4 GB', 'storage' => '80 GB NVMe', 'bandwidth' => '4 TB'],
                ['name' => 'VPS 4', 'price' => 2400000, 'cpu' => '4 vCPU', 'ram' => '8 GB', 'storage' => '160 GB NVMe', 'bandwidth' => '8 TB'],
            ],
        ]);
    }
}
