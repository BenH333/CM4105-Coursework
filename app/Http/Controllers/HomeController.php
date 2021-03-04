<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application homepage.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    /**
     * Show the authorised user profile
     *
     */
    public function profile(){
        return view('profile');
    }

    /**
     * Logout the authorised user
     *
     */
    public function logout(){
        if (Auth::user())
        {
            Auth::logout();
        }
        return view('/welcome');
    }

    /**
     * Hard delete the authorised user
     *
     */
    public function deleteUser(){
        $user = Auth::user();
        //check that current user exists
        if (Auth::user())
        {
            Auth::logout();
            $user->delete();
        }
        return view('/welcome');
    }
}
