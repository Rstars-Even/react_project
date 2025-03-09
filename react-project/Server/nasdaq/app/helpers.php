<?php

use Illuminate\Support\Facades\Auth;

function isAdministrator()
{
    return Auth::check() && Auth::user()->isAdministrator;
}

function user(string $field)
{
    return Auth::check() && Auth::user()->$field;
}