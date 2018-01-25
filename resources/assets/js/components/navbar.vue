<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
          <router-link class="navbar-item" to="/blackJack">Black Jack</router-link>
          <router-link class="navbar-item" v-if="!isAuth" to="/login">Login</router-link>
          <router-link class="navbar-item" v-if="!isAuth" to="/regist">Regist</router-link>
          <a class="navbar-item" v-if="isAuth" v-on:click.prevent="logout()">Logout</a>
      </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isAuth: false
    }
  },
  created () {
    this.isAuth = this.$auth.isAuthentificated()
  }
}
</script>

<style lang="css">
</style>
