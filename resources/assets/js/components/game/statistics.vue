<template lang="html">
  <div class="container">
    <!-- Is Authenticated -->
    <div v-if="isAuth">
    <h3>My Statistics</h3>
    <div class="row">
      <div class="col-sm-1 col-lg-3">
      </div>
      <div class="col-sm-4 col-lg-3">
        <h5>Total of Games : {{ myStatistics.total_games_played}}</h5>
        <h5>Total of Points : {{ myStatistics.total_poins}}</h5>
        <h5>Total of Winns : {{ myStatistics.total_wins}}</h5>
        <h5>Total of Ties : {{ myStatistics.total_ties}}</h5>
        <h5>Total of Losese : {{ myStatistics.total_loses}}</h5>
        <h5>Total of AVARAGE : {{ myStatistics.avg}}</h5>
      </div>
    </div>
  </div>
  <!-- Visitor -->
    <div>
    <h3>All Statistics</h3>
    <div class="row">
      <div class="col-sm-1 col-lg-3">
      </div>
      <div class="col-sm-4 col-lg-3">
        <h5>Total of Games : {{ statistics.total_of_games}}</h5>
        <h5>Total of Users : {{ statistics.total_of_users}}</h5>
      </div>
    </div>
    <hr>
    <div class="row">
      <!-- More Points -->
      <div class="col-sm-6 col-lg-3">
        <h4>More Points :</h4>
        <div v-for="(item, index) in statistics.best_of_users_with_more_points" >
          <p>{{ item.total_points}} -> {{item.name}} ({{item.nickname}})</p>
        </div>
      </div>
      <!-- More Games -->
      <div class="col-sm-6 col-lg-3">
        <h4>More Games:</h4>
        <div v-for="(item, index) in statistics.best_of_users_with_more_games">
          <p>{{ item.total_games_played}} -> {{item.name}} ({{item.nickname}})</p>
        </div>
      </div>
      </div>
      <hr>
      <div class="row">
      <!-- Best AVG -->
      <div class="col-sm-12 col-lg-3">
        <h4>Best Avg :</h4>
        <div v-for="(item, index) in statistics.best_of_users_with_best_avg">
          <p>Avg: {{ item.avg }} -> {{item.name}} ({{item.nickname}}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      statistics: {},
      myStatistics: {},
      isAuth: this.$auth.isAuthenticated(),
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
