@component('mail::message')
Click To Confirm !!

<br>
@component('mail::button', ['url' => url('/confirm/' . $user->remember_token)])
Confirm
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
