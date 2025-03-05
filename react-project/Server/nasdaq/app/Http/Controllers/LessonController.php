<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Http\Resources\LessonResource;

class LessonController extends Controller
{
    public function index()
    {
        return LessonResource::collection(Lesson::paginate(9));
    }

    public function store(StoreLessonRequest $request)
    {
    }

    public function show(Lesson $lesson)
    {
    }

    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
    }

    public function destroy(Lesson $lesson)
    {
    }
}
