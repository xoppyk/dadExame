@extends('layouts.app')

@section('title', 'Administração')

@section('content')
    <div class="container">
        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Olá, {{ auth()->user()->name }}
              </h1>
              <h2 class="subtitle">
                Espero que esteja a ter um bom dia!
              </h2>
            </div>
          </div>
        </section>
        <div id="app">
            <administration></administration>
        </div>
      </div>
@endsection
