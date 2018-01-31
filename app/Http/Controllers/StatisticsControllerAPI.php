<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use App\Game;
use Illuminate\Support\Facades\DB;
class StatisticsControllerAPI extends Controller
{
    public function getAllStatistics(){
      // total de jogadores na plataforma
      $total_of_users = User::all()->count();
      // o total de jogos já jogados na plataforma
      $total_of_games = Game::where('status', 'terminated')->count();
      // o top com os 5 jogadores com mais jogos
      $best_of_users_with_more_games = User::select('name', 'nickname','total_games_played')->orderBy('total_games_played', 'DESC')->take(5)->get();
      // o top com os 5 jogadores mais pontuados
      $best_of_users_with_more_points = User::select('name', 'nickname','total_points')->orderBy('total_points', 'DESC')->take(5)->get();
      // o top com os 5 jogadores com melhor média
      $best_of_users_with_best_avg = DB::select("SELECT name, nickname, ROUND((`total_points` / `total_games_played`), 2)
                                    as avg from users
                                    ORDER BY avg desc
                                    LIMIT 0,5");
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
      $total_poins = $user->total_points;
      $total_wins = DB::table('game_user')
                                ->select('*')
                                ->where('winner', '=', '1')
                                ->where('user_id', '=', $id)
                                ->get()->count();
      $total_ties = DB::table('game_user')
                                ->select('*')
                                ->where('winner', '=', '0')
                                ->where('user_id', '=', $id)
                                ->get()->count();
      $total_loses = DB::table('game_user')
                                ->select('*')
                                ->where('winner', '=', '-1')
                                ->where('user_id', '=', $id)
                                ->get()->count();

      $avg = 0;
      if ($total_poins != 0 && $total_games_played != 0) {
        $avg = ROUND($total_poins / $total_games_played, 2);
      }
      $data = [
          'total_games_played' => $total_games_played,
          'total_wins' => $total_wins,
          'total_ties' => $total_ties,
          'total_loses' => $total_loses,
          'total_poins' => $total_poins,
          'avg' => $avg,
      ];
      return response($data, 201);
    }
}
