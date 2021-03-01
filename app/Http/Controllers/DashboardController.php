<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ViewClicks;

class DashboardController extends Controller
{
    public function index()
    {
        //return dashboard page
        // $buttonClicks = ViewClicks::where('id',1);
        return view('layouts/dashboard');
    }

    public function addClick(Request $request){
        //validate ajax post request
        $request->validate([
            '_token' => 'required',
            'name' => 'required|max:5',
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

    public function getClicks(){
        $blueClicks = ViewClicks::where('colour','blue')->get()->count();
        $greenClicks = ViewClicks::where('colour','green')->get()->count();
        
        return response()->json(['blueClicks' => $blueClicks, 'greenClicks' => $greenClicks]);
    }
}
