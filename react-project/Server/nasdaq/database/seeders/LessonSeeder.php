<?php

namespace Database\Seeders;

use App\models\Lesson;
use App\models\Chapter;
use App\models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lesson::factory(9)->has(Chapter::factory(6)->hasVideos(10, function (array $attributes, Chapter $chapter) {
            return ["lesson_id" => $chapter->lesson_id];
        }))->create();
    }
}
