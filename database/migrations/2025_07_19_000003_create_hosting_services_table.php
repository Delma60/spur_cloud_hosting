<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hosting_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('label');                      // primary domain / site name
            $table->string('plan');                       // starter | business | pro
            $table->string('status')->default('pending'); // pending | active | suspended
            $table->unsignedInteger('price');             // minor units / month
            $table->string('currency', 3)->default('NGN');
            $table->string('pay_reference')->nullable();
            $table->timestamp('renews_at')->nullable();
            $table->timestamps();
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hosting_services');
    }
};
