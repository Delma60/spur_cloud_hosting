<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('support_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('ref')->unique();          // TCK-0001
            $table->string('subject');
            $table->string('department')->default('general'); // general | billing | technical | domains
            $table->string('priority')->default('normal');    // low | normal | high
            $table->string('status')->default('open');        // open | pending | closed
            $table->text('message');
            $table->timestamps();
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('support_tickets');
    }
};
