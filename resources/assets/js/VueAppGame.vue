<template>
  <div class="container">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from './components/navbar.vue'
  export default {
    components: {
      'navbar' : Navbar,
    }
  }
</script>

<style>
</style>
