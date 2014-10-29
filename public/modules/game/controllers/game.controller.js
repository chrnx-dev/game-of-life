'use strict';

angular.module('game').controller('GameController', ['$scope',
	function($scope) {

		$scope.initBoard = function(ctx, el, color){
			$scope.width = el.width();
			$scope.height = el.height();
			ctx.fillStyle = color || '#f1f1f1';
			ctx.fillRect(0, 0, el.width(), el.height());

			$scope.grid(ctx,{
				width: el.width(),
				height: el.height()
			});
		};


		$scope.setIni = function(ctx, Generation){
			Generation.forEach(function(row, y){
			    row.forEach(function(cell, x){
			    if(cell.status){
						$scope.Alive(ctx,{
					    x: x,
					    y: y
						});
			  	}else{
			  		$scope.Dead(ctx,{
			  		    x: x,
			  		    y: y
			  		});
			  	}

				});
			});
		};

		$scope.setCycle = function(ctx, Generation){

			Generation.alive.forEach(function(position){
				$scope.Alive(ctx,{
				  x: position[0],
				  y: position[1]
				});
			});

			Generation.dead.forEach(function(position){
				$scope.Dead(ctx,{
				  x: position[0],
				  y: position[1]
				});
			});

	    $scope.grid(ctx,{
	    	width: $scope.width,
				height: $scope.height
	    });
		};

		$scope.Alive = function(ctx, options){
			options = options || {};
			if(angular.isUndefined(options.x) || angular.isUndefined(options.y)) throw 'Cell Point not Set in options';

			options.color = options.color || '#78AB46';
			options.borderColor = options.borderColor || '#ebebeb';

			options.zoom = options.zoom || 10;

			ctx.fillStyle = options.color;
			ctx.fillRect(options.x*options.zoom, options.y*options.zoom, options.zoom, options.zoom);


		};

		$scope.Dead = function(ctx, options){
			options = options || {};
			if(angular.isUndefined(options.x) || angular.isUndefined(options.y)) throw 'Cell Point not Set in options';

			options.color = options.color || '#f1f1f1';
			options.borderColor = options.borderColor || '#ebebeb';

			options.zoom = options.zoom || 10;

			ctx.fillStyle = options.color;
			ctx.fillRect(options.x*options.zoom, options.y*options.zoom, options.zoom, options.zoom);


		};

		$scope.grid = function(ctx, options){
			options = options || {};
			options.width = options.width || $scope.width || 0;
			options.height = options.height || $scope.height ||0;
			options.separation = options.separation || 10;

			ctx.strokeStyle = options.color || '#ebebeb';
			ctx.strokeWidth = 1;

			ctx.beginPath();

			var iCount = null;
			var i = null;
			var x = null;
			var y = null;

			iCount = Math.floor(options.width / options.separation);

			for (i = 1; i <= iCount; i++) {
				x = (i * options.separation);
				ctx.moveTo(x, 0);
				ctx.lineTo(x, options.height);
				ctx.stroke();
			}


			iCount = Math.floor(options.height / options.separation);

			for (i = 1; i <= iCount; i++) {
				y = (i * options.separation);
				ctx.moveTo(0, y);
				ctx.lineTo(options.width, y);
				ctx.stroke();
			}

			ctx.closePath();

			return;
		};
	}
]);