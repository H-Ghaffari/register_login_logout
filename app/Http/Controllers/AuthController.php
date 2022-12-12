<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;

class AuthController extends controller {

    public function register(Request $request){

        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                 'confirmed',
                 Password::min(8)->mixedCase()->numbers()->symbols()
            ]
            ]);

            $user = User::create([
                'name' => $data['name'],
                'email'=> $data['email'],
                'password'=>bcrypt($data['password'])
            ]);

            $token = $user->createToken('main')->plainTextToken;

            return response([ //when user is registered get user and token on frontend
                'user' => $user,
                'token' => $token
            ]);
        
    }
}