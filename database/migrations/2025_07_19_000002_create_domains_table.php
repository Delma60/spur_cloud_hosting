<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name')->unique();           // full domain e.g. acme.com.ng
            $table->string('tld');                       // com.ng, com, ng, io...
            $table->string('status')->default('pending'); // pending | active | expired
            $table->unsignedInteger('price');            // minor units (kobo)
            $table->string('currency', 3)->default('NGN');
            $table->unsignedTinyInteger('years')->default(1);
            $table->string('pay_reference')->nullable();
            $table->json('nameservers')->nullable();
            $table->boolean('auto_renew')->default(true);
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('domains');
    }
};
