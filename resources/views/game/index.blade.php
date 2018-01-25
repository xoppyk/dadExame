@extends('layouts.game')

@section('title', 'Vue.js App')

@section('content')
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/blackJack">Black Jack</router-link>
            <router-link class="navbar-item" to="/login">Login</router-link>
            <router-link class="navbar-item" to="/regist">Regist</router-link>
        </div>
    </nav>
    <router-view></router-view>
@endsection

@section('pagescript')
    <script src="{{ asset('js/appGame.js') }}"></script>
@stop
