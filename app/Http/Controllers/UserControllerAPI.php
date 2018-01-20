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
        $user->password = Hash::make($user->password);
        $user->blocked = 1;
        $user->reason_blocked = 'Email Not Confirmed';

        $user->save();
        return response()->json(new UserResource($user), 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->input('password') != '') {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,'.$id,
                'nickname' => 'required|unique:users,nickname,'.$id,
                'password' => 'required|min:3|confirmed',
                'password_confirmation' => 'required|min:3'
            ]);
            $user->password = Hash::make($request->input('password'));
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



    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
    public function emailAvailable(Request $request)
    {
        $totalEmail = 1;
        if ($request->has('email') && $request->has('id')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->where('id', '<>', $request->id)->count();
        } else if ($request->has('email')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->count();
        }
        return response()->json($totalEmail == 0);
    }
}
