<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//users
Route::get('users', 'UserControllerAPI@getUsers');
Route::get('users/emailavailable', 'UserControllerAPI@emailAvailable');
Route::get('users/{id}', 'UserControllerAPI@getUser');
