<template lang="html">
  <div class="container">
    <!-- Is Authenticated -->
    <div v-if="isAuth">
    <h3>My Statistics</h3>
      <div class="container">
          <h5>Total of Games : {{ myStatistics.total_games_played}}</h5>
          <h5>Points : {{ myStatistics.total_poins}}</h5>
          <h5>Winns : {{ myStatistics.total_wins}}</h5>
          <h5>Ties : {{ myStatistics.total_ties}}</h5>
          <h5>Losese : {{ myStatistics.total_loses}}</h5>
          <h5>Points AVARAGE : {{ myStatistics.avg}}</h5>
      </div>
  </div>
  <!-- Visitor -->
    <div>
      <h3>All Statistics</h3>
        <div class="container">
            <h5>Total of Games : {{ statistics.total_of_games}}</h5>
            <h5>Total of Users : {{ statistics.total_of_users}}</h5>
        </div>
        <hr>

      <!-- Nav -->
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li v-bind:class="{'nav-item active show': showSection === 'points'}">
          <a v-on:click="showSection = 'points'" class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Top Points</a>
        </li>
        <li v-bind:class="{'nav-item active show': showSection === 'games'}">
          <a v-on:click="showSection = 'games'" class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Top Games</a>
        </li>
        <li v-bind:class="{'nav-item active show': showSection === 'avg'}">
          <a v-on:click="showSection = 'avg'" class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Best Avg</a>
        </li>
      </ul>

      <!-- Tables -->
      <div class="container" v-show="showSection === 'points'">
        <b-table striped hover :items="statistics.best_of_users_with_more_points"></b-table>
      </div>
      <div class="container" v-show="showSection === 'games'">
        <b-table striped hover :items="statistics.best_of_users_with_more_games"></b-table>
      </div>
      <div class="container" v-show="showSection === 'avg'">
        <b-table striped hover :items="statistics.best_of_users_with_best_avg"></b-table>
      </div>

  </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      statistics: {},
      myStatistics: [{}],
      isAuth: this.$auth.isAuthenticated(),
      showSection: 'points'
    }
  },
  methods: {
    getAllStatistics: function() {
      axios.get('api/statistics').then((response) => {
        this.statistics = response.data;
      })
    },
    getMyStatistics: function() {
      axios({
          url: 'api/statistics/byUser/' + this.$auth.getAuthentifiedUser().id,
          method: 'get',
          headers: {
            Authorization: "Bearer " + this.$auth.getToken()
          }
        })
        .then((response) => {
          this.myStatistics = response.data;
        })
        .catch(function(error) {
          swal("Error!", error.error, "warning")
        });
    },
  },
  mounted() {
    this.getAllStatistics();

    if (this.$auth.isAuthenticated()) {
      let user = this.$auth.getAuthentifiedUser();
      this.userID = user.id;
      this.getMyStatistics();
    }
  }
}
</script>

<style lang="css">
</style>
