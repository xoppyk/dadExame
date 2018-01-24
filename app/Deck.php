<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
  protected $fillable = [
      'name', 'hidden_face_image_path', 'active','complete',
  ];

  //DECK tem varias CARDS
  public function cards()
    {
        return $this->hasMany('App\Card', 'deck_id', 'id');
    }

  //DECK pode pertencer a varios GAMES
  public function games()
    {
        return $this->hasMany('App\Game', 'deck_used', 'id');
    }

}
