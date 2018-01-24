<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','nickname', 'blocked', 'reason_blocked', 'reason_reactivated'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','admin',
    ];

    //USER pode pertencer a varios GAMES
    public function games()
    {
        return $this->belongsToMany('App\Game', 'game_user', 'user_id', 'game_id');
    }

    //USER pode criar varios GAMES
    public function my_created_games()
    {
        return $this->hasMany('App\Game', 'created_by', 'id');
    }
}
