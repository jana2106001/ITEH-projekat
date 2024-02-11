<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\ForgetRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgetMail;

class ForgetController extends Controller
{
    public function ForgetPassword(Request $request)
    {
        $email = $request->email;

        if (User::where('email', $email)->doesntExist()) {
            return response([
                'message' => 'Email is not valid.'
            ], 401); //status code 401
        }

        $token = rand(10, 100000);

        try {

            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            //send mail to User
            Mail::to($email)->send(new ForgetMail($token));

            return response([
                'message' => 'Reset password mail sent on you email!'
            ]);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400); //status code 400
        }
    }
}