<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
  protected $fillable = [
      'value', 'suite', 'deck_id','path',
  ];

  // Varias Cartas pertencem a UM deck
  public function deck()
    {
        return $this->belongsTo('App\Deck', 'deck_id');
    }
}
