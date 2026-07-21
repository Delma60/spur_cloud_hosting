<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dns_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('domain_id')->constrained()->cascadeOnDelete();
            $table->string('type');                 // A | AAAA | CNAME | TXT | MX
            $table->string('name')->default('@');   // host / subdomain
            $table->string('value');                // target / IP / content
            $table->unsignedInteger('ttl')->default(3600);
            $table->unsignedInteger('priority')->nullable(); // MX
            $table->timestamps();
            $table->index('domain_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dns_records');
    }
};
