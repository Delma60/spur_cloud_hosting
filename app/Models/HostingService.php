<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HostingService extends Model
{
    protected $fillable = [
        'user_id', 'label', 'plan', 'status', 'price', 'currency', 'pay_reference', 'renews_at',
    ];

    protected $casts = [
        'renews_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
