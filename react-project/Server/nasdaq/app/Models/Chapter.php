<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    /** @use HasFactory<\Database\Factories\ChapterFactory> */
    use HasFactory;

    protected $fillable = [
        'title', 'preivew', 'description'
    ];

    public function videos() {
        return $this->hasMany(Video::class);
    }

    public function lesson() {
        return $this-belongsTo(Lesson::class);
    }
}
