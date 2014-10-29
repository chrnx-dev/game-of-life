'use strict';

var Cell = require('./cells.class'),
	q = require('q');

function Board(width, height){
	this.width = width || 0;
	this.height = height || 0;
	this.cells = [];
	this.players = [];

	for(var yHeight = 0; yHeight  < this.height; yHeight++){
		this.cells[yHeight] = [];
		for(var xWidth = 0; xWidth < this.width;  xWidth++){
			this.cells[yHeight].push(new Cell());
		}
	}
}


Board.prototype={

	getNeighbours: function(x,y){
		var deferred = q.defer(),
			count=0;

		for(var dy = -1; dy <=1; dy++ ){
			if ((y+dy) < 0  || (y+dy) >  39) continue;
			for(var dx = -1; dx <=1; dx++){
				if( (x+dx) < 0 || (x+dx) > 59) continue;
				if ( dy === 0 && dx ===0) continue;
				if(this.cells[y+dy] && this.cells[y+dy][x+dx] && this.cells[y+dy][x+dx].status ) count++;
			}
		}
		deferred.resolve(count);
		return deferred.promise;
	},

	nextGeneration: function(){
		var deferred = q.defer(),
			self = this,
			cycle = [],
			generation = {
				alive: [],
				dead: []
			},
			task = function(Cell,x,y){
				return self.getNeighbours(x,y).then(function(count){
					if(Cell.status){
						if(count === 2 || count === 3){
							Cell.Alive();
							generation.alive.push([x,y]);
						}else{
							Cell.Die();
							generation.dead.push([x,y]);
						}
					}else{
						if(count === 3){
							Cell.Alive();
							generation.alive.push([x,y]);
						}else{
							Cell.Die();
							generation.dead.push([x,y]);
						}
					}
				});
			};

		this.cells.forEach(function(row, y){
			row.forEach(function(Cell,x){
				cycle.push(task(Cell,x,y));
			}, this);
		}, this);

		q.all(cycle).then(function(){
			deferred.resolve(generation);
		});

		return deferred.promise;
	}
};




module.exports = Board;