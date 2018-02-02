<?php

namespace App\Http\Controllers;

use App\Deck;
use App\Card;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Resources\Deck as DeckResource;
use Carbon\Carbon;

class DeckControllerAPI extends Controller
{
    public function getDecks(){
        return DeckResource::collection(Deck::all());
    }

    public function getDeckRandom(){
        $array = Deck::where('complete', '=', '1')->get();
        if(sizeof($array) == 0){
            return null;
        }
        $random = rand(0, sizeof($array)-1);
        return new DeckResource($array[$random]);
    }

    public function getDeck($id){
        return new DeckResource(Deck::find($id));
    }

    public function delete($id){
        $deck = Deck::findOrFail($id);
        $deck->delete();
        return response()->json(null, 204);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
                'name' => 'required',
                'hidden_face_image_path' => 'required',
                'active' => 'required',
                'complete' => 'required',
                'cards' => 'required',
            ]);
        $deck = Deck::findOrFail($id);
        $deck->fill($request->all());
        $deck->updated_at = Carbon::now();
        $deck->save();
        $rowsDelete = Card::where('deck_id', '=', $id)->delete();
        foreach ($request->cards as $card){
            $newCard = new Card;
            $newCard->path = $card;
            $newCard->deck_id = $id;
            $newCard->created_at = Carbon::now();
            $newCard->updated_at = Carbon::now();
            $newCard->save();
        }
        return response()->json(new DeckResource($deck), 201);
    }

    public function store(Request $request)
    {
        $request->validate([
                'name' => 'required',
                'hidden_face_image_path' => 'required',
                'active' => 'required',
                'complete' => 'required',
                'cards' => 'required',
            ]);
        $deck = new Deck;
        $deck->fill($request->all());
        $deck->created_at = Carbon::now();
        $deck->updated_at = Carbon::now();
        $deck->save();
        foreach ($request->cards as $card){
            $newCard = new Card;
            $newCard->path = $card;
            $newCard->deck_id = $deck->id;
            $newCard->created_at = Carbon::now();
            $newCard->updated_at = Carbon::now();
            $newCard->save();
        }
        return response()->json(new DeckResource($deck), 201);
    }
}
