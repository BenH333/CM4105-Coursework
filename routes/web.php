<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

//search route
Route::get('/search', [SearchController::class, 'index']);

//home routes
Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/profile', [HomeController::class, 'profile']);
Route::post('/logout', [HomeController::class, 'logout']);
Route::post('/deleteAccount', [HomeController::class, 'deleteUser']);

//dashboard routes
Route::group(['prefix'=>'dashboard','as'=>'dashboard.'], function(){
    Route::get('/', [DashboardController::class, 'index']);
    Route::post('/addclick', [DashboardController::class, 'addClick']);

    Route::get('/getClicks', [DashboardController::class, 'getClicks']);
    Route::get('/getRecentClicks', [DashboardController::class, 'getRecentClicks']);
    Route::get('/getTimeClicks', [DashboardController::class, 'getTimeClicks']);
    Route::post('/deleteClicks', [DashboardController::class, 'deleteClicks']);
});



\Illuminate\Support\Facades\URL::forceScheme('https');

