<template>
    <div class="gameseparator">
        <div>
            <h2 class="text-center">Game {{ game.gameID }}</h2>
            <br>
        </div>
        <div class="game-zone-content">       
            <div class="alert" :class="alerttype">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-xs btn-primary" v-on:click.prevent="closeGame">Close Game</button>
                    <button class="btn btn-xs btn-primary" v-on:click.prevent="start(game)" v-if="game.playersFull[0][0] == currentPlayer.name && !game.gameStarted && game.playersFull.length > 1">Start</button>
                    <label v-if="!game.gameEnded">Time: {{ game.tempo }}</label>
                </strong>
            </div>
            <div v-if="game.gameStarted">
                <div v-for="(player, key) of game.playersFull">
                    {{ player[0] }}
                    <div v-for="(card, key) of player[1]" style="display: inline-block;">
                        <img v-bind:src="cardImageURL(card, key, player[0])" width="70px">    
                    </div>
                    <div style="display: inline-block;" v-if="player[0] == currentPlayer.name">
                        Points: {{ player[5] }}
                        <button class="btn btn-xs btn-success" v-on:click.prevent="giveCard" v-if="game.playerTurn == currentPlayer.name && game.gameStarted && !game.gameEnded && !player[4]">Give me card</button>
                        <button class="btn btn-xs btn-danger" v-on:click.prevent="skip(game)" v-if="game.gameStarted && game.playersFull.length > 1 && game.playerTurn == currentPlayer.name && !game.gameEnded && !player[4]">Skip</button>
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

            }
        },
        computed: {
            message(){
                // return Message to show
                if(!this.game.gameStarted){
                    return "Game has not started yet";
                }else if(this.game.gameEnded){
                    if(this.game.winner == this.currentPlayer.name){
                        return "Game has ended. YOU WIN !!!";
                    }else if(this.game.winner == 0){
                        return "Game has ended. It's a tie";
                    }
                    return "Game has ended and "+this.game.winner+"'s has won. YOU HAVE LOST !!!";
                }else{
                    if(this.game.playerTurn == this.currentPlayer.name){
                        for(var i=0;i<this.game.playersFull.length;i++){
                            if(this.game.playersFull[i][0] == this.game.playerTurn){
                                if(this.game.playersFull[i][4]){
                                    return "To many points. YOU HAVE LOST !!!";
                                }
                            }
                        }
                        return "It's your turn";
                    }else{
                        return "It's "+this.game.playerTurn+"'s turn";
                    }              
                }
                return "Game is inconsistent";
            },
            alerttype(){
                if(!this.game.gameStarted){
                    return "alert-warning";
                }else if(this.game.gameEnded){
                    if(this.game.winner == this.currentPlayer.name){
                        return "alert-success";
                    }else if(this.game.winner == 0){
                        return "alert-info";
                    }
                    return "alert-danger";
                }else{
                    for(var i=0;i<this.game.playersFull.length;i++){
                        if(this.game.playersFull[i][0] == this.game.playerTurn){
                            if(this.game.playersFull[i][4]){
                                 return "alert-danger";
                            }
                        }
                    }
                   if(this.game.playerTurn == this.currentPlayer.name){
                        return "alert-success";
                    }else{
                        return "alert-info";
                    }
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
            },
            skip(game) {
                this.$parent.skip(this.game);
            },
            closeGame(){
                // Click to close game
                this.$parent.close(this.game);
            },
            giveCard(){
                // Click to close game
                this.$parent.giveCard(this.game);
            },
            cardImageURL: function(card, key, playerName) {
                if(card != 'undefined'){
                    var imgSrc;
                    if(this.currentPlayer.name == playerName){
                        imgSrc = String(card.path);
                    }else if(this.currentPlayer.name != playerName && key == 0){
                        imgSrc = String(card.path);
                    }else{
                        imgSrc = String(this.game.semFace);
                    }
                    return 'img/' + imgSrc;
                }
            }
        },
        mounted(){
            //console.log(this.currentPlayer);
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