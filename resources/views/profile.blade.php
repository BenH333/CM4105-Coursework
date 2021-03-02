@extends('layouts.app')

@section('content')

<body class="antialiased">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col">
                <div class="card">
                    <div class="card-header">{{ Auth::user()->name }}</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        {{ __('You are logged in!') }}

                        <br><br>
                        <a class="btn btn-outline-info"href="logout">Logout</a>
                    </div>

                    
                </div>
                <br>
                <div class="card">
                    <div class="card-header">Delete Account</div>

                    <div class="card-body">
                            <a class="btn icon-small" href="deleteAccount">Delete Account</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

@endsection
