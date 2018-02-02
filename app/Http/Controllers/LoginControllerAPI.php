<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;

define('YOUR_SERVER_URL', 'http://35.164.189.15/');
// Check "oauth_clients" table for next 2 values:
define('CLIENT_ID', '2');

define('CLIENT_SECRET','ehqW63eiJHTytB3EIaJRgWY38OsJ4BM8NtzvzRUD');

class LoginControllerAPI extends Controller
{
    public function login(Request $request) {
      $username = $request->email;
      if (!strpos($request->email,'@')) {
          $user = User::where('nickname', $request->email)->first();
          $username = $user->email;
      }
    $http = new \GuzzleHttp\Client;
    $response = $http->post(YOUR_SERVER_URL.'/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => CLIENT_ID,
                'client_secret' => CLIENT_SECRET,
                'username' => $username,
                'password' => $request->password,
                'scope' => ''
            ],
        'exceptions' => false,
    ]);
    $errorCode= $response->getStatusCode(); if ($errorCode=='200') {
        return json_decode((string) $response->getBody(), true); } else {
            return response()->json(['msg'=>'User credentials are invalid'], $errorCode);
        }
    }

    public function logout() {
        \Auth::guard('api')->user()->token()->revoke();
        \Auth::guard('api')->user()->token()->delete();
        return response()->json(['msg'=>'Token revoked'], 200);
    }
}
