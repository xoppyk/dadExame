<?php

namespace App\Http\Controllers;

use App\Card;
use Illuminate\Http\Request;
use File;
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

    public function uploadCard(Request $request){
        $this->validate($request, [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if($request->hasFile('image')) {
            $file = $request->file('image') ;
            $fileName = $file->getClientOriginalName() ;
            if(!File::Exists(public_path() . '/img/'.$fileName)){
                $destinationPath = public_path().'/img/' ;
                $file->move($destinationPath,$fileName);
                return response()->json($file, 201);
            }
        }
    }
}
