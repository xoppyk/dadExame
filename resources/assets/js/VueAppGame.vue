<template>
<div id="app">
  <navbar :currentPlayer="currentPlayer" :isAuth="isAuth" @logout="logout"></navbar>
  <router-view :currentPlayer="currentPlayer" @login="login" @logout="logout" @get-user="getUser"></router-view>
</div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  data() {
    return {
      currentPlayer: {'id': '','name' :''},
      isAuth: this.$auth.isAuthenticated(),
    }
  },
  components: {
    'navbar': Navbar,
  },
  methods: {
    login() {
      this.getUser();
    },
    logout() {
      axios({
          url: 'api/logout',
          method: 'post',
          headers: {
            Authorization: "Bearer " + this.$auth.getToken()
          }
        })
        .then((response) => {
          this.$auth.destroyToken();
          this.$router.push("/login");
        })
        .catch(function(error) {
          console.log(error)
        });
      this.$auth.destroyToken();
      this.isAuth = false;
    },
    getUser() {
      axios({
          url: 'api/user',
          method: 'get',
          headers: {
            Authorization: "Bearer " + this.$auth.getToken()
          }
        })
        .then((response) => {
          if (response.data.blocked) {
            this.logout();
            swal("You are Bloked!", response.data.reason_blocked == null ? '' : response.data.reason_blocked, "warning");
          }
          this.currentPlayer = response.data;
          this.isAuth = true;
          this.$auth.setAuthentifiedUser(response.data);
        })
        .catch(function(error) {
          console.log(error)
        });
    }
  },
  mounted() {
    if (this.$auth.isAuthenticated()) {
      this.currentPlayer = this.$auth.getAuthentifiedUser();
    }
  }
}
</script>

<style>
/* Space out content a bit */

body {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Everything but the jumbotron gets side spacing for mobile first views */

.header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}

/* Custom page header */

.header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
}

/* Make the masthead heading the same height as the navigation */

.header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}

/* Custom page footer */

.footer {
  padding-top: 19px;
  color: #777;
  border-top: 1px solid #e5e5e5;
}

/* Customize container */

@media (min-width: 768px) {
  .container {
    max-width: 730px;
  }
}

.container-narrow>hr {
  margin: 30px 0;
}

/* Main marketing message and sign up button */

.jumbotron {
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}

.jumbotron .btn {
  padding: 14px 24px;
  font-size: 21px;
}

/* Supporting marketing content */

.marketing {
  margin: 40px 0;
}

.marketing p+h4 {
  margin-top: 28px;
}

/* Responsive: Portrait tablets and up */

@media screen and (min-width: 768px) {
  /* Remove the padding we set earlier */
  .header,
  .marketing,
  .footer {
    padding-right: 0;
    padding-left: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
  /* Remove the bottom border on the jumbotron for visual effect */
  .jumbotron {
    border-bottom: 0;
  }
}
</style>
