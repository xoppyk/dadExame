<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
  protected $fillable = [
      'status', 'total_players','created_by', 'deck_used',
  ];

  //GAME tem varios utilizadores
  public function users()
  {
      return $this->belongsToMany('App\User', 'game_user', 'game_id', 'user_id');
  }

  //GAME so vai ter um DECK
  public function deck()
    {
        return $this->belongsTo('App\Deck', 'deck_used');
    }

  //GAME tem um Criador
  public function owner()
    {
        return $this->belongsTo('App\User', 'created_by');
    }
}
