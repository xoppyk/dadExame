<template>
<table class="table table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Player 1</th>
      <th>Player 2</th>
      <th>Player 3</th>
      <th>Player 4</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="game in games" :key="game.gameID">
      <td>{{ game.gameID }}</td>
      <td v-for="(n, index) in 4">
        <label v-if="game.players[index] != undefined">{{ game.players[index].nickname }}</label>
        <label v-else></label>
      </td>
      <td>
        <a class="btn btn-xs btn-primary" v-on:click.prevent="join(game)">Join</a>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script type="text/javascript">
module.exports = {
  props: ['games'],
  methods: {
    join(game) {
      this.$emit('join-click', game);
    },
  },
}
</script>
<style scoped>

</style>
