<template>
<div class="container">
  <div class="row" style="margin-top:20px">
    <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
      <form role="form">
        <fieldset>
          <h2>Please Sign In</h2>
          <hr class="colorgraph">
          <p class="content help is-danger is-small" v-if="cardenciaisErradas">Wrong Username or Password</p>
          <div class="form-group">
            <input type="email" name="email" id="email" class="form-control input-lg" placeholder="Email Address" required autofocus v-model="form.username">
          </div>
          <div class="form-group">
            <input type="password" name="password" id="password" class="form-control input-lg" placeholder="Password" required v-model="form.password">
            <a href="" class="btn btn-link pull-right" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Forgot Password?</a>
          </div>
          <hr class="colorgraph">
          <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6">
              <input type="submit" class="btn btn-lg btn-success btn-block" value="Sign In" v-on:click.prevent="login()">
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6">
              <a style="text-decoration:none">
                <router-link tag="a" to="/regist" class="btn btn-lg btn-primary btn-block">Regist</router-link>
              </a>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="exampleModalLabel">Forgot Password</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Your Email</label>
              <input type="email" class="form-control" id="recipient-name" placeholder="Email Address" required autofocus v-model="emailResetPassword">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click.prevent="forgotPassword()" data-dismiss="modal">Reset Password</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import {
  Form
} from '../../classes/Form';
export default {
  data: function() {
    return {
      form: new Form({
        username: '',
        password: '',
      }),
      cardenciaisErradas: false,
      emailResetPassword: ''
    }
  },
  methods: {
    login: function() {
      // this.navbar.isAuth = true;
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
          this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now());
          this.$router.push("/blackJack");
          this.$emit('login');
          console.log('Tamos no login e vamos emitir para o pai');
        })
        .catch((error) => {
          this.cardenciaisErradas = true
        })
    },
    forgotPassword() {
      var headers = {
        'Content-Type': 'application/json'
      }
      var data = {
        'email': this.emailResetPassword,
      }
      axios.post('password/email', data, headers)
        .then((response) => {
          swal("Request Send!", "Check Your Email!", "success")
        })
        .catch((error) => {
          swal("Error", error.error, "error");
        })
    }
  }
}
</script>

<style>
/* Credit to bootsnipp.com for the css for the color graph */

.colorgraph {
  height: 5px;
  border-top: 0;
  background: #c4e17f;
  border-radius: 5px;
  background-image: -webkit-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
  background-image: -moz-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
  background-image: -o-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
  background-image: linear-gradient(to right, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
}
</style>
