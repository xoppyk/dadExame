/*jshint esversion: 6 */

var app = require('http').createServer();
var io = require('socket.io')(app);
var BlackJackGame = require('./gamemodel.js');
var GameList = require('./gamelist.js');
var delay = require('delay');

app.listen(8080, function(){
    console.log('listening on *:8080');
});

// ------------------------
// Estrutura dados - server
// ------------------------

let games = new GameList();

io.on('connection', function (socket) {
    console.log('client has connected');

    socket.on('create_game', function (data){
        let game = games.createGame(data.playerToken, socket.id);
        socket.join(game.gameID);
        // Notifications to the client
        socket.emit('my_active_games_changed');
        io.emit('lobby_changed');
    });

    socket.on('give_card', function (data){
        let game = games.gameByID(data.gameID);
        game.giveCard(data.playerToken);
        // Notifications to the client
        socket.emit('my_active_games_changed');
        io.to(game.gameID).emit('game_changed', game);
    });

    socket.on('start_game', function (data){
        let game = games.gameByID(data.gameID);
        if (game === null) {
            socket.emit('invalid_play', {'type': 'Invalid_Game', 'game': null});
            return;
        }
        game.start(data.playerToken)
        // Notifications to the client
        socket.emit('my_active_games_changed');
        io.to(game.gameID).emit('game_changed', game);
    });

    socket.on('skip', function (data){
        let game = games.gameByID(data.gameID);
        if (game == null) {
            socket.emit('invalid_play', {'type': 'Invalid_Game', 'game': null});
            return;
        }
        game.skip(data.playerToken);
        // Notifications to the client
        socket.emit('my_active_games_changed');
        io.to(game.gameID).emit('game_changed', game);
    });

    socket.on('join_game', function (data){
            let game = games.joinGame(data.gameID, data.playerToken, socket.id);
            socket.join(game.gameID);
            io.to(game.gameID).emit('my_active_games_changed');
            io.emit('lobby_changed');
    });

    socket.on('remove_game', function (data){
        games.removeGame(data.gameID, socket.id);
        socket.emit('my_active_games_changed');
        io.emit('lobby_changed');
        if (data.owner) {
            io.emit('my_active_game_closed');
        }
    });

    socket.on('get_game', function (data){
        let game = games.gameByID(data.gameID);
        socket.emit('game_changed', game);
    });

    socket.on('get_my_activegames', function (){
        var my_games = games.getConnectedGamesOf(socket.id);
        socket.emit('my_active_games', my_games);
    });

    socket.on('get_my_lobby_games', function (){
        var my_games = games.getLobbyGamesOf(socket.id);
        socket.emit('my_lobby_games', my_games);
    });

    socket.on('check', function (data){
        let game = games.gameByID(data.gameID);
        io.to(game.gameID).emit('game_changed', game);
    });
});
