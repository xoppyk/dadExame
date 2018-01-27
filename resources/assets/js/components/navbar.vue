<template>
<div class="header clearfix">
  <nav>
    <ul class="nav nav-pills pull-right">
      <router-link tag="li" to="/blackJack" v-if="!isAuth"><a>Black Jack</a></router-link>
      <router-link tag="li" v-if="!isAuth" to="/login"><a>Login</a></router-link>
      <router-link tag="li" v-if="!isAuth" to="/regist"><a>Regist</a></router-link>
      <!-- <router-link tag="li"  v-if="isAuth" to="/logout" ><a v-on:click.prevent="logout">Logout</a></router-link> -->
      <li><a class="navbar-item" v-if="isAuth" v-on:click.prevent="" v-text="currentUser.name"></a></li>
      <li><a class="navbar-item" v-if="isAuth" v-on:click.prevent="logout()">Logout</a></li>
    </ul>
  </nav>
  <h3 class="text-muted">Black Jack</h3>
</div>
</template>

<script>
import UserEdit from './users/userEdit.vue';
export default {
  data() {
    return {
      isAuth: false,
      currentUser: {}
    }
  },
  methods: {
    logout() {
      this.$auth.destroyToken();
      this.$router.push("/login");
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
      'user-edit': UserEdit
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
