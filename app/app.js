(function () {
	'use strict';

	var configuration = function ($stateProvider, $urlRouterProvider) {

		$stateProvider.state('shell', {
			url: '/',
			templateUrl: 'app/shell/shell.html',
			controller: 'ShellController as vm'
		})

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