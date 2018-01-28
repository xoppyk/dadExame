<template>
<div class="">
  <div class="header clearfix">
    <nav>
      <ul class="nav nav-pills pull-right">
        <router-link tag="li" to="/blackJack"><a>Black Jack</a></router-link>
        <router-link tag="li" v-if="!isAuth" to="/login"><a>Login</a></router-link>
        <router-link tag="li" v-if="!isAuth" to="/regist"><a>Regist</a></router-link>
        <router-link tag="li" v-if="isAuth" to="/profile" ><a>Edit User</a></router-link>
        <!-- <router-link tag="li" v-if="isAuth" to="/profile" :to="{ name: 'profile', props: { user: this.currentUser }}"><a>Edit User</a></router-link> -->
        <!-- <router-link :to="{path: "/profile", props: {user: currentUser}}"><a>Edit User</a></router-link> -->

        <!-- <li><a class="navbar-item" v-if="isAuth" v-on:click.prevent="profile()">Edit</a></li> -->
        <li><a class="navbar-item" v-if="isAuth" v-on:click.prevent="logout()">Logout</a></li>
      </ul>
    </nav>
    <h3 class="text-muted">Black Jack</h3>
  </div>
    <div class="container" v-if="showEditUser">
      <user-edit :user="currentUser"></user-edit>
    </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      isAuth: false,
      currentUser: {},
      showEditUser: false
    }
  },
  methods: {
    logout() {
      this.$auth.destroyToken();
      this.serverLogout();
      this.$router.push("/login");
      this.$emit('logout');
      this.$forceUpdate();
      this.isAuth = false;
    },
    serverLogout() {
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.$auth.getToken()
      }
      axios.post('api/logout', headers)
      .then((response) => {
        // alert('logout no servidor com sucesso')
        // localStorage.setItem('token', response.data.access_token)
        // this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now());
        // this.$router.push("/blackJack");
      })
      .catch((error) => {
          this.cardenciaisErradas = true
      })
    },
    profile (){
      console.log(this.currentUser);
      // this.$router.push({ name: 'profile', params: { user: this.currentUser }});
    },
    setAuthenticatedUser() {
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.$auth.getToken()
      }
      axios.get('api/user', headers)
        .then((response) => {
          //Object.assign(this.currentPlayer, response.data);
          // this.currentPlayer = response.data
          this.currentUser = response.data
        })
        .catch((error) => {
          console.log('nao tem nada')
        });
      console.log('load user');
    }
  },
  components: {
      // 'user-edit': UserEdit
  },
  created() {
    this.isAuth = this.$auth.isAuthenticated();
    this.setAuthenticatedUser();
  }
}
</script>

<style>
.router-link-active {
  background-color: blue;
  color: white
}
</style>
