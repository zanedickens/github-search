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
						vm.showProgress = false; // spinner off
						vm.showStatus = true; // show status of search X results for "y"
						vm.showResults = true; // without this resetting form hides future results

					}, function (error) {
						vm.status = 'Unable to load repo data: ' + error.message;
					});


				}
			}

			// Display from the home page search
			function displayRepos() {

				vm.showProgress = true; // spinner on

				dataFactory.getRepos(dataFactory.query)

				.then(function (response) {
					vm.repos = response.data;

				}, function (error) {
					vm.status = 'Unable to load repo data: ' + error.message;
				});

				vm.showStatus = true;
				vm.showProgress = false; // spinner off

			}

			// Don't run without an actual query
			if (vm.searchQuery != undefined && vm.searchQuery != '') {
				displayRepos();
			}

			function viewIssues(index, repos) {

				vm.index = index;
				vm.repos = repos;

				dataFactory.username = vm.repos.items[index].owner.login;
				dataFactory.repoName = vm.repos.items[index].name;

				$state.go('shell.issues');

			}

			function viewChart(index, repos) { // placeholder

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
				vm.showStatus = false;
			};

		}]);
})();