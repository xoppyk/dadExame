<template>
<div class="container">
  <br>
  <br>
  <div class="row" id="main">
    <div class="col-md-8 well" id="rightPanel">
      <div class="row">
        <div class="col-md-12">
          <form role="form">
            <h2>Edit your profile</h2>
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
            <div class="form-group">
              <input type="password" name="old_password" id="old_password" class="form-control input-lg" placeholder="Old Password, Keep Empty, If dont want Change" tabindex="4" v-model="form.old_password">
              <p class="content help is-danger is-large" v-if="form.errors.has('old_password')" v-text="form.errors.get('old_password')"></p>
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
              <div class="col-xs-12 col-md-6"><a href="#" class="btn btn-default btn-block btn-lg" v-on:click.prevent="cancelEdit()">Cancel</a></div>
              <div class="col-xs-12 col-md-6"><a href="#" class="btn btn-success btn-block btn-lg" v-on:click.prevent="saveUser()">Save</a></div>
            </div>
          </form>
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
  props: ['currentPlayer'],
  data: function() {
    return {
      form: new Form({
        name: this.currentPlayer.name,
        email: this.currentPlayer.email,
        nickname: this.currentPlayer.nickname,
        old_password: '',
        password: '',
        password_confirmation: '',
      }),
    }
  },
  methods: {
    saveUser: function() {
      this.form.put('api/users/' + this.currentPlayer.id)
        .then(response => {
          Object.assign(this.currentPlayer, response.data);
          swal("Good job!", "Profile Edited with Success!", "success")
          this.$router.push("/blackJack");
        })
        .catch(error => {
          swal("Error", error.error, "error");
        });
    },
    cancelEdit: function() {
      this.$router.push("/blackJack");
    }
  }
}
</script>

<style scoped>
#leftPanel {
  background-color: #0079ac;
  color: #fff;
  text-align: center;
}

#rightPanel {
  min-height: 415px;
}

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
