/*jshint esversion: 6 */

var BlackJackGame = require('./gamemodel.js');

class GameList {
	constructor() {
        this.contadorID = 0;
        this.games = new Map();
    }

    gameByID(gameID) {
    	let game = this.games.get(gameID);
    	return game;
    }

    createGame(playerId, playerName, socketID) {
    	this.contadorID = this.contadorID+1;
    	var game = new BlackJackGame(this.contadorID, playerId, playerName);
        game.playerSocketID = new Array();
    	game.playerSocketID[0] = socketID;
    	this.games.set(game.gameID, game);
    	return game;
    }

    startGame(gameID, playerId, playerName) {
        let game = this.gameByID(gameID);
        if (game===null) {
            return null;
        }
        game.start(playerId, playerName);
        game.playerSocketID[0] = socketID;
        this.games.set(game.gameID, game);
        return game;
    }

    joinGame(gameID, playerId, playerName, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}
    	game.join(playerId, playerName);
    	game.playerSocketID[game.playerSocketID.length] = socketID;
    	return game;
    }

    giveCard(gameID, playerId, playerName) {
        let game = this.gameByID(gameID);
        if (game===null) {
            return null;
        }
        game.giveCard(playerId, playerName);
        return game;
    }

    removeGame(gameID, socketID) {
    	let game = this.gameByID(gameID);
    	if (game===null) {
    		return null;
    	}
    	if (game.playerSocketID[0] == socketID) {
    		game.playerSocketID[0] = "";
    	} else if (game.playerSocketID[1] == socketID) {
    		game.playerSocketID[1] = "";
    	}
    	if ((game.playerSocketID[0] === "") && (game.playerSocketID[1] === "")) {
    		this.games.delete(gameID);
    	}
    	return game;
    }

    getConnectedGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((value.playerSocketID[0] == socketID) || (value.playerSocketID[1] == socketID) ||
                (value.playerSocketID[2] == socketID) || (value.playerSocketID[3] == socketID)) {
    			games.push(value);
    		}
		}
		return games;
    }

    getLobbyGamesOf(socketID) {
    	let games = [];
    	for (var [key, value] of this.games) {
    		if ((!value.gameStarted) && (!value.gameEnded))  {
    			if ((value.playerSocketID[0] != socketID) && (value.playerSocketID[1] != socketID) &&
                    (value.playerSocketID[2] != socketID) && (value.playerSocketID[3] != socketID)) {
    				games.push(value);
    			}
    		}
		}
		return games;
    }
}

module.exports = GameList;
