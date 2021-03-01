@extends('layouts.app')

@section('content')
    <body class="antialiased">

            <div class="container ">
                <div class="col">
                    <h1>Search for a Stolen Bike:</h1>
                <div>
            </div><br>
            <div class="container">
                <div class="col ">
                    <a class="icon btn btn-outline-secondary" href="{{ url('/search') }}">  <i class="fa fa-bicycle"></i> </a>
                </div>
            </div><br><br>

            @guest
                <div class="col">
                    <h1>Sign in to View Dashboard</h1>
                <div><br>
                <div class="col ">
                    <a class="icon btn btn-outline-secondary" href="{{ route('login') }}">  <i class="fa fa-sign-in"></i></a>
                </div><br><br>
            @else

                <div class="col">
                    <h1>View Dashboard:</h1>
                <div><br>

                <div class="col ">
                    <a class="icon btn btn-outline-secondary" href="{{ url('/dashboard') }}">  <i class="fa fa-line-chart"></i></a>
                </div><br><br>
            @endguest
       
    </body>
@endsection