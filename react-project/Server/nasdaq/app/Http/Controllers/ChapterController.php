<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Http\Requests\StoreChapterRequest;
use App\Http\Requests\UpdateChapterRequest;
use App\Http\Resources\ChapterResource;

class ChapterController extends Controller
{
    public function index(){
        return ChapterResource::collection(Chapter::all());
    }

    public function store(StoreChapterRequest $request)
    {
    }

    public function show(Chapter $chapter)
    {
    }

    public function update(UpdateChapterRequest $request, Chapter $chapter)
    {
    }

    public function destroy(Chapter $chapter)
    {
    }
}
