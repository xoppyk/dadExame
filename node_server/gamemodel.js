/*jshint esversion: 6 */

var axios = require('axios');

class BlackJackGame {
    constructor(gameID, playerId, playerName) {
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
        this.players[0] = [playerId, playerName, ['undefined', 'undefined'], false, true, 0];
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

    join(playerId, playerName){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i][0] == playerId){
                return;
            }
        }

        if(this.players.length < 5){
            this.players[this.players.length] = [playerId, playerName, ['undefined', 'undefined'], false, true, 0];
            console.log('game ' + this.gameID + ' -> join player ' + [this.players.length - 1][1]);
        }
    }

    check() {
        if(this.gameEnded) {
            return false;
        }
        return true;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    start(playerId){
        var indexCard;
        if(this.players[0][0] == playerId && !this.gameStarted){
            for(var i = 0; i < this.players.length;i++){
                for(var ii = 0; ii < 2;ii++){
                    do{
                        indexCard = this.getRandomInt(0, this.cartas.length-1);
                        console.log(indexCard);
                    }while(this.jaEscolhida(this.cartas[indexCard]));
                    this.players[i][2][ii] = this.cartas[indexCard];
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

    skip(playerId, playerName){
        var indexPlayer = this.getIndexPlayerByToken(playerId);

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

    giveCard(playerId, playerName){
        var indexPlayer = this.getIndexPlayerByToken(playerId);

        var indexCard;
        do{
            indexCard = this.getRandomInt(0, this.cartas.length-1);
        }while(this.jaEscolhida(this.cartas[indexCard]));

        if(this.players[indexPlayer][3] || this.players[indexPlayer][2].length >= 4 || this.players[indexPlayer][5] > 21){
            return;
        }
        this.players[indexPlayer][2][this.players[indexPlayer][2].length] = this.cartas[indexCard];
        this.players[indexPlayer][5] = this.pointsPerBoard(this.players[indexPlayer][2]);
        this.players[indexPlayer][3] = true;
        if(this.players[indexPlayer][5] >= 21){
            this.players[indexPlayer][4] = false;
        }
        this.status();

        console.log('game ' + this.gameID + ' -> giveCard ' + this.players[indexPlayer][1]);
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
        var indexWinner = -1;
        var draw = false;

        for(var i = 0 ; i < this.players.length;i++){
            this.players[i][5] = this.pointsPerBoard(this.players[i][2]);
            if(this.players[i][5] <= 21){
                if(this.players[i][5] > pontuacaoMaxima){
                    pontuacaoMaxima = this.players[i][5];
                    indexWinner = i;
                    draw = false;
                }else if (this.players[i][5] == pontuacaoMaxima) {
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
                    this.register(this.gameID, this.players[i][0], 0);
                }else{
                    this.register(this.gameID, this.players[i][0], -1);
                }
            }
            this.winner = 0;
        }else if(indexWinner > -1){
            this.winner = this.players[indexWinner][1];
            //caso de vitoria o utilizador recebe 100
            var poi = 100;
            if(this.players[indexWinner][5] == 21){
                //caso de vitoria com os pontos igual a 21, o utilizador recebe bonus de 50
                poi = poi + 50;
            }
            this.addPointsUser(this.players[indexWinner][0], this.players[indexWinner][1], poi);
            this.register(this.gameID, this.players[indexWinner][0], 1);

            for(i = 0 ; i < this.players.length;i++){
                if(i != indexWinner){
                    this.register(this.gameID, this.players[i][0], -1);
                }
            }
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

    register(game_id, user_id, winner){
        axios.post('http://dadexame.test/api/gameuser/register', {game_id: game_id, user_id: user_id, winner: winner})
            .then(response => {
                console.log('game ' + this.gameID + ' -> register');
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
