<template>
<div class="row">
  <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
    <form role="form">
      <h2>Please Sign Up <small>and Play Black Jack</small></h2>
      <hr class="colorgraph">
      <div class="form-group">
        <input type="text" name="name" id="name" class="form-control input-lg" placeholder="Name" tabindex="3" v-model="form.name">
        <p class="content help is-danger is-large" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></p>
      </div>
      <div class="form-group">
        <input type="text" name="nickname" id="nickname" class="form-control input-lg" placeholder="NickName" tabindex="3" v-model="form.nickname">
        <p class="content help is-danger is-large" v-if="form.errors.has('nickname')" v-text="form.errors.get('nickname')"></p>
      </div>
      <div class="form-group">
        <input type="email" name="email" id="email" class="form-control input-lg" placeholder="Email Address" tabindex="4" v-model="form.email">
        <p class="content help is-danger is-large" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></p>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6">
          <div class="form-group">
            <input type="password" name="password" id="password" class="form-control input-lg" placeholder="Password" tabindex="5" v-model="form.password">
            <p class="content help is-danger is-large" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></p>
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6">
          <div class="form-group">
            <input type="password" name="password_confirmation" id="password_confirmation" class="form-control input-lg" placeholder="Confirm Password" tabindex="6" v-model="form.password_confirmation">
            <p class="content help is-danger is-large" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></p>
          </div>
        </div>
      </div>
      <hr class="colorgraph">
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <input type="submit" value="Register" class="btn btn-primary btn-block btn-lg" tabindex="7" v-on:click.prevent="regist()">
        </div>
        <div class="col-xs-12 col-md-6">
          <a style="text-decoration:none">
            <router-link tag="a" to="/login" class="btn btn-success btn-block btn-lg">Sign In</router-link>
          </a>
        </div>
      </div>
    </form>
  </div>
</div>
</template>


<script type="text/javascript">
import swal from 'sweetalert';
import {
  Form
} from '../../classes/Form';
export default {
  data: function() {
    return {
      form: new Form({
        name: '',
        email: '',
        nickname: '',
        password: '',
        password_confirmation: '',
      })
    }
  },
  methods: {
    regist() {
      this.form.post('api/users/')
        .then(response => {
          swal("Good job!", "Check Your Email to Confirmation!", "success")
          this.$router.push("/login");
        })
        .catch(error => {
          swal("Error", 'Connection Failed', "error");
        });
    }
  }
}
</script>

<style scoped>
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
