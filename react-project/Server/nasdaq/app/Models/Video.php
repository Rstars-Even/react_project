<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    /** @use HasFactory<\Database\Factories\VideoFactory> */
    use HasFactory;

    public function lesson() {
        return $this-belongsTo(Lesson::class);
    }

    public function chapter() {
        return $this-belongsTo(Chapter::class);
    }
}
