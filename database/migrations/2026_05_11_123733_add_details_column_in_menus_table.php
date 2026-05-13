<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->json('ingredients')->nullable();
            $table->string('cooking_style')->nullable();
            $table->string('calories')->nullable();
            $table->string('cuisine_type')->nullable();
            $table->string('spice_level')->nullable();
            $table->text('short_description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->dropColumn(['ingredients', 'cooking_style', 'calories', 'cuisine_type', 'spice_level', 'short_description']);
        });
    }
};
