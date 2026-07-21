<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use App\Models\DnsRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DnsController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('dns/index', [
            'domains' => $request->user()->domains()->withCount('dnsRecords')->latest()->get(),
        ]);
    }

    public function show(Request $request, Domain $domain)
    {
        abort_unless($domain->user_id === $request->user()->id, 403);

        return Inertia::render('dns/show', [
            'domain' => $domain,
            'records' => $domain->dnsRecords()->latest()->get(),
        ]);
    }

    public function store(Request $request, Domain $domain)
    {
        abort_unless($domain->user_id === $request->user()->id, 403);

        $data = $request->validate([
            'type' => ['required', 'in:A,AAAA,CNAME,TXT,MX'],
            'name' => ['required', 'string', 'max:253'],
            'value' => ['required', 'string', 'max:512'],
            'ttl' => ['nullable', 'integer', 'min:60', 'max:86400'],
            'priority' => ['nullable', 'integer', 'min:0', 'max:65535'],
        ]);

        $domain->dnsRecords()->create([
            'type' => $data['type'],
            'name' => $data['name'],
            'value' => $data['value'],
            'ttl' => $data['ttl'] ?? 3600,
            'priority' => $data['type'] === 'MX' ? ($data['priority'] ?? 10) : null,
        ]);

        return back()->with('status', 'DNS record added.');
    }

    public function destroy(Request $request, Domain $domain, DnsRecord $record)
    {
        abort_unless($domain->user_id === $request->user()->id && $record->domain_id === $domain->id, 403);
        $record->delete();

        return back()->with('status', 'DNS record removed.');
    }
}
