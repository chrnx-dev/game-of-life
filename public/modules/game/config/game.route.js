'use strict';


angular.module('game').config(['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider',
	function($stateProvider, $urlRouterProvider, LoadingBar) {
		$urlRouterProvider.otherwise('/');


		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/game/views/home.view.html',
		}).
		state('acerca', {
			url: '/acerca',
			templateUrl: 'modules/game/views/acerca.view.html',
		});
	}
])
.run(['$rootScope', function($rootScope){

}]);

