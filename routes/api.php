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


//USERS
Route::get('users', 'UserControllerAPI@getUsers');
Route::get('users/emailavailable', 'UserControllerAPI@emailAvailable');
Route::get('users/{id}', 'UserControllerAPI@getUser');
Route::post('users', 'UserControllerAPI@store');
Route::put('users/{id}', 'UserControllerAPI@update');
Route::delete('users/{id}', 'UserControllerAPI@delete');
//Block & Active
Route::post('users/block/{id}', 'UserControllerAPI@blockUser');
Route::post('users/active/{id}', 'UserControllerAPI@activeUser');

Route::get('decks', 'DeckControllerAPI@getDecks');
Route::get('decks/random', 'DeckControllerAPI@getDeckRandom');
Route::get('decks/{id}', 'DeckControllerAPI@getDeck');

Route::get('cards', 'CardControllerAPI@getCards');
Route::get('cards/deck/{deck_id}', 'CardControllerAPI@getCardsByDeck');
Route::get('cards/{id}', 'CardControllerAPI@getCard');

//PASSAPORT
Route::post('login', 'LoginControllerAPI@login');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return Auth::user();
});
Route::middleware('auth:api')->post('logout', 'LoginControllerAPI@logout');
