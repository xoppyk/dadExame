@extends('layouts.app')

@section('title', 'Administração')

@section('content')
  @if (auth()->check() && auth()->user()->isAdmin())
    <section class="info-tiles mt-1">
      <div class="tile is-ancestor has-text-centered">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">{{ \App\User::count() }}</p>
            <p class="subtitle">Utilizadores</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">{{ \App\Game::count() }}</p>
            <p class="subtitle">Jogos jogados</p>
          </article>
        </div>
      </div>
    </section>
    <hr>
    <div id="app">
      <administration></administration>
    </div>
    @else
      {{Auth::logout()}}
      <script type="text/javascript">
        window.location.replace("http://35.164.189.15");
      </script>
    @endif
@endsection
