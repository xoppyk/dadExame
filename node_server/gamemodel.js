/*jshint esversion: 6 */

class BlackJackGame {
    constructor(ID, player1Name, cards, hidden_face) {
        this.gameID = ID;
        this.cartas = cards;
        this.semFace = hidden_face;
        this.gameEnded = false;
        this.gameStarted = false;
        this.playerTurn = player1Name;
        this.nrPlayerTurn = 0;
        this.winner = -1;
        this.tempo = 20;
        //name, board, skip, winner, lost, points
        this.playersFull = new Array();
        this.playersFull[0] = [player1Name, ['undefined', 'undefined'], false, false, false, 0];
    }

    join(playerName){
        if(this.playersFull.length < 5){
            this.playersFull[this.playersFull.length] = [playerName, ['undefined', 'undefined'], false, false, false, 0]
            this.playerTurn = playerName;
            this.nrPlayerTurn ++;
            console.log('join player ' + playerName + ' to game ' + this.gameID);
        }
    }


    start(playerName){
        console.log('start game ' + this.gameID);
        if(this.playersFull[0][0] == playerName && this.gameStarted == false){
            for(var i = 0; i < this.playersFull.length;i++){
                for(var ii = 0; ii < 2;ii++){
                    //console.log(ii);
                    var number = Math.floor(Math.random() * this.cartas.length-1);
                    this.playersFull[i][1][ii] = this.cartas[number];
                    this.cartas.splice(number, 1);
                }
            }
            this.gameStarted = true;
            for(var i = 0; i < this.playersFull.length;i++){
                this.playersFull[i][5] = this.pointsPerBoard(this.playersFull[i][1]);
            }
            //this.startTimer();
            /*setInterval(function(){this.tempo--; console.log(this.tempo);}, 1000);
            console.log(this.tempo);*/
            /*var i = 20;
            setInterval(function(){i--;this.tempo = i;console.log(i);}, 1000);*/
            for(var i = 0; i < this.playersFull.length;i++){
                if(this.playersFull[i][5] > 21){
                    this.playersFull[i][4] = true;
                    this.passTurn();
                }
            }
        }
    }

    skip(playerName){
        var index = -1;
        for(var i = 0; i < this.playersFull.length; i++){
            if(this.playersFull[i][0] == playerName){
                index = i;
            }
        }

        if(index != -1){
            if(!this.playersFull[index][2]){
                console.log('skip ' + playerName + ' in game ' + this.gameID);
                this.playersFull[index][2] = true;
                this.passTurn();
            }
        }
        if(this.allSkip()){
            console.log('allSkip');
            this.vencedor();
        }else{
            this.status();
        }
    }

    allSkip(){
        var veri = true;
        for(var i = 0; i < this.playersFull.length; i++){
            //console.log(this.skipPlayer[i]+i);
            veri = veri && this.playersFull[i][2];
        }
        return veri;
    }

    status(){
        var qtdLost = 0;
        for(var i = 0; i < this.playersFull.length; i++){
            if(this.playersFull[i][4]){
                qtdLost++;
            }
        }
        if(this.playersFull.length - qtdLost == 1){
            console.log('there are winner');
            this.vencedor();
        }
    }

    pointsPerBoard(array){
        var total = 0;
        array.forEach(function(card){
            if(card == 'undefined')
                total = total;

            if(card.value == 'Ace'){
                total = parseInt(total + 11);
            }else if(card.value == 'Jack' || card.value == 'King' || card.value == 'Queen'){
                total = parseInt(total + 10);
            }else{
                total = parseInt(total) + parseInt(card.value);
            }
        });
        return total;
    }

    giveCard(player){
        console.log('giveCard ' + player + ' in game ' + this.gameID);       
        var number = Math.floor(Math.random() * this.cartas.length-1);

        switch (player) {
            case this.playersFull[0][0]:
                if(this.playersFull[0][1].length < 4){
                    this.playersFull[0][1][this.playersFull[0][1].length] = this.cartas[number];
                    this.cartas.splice(number, 1);
                    this.playersFull[0][5] = this.pointsPerBoard(this.playersFull[0][1]);
                    //console.log('0--'+this.playersFull[0][5]);
                }
                break;
            case this.playersFull[1][0]:
                if(this.playersFull[1][1].length < 4){
                    this.playersFull[1][1][this.playersFull[1][1].length] = this.cartas[number];
                    this.cartas.splice(number, 1);
                    this.playersFull[1][5] = this.pointsPerBoard(this.playersFull[1][1]);
                    //console.log('1--'+this.playersFull[0][5]);
                }
                break;
            case this.playersFull[2][0]:
                if(this.playersFull[2][1].length < 4){
                    this.playersFull[2][1][this.playersFull[2][1].length] = this.cartas[number];
                    this.cartas.splice(number, 1);
                    this.playersFull[2][5] = this.pointsPerBoard(this.playersFull[2][1]);
                    //console.log('2--'+this.playersFull[0][5]);
                }
                break;
            case this.playersFull[3][0]:
                if(this.playersFull[3][1].length < 4){
                    this.playersFull[3][1][this.playersFull[3][1].length] = this.cartas[number];
                    this.cartas.splice(number, 1);
                    this.playersFull[3][5] = this.pointsPerBoard(this.playersFull[3][1]);
                    //console.log('3--'+this.playersFull[0][5]);
                }
                break;
            default:
                break;
        }

        for(var i = 0; i < this.playersFull.length;i++){
            if(this.playersFull[i][5] > 21){
                this.playersFull[i][4] = true;
                this.passTurn();
                break;
            }
        }

        this.status();
        this.passTurn();
    }

    passTurn(){
        do{
            this.nrPlayerTurn --;
            if(this.nrPlayerTurn < 0){
                this.nrPlayerTurn = this.playersFull.length-1;    
            }
            if(this.allSkip()){
                break;
            }
        }while(this.playersFull[this.nrPlayerTurn][2] || this.playersFull[this.nrPlayerTurn][4]);
        this.playerTurn = this.playersFull[this.nrPlayerTurn][0];
        console.log('playerTurn ' + this.playerTurn + ' in game ' + this.gameID);
        
        if(this.allSkip()){
            console.log('allSkip');
            this.vencedor();
        }
    }

    jaEscolhida(card){
        this.playersFull[0][1].forEach(function(c) {
            if(card.id == c.id)
                return true;
        });
        this.playersFull[1][1].forEach(function(c) {
            if(card.id == c.id)
                return true;
        });
        this.playersFull[2][1].forEach(function(c) {
            if(card.id == c.id)
                return true;
        });
        this.playersFull[3][1].forEach(function(c) {
            if(card.id == c.id)
                return true;
        });
        return false;
    }

    vencedor(){
        var aux = 0;
        var w = 0;
        for(var i = 0 ; i < this.playersFull.length;i++){
            var p = this.pointsPerBoard(this.playersFull[i][1]);
            if(p <= 21){
                if(p > aux){
                    aux = p;
                    w = this.playersFull[i][0];
                }
            }
        }
        this.winner = w;
        this.gameEnded = true;
        console.log('game ended');
    }

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
                this.nrPlayerTurn = this.playersFull.length;    
            }
            this.playerTurn = this.playersFull[this.nrPlayerTurn][0];
            console.log('aqui3');
        }
        return true;
    }

}

module.exports = BlackJackGame;
