(function () {
	'use strict';

	angular
		.module('blackswan')
		.controller('IssuesController', ['$state', 'dataFactory', function ($state, dataFactory) {

			/* jshint validthis: true */
			var vm = this;

			vm.state = $state;

			vm.issues = {};
			vm.repoName = dataFactory.repoName;
			vm.username = dataFactory.username;

			vm.backToResults = backToResults;

			// Display from the home page search
			function displayIssues() {

				dataFactory.getIssues(dataFactory.username, dataFactory.repoName)

				.then(function (response) {
					vm.issues = response.data;

				}, function (error) {
					vm.status = 'Unable to load issues data: ' + error.message;
				});
			}

			if (dataFactory.username && dataFactory.repoName !== undefined) {
				displayIssues();
				vm.showStatus = true;
			}

			function backToResults() {
				$state.go('shell.results');
			}

		}]);
})();