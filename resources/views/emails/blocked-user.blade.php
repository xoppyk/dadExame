@component('mail::message')
You Are Blocked of BlackJack

<br>

{{$user->reason_blocked}}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
