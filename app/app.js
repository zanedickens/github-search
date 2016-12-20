(function () {
	'use strict';

	var configuration = function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('shell', {
			url: '/',
			templateUrl: 'app/shell/shell.html',
			controller: 'ShellController as vm'
		})

		.state('results', {
			url: '/results',
			templateUrl: 'app/results/results.html',
			controller: 'ResultsController as vm'
		})
	};

	angular
		.module('blackswan', ['ui.router'])
		.config(['$stateProvider', configuration]);

})();