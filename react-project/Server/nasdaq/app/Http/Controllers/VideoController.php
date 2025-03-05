<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Http\Resources\VideoResource;

class VideoController extends Controller
{
    public function index()
    {
        return VideoResource::collection(Video::paginate(10));
    }

    public function store(StoreVideoRequest $request)
    {
    }

    public function show(Video $video)
    {
    }

    public function update(UpdateVideoRequest $request, Video $video)
    {
    }

    public function destroy(Video $video)
    {
    }
}
