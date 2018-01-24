@component('mail::message')

Click to Confirm!

@component('mail::button', ['url' => url('/confirm/' . $user->remember_token)])
Confirm
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
