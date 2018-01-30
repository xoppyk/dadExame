@component('mail::message')
Click To Confirm Deleting Account!!

<br>
@component('mail::button', ['url' => url('/deleteRequest/' . $user->remember_token)])
Confirm Deleting
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
