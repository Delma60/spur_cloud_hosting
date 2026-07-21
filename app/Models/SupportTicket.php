<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupportTicket extends Model
{
    protected $fillable = ['user_id', 'ref', 'subject', 'department', 'priority', 'status', 'message'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
