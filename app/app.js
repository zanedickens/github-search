(function () {
	'use strict';

	// TODO: Configuration should be in a separate file

	var configuration = function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('shell', {
			url: '/',
			templateUrl: 'app/shell/shell.html',
			controller: 'ShellController as vm'
		})

		// Ideally each module should have its own routes file to maintain indepedence
		.state('shell.results', {
			url: '^/results',
			views: {
				'content': {
					templateUrl: 'app/results/results.html',
					controller: 'ResultsController as vm'
				}
			}
		})

		.state('shell.issues', {
			url: '^/issues',
			parent: "shell",
			views: {
				'content': {
					templateUrl: 'app/issues/issues.html',
					controller: 'IssuesController as vm'
				}
			}

		})
	};

	angular
		.module('blackswan', ['ui.router'])
		.config(['$stateProvider', configuration]);

})();