<template>
<div id="app" class="container">
  <navbar @logout="logout"></navbar>
  <router-view :user="currentUser" ></router-view>
</div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  data() {
    return {
      currentUser: {},
    }
  },
  components: {
    'navbar': Navbar,
  },
  methods: {
    logout() {
      // tenho que atualizar a navbar
      this.$forceUpdate();
    }
  },
  mounted (){
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
    console.log('load user no VueAppgame');
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
