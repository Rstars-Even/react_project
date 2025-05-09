<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function current()
    {
        if (Auth::check()) {
            return new UserResource(Auth::user());
        }
        return "abc...";
    }
}
