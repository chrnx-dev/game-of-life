'use strict';

angular.module('game').directive('game', [

  function() {

    return {
      restrict: 'A',
      scope: true,
      link: function(scope, el, attr) {

        var socket = io(),
          ctx = el.context.getContext('2d');

        scope.initBoard(ctx, el);

        socket.on('board status', function(Generation) {
          scope.setIni(ctx, Generation);
        });

        el.on('click', function(e) {

          var rect = el.context.getBoundingClientRect();
          var x = Math.floor((e.clientX - rect.left) / 10),
            y = Math.floor((e.clientY - rect.top) / 10),
            alives = [],
            deads = [];

          for (var dy = -3; dy <= 3; dy++) {
            if ((y + dy) < 0 || (y + dy) > 39) continue;
            for (var dx = -3; dx <= 3; dx++) {
              if ((x + dx) < 0 || (x + dx) > 59) continue;
              if (Math.round(Math.random())) {
                scope.Alive(ctx, {
                  x: (x + dx),
                  y: (y + dy)
                });

                alives.push([(x + dx), (y + dy)]);
              } else {
                scope.Dead(ctx, {
                  x: (x + dx),
                  y: (y + dy)
                });
                deads.push([(x + dx), (y + dy)]);
              }
            }
          }
          scope.grid(ctx);
          socket.emit('player interactive', {
            alives: alives,
            deads: deads
          });
        });

        socket.on('on cycle', function(Generation){
          scope.setCycle(ctx, Generation);
        });

      }
    };
  }
]);