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
                        <form method="POST" action="/logout">
                            @csrf
                            <button type="submit" class="btn btn-outline-info">Logout</button>
                        </form>
                    </div>
                    
                </div>
                <br>
                <div class="card">
                    <div class="card-header">Delete Account</div>
                        <div class="card-body">
                            <form method="POST" action="/deleteAccount">
                                @csrf
                                <button type="submit" class="btn icon-small">Delete Account</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</body>

@endsection
