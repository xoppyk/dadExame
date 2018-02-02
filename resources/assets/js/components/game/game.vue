<template>
    <div class="gameseparator">
        <div>
            <h2 class="text-center">Game {{ game.gameID }}</h2>
            <br>
        </div>
        <div class="game-zone-content">
            <div class="alert" :class="alerttype">
                <strong>
                    {{ message }} &nbsp;&nbsp;&nbsp;&nbsp;
                    <button v-if="(game.gameEnded  || !game.gameStarted) && (game.players[0].token == this.$auth.getToken())" class="btn btn-xs btn-primary" v-on:click.prevent="closeGame">Close Game</button>
                    <button class="btn btn-xs btn-primary" v-on:click.prevent="start(game)"
                            v-if="game.players[0].token == this.$auth.getToken() && !game.gameStarted
                            && game.players.length > 1">Start</button>
                    <label v-if="!game.gameEnded && game.gameStarted">Time: {{ game.time }}  {{ (game.jogadas == 1) ? 'First' : 'Last'}} Round </label>
                </strong>
            </div>
            <div v-if="game.gameStarted">
                <div class="row" v-for="(player, key) of game.players">
                    <div class="col-sm-2 col-lg-2">
                        {{ player.nickname }}
                    </div>
                    <div class="col-sm-6 col-lg-6">
                        <div v-for="(card, key) of player.cards" style="display: inline-block;">
                            <img v-bind:src="cardImageURL(card, key, player.nickname, game.gameEnded)" width="70px">
                        </div>
                    </div>
                    <div class="col-sm-2 col-lg-2">
                        <label v-if="player.id == currentPlayer.id || game.gameEnded">Points: {{ player.points }}</label>
                    </div>
                    <div class="col-sm-2 col-lg-2">
                        <button class="btn btn-xs btn-success" v-on:click.prevent="giveCard" v-show="canPlay(game, player)">Give me card</button>
                        <button class="btn btn-xs btn-danger" v-on:click.prevent="skip(game)" v-show="canPlay(game, player)">Skip</button>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: ['game', 'currentPlayer'],
        data: function(){
            return {
                tckcount: 20
            }
        },
        computed: {
          message(){
              if(!this.game.gameStarted){
                  return "Game has not started yet";
              }else if(this.game.gameEnded){
                  if(this.game.winner == this.currentPlayer.nickname){
                      return "Game has ended. YOU WIN !!!";
                  }else if(this.game.winner == 0){
                      return "Game has ended. It's a tie";
                  }else if(this.game.winner == -1){
                      return "Game has ended. ALL PLAYERS LOST !!!";
                  }
                  return "Game has ended and "+this.game.winner+"'s has won. YOU HAVE LOST !!!";
              }else{
                  return "Game is running."
              }
              return "Game is inconsistent";
          },
            alerttype(){
                if(!this.game.gameStarted){
                    return "alert-warning";
                }else if(this.game.gameEnded){
                    if(this.game.winner == this.currentPlayer.nickname){
                        return "alert-success";
                    }else if(this.game.winner == 0){
                        return "alert-info";
                    }
                    return "alert-danger";
                }else{
                    return "alert-info";
                }
            },
            adversaryName(){
                var ownPlayerNumb = this.ownPlayerNumber;
                if(ownPlayerNumb == 1){
                    return this.game.player2;
                }
                if(ownPlayerNumb == 2){
                    return this.game.player1;
                }
                return "Unknown";
            },
            ownPlayerNumber(){
                if(this.game.player1SocketID == this.$parent.socketId){
                    return 1;
                }else if(this.game.player2SocketID == this.$parent.socketId){
                    return 2;
                }
                return 0;
            }
        },
        methods: {
            start(game) {
                this.$parent.start(this.game);
                this.tikcount();
            },
            skip(game) {
                this.$parent.skip(this.game);
            },
            closeGame(){
                this.$parent.close(this.game, (this.game.players[0].token == this.$auth.getToken()));
            },
            giveCard(){
                this.$parent.giveCard(this.game);
            },
            cardImageURL: function(card, key, userNickname, gameEnded) {
                if(card != 'undefined'){
                    if(gameEnded){
                        return 'img/' + String(card.path);
                    }
                    var imgSrc;
                    if(this.currentPlayer.nickname == userNickname){
                        imgSrc = String(card.path);
                    }else if((this.currentPlayer.nickname != userNickname) && (key == 0)){
                        imgSrc = String(card.path);
                    }else{
                        imgSrc = String(this.game.hiddenFace);
                    }
                    return 'img/' + imgSrc;
                }
            },
            canPlay(game, player){
                return (game.gameStarted && (game.players.length > 1) && !game.gameEnded
                && player.id == this.currentPlayer.id && !player.played && player.canPlay && (player.points < 21));
            },
            tikcount() {
                if(!this.game.gameEnded) {
                    if(this.tckcount>0) {
                        setTimeout(()=> {
                            this.tckcount--;
                            this.$parent.check(this.game);
                            this.tikcount();
                        }, 1000);
                    } else {
                        (this.tckcount)? this.tckcount-- : this.tckcount=20;
                        this.tikcount();
                    }
                }
            }
        },
        mounted(){
        }
    }
</script>

<style scoped>
.gameseparator{
    border-style: solid;
    border-width: 2px 0 0 0;
    border-color: black;
}
</style>
