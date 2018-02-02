<?php

use Illuminate\Http\Request;

//USERS
  Route::get('users/{id}', 'UserControllerAPI@getUser');
  Route::delete('users/{id}', 'UserControllerAPI@delete');
  //Block & Active
  Route::post('users/block/{id}', 'UserControllerAPI@blockUser');
  Route::post('users/active/{id}', 'UserControllerAPI@activeUser');


Route::get('users', 'UserControllerAPI@getUsers');
Route::put('users/{id}', 'UserControllerAPI@update');

//Games
Route::post('gameuser/register', 'GameUserControllerAPI@registerGameUser');
Route::post('games/start', 'GameControllerAPI@start');
Route::put('games/{id}/update', 'GameControllerAPI@update');

//User Games
Route::post('users/{id}/addGamePlayed', 'UserControllerAPI@addGamePlayed');
Route::post('users/{id}/addPoints', 'UserControllerAPI@addPoints');

//Statistics
Route::get('statistics', 'StatisticsControllerAPI@getAllStatistics');
Route::get('statistics/byUser/{id}', 'StatisticsControllerAPI@getStatisticsAuthUser');
Route::get('statistics/forAdmin/', 'StatisticsControllerAPI@getStatisticsForAdmin');


//Request to Delete User
Route::post('users/deleteRequest/{id}', 'UserControllerAPI@deleteMailRequest');
//Create User
Route::post('users', 'UserControllerAPI@store');

//Decks
Route::get('decks', 'DeckControllerAPI@getDecks');
Route::get('decks/random', 'DeckControllerAPI@getDeckRandom');
Route::get('decks/{id}', 'DeckControllerAPI@getDeck');
Route::post('decks', 'DeckControllerAPI@store');
Route::put('decks/{id}/update', 'DeckControllerAPI@update');

//Cards
Route::get('cards', 'CardControllerAPI@getCards');
Route::get('cards/deck/{deck_id}', 'CardControllerAPI@getCardsByDeck');
Route::get('cards/{id}', 'CardControllerAPI@getCard');
Route::post('cards/uploadCard', 'CardControllerAPI@uploadCard');

//PASSAPORT
Route::post('login', 'LoginControllerAPI@login');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    // return Auth::user();
    return $request->user();
});
Route::middleware('auth:api')->post('logout', 'LoginControllerAPI@logout');
