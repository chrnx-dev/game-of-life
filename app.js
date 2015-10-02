'use strict';

var Board = require('./src/board.class'),
	express = require('express'),
	path = require('path'),
	app = express(),
	http = require('http').Server(app),
	socket = require('socket.io')(http),
	Game = new Board(60, 40);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});

Game.cells[20][20].Alive();
Game.cells[20][21].Alive();
Game.cells[21][19].Alive();
Game.cells[22][18].Alive();
Game.cells[23][18].Alive();
Game.cells[24][18].Alive();
Game.cells[25][19].Alive();
Game.cells[26][20].Alive();
Game.cells[26][21].Alive();
Game.cells[23][22].Alive();

Game.cells[21][23].Alive();
Game.cells[22][24].Alive();
Game.cells[23][24].Alive();
Game.cells[24][24].Alive();
Game.cells[25][23].Alive();
Game.cells[23][25].Alive();

Game.cells[22][11].Alive();
Game.cells[23][11].Alive();
Game.cells[22][10].Alive();
Game.cells[23][10].Alive();


Game.cells[20][28].Alive();
Game.cells[21][28].Alive();
Game.cells[22][28].Alive();
Game.cells[20][27].Alive();
Game.cells[21][27].Alive();
Game.cells[22][27].Alive();

Game.cells[19][29].Alive();
Game.cells[23][29].Alive();

Game.cells[19][31].Alive();
Game.cells[18][31].Alive();

Game.cells[23][31].Alive();
Game.cells[24][31].Alive();


Game.cells[20][35].Alive();
Game.cells[21][35].Alive();
Game.cells[20][36].Alive();
Game.cells[21][36].Alive();


Game.cells[0][2].Alive();
Game.cells[1][0].Alive();
Game.cells[1][1].Alive();

Game.cells[5][30].Alive();
Game.cells[5][31].Alive();
Game.cells[6][29].Alive();
Game.cells[7][28].Alive();
Game.cells[8][28].Alive();
Game.cells[9][28].Alive();
Game.cells[10][29].Alive();
Game.cells[11][30].Alive();
Game.cells[11][31].Alive();
Game.cells[8][32].Alive();

socket.on('connection', function(socket){
  console.log('a user connected');
 	socket.emit('board status',Game.cells);



	socket.on('player interactive',function(data){
		data.alives.forEach(function(position){
			Game.cells[position[1]][position[0]].Alive();
		});

		data.deads.forEach(function(position){
			Game.cells[position[1]][position[0]].Die();
		});

	});
});

setInterval(function(){
	Game.nextGeneration().then(function(generation){
		console.log(generation);
		socket.emit('on cycle', generation);
	});
}, 200);

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});

