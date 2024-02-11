<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use DB;
use Exception;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function Login(Request $request)
    {

        try {

            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;

                return response([
                    'message' => "Successfully login! Welcome :)",
                    'token' => $token,
                    'user' => $user
                ], 200); //status code 200
            }
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400); //status code 400
        }

        return response([
            'message' => 'Invalid email adress or password! Please try again.'
        ], 401); //status code 401
    } //end method

    public function Register(Request $request)
    {

        try {

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $token = $user->createToken('app')->accessToken;

            return response([
                'message' => "Registration successful. You can login with your credentials now.",
                'token' => $token,
                'user' => $user
            ]);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400); //status code 400
        }
    }
}