<?php

use App\Http\Controllers\LessonController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('dq')->group(function () {
    Route::apiResource('lesson', LessonController::class);
    Route::apiResource('chapter', ChapterController::class);
    Route::apiResource('video', VideoController::class);
    // 登录注册接口
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/logout', [AuthController::class, 'logout']);
    // 获取用户信息
    Route::get('user/current', [UserController::class, 'current']);
});
