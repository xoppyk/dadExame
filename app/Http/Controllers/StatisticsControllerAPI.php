<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Game;


class StatisticsControllerAPI extends Controller
{
    public function getAllStatistics(){
      // total de jogadores na plataforma
      $total_of_users = User::getAll()->count();

      // o total de jogos já jogados na plataforma
      $games_played = Game::getAll()->count();

      // o top com os 5 jogadores com mais jogos
      $total_of_users_with_more_games = User::orderBy('total_games_played', 'DESC')->take(5)->get();

      // o top com os 5 jogadores mais pontuados
      $total_of_users_with_more_points = User::orderBy('total_points', 'DESC')->take(5)->get();

      // o top com os 5 jogadores com melhor média


    }
    public function getStatisticsAuthUser($id){
      // o total de jogos que ele próprio já jogou,
      // o seu total de vitórias,
      // empates
      // derrotas,
      // a sua pontuação total
      // e a sua pontuação média.

      $user = User::findOrFail($id);
      $total_games_played = user()->games()->count();

    }
}
