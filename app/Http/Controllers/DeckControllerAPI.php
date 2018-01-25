<?php

namespace App\Http\Controllers;

use App\Deck;
use Illuminate\Http\Request;

use App\Http\Resources\Deck as DeckResource;

class DeckControllerAPI extends Controller
{
    public function getDecks(){
    	return DeckResource::collection(Deck::all());
    }

    public function getDeckRandom(){
    	$array = Deck::all();
    	$random = rand(0, sizeof($array)-1);
    	return new DeckResource($array[$random]);
    }

    public function getDeck($id){
    	return new DeckResource(Deck::find($id));
    }
}
