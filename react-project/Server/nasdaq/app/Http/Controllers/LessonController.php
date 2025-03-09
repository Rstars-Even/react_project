<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Http\Resources\LessonResource;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class LessonController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    public function index()
    {
        return LessonResource::collection(Lesson::paginate(9));
    }

    public function store(StoreLessonRequest $request, Lesson $lesson)
    {
        Gate::authorize('create', $lesson);
        $lesson->fill($request->input());
        $lesson->save();
        return new LessonResource($lesson);
    }

    public function show(Lesson $lesson)
    {
        return new LessonResource($lesson);
    }

    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        Gate::authorize('update', $lesson);
        $lesson->fill($request->input());
        $lesson->save();
        return new LessonResource($lesson);
    }

    public function destroy(Lesson $lesson)
    {
        Gate::authorize('delete', $lesson);
        $lesson->delete();
        return $this->respondNoContent();
    }
}
