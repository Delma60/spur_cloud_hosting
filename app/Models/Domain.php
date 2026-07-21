<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Domain extends Model
{
    public function dnsRecords(): HasMany
    {
        return $this->hasMany(DnsRecord::class);
    }

    protected $fillable = [
        'user_id', 'name', 'tld', 'status', 'price', 'currency',
        'years', 'pay_reference', 'nameservers', 'auto_renew', 'expires_at',
    ];

    protected $casts = [
        'nameservers' => 'array',
        'auto_renew' => 'boolean',
        'expires_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
