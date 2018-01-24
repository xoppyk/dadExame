@extends('master')

@section('title', 'Vue.js App')

@section('content')
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/users">Users</router-link>
            <router-link class="navbar-item" to="/frontend">Frontend</router-link>
            <router-link class="navbar-item" to="/login">Login</router-link>
            <router-link class="navbar-item" to="/regist">Regist</router-link>
        </div>
    </nav>
    <router-view></router-view>
@endsection

@section('pagescript')
    <script src="{{ asset("js/app.js") }}"></script>
@stop
