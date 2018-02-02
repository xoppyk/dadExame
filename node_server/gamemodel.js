/*jshint esversion: 6 */

var axios = require('axios');
const URL = "http://35.164.189.15";

class BlackJackGame {
    constructor(gameID, playerToken) {
        this.gameID = gameID;
        this.cards = new Array();
        this.hiddenFace = '';
        this.gameEnded = false;
        this.gameStarted = false;
        this.winner = -1;
        this.time = 20;
        this.deckID = -1;
        this.turns = 1;
        this.players = new Array();
        this.players[0] = new Player(playerToken);
        this.getCards();
    }

    getCards(){
        axios.get(URL + '/api/decks/random')
            .then(response => {
                this.deckID = response.data.data.id;
                this.hiddenFace = response.data.data.hidden_face_image_path;
                axios.get(URL + '/api/cards/deck/' + this.deckID)
                    .then(response => {
                        this.cards = response.data.data;
                        if (this.cards == null) {
                            console.log("ERROR: gamemodel.js -> getCards() -> this.cards -> null");
                        }
                    })
                    .catch(error => {
                        console.log("ERROR: gamemodel.js -> getCards() -> /api/cards/deck/");
                    });
            })
            .catch(error => {
                console.log("ERROR: gamemodel.js -> getCards() -> /api/cards/decks/random");
            });
    }

    join(playerToken) {
        for(var i = 0; i < this.players.length; i++) {
            if(this.players[i].token == playerToken) {
                return;
            }
        }

        if(this.players.length < 5) {
            this.players[this.players.length] = new Player(playerToken);
        }
    }

