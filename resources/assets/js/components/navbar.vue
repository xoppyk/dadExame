<template>
  <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <router-link class="navbar-brand" to="/blackJack">Black Jack</router-link>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <!-- Authentificatede  -->
      <router-link tag="li" v-if="isAuth" to="/profile"><a><span class="glyphicon glyphicon-user"></span>Edit User</a></router-link>
      <li><a class="navbar-item" v-if="isAuth" v-on:click.prevent="logout()"><span class="glyphicon glyphicon-log-out"></span>Logout</a></li>
      <!-- DONT Authentificatede  -->
      <router-link tag="li" v-if="!isAuth" to="/login"><a><span class="glyphicon glyphicon-log-in"></span>Sign In</a></router-link>
      <router-link tag="li" v-if="!isAuth" to="/regist"><a><span class="glyphicon glyphicon-user"></span>Regist</a></router-link>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  props: ['currentPlayer'],
  data() {
    return {
      isAuth: false,
      showEditUser: false
    }
  },
  methods: {
    logout() {
      this.$auth.destroyToken();
      this.serverLogout();
      this.$router.push("/login");
      this.$emit('logout');
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
  },
  created() {
    this.isAuth = this.$auth.isAuthenticated();
  }
}
</script>

<style>
.router-link-active {
  background-color: blue;
  color: white
}
</style>
