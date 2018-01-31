<template lang="html">
  <div class="container">
    <div v-if="isAuth">
    <h3>My Statistics</h3>
    <div class="row">
      <div class="col-sm-1 col-lg-3">
      </div>
      <div class="col-sm-4 col-lg-3">
        <h5>Total of Games : {{ statistics.total_of_games}}</h5>
        <h5>Total of Users : {{ statistics.total_of_users}}</h5>
      </div>
    </div>
  </div>
    <div v-else>

    <h3>Statistics</h3>
    <div class="row">
      <div class="col-sm-1 col-lg-3">
      </div>
      <div class="col-sm-4 col-lg-3">
        <h5>Total of Games : {{ statistics.total_of_games}}</h5>
        <h5>Total of Users : {{ statistics.total_of_users}}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4 col-lg-3">
        <h4>More Points :</h4>
        <div v-for="(item, index) in statistics.best_of_users_with_more_points">
          <p>{{ item.total_points}} - {{item.name}}</p>
        </div>
      </div>
      <div class="col-sm-4 col-lg-3">
        <h4>More Games:</h4>
        <div v-for="(item, index) in statistics.best_of_users_with_more_games">
          <p>{{ item.total_games_played}} - {{item.name}}</p>
        </div>
      </div>
      <div class="col-sm-4 col-lg-3">
        <h4>Best Avg :</h4>
        <div v-for="(item, index) in statistics.best_of_users_with_best_avg">
          <p>Points: {{ item.total_points}} - Games: {{item.total_games_played}} -> {{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: ['currentPlayer'],
  data: function() {
    return {
      statistics: {},
      myStatistics: {},
      isAuth: this.$auth.isAuthenticated()
    }
  },
  methods: {
    getAllStatistics: function() {
      axios.get('api/statistics').then((response) => {
        // Object.assign(this.statistics, response.data);
        this.statistics = response.data;
        // console.log(response.data);
      })
    },
    getMyStatistics: function() {
      axios({ url: 'statistics/byUser/' + 6, method: 'get', headers: { Authorization: "Bearer " + this.$auth.getToken() }
      })
      .then((response) => {
        console.log(response)
      })
      .catch(function(error) {
        swal("Error!", error.error, "warning")
      });
  },
},
  mounted() {
    this.getAllStatistics();
    if (this.isAuth) {
      this.getMyStatistics();
    }
  }
}
</script>

<style lang="css">
</style>
