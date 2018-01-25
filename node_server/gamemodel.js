/*jshint esversion: 6 */

class BlackJackGame {
    constructor(ID, player1Name, cards) {
        this.gameID = ID;
        this.cartas = cards;
        this.gameEnded = false;
        this.gameStarted = false;
        this.players = [];
        this.players[0] = player1Name;
        this.playerTurn = player1Name;
        this.nrPlayerTurn = 0;
        this.winner = 0;
        this.board1Player = ['undefined', 'undefined'];
        this.board2Player = ['undefined', 'undefined'];
        this.board3Player = ['undefined', 'undefined'];
        this.board4Player = ['undefined', 'undefined'];
        this.boards = [this.board1Player, this.board2Player, this.board3Player, this.board4Player]
    }

    join(playerName){
        if(this.players.length < 5){
            this.players[this.players.length] = playerName;
            this.playerTurn = playerName;
            this.nrPlayerTurn ++;
            console.log('join player ' + playerName + ' to game ' + this.gameID);
        }
    }

    start(playerName){
        if(this.players[0] == playerName && this.gameStarted == false){
            for(var i = 0; i < this.players.length;i++){
                for(var ii = 0; ii < 2;ii++){
                    //console.log(ii);
                    this.boards[i][ii] = this.cartas[Math.floor(Math.random() * this.cartas.length-1)];
                }
            }
            this.gameStarted = true;
        }
    }

    hasPoints(player){
        switch (player) {
            case this.players[0]:
                if(pointsPerCart(this.board1Player[0]) + pointsPerCart(this.board1Player[1]) + 
                    pointsPerCart(this.board1Player[2]) + pointsPerCart(this.board1Player[3])){
                    return true;
                }
                break;
            case this.players[1]:
                if(pointsPerCart(this.board2Player[0]) + pointsPerCart(this.board2Player[1]) + 
                    pointsPerCart(this.board2Player[2]) + pointsPerCart(this.board2Player[3])){
                    return true;
                }
                break;
            case this.players[2]:
                if(pointsPerCart(this.board3Player[0]) + pointsPerCart(this.board3Player[1]) + 
                    pointsPerCart(this.board3Player[2]) + pointsPerCart(this.board3Player[3])){
                    return true;
                }
                break;
            case this.players[3]:
                if(pointsPerCart(this.board4Player[0]) + pointsPerCart(this.board4Player[1]) + 
                    pointsPerCart(this.board4Player[2]) + pointsPerCart(this.board4Player[3])){
                    return true;
                }
                break;
            default:
                return false;
        }
    }

    giveCard(player){
        //console.log('aqui3');
        var number;
        do{
            number = Math.floor(Math.random() * this.cartas.length-1);
        }while(this.jaEscolhida(this.cartas[number]));
        //console.log(player + '--' + this.players[0]);

        switch (player) {
            case this.players[0]:
                if(this.board1Player.length < 4){
                    this.board1Player[this.board1Player.length] = this.cartas[number];
                }
                break;
            case this.players[1]:
                if(this.board2Player.length < 4){
                    this.board2Player[this.board2Player.length] = this.cartas[number];
                }
                break;
            case this.players[2]:
                if(this.board3Player.length < 4){
                    this.board3Player[this.board3Player.length] = this.cartas[number];
                }
                break;
            case this.players[3]:
                if(this.board4Player.length < 4){
                    this.board4Player[this.board4Player.length] = this.cartas[number];
                }
                break;
            default:
                break;
        }

        if (!this.checkGameEnded()) {
            this.nrPlayerTurn --;
            if(this.nrPlayerTurn < 0){
                this.nrPlayerTurn = this.players.length-1;    
            }
            this.playerTurn = this.players[this.nrPlayerTurn];
            console.log(this.playerTurn);
        }
    }

    jaEscolhida(card){
        this.board1Player.forEach(function(c) {
            if(card.path == c.path)
                return true;
        });
        this.board2Player.forEach(function(c) {
            if(card.path == c.path)
                return true;
        });
        this.board3Player.forEach(function(c) {
            if(card.path == c.path)
                return true;
        });
        this.board4Player.forEach(function(c) {
            if(card.path == c.path)
                return true;
        });
        return false;
    }

    pointsPerCart(cart){
        if(cart == 'undefined')
            return 0;

        if(cart.value == 'Ace'){
            return 11;
        }else if(cart.value == 'Jack' || cart.value == 'King' || cart.value == 'Queen'){
            return 10;
        }else{
            return cart.value;
        }
    }

    checkGameEnded(){
        if (this.hasPoints(1)) {
            this.winner = 1;
            this.gameEnded = true;
            return true;
        } else if (this.hasPoints(2)) {
            this.winner = 2;
            this.gameEnded = true;
            return true;
        } else if (this.hasPoints(3)) {
            this.winner = 3;
            this.gameEnded = true;
            return true;
        } else if (this.hasPoints(4)) {
            this.winner = 4;
            this.gameEnded = true;
            return true;
        }
        return false;
    }

    /*isBoardComplete(){
        for (let value of this.board) {
            if (value === 0) {
                return false;
            }
        }
        return true;
    }*/

    play(playerNumber, index){
        if (!this.gameStarted) {
            return false;
        }
        if (this.gameEnded) {
            return false;
        }
        if (playerNumber != this.playerTurn) {
            return false;
        }
        /*if (this.board[index] !== 0) {
            return false;
        }*/
        //this.board[index] = playerNumber;
        if (!this.checkGameEnded()) {
            this.nrPlayerTurn --;
            if(this.nrPlayerTurn < 0){
                this.nrPlayerTurn = this.players.length;    
            }
            this.playerTurn = this.players[this.nrPlayerTurn];
            console.log('aqui3');
        }
        return true;
    }

}

module.exports = BlackJackGame;
