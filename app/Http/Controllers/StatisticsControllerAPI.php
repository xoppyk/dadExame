<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Game;


class StatisticsControllerAPI extends Controller
{
    public function getAllStatistics(){
      // total de jogadores na plataforma
      $total_of_users = User::all()->count();

      // o total de jogos já jogados na plataforma
      $total_of_games = Game::where('status', 'terminated')->count();

      // o top com os 5 jogadores com mais jogos
      $best_of_users_with_more_games = User::orderBy('total_games_played', 'DESC')->take(5)->get();

      // o top com os 5 jogadores mais pontuados
      $best_of_users_with_more_points = User::orderBy('total_points', 'DESC')->take(5)->get();

      // o top com os 5 jogadores com melhor média
      $best_of_users_with_best_avg = User::all()->take(5);

      // $user->games()
      //                           ->whereDate('created_at',$begin->toDateString())
      //                           ->count();

      $data = [
          'total_of_users' => $total_of_users,
          'total_of_games' => $total_of_games,
          'best_of_users_with_more_games' => $best_of_users_with_more_games,
          'best_of_users_with_more_points' => $best_of_users_with_more_points,
          'best_of_users_with_best_avg' => $best_of_users_with_best_avg,
        ];

        return response($data, 201);

    }

    public function getStatisticsAuthUser($id){
      // o total de jogos que ele próprio já jogou,
      // o seu total de vitórias,
      // empates
      // derrotas,
      // a sua pontuação total
      // e a sua pontuação média.

      $user = User::findOrFail($id);
      $total_games_played = $user->total_games_played;
      $total_wins = '';
      $total_ties = '';
      $total_loses = '';
      $total_poins = $user->total_points;
      $total_media = \DB::table('users')
              ->where('id', $id)
              ->selectRaw('*, total_points/total_games_played as total')
              ->get();

      // $total_wins = user()->games()->where('winner', $id)->count();
      // $total_ties = user()->games()->count();
      // $total_loses = user()->games()->count();
      // $total_poins = user()->total_points();
      // $total_media = user()->total_points()->avg();


      $data = [
          'total_games_played' => $total_games_played,
          'total_wins' => $total_wins,
          'total_ties' => $total_ties,
          'total_loses' => $total_loses,
          'total_poins' => $total_poins,
          'total_media' => $total_media,
      ];

      return response($data, 201);
    }
}
