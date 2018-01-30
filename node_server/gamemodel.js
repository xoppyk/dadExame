/*jshint esversion: 6 */

var axios = require('axios');

class BlackJackGame {
    constructor(gameID, tokenUser) {
        this.gameID = gameID;
        this.cartas = new Array();
        this.semFace = '';
        this.gameEnded = false;
        this.gameStarted = false;
        this.winner = -1;
        this.time = 20;
        this.deck_nr = -1;
        this.jogadas = 1;
        //id, name, board, played, canPlay, points
        this.players = new Array();
        //this.getUser(tokenUser);
        this.players[0] = [tokenUser, this.getUser(tokenUser), ['undefined', 'undefined'], false, true, 0];
        this.getCards();
        //console.log(this.players[0]);
    }

    getCards(){
        axios.get('http://dadexame.test/api/decks/random')
            .then(response => {
                this.deck_nr = response.data.data.id;
                this.semFace = response.data.data.hidden_face_image_path;
                axios.get('http://dadexame.test/api/cards/deck/' + this.deck_nr)
                    .then(response => {
                        this.cartas = response.data.data;
                        console.log('game ' + this.gameID + ' -> creatd');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
    }

    getUser(tokenUser){
        //var user;
        axios({
            url: 'http://dadexame.test/api/user',
            method: 'get',
            headers: {
            Authorization: "Bearer " + tokenUser
            }
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    join(tokenUser){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i][0] == idPlayer){
                return;
            }
        }

        if(this.players.length < 5){
            this.players[this.players.length] = [tokenUser, this.getUser(tokenUser), ['undefined', 'undefined'], false, true, 0];
            console.log('game ' + this.gameID + ' -> join player ' + (this.players[this.players.length - 1][0]).name);
        }
    }

    check() {
        if(this.gameEnded) {
            return false;
        }
        return true;        
    }

    start(tokenUser){
        var number;
        if(this.players[0][0] == tokenUser && !this.gameStarted){
            for(var i = 0; i < this.players.length;i++){
                for(var ii = 0; ii < 2;ii++){
                    do{
                        number = Math.floor(Math.random() * (this.cartas.length - 1));
                        console.log(number);
                    }while(this.jaEscolhida(this.cartas[number]));
                    this.players[i][2][ii] = this.cartas[number];
                }
            }
            this.gameStarted = true;
            for(var i = 0; i < this.players.length;i++){
                this.players[i][5] = this.pointsPerBoard(this.players[i][2]);
                if(this.players[i][5] >= 21){
                    this.players[i][4] = false;
                }
            }

            this.tik();

            axios.post('http://dadexame.test/api/games/start', {status: 'active', total_players: this.players.length, created_by: this.players[0][0], deck_used: this.deck_nr})
                .then(response => {
                    console.log('game ' + this.gameID + ' -> start');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    getIndexPlayerByToken(playerId){
        switch (playerId) {
            case this.players[0][0]:
                return 0;
            case this.players[1][0]:
                return 1;
            case this.players[2][0]:
                return 2;
            case this.players[3][0]:
                return 3;
            default:
                return -1;
        }
    }

    skip(tokenUser){
        var indexPlayer = this.getIndexPlayerByToken(tokenUser);

        if(indexPlayer != -1){
            console.log('game ' + this.gameID + ' -> skip ' + playerName);
            this.players[indexPlayer][3] = true;
            this.players[indexPlayer][4] = false;

            this.status();
            if(!this.canPlay()){
                this.jogadas++;
            }
        }
    }

    giveCard(tokenUser){
        var indexPlayer = this.getIndexPlayerByToken(playerId);

        var indexCard;
        do{
            indexCard = Math.floor(Math.random() * (this.cartas.length - 1));
        }while(this.jaEscolhida(this.cartas[indexCard]));

        if(this.players[indexPlayer][3] || this.players[indexPlayer][2].length >= 4){
            return;
        }
        this.players[indexPlayer][2][this.players[indexPlayer][2].length] = this.cartas[indexCard];
        this.players[indexPlayer][5] = this.pointsPerBoard(this.players[indexPlayer][2]);
        this.players[indexPlayer][3] = true;

        this.status();

        console.log('game ' + this.gameID + ' -> giveCard ' + (this.players[indexPlayer][1]).name); 
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

    status(){
        if(this.allPlayed()){
            this.time = 0;
        }
    }

    canPlay(){
        var canPlay = true;
        for(var i = 0; i < this.players.length; i++){
            canPlay = canPlay && this.players[i][4];
        }
        return canPlay;
    }

    allPlayed(){
        console.log('allPlayed');
        var jaJogaram = true;

        for(var i = 0; i < this.players.length; i++){
            if(this.players[i][4]){  
                jaJogaram = jaJogaram && this.players[i][3];  
                this.players[i][3] = false;
            }
        }
        return jaJogaram;
    }

    jaEscolhida(card){
        for(var i = 0; i < this.players.length; i++){
            this.players[i][2].forEach(function(c) {
                if(card.id == c.id)
                    return true;
            });
        }
        return false;
    }

    vencedor(){
        if(!this.gameEnded && (this.jogadas <= 2)){
            return;
        }

        var pontuacaoMaxima = 0;
        var p = 0;
        var indexWinner = 0;
        var draw = false;

        for(var i = 0 ; i < this.players.length;i++){
            p = this.pointsPerBoard(this.players[i][2]);
            this.players[i][5] = p;
            if(p <= 21){
                if(p > pontuacaoMaxima){
                    pontuacaoMaxima = p;
                    indexWinner = i;
                    draw = false;
                }else if (p == pontuacaoMaxima) {
                    draw = true;
                }
            }
            this.addGameUser(this.players[i][0], this.players[i][1]);
        }

        //se ha vencedores, vou procurar os nomes
        if(draw){
            for(i = 0 ; i < this.players.length;i++){
                if(this.players[i][5] == pontuacaoMaxima){
                    //caso de empate o utilizador recebe 50
                    this.addPointsUser(this.players[i][0], this.players[i][1], 50);
                }
            }
        }else{
            this.winner = this.players[indexWinner][1];
            //caso de vitoria o utilizador recebe 100
            var poi = 100;
            if(this.players[indexWinner][5] == 21){
                //caso de vitoria com os pontos igual a 21, o utilizador recebe bonus de 50
                poi = poi + 50;
            }
            this.addPointsUser(this.players[indexWinner][0], this.players[indexWinner][1], poi);
        }
        
        this.gameEnded = true;
        
        axios.put('http://dadexame.test/api/games/' + this.gameID + '/update', {status: 'terminated'})
            .then(response => {
                console.log('game ' + this.gameID + ' -> ended -> winner -> ' + this.winner);
            })
            .catch(error => {
                console.log(error);
            });
    }

    addPointsUser(idPlayer, namePlayer, p){
        axios.post('http://dadexame.test/api/users/' + idPlayer + '/addPoints', {points: p})
            .then(response => {
                console.log('game ' + this.gameID + ' -> add points to ' + namePlayer + ': ' + p);
            })
            .catch(error => {
                console.log(error);
            });
    }

    addGameUser(idPlayer, namePlayer){
        axios.post('http://dadexame.test/api/users/' + idPlayer + '/addGamePlayed')
            .then(response => {
                console.log('game ' + this.gameID + ' -> add game to ' + namePlayer);
            })
            .catch(error => {
                console.log(error);
            });
    }

    tik() {
        var intv;
        intv = setInterval(()=> {
            if(this.gameStarted && !this.gameEnded) {
                if(this.time <= 0){
                    for(var i = 0; i < this.players.length; i++){
                        if(this.players[i][3] == false){
                            this.players[i][4] = false;
                        } else {
                            this.players[i][4] = true;
                        }
                    }
                    this.jogadas++;
                    this.vencedor();
                    this.time = 20;
                }
                this.time--;
            }
        },1000);
    }

}

module.exports = BlackJackGame;
