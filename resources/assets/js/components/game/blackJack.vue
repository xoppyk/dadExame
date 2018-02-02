<template>
<div class="container">
    <h3>
      <p>{{currentPlayer == null ? '' : currentPlayer.name}} ({{currentPlayer == null ? '' : currentPlayer.nickname}})</p>
    </h3>
    <p>Pontos : {{currentPlayer == null ? '' : currentPlayer.total_points}}</p>
    <p>Jogos Jogados : {{currentPlayer == null ? '' : currentPlayer.total_games_played}}</p>
    <hr>
    <h3 class="text-center">Lobby</h3>
    <p>
        <button class="btn btn-xs btn-success" v-on:click.prevent="createGame">Create a New Game</button></p>
    <hr>
    <h4>Pending games (<a @click.prevent="loadLobby" href="">Refresh</a>)</h4>
    <lobby :games="lobbyGames" @join-click="join" @start-click="start"></lobby>
    <template v-for="activeGame in activeGames">
        <game :game="activeGame" :currentPlayer="currentPlayer"></game>
    </template>
</div>
</template>
<script type="text/javascript">
import Lobby from './lobby.vue';
import Game from './game.vue';

export default {
  props: ['currentPlayer'],
  data: function() {
    return {
      title: 'BlackJack',
      lobbyGames: [],
      activeGames: [],
      socketId: ""
    }
  },
  sockets: {
    connect() {
      console.log('socket connected');
      this.socketId = this.$socket.id;
    },
    discconnect() {
      console.log('socket disconnected');
      this.socketId = "";
    },
    lobby_changed() {
      this.loadLobby();
    },
    my_active_game_closed(){
      this.$emit('get-user');
      this.loadLobby();
    },
    my_active_games_changed() {
      this.loadActiveGames();
    },
    my_active_games(games) {
      this.activeGames = games;
      this.loadActiveGames();
    },
    my_lobby_games(games) {
      this.lobbyGames = games;
      this.loadLobby();
    },
    game_changed(game) {
      for (var lobbyGame of this.lobbyGames) {
        if (game.gameID == lobbyGame.gameID) {
          Object.assign(lobbyGame, game);
          break;
        }
      }
      for (var activeGame of this.activeGames) {
        if (game.gameID == activeGame.gameID) {
          Object.assign(activeGame, game);
          break;
        }
      }

    },
    invalid_play(errorObject) {
      if (errorObject.type == 'Invalid_Game') {
        alert('ERROR: Game does not exist on server');
      } else if (errorObject.type == 'Invalid_Player') {
        alert('ERROR: Player not valid for this game');
      } else if (errorObject.type == 'Invalid_Play') {
        alert('ERROR: Move not valid or not your turn');
      } else {
        alert('ERROR: ' + errorObject.type);
      }
    }
  },
  methods: {
    loadLobby() {
      this.$socket.emit('get_my_lobby_games');
    },
    loadActiveGames() {
      this.$socket.emit('get_my_activegames');
    },
    createGame() {
      if (this.currentPlayer.name == '') {
        alert('Current Player is Empty - Cannot Create a Game');
        return;
      } else {
        this.$socket.emit('create_game', { playerToken: this.$auth.getToken() });
      }
    },
    join(game) {
      if (this.currentPlayer.name == '') {
        alert('Current Player is Empty - Cannot Create a Game');
        return;
      }
      this.$socket.emit('join_game', {gameID: game.gameID, playerToken: this.$auth.getToken()});
    },
    start(game) {
      this.$socket.emit('start_game', {
        gameID: game.gameID,
        playerToken: this.$auth.getToken()
      });
    },
    skip(game) {
      this.$socket.emit('skip', {
        gameID: game.gameID,
        playerToken: this.$auth.getToken()
      });
    },
    giveCard(game) {
      this.$socket.emit('give_card', {
        gameID: game.gameID,
        playerToken: this.$auth.getToken()
      });
    },
    play(game, index) {
      this.$socket.emit('play', {
        gameID: game.gameID,
        index: index
      });
    },
    close(game, owner) {
      this.$socket.emit('remove_game', {
        gameID: game.gameID,
        owner: owner
      });
    },
    check(game) {
      this.$socket.emit('check', {
        gameID: game.gameID
      });
    }
  },
  components: {
    'lobby': Lobby,
    'game': Game,
  },
  mounted() {
    this.loadLobby();
  },
}
</script>
<style>
</style>
