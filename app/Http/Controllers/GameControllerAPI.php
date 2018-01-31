<?php

namespace App\Http\Controllers;

use App\Game;
use Illuminate\Http\Request;

use Carbon\Carbon;

class GameControllerAPI extends Controller
{
  
    public function start(Request $request)
    {
        $request->validate([
                'status' => 'required',
                'total_players' => 'required',
                'created_by' => 'required',
                'deck_used' => 'required',
            ]);
        $game = new Game();
        $game->fill($request->all());
        $game->created_at = Carbon::now();
        $game->updated_at = Carbon::now();
        $game->save();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
                'status' => 'required',
            ]);
        $game = Game::findOrFail($id);
        $game->fill($request->all());
        $game->updated_at = Carbon::now();
        $game->save();
    }
}
