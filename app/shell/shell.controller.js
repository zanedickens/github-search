(function () {
	'use strict';

	angular
		.module('blackswan')
		.controller('ShellController', ['$http', '$state', '$timeout', 'dataFactory', function ($http, $state, $timeout, dataFactory) {

			/* jshint validthis: true */
			var vm = this;
			vm.state = $state;

			// Initial Status of the app
			vm.bodyClass = '';

			// functions
			vm.searchGithub = searchGithub;
			vm.viewIssues = viewIssues;
			vm.viewChart = viewChart;
			vm.backToResults = backToResults;

			// Make this a service
			function searchGithub(searchQuery) {
				dataFactory.query = searchQuery;
				$state.go('shell.results');
			}


			function backToResults() {
				vm.bodyClass = 'results';
			}

			function viewChart(index, details) {

				vm.showIssues = false;
				vm.showResults = false;

				vm.showGraph = true;
				vm.bodyClass = 'graph';

				vm.index = index;
				vm.details = details;

				vm.username = vm.details.items[index].owner.login;
				vm.repoName = vm.details.items[index].name;

				alert('Make the graph feature Zane!');
				console.log('Make the graph feature Zane!');

			}
		}]);
})();