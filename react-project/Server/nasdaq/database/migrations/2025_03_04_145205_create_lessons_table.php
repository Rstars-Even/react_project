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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('标题');
            $table->string('preview')->comment('预览图片');
            $table->text('description')->comment('课程介绍');
            $table->decimal('price', 8, 2)->default(0)->comment('价格');
            $table->unsignedSmallInteger('order')->default(0)->comment('排序');
            $table->unsignedInteger('video_num')->default(0)->comment('视频数量');
            $table->string('download_address')->nullable()->comment('下载地址');
            $table->char('type', 20)->default('project')->comment('课程类型 system|project');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
