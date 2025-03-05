<?php

use App\Http\Controllers\LessonController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('lesson', LessonController::class);
Route::apiResource('chapter', ChapterController::class);
Route::apiResource('video', VideoController::class);