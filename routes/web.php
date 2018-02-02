<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();
Route::get('confirm/{token}', 'UserControllerAPI@confirmation')->name('confirmation');
Route::get('deleteRequest/{token}', 'UserControllerAPI@confirmationDeleting')->name('confirmationDeleting');
Route::get('abort/{token}', 'UserControllerAPI@abort')->name('abort');

Route::get('/', function () {
    return view('game/index');
});
Route::get('/home', function () {
    return view('game/index');
});

//ADMIN
Route::get('/admin', 'AdminController@index')->name('admin.index');
// See all users
Route::get('/admin/users', 'UserController@index')->name('users.index');
Route::get('/admin/users/{user}', 'UserController@show')->name('users.show');
