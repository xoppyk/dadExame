<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-sweetalert/1.0.1/sweetalert.min.css">
        <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css"> -->
        @yield('metatags')
        <title>@yield('title')</title>
        @yield('extrastyles')
        <!-- Latest compiled and minified CSS & JS -->
        <link rel="stylesheet" href="{{ URL::asset('css/app.css') }}">

        </head>
        <body>
        <div class="container" id="app">
            <!-- @if(session()->has('flash'))
              <div class="row">
                <div class="alert alert-success">
                    <a class="close" data-dismiss="alert" aria-label="close" >&times;</a>
                    <strong>Notification</strong> {{ session()->get('flash')}}
                </div>
            @endif -->
            @if (session('flash'))
                        <div class="alert alert-success">
                            {{ session('flash') }}
                        </div>
                    @endif
            @yield('content')
        </div>

     @yield('pagescript')
    </body>
</html>
