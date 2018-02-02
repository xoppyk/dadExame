<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;

use App\User;
use App\StoreUserRequest;
use Hash;
use App\Mail\SendMailBlockedUser;

class UserControllerAPI extends Controller
{
    public function getUsers(Request $request)
    {
        if ($request->has('page')) {
            return UserResource::collection(User::paginate(5));
        } else {
            return UserResource::collection(User::all());
        }
    }
    public function getUser($id)
    {
        return new UserResource(User::find($id));
    }

    //STORE USER
    public function store(Request $request)
    {
        $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'nickname' => 'required|unique:users',
                'password' => 'required|min:3|confirmed',
                'password_confirmation' => 'required|min:3'
            ]);
        $user = new User();
        $user->fill($request->all());
        $user->password = bcrypt($request->password);
        $user->blocked = 1;
        $user->reason_blocked = 'Email Not Confirmed';
        $user->remember_token = str_random(10);
        $user->notifyConfirmation();
        $user->save();
        return response()->json(new UserResource($user), 201);
    }

    public function deleteMailRequest($id){
      $user = User::findOrFail($id);
      $user->remember_token = str_random(10);
      $user->notifyDeleteRequest();
      $user->save();
      return redirect('/')->with('flash', 'Deleting Mail Send!');
    }

    //UPDATE USER
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->input('password') != '') {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,'.$id,
                'nickname' => 'required|unique:users,nickname,'.$id,
                'old_password' => 'required|min:6',
                'password' => 'required|min:6|confirmed',
                'password_confirmation' => 'required|min:6'
            ]);
            if (!Hash::check($request->input('old_password'), $user->password)) {
              return response()->json(['error' => 'Wrong Old Password'], 401);
            }
            $user->password = bcrypt($request->password);
        } else {
            $request->validate([
                    'name' => 'required',
                    'email' => 'required|email|unique:users,email,'.$id,
                    'nickname' => 'required|unique:users,nickname,'.$id
                ]);
        }
        $user->update($request->except(['password']));
        $user->save();
        return new UserResource($user);
    }

    // Block User
    public function blockUser(Request $request,$id)
    {
        $user = User::findOrFail($id);
        $user->blocked = 1;
        $user->reason_reactivated = null;
        $user->reason_blocked = $request->reason;
        $user->save();

        //SEND MAIL BLOCKED USER
        if ($request->sendMail) {
          \Mail::to($user)->send(new SendMailBlockedUser($user));
        }

        return new UserResource($user);
    }

    //Active User
    public function activeUser(Request $request,$id)
    {
        $user = User::findOrFail($id);
        $user->blocked = 0;
        $user->reason_blocked = null;
        $user->reason_reactivated = $request->reason;
        $user->save();
        return new UserResource($user);
    }

    //DELETE USER
    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }

    //CONFIRM USER
    public function confirmation($token)
    {
        $user = User::where('remember_token', $token)->first();
        if(!$user) {
            return redirect('/')->with('error', 'User dont Exist or be Actived!');
        }
        if($user->remember_token == '') {
            return redirect('/')->with('flash', 'Accout been Actived!');
        }
        $user->remember_token = '';
        $user->blocked = false;
        $user->reason_blocked = '';
        $user->save();
        return redirect('/')->with('flash', 'Account Actived With Success!');
    }

    //CONFIRM Deleting USER
    public function confirmationDeleting($token)
    {
        $user = User::where('remember_token', $token)->first();
        if(!$user) {
            return redirect('/')->with('error', 'User dont Exist!');
        }
        $user->delete();
        return redirect('/')->with('flash', 'Account Deleted With Success!');
    }
    //Abort USER
    public function abort($token)
    {
        $user = User::where('remember_token', $token)->first();
        if(!$user) {
            return redirect('/')->with('error', 'User dont Exist!');
        }
        if($user->remember_token == '') {
            return redirect('/')->with('flash', 'Sorry Your Account is Active!');
        }
        $user->delete();
        return redirect('/')->with('flash', 'Account Aborted With Success!');
    }

    public function addPoints(Request $request, $id)
    {
        $request->validate([
                    'points' => 'required',
                ]);
        $user = User::findOrFail($id);
        $user->total_points += $request->points;
        $user->save();
    }

    public function addGamePlayed($id)
    {
        $user = User::findOrFail($id);
        $user->total_games_played++;
        $user->save();
    }
}
