<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Mail\UserConfirmation;
use App\Mail\UserDeleteRequest;
use Illuminate\Support\Facades\Mail;


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

    public function isAdmin()
    {
        return $this->admin == self::ADMIN;
    }

    public function notifyConfirmation()
    {
        return Mail::to($this)->send(new UserConfirmation($this));
    }
    public function notifyDeleteRequest()
    {
        return Mail::to($this)->send(new UserDeleteRequest($this));
    }
}
