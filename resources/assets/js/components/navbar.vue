<template>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <router-link class="navbar-brand" to="/blackJack">Black Jack</router-link>
    </div>
    <ul class="nav navbar-nav">
      <li :class="{active: isAuth == 1}"><a href="/">Home</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <router-link tag="li" to="/statistics"><a><span class="glyphicon glyphicon-log-in"></span>Statics</a></router-link>
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
  props: ['currentPlayer', 'isAuth'],
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$emit('logout');
      this.$router.push("/login");
    },
  },
}
</script>

<style>
.router-link-active {
  background-color: blue;
  color: white
}
</style>
