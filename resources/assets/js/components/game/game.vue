<template>
    <div class="gameseparator">
        <div>
            <h2 class="text-center">Game {{ game.gameID }}</h2>
            <br>
        </div>
        <div class="game-zone-content">       
            <div class="alert" :class="alerttype">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp;
                    <a class="btn btn-xs btn-primary" v-on:click.prevent="closeGame">Close Game</a>
                    <a class="btn btn-xs btn-primary" v-on:click.prevent="start(game)" v-if="game.players[0] == currentPlayer && !game.gameStarted">Start</a>
                </strong>
            </div>
            <div style="display: inline-block;">
                {{ game.players[0] }}
                <div v-for="(piece, key) of game.board1Player" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <div style="display: inline-block;" v-if="game.players.length == 2">
                {{ game.players[1] }}
                <div v-for="(piece, key) of game.board2Player" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <div style="display: inline-block;" v-if="game.players.length == 3">
                {{ game.players[2] }}
                <div v-for="(piece, key) of game.board3Player" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <div style="display: inline-block;" v-if="game.players.length == 4">
                {{ game.players[3] }}
                <div v-for="(piece, key) of game.board4Player" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <hr>
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
                    if(this.game.winner == this.ownPlayerNumber){
                        return "Game has ended. YOU WIN !!!";
                    }else if(this.game.winner == 0){
                        return "Game has ended. It's a tie";
                    }
                    return "Game has ended and "+this.adversaryName+"'s has won. YOU HAVE LOST !!!";
                }else{
                   if(this.game.playerTurn == this.ownPlayerNumber){
                        return "It's your turn";
                    }else{
                        return "It's "+this.adversaryName+"'s' turn";
                    }
                }
                return "Game is inconsistent";
            },
            alerttype(){
                if(!this.game.gameStarted){
                    return "alert-warning";
                }else if(this.game.gameEnded){
                    if(this.game.winner == this.ownPlayerNumber){
                        return "alert-success";
                    }else if(this.game.winner == 0){
                        return "alert-info";
                    }
                    return "alert-danger";
                }else{
                   if(this.game.playerTurn == this.ownPlayerNumber){
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
            closeGame (){
                // Click to close game
                this.$parent.close(this.game);
            },
            clickPiece(index){
                if(!this.game.gameEnded){
                    if(this.game.playerTurn != this.ownPlayerNumber){
                        alert('Its not your turn');
                    }else{
                        if(this.game.board[index] == 0){
                            this.$parent.play(this.game, index);
                        }
                    }
                }
            },
            pieceImageURL: function (piece) {
                //if(piece != 'undefined'){
                    var imgSrc = String(piece);
                    return 'img/' + imgSrc + '.png';
                //}
            }
        },
        mounted(){
            console.log(this.currentPlayer);
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