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
        console.log('start game ' + this.gameID);
        if(this.players[0] == playerName && this.gameStarted == false){
            for(var i = 0; i < this.players.length;i++){
                for(var ii = 0; ii < 2;ii++){
                    //console.log(ii);
                    var number = Math.floor(Math.random() * this.cartas.length-1);
                    this.boards[i][ii] = this.cartas[number];
                    this.cartas.splice(number, 1);
                }
            }
            this.gameStarted = true;
        }
    }

    pointsPerUser(array){
        var total = 0;
        array.forEach(function(c){
            total = total + pointsPerCart(c);
        });
        return total;
    }

    points(player){
        var pontos = 0;
        switch (player) {
            case 1:
                return pointsPerUser(this.board1Player);
            case 2:
                return pointsPerUser(this.board2Player);
            case 3:
                return pointsPerUser(this.board3Player);
            case 3:
                return pointsPerUser(this.board4Player);
            default:
                return 0;
        }
    }

    giveCard(player){
        console.log('giveCard ' + player + ' in game ' + this.gameID);
        /*var number;
        do{
            number = Math.floor(Math.random() * this.cartas.length-1);
        }while(this.jaEscolhida(this.cartas[number]));
        */
       
       var number = Math.floor(Math.random() * this.cartas.length-1);

        switch (player) {
            case this.players[0]:
                if(this.board1Player.length < 4){
                    this.board1Player[this.board1Player.length] = this.cartas[number];
                    this.cartas.splice(number, 1);
                }
                break;
            case this.players[1]:
                if(this.board2Player.length < 4){
                    this.board2Player[this.board2Player.length] = this.cartas[number];
                    this.cartas.splice(number, 1);
                }
                break;
            case this.players[2]:
                if(this.board3Player.length < 4){
                    this.board3Player[this.board3Player.length] = this.cartas[number];
                    this.cartas.splice(number, 1);
                }
                break;
            case this.players[3]:
                if(this.board4Player.length < 4){
                    this.board4Player[this.board4Player.length] = this.cartas[number];
                    this.cartas.splice(number, 1);
                }
                break;
            default:
                break;
        }
        console.log(this.cartas.length);

        this.nrPlayerTurn --;
        if(this.nrPlayerTurn < 0){
            this.nrPlayerTurn = this.players.length-1;    
        }
        this.playerTurn = this.players[this.nrPlayerTurn];
        console.log('playerTurn' + this.playerTurn + ' in game ' + this.gameID);
    }

    jaEscolhida(card){
        this.board1Player.forEach(function(c) {
            if(card.id == c.id)
                return true;
        });
        this.board2Player.forEach(function(c) {
            if(card.id == c.id)
                return true;
        });
        this.board3Player.forEach(function(c) {
            if(card.id == c.id)
                return true;
        });
        this.board4Player.forEach(function(c) {
            if(card.id == c.id)
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

    vencedor(){
        var aux = 0;
        for(var i = 1 ; i < this.players.length;i++){
            var p = points(i);
            if(p <= 21){
                if(p > aux){
                    aux = p;
                    this.winner = this.players[i-1];
                }
            }
        }
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
