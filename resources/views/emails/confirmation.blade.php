@component('mail::message')
Click To Confirm !!

<br>
@component('mail::button', ['url' => url('/confirm/' . $user->remember_token)])
Confirm
@endcomponent

Thanks,<br>
If You Want Abort Your Registation Click Here
@component('mail::button', ['url' => url('/abort/' . $user->remember_token)])
ABORT
@endcomponent

Thanks,<br>


{{ config('app.name') }}
@endcomponent
