/*jshint esversion: 6 */

class BlackJackGame {
    constructor(ID, player1Name, carts) {
        this.gameID = ID;
        this.cartas = carts;
        this.gameEnded = false;
        this.gameStarted = false;
        /*this.player1 = player1Name;
        this.player2 = '';*/
        this.players = [];
        this.players[0] = player1Name;
        this.playerTurn = 1;
        this.winner = 0;
        this.board1Player = ['undefined', 'undefined', 'undefined', 'undefined'];
        this.board2Player = ['undefined', 'undefined', 'undefined', 'undefined'];
        this.board3Player = ['undefined', 'undefined', 'undefined', 'undefined'];
        this.board4Player = ['undefined', 'undefined', 'undefined', 'undefined'];
    }

    join(playerName){
        if(this.players.length < 5){
            this.players[this.players.length] = playerName;
            this.playerTurn++;
            console.log('join player ' + playerName);
        }
    }

    start(playerName){
        if(this.players[0] == playerName && this.gameStarted == false){
            this.gameStarted = true;
        }
    }

    hasPoints(player){
        switch (player) {
            case 1:
                if(pointsPerCart(this.board1Player[0]) + pointsPerCart(this.board1Player[1]) + 
                    pointsPerCart(this.board1Player[2]) + pointsPerCart(this.board1Player[3])){
                    return true;
                }
                break;
            case 2:
                if(pointsPerCart(this.board2Player[0]) + pointsPerCart(this.board2Player[1]) + 
                    pointsPerCart(this.board2Player[2]) + pointsPerCart(this.board2Player[3])){
                    return true;
                }
                break;
            case 3:
                if(pointsPerCart(this.board3Player[0]) + pointsPerCart(this.board3Player[1]) + 
                    pointsPerCart(this.board3Player[2]) + pointsPerCart(this.board3Player[3])){
                    return true;
                }
                break;
            case 4:
                if(pointsPerCart(this.board4Player[0]) + pointsPerCart(this.board4Player[1]) + 
                    pointsPerCart(this.board4Player[2]) + pointsPerCart(this.board4Player[3])){
                    return true;
                }
                break;
            default:
                return false;
        }
    }

    addCart(player){
        var number;
        do{
            number = Math.floor(Math.random() * this.cartas.length);
        }while(jaEscolhida(this.cartas[number]))

        switch (player) {
            case 1:
                this.board1Player[this.board1Player.length] = this.cartas[number];
                break;
            case 2:
                this.board2Player[this.board2Player.length] = this.cartas[number];
                break;
            case 3:
                this.board3Player[this.board3Player.length] = this.cartas[number];
                break;
            case 4:
                this.board4Player[this.board4Player.length] = this.cartas[number];
                break;
            default:
                return false;
        }
    }

    jaEscolhida(carta){
        this.board1Player.forEach(function(c) {
            if(carta == c)
                return true;
        });
        this.board2Player.forEach(function(c) {
            if(carta == c)
                return true;
        });
        this.board3Player.forEach(function(c) {
            if(carta == c)
                return true;
        });
        this.board4Player.forEach(function(c) {
            if(carta == c)
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
        /*this.board[index] = playerNumber;
        if (!this.checkGameEnded()) {
            this.playerTurn = this.playerTurn == 1 ? 2 : 1;
        }*/
        return true;
    }

}

module.exports = BlackJackGame;
