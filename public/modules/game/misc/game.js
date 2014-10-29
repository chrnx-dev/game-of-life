'use strict';

;(function($){
	var canvas = $('canvas')[0],
		ctx = canvas.getContext('2d'),
		socket = io(),
		game = null;

	function drawGridLines(cnv, lineOptions) {


		var iWidth = cnv.width;
		var iHeight = cnv.height;

		var ctx = cnv.getContext('2d');

		ctx.strokeStyle = lineOptions.color;
		ctx.strokeWidth = 1;

		ctx.beginPath();

		var iCount = null;
		var i = null;
		var x = null;
		var y = null;

		iCount = Math.floor(iWidth / lineOptions.separation);

		for (i = 1; i <= iCount; i++) {
			x = (i * lineOptions.separation);
			ctx.moveTo(x, 0);
			ctx.lineTo(x, iHeight);
			ctx.stroke();
		}


		iCount = Math.floor(iHeight / lineOptions.separation);

		for (i = 1; i <= iCount; i++) {
			y = (i * lineOptions.separation);
			ctx.moveTo(0, y);
			ctx.lineTo(iWidth, y);
			ctx.stroke();
		}

		ctx.closePath();

		return;
	}

	function drawAlive(ctx,x,y,color){
		ctx.fillStyle = color || '#78AB46';
		ctx.fillRect(x*10, y*10, 10, 10);
	}

	function drawDead(ctx,x,y,color){
		ctx.fillStyle = color || '#f1f1f1';
		ctx.fillRect(x*10, y*10, 10, 10);
	}

	$(document).ready(function(){

		$('#game').on('click', function(e){

			var rect = canvas.getBoundingClientRect();
			var x = Math.floor( (e.clientX - rect.left )/10),
				y = Math.floor( (e.clientY  - rect.top)/ 10),
				alives =[], deads=[];

				for(var dy = -3; dy <=3; dy++ ){
					if ((y+dy) < 0  || (y+dy) >  39) continue;
					for(var dx = -3; dx <=3; dx++){
						if( (x+dx) < 0 || (x+dx) > 59) continue;
						if(Math.round(Math.random())){
							drawAlive(ctx,(x+dx),(y+dy));
							alives.push([(x+dx), (y+dy)]);
						}else {
							drawDead(ctx,(x+dx),(y+dy));
							deads.push([(x+dx), (y+dy)]);
						}
					}
				}

				socket.emit('player interactive', {alives: alives, deads:deads});


		});
	});

	drawGridLines(canvas, {color:'#ebebeb', separation: 10});

  socket.on('board status', function(cycle){
    cycle.forEach(function(row, y){
    	row.forEach(function(cell, x){
    		if(cell.status){

    			drawAlive(ctx,x,y);
    		}else{
    			drawDead(ctx,x,y);
    		}

    	});
    });
  });


  socket.on('on cycle', function(cycle){

  	cycle.forEach(function(row, y){
  		row.forEach(function(cell, x){
  			if(cell.status){

  				ctx.fillStyle = '#78AB46';
  			}else{
  				ctx.fillStyle = '#f1f1f1';
  			}
  			ctx.fillRect(x*10, y*10, 10, 10);
  		});
  	});

  	drawGridLines(canvas, {color:'#ebebeb', separation: 10});

  });

})(jQuery);