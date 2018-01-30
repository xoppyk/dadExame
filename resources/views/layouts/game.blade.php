<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-sweetalert/1.0.1/sweetalert.min.css">
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        @yield('metatags')
        <title>@yield('title')</title>
        @yield('extrastyles')
        <!-- Latest compiled and minified CSS & JS -->
        <link rel="stylesheet" href="{{ URL::asset('css/app.css') }}">

        </head>
        <body>
          @if(session()->has('flash'))
            <script type="text/javascript">
              // swal("Something Wrong!", '{{ session('flash') }}', "warning");
              swal({ title: "Sweet!", text: '{{ session('flash') }}', imageUrl: 'thumbs-up.jpg' });
            </script>
          @endif
          @if(session()->has('error'))
            <script type="text/javascript">
              swal("Something Wrong!", '{{ session('error') }}', "warning");
            </script>
          @endif
        <div class="container" id="app">
            @yield('content')
        </div>

     @yield('pagescript')
    </body>
</html>
