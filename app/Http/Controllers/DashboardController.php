<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ViewClicks;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Show the dashboard page
     *
     */
    public function index()
    {
        //return dashboard page
        return view('layouts/dashboard');
    }

    /**
     * Accept a post request with a token
     * Add a new click and colour to the View_clicks table
     */
    public function addClick(Request $request){
        //validate ajax post request
        $request->validate([
            '_token' => 'required',
            'name' => 'required|max:15',
        ]);

        //add a new click in the View Clicks table
        $new_click = new ViewClicks();
        $name = $request->name;
        if($name == 'blue'){
            $new_click->colour = 'blue';
            $new_click->save();
        }
        if($name == 'green'){
            $new_click->colour = 'green';
            $new_click->save();
        }
        return response()->json(['success' => $name]);
    }

    /**
     * Get all blue+green clicks
     */
    public function getClicks(){
        $blueClicks = ViewClicks::where('colour','blue')->get()->count();
        $greenClicks = ViewClicks::where('colour','green')->get()->count();

        return response()->json(['blueClicks' => $blueClicks, 'greenClicks' => $greenClicks]);
    }

    /**
     * Get all clicks in past 24 hours using carbon library
     */
    public function getRecentClicks(){
        $blueClicks = ViewClicks::where('colour','blue')->where('created_at', '>', Carbon::now()->subDay())->get()->count();
        $greenClicks = ViewClicks::where('colour','green')->where('created_at', '>', Carbon::now()->subDay())->get()->count();

        return response()->json(['blueClicks' => $blueClicks, 'greenClicks' => $greenClicks]);
    }

    /**
     * Get all clicks with timestamps
     */
    public function getTimeClicks(){
        $clicks = ViewClicks::get();
        $blue=[];
        $green=[];
        $blueTime=[];
        $greenTime=[];

        foreach($clicks as $click){
            if($click->colour == "blue"){
                $time = $click->created_at->format('Y-m-d');
                if(!(in_array($time, $blueTime))){
                    array_push($blueTime,$time);
                }
            }
            if($click->colour == "green"){
                $time = $click->created_at->format('Y-m-d');
                if(!(in_array($time, $greenTime))){
                    array_push($greenTime,$time);
                }
            }
        }

        foreach($blueTime as $time){
            $blueClicks = ViewClicks::where('colour','blue')->whereDate('created_at','=',$time)->get()->count();
            array_push($blue,[$blueClicks,$time]);
        }
        foreach($greenTime as $time){
            $greenClicks = ViewClicks::where('colour','green')->whereDate('created_at','=',$time)->get()->count();
            array_push($green,[$greenClicks,$time]);
        }

        return response()->json(['blueClicks' => $blue, 'greenClicks' => $green]);
    }

    /**
     * Remove all click records
     */
    public function deleteClicks(){
        ViewClicks::whereNotNull('id')->delete();
        return view('layouts/dashboard');
    }
}
