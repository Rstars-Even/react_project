<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    /** @use HasFactory<\Database\Factories\LessonFactory> */
    use HasFactory;

    public function chapters() {
        return $this->hasMany(Chapter::class);
    }

    public function videos() {
        return $this->hasMany(Video::class);
    }
}
