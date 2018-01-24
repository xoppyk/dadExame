<template>
    <div class="jumbotron">
        <h2>Login</h2>
        <div class="container">
            <form class="form-signin">
                <h2 class="form-signin-heading">Please sign in</h2>

                <label for="email" class="sr-only">Email address or NickName</label>
                <input type="text" id="email" class="form-control" placeholder="Email address or NickName" required autofocus v-model="form.username">

                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="form.password">

                <div class="checkbox">
                    <label>
                    <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <a class="btn btn-lg btn-primary btn-block" v-on:click.prevent="signIn()">Sign in</a>
            </form>
        </div> <!-- /container -->
    </div>
</template>

<script type="text/javascript">
    import {Form} from '../classes/Form';
    export default {
        data: function(){
            return {
                form: new Form({
                    username: '',
                    password: '',
                })
            }
        },
        methods: {
            signIn: function(){
                var headers = {
                            'Content-Type': 'application/json'
                }
                var data = {
                            'email': this.form.username,
                            'password': this.form.password,

                }
                axios.post('api/login', data, headers)
                .then((response) => {
                  // localStorage.setItem('token', response.data.access_token)
                  this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now())
                })
                .catch((error) => {
                    alert('ta mal')
                })
            },
        }
    }
</script>

<style scoped>

</style>
