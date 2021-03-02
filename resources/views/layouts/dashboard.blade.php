@extends('layouts.app')

@section('content')
<script src="{{ asset('js/dashboardloader.js') }}" defer></script>

<body class="antialiased">
    <div class="container">
        <h1>Green and Blue contact button clicks are recorded.</h1>
    </div>
    <div id="dashboard"></div>
</body>
@endsection