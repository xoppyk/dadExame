<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class GameUserControllerAPI extends Controller
{
    public function registerGameUser(Request $request)
    {
        $request->validate([
                'game_id' => 'required',
                'user_id' => 'required',
                'winner' => 'required',
            ]);
        DB::table('game_user')->insert(['game_id' => $request->game_id, 'user_id' => $request->user_id, 'winner' => $request->winner,]);
    }
}
