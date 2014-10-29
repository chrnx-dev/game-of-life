'use strict';

function Cell(status){
	this.status = status || false;
}

Cell.prototype.Alive = function(){
	this.status = true;
};

Cell.prototype.Die = function(){
	this.status = false;
};

module.exports = Cell;