    checkGameEnded() {
        console.log("someCanPlay() -> " + this.someoneCanPlay());
        if (this.someoneCanPlay()) {
            console.log("this.turns > 2 -> " + (this.turns > 2));
            if (this.turns > 2) {
                return true;
            }
            return false;
        }

        return true;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    start(tokenPlayer){
        var indexCard;
        if((this.players[0].token == tokenPlayer) && !this.gameStarted){
            for(var i = 0; i < 2; i++) {
                for(var j = (this.players.length - 1); j >= 0; j--){
                    do {
                        indexCard = this.getRandomInt(0, this.cards.length-1);
                    } while(this.checkCardExist(this.cards[indexCard].id));

                    this.players[j].cards[i] = this.cards[indexCard];

                    if(i == 1) {
                        this.players[j].points = this.pointsPerBoard(this.players[j].cards);
                        if(this.players[j].points >= 21){
                            this.players[j].canPlay = false;
                            this.players[j].played = true;
                        }
                    }
                }
            }
            this.gameStarted = true;
            this.tik();
            this.setGameStarted();
        }
    }

    setGameEnded() {
        axios.put(URL + '/api/games/' + this.gameID + '/update', {status: 'terminated'})
            .then(response => {
                   console.log('Ended Game: ' + this.gameID);
            })
            .catch(error => {
                   console.log("ERROR: gamemodel.js -> setGameEnded() -> /api/games/{gameID}/update");
            });
    }

    setGameStarted() {
        axios.post(URL + '/api/games/start', {status: 'active', total_players: this.players.length,
                    created_by: this.players[0].id, deck_used: this.deckID})
             .then(response => {
                    console.log('Started Game: ' + this.gameID);
             })
             .catch(error => {
                    console.log("ERROR: gamemodel.js -> setGameStarted() -> /api/games/start");
             });
    }

    getIndexPlayerByToken(playerToken){
        switch (playerToken) {
            case this.players[0].token:
                return 0;
            case this.players[1].token:
                return 1;
            case this.players[2].token:
                return 2;
            case this.players[3].token:
                return 3;
            default:
                return -1;
        }
    }

    skip(playerToken){
        var indexPlayer = this.getIndexPlayerByToken(playerToken);

        if(indexPlayer != -1){
            this.players[indexPlayer].played = true;
            this.players[indexPlayer].canPlay = false;
            this.checkTurnPass();
        }
    }

    giveCard(playerToken){
        var indexPlayer = this.getIndexPlayerByToken(playerToken);

        if (indexPlayer != -1) {
            var indexCard;
            do {
                indexCard = this.getRandomInt(0, (this.cards.length - 1));
            } while(this.checkCardExist(this.cards[indexCard].id));

            this.players[indexPlayer].cards[this.players[indexPlayer].cards.length] = this.cards[indexCard];
            this.players[indexPlayer].points = this.pointsPerBoard(this.players[indexPlayer].cards);
            console.log("CARTAS -> " + this.players[indexPlayer].cards.length)
            if (this.players[indexPlayer].points >= 21 || this.players[indexPlayer].cards.length >= 4) {
                this.players[indexPlayer].canPlay = false;
            }
            this.players[indexPlayer].played = true;

            this.checkTurnPass();
        }
    }

    pointsPerBoard(cards){
        var total = 0;
        cards.forEach(function(card) {
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

    checkTurnPass(){
        if(this.allPlayed()){
            this.time = 0;
        }
    }

    someoneCanPlay(){
        var canPlay = false;
        for(var i = 0; i < this.players.length; i++){
            canPlay = canPlay || this.players[i].canPlay;
        }
        return canPlay;
    }

    allPlayed(){
        var played = true;

        for(var i = 0; i < this.players.length; i++) {
            played = played && this.players[i].played;
        }
        return played;
    }

    checkCardExist(cardID){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].cards.id == cardID) {
                return true;
            }
        }
        return false;
    }

    checkWinner(){
        var pontuacaoMaxima = 0;
        var indexWinner = -1;
        var draw = false;

        for(var i = 0; i < this.players.length; i++) {
            this.players[i].points = this.pointsPerBoard(this.players[i].cards);

            if(this.players[i].points <= 21) {
                if(this.players[i].points > pontuacaoMaxima){
                    pontuacaoMaxima = this.players[i].points;
                    indexWinner = i;
                    draw = false;
                } else if (this.players[i].points == pontuacaoMaxima) {
                    draw = true;
                }
            }

            this.addGameUser(this.players[i].id, this.players[i].nickname);
        }

        //se ha vencedores, vou procurar os nomes
        if(draw){
            for(i = 0 ; i < this.players.length; i++){
                if(this.players[i].points == pontuacaoMaxima){
                    this.addPointsUser(this.players[i].id, this.players[i].nickname, 50);
                    this.register(this.players[i].id, 0);
                    this.winner = 0;
                }else{
                    this.register(this.players[i].id, -1);
                }
            }
        } else if(indexWinner > -1){
            //caso de vitoria o utilizador recebe 100
            var points = 100;
            if(this.players[indexWinner].points == 21) {
                //caso de vitoria com os pontos igual a 21, o utilizador recebe bonus de 50
                points = points + 50;
            }
            this.winner = this.players[indexWinner].nickname;

            this.addPointsUser(this.players[indexWinner].id, this.players[indexWinner].nickname, points);
            this.register(this.players[indexWinner].id, 1);

            for(i = 0 ; i < this.players.length;i++){
                if(i != indexWinner){
                    this.register(this.players[indexWinner].id, -1);
                }
            }
        }

        this.setGameEnded();
    }

    register(userID, winner){
        axios.post(URL + '/api/gameuser/register', {game_id: this.gameID, user_id: userID, winner: winner})
            .then(response => {
                console.log('Registed Game: ' + this.gameID);
            })
            .catch(error => {
                console.log("ERROR: gamemodel.js -> register() -> /api/gameuser/register");
            });
    }

    addPointsUser(userID, userNickname, points){
        axios.post(URL + '/api/users/' + userID + '/addPoints', {points: points})
            .then(response => {
                console.log('Added Points ' + points + ' : -> ' + userNickname);
            })
            .catch(error => {
                console.log("ERROR: gamemodel.js -> addPointsUser() -> /api/users/{userID}/addPoints");
            });
    }

    addGameUser(userID, userNickname){
        axios.post(URL + '/api/users/' + userID + '/addGamePlayed')
            .then(response => {
                console.log('Added Game ' + this.gameID + ' : -> ' + userNickname);
            })
            .catch(error => {
                console.log("ERROR: gamemodel.js -> addGameUser() -> /api/users/{userID}/addGamePlayed");
            });
    }

    setAllPlayed() {
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].played == false){
                this.players[i].canPlay = false;
                this.players[i].played = true;
            }
        }
    }
    resetPlayed() {
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].canPlay){
                this.players[i].played = false;
            }
        }
    }

    tik() {
        var intv;
        intv = setInterval(()=> {
            if(this.gameStarted && !this.gameEnded) {
                if(this.time <= 0){
                    this.setAllPlayed();
                    this.resetPlayed();
                    this.turns++;
                    this.time = 20;
                    if(this.checkGameEnded()) {
                        this.gameEnded = true;
                        this.checkWinner();
                    }
                }
                this.time--;
            }
        },1000);
    }
}

class Player {
    constructor(playerToken) {
        this.token = playerToken;
        this.id = 0;
        this.nickname = "";
        this.cards = new Array();
        this.cards = ['undefined', 'undefined'];
        this.played = false;
        this.canPlay = true;
        this.points = 0;
        this.populateIdNickname(playerToken);
    }

    populateIdNickname(playerToken) {
        axios({
                  url: URL + '/api/user',
                  method: 'get',
                  headers: {
                    Authorization: "Bearer " + playerToken
                  }
              })
              .then((response) => {
                    this.id = response.data.id;
                    this.nickname = response.data.nickname;
              })
              .catch(function(error) {
                return console.log("ERROR: gamemodel.js -> populateIdNickname(playerToken)");
              });
    }
}

module.exports = BlackJackGame;
