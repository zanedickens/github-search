(function () {
	'use strict';

	angular
		.module('blackswan')
		.controller('ResultsController', ['$http', '$state', 'dataFactory', function ($http, $state, dataFactory) {

			/* jshint validthis: true */
			var vm = this;

			vm.state = $state;

			vm.searchQuery = dataFactory.query
			vm.showStatus = dataFactory.status;
			vm.repos = {};
			vm.showResults = true;
			vm.showProgress = false;

			vm.searchGithub = searchGithub;
			vm.displayRepos = displayRepos;

			vm.viewIssues = viewIssues;
			vm.viewChart = viewChart; // placeholder

			vm.resetForm = resetForm;


			function searchGithub(searchQuery) {

				if (vm.searchQuery != undefined && vm.searchQuery != '') {

					vm.showProgress = true; // spinner on

					// Set it for use in Issues
					dataFactory.query = searchQuery;
					// Set it so that status updates
					vm.searchQuery = dataFactory.query

					dataFactory.getRepos(searchQuery)

					.then(function (response) {
						console.log('dataFactory triggered');
						vm.repos = response.data;
						vm.showProgress = false; // spinner on
						vm.showStatus = true; // show status

					}, function (error) {
						vm.status = 'Unable to load repo data: ' + error.message;
					});


				}
			}

			// Display from the home page search
			function displayRepos() {

				dataFactory.getRepos(dataFactory.query)

				.then(function (response) {
					vm.repos = response.data;

				}, function (error) {
					vm.status = 'Unable to load repo data: ' + error.message;
				});

				vm.showStatus = true;
			}

			// Don't run without queries
			if (vm.searchQuery != undefined && vm.searchQuery != '') {
				displayRepos();
			}

			function viewIssues(index, repos) {

				console.log('viewIssues called');

				vm.index = index;
				vm.repos = repos;

				dataFactory.username = vm.repos.items[index].owner.login;
				dataFactory.repoName = vm.repos.items[index].name;

				$state.go('shell.issues');

			}

			function viewChart(index, repos) {

				console.log('viewIssues called');

				vm.index = index;
				vm.repos = repos;

				dataFactory.username = vm.repos.items[index].owner.login;
				dataFactory.repoName = vm.repos.items[index].name;

				// $state.go('shell.chart'); TODO - would be nicer as a modal to check the pulse

				// run the viewChart functionality

			}

			function resetForm() {
				vm.searchQuery = '';
				vm.showResults = false;
			};

		}]);
})();