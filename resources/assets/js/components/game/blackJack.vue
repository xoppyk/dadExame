<template>
    <div>
      <div>
        <h3 class="text-center">{{ title }}</h3>
        <br>
        <h3> {{currentPlayer.name}}</h3>
        <p>Pontos : {{currentPlayer.total_points}}</p>
        <p>Jogos Jogados : {{currentPlayer.total_games_played}}</p>
        <hr>
        <h3 class="text-center">Lobby</h3>
        <p><button class="btn btn-xs btn-success" v-on:click.prevent="createGame">Create a New Game</button></p>
        <hr>
        <h4>Pending games (<a @click.prevent="loadLobby">Refresh</a>)</h4>
        <lobby :games="lobbyGames" @join-click="join" @start-click="start"></lobby>
        <template v-for="game in activeGames">
            <game :game="game" :currentPlayer="currentPlayer"></game>
        </template>
      </div>
    </div>
</template>

<script type="text/javascript">
    import Lobby from './lobby.vue';
    import Game from './game.vue';

    export default {
        data: function(){
            return {
                title: 'BlackJack',
                currentPlayer: {},
                lobbyGames: [],
                activeGames: [],
                socketId: "",
                deck_nr: '',
                cards: [],
            }
        },
        sockets:{
            connect(){
                console.log('socket connected');
                this.socketId = this.$socket.id;
            },
            discconnect(){
                console.log('socket disconnected');
                this.socketId = "";
            },
            lobby_changed(){
                // For this to work, websocket server must emit a message
                // named "lobby_changed"
                this.loadLobby();
            },
            my_active_games_changed(){
                this.loadActiveGames();
            },
            my_active_games(games){
                this.activeGames = games;
            },
            my_lobby_games(games){
                this.lobbyGames = games;
            },
            game_changed(game){
                for(var lobbyGame of this.lobbyGames){
                    if(game.gameID == lobbyGame.gameID){
                        Object.assign(lobbyGame, game);
                        break;
                    }
                }
                for(var activeGame of this.activeGames){
                    if(game.gameID == activeGame.gameID){
                        Object.assign(activeGame, game);
                        break;
                    }
                }

            },
            invalid_play(errorObject){
                if(errorObject.type == 'Invalid_Game'){
                    alert('ERROR: Game does not exist on server');
                }else if(errorObject.type == 'Invalid_Player'){
                    alert('ERROR: Player not valid for this game');
                }else if(errorObject.type == 'Invalid_Play'){
                    alert('ERROR: Move not valid or not your turn');
                }else{
                    alert('ERROR: '+errorObject.type);
                }
            }
        },        
        methods: {
            loadLobby(){
                /// send message to server to load the list of games on the lobby
                this.$socket.emit('get_my_lobby_games');
            },
            loadActiveGames(){
                /// send message to server to load the list of games that player is playing
                this.$socket.emit('get_my_activegames');
            },
            createGame(){
                // For this to work, server must handle (on event) the "create_game" message
                if (this.currentPlayer.name == "") {
                    alert('Current Player is Empty - Cannot Create a Game');
                    return;
                }
                else {
                    axios.get('/api/decks/random')
                        .then(response => {
                            //console.log('deck'+response.data.data.id);
                            this.deck_nr = response.data.data.id;
                            axios.get('/api/cards/deck/' + this.deck_nr)
                                .then(response => {
                                    //console.log('response.data.data');
                                    //console.log(response.data.data);
                                    this.cards = response.data.data;
                                    this.$socket.emit('create_game', { playerName: this.currentPlayer.name, cards: this.cards });  
                                });
                        });
                }
            },
            join(game){
                // Click to join game
                if(game.player1 == this.currentPlayer.name){
                    alert('Cannot join because your name is the same as Player1');
                    return;
                }
                this.$socket.emit('join_game', {gameID: game.gameID, playerName: this.currentPlayer.name});
            },
            start(game){
                // play a game - click on piece on specified index
                this.$socket.emit('start_game', {gameID: game.gameID, playerName: this.currentPlayer.name});
                console.log(this.currentPlayer.name);
            },
            play(game, index){
                // play a game - click on piece on specified index
                this.$socket.emit('play', {gameID: game.gameID, index: index});
            },
            close(game){
                // to close a game
                this.$socket.emit('remove_game', {gameID: game.gameID});
            },
            giveCard(game){
                // to close a game
                this.$socket.emit('give_card', {gameID: game.gameID, playerName: this.currentPlayer.name});
            },
            loadUser: function(){
                var headers = {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.$auth.getToken()
                }
                axios.get('api/user', headers)
                  .then((response) => {
                    //Object.assign(this.currentPlayer, response.data);
                    this.currentPlayer = response.data
                  })
                  .catch((error) => {
                    console.log('nao tem nada')
                  })
            }
        },
        components: {
            'lobby': Lobby,
            'game': Game,
        },
        mounted() {
            this.loadUser();
            this.loadLobby();
        },
        beforeMount() {
        // this.$socket.emit('authentication', window.localStorage.getItem('access_token'));
        /*var headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$auth.getToken()
        }
        axios.get('api/user', headers)
          .then((response) => {
            //Object.assign(this.currentPlayer, response.data);
            this.currentPlayer = response.data
          })
          .catch((error) => {
            console.log('nao tem nada')
          })*/
        }

    }
</script>

<style> 
    
</style>