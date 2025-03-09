<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Http\Requests\StoreChapterRequest;
use App\Http\Requests\UpdateChapterRequest;
use App\Http\Resources\ChapterResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ChapterController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    public function index(){
        return ChapterResource::collection(Chapter::all());
    }

    public function store(StoreChapterRequest $request, Chapter $chapter)
    {
        Gate::authorize('create', Chapter::class);
        $chapter->fill($request->input());
        $chapter->save();
        return new ChapterResource($chapter);
    }

    public function show(Chapter $chapter)
    {
        return new ChapterResource($chapter);
    }

    public function update(UpdateChapterRequest $request, Chapter $chapter)
    {
        Gate::authorize('update', $chapter);
        $chapter->fill($request->input());
        $chapter->save();
        return new ChapterResource($chapter);
    }

    public function destroy(Chapter $chapter)
    {
        Gate::authorize('delete', $chapter);
        $chapter->delete();
        return response()->noContent();
    }
}
