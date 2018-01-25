<?php

namespace App\Http\Controllers;

use App\Card;
use Illuminate\Http\Request;

use App\Http\Resources\Card as CardResource;

class CardControllerAPI extends Controller
{
    public function getCards()
    {
    	return CardResource::collection(Card::all());
    }

    public function getCard($id)
    {
        return new CardResource(Card::find($id));
    }

    public function getCardsByDeck($deck_id)
    {
    	return CardResource::collection(Card::all()->where('deck_id', '=', $deck_id));
    }
}
