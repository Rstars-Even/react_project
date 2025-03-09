<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Http\Resources\VideoResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class VideoController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index']),
        ];
    }

    public function index()
    {
        return VideoResource::collection(Video::paginate(10));
    }

    public function store(StoreVideoRequest $request, Video $video)
    {
        Gate::authorize('create', Video::class);
    }

    public function show(Video $video)
    {
        return new VideoResource($video);
    }

    public function update(UpdateVideoRequest $request, Video $video)
    {
        Gate::authorize('update', Video::class);
    }

    public function destroy(Video $video)
    {
    }
}
