(function () {
	'use strict';

	angular
		.module('blackswan')
		.controller('ResultsController', ['$state', 'dataFactory', function ($state, dataFactory) {

			/* jshint validthis: true */
			var vm = this;

			vm.searchQuery = dataFactory.query
			vm.status = '';
			vm.repos = {};
			vm.showResults = true;
			vm.showProgress = false;

			vm.searchGithub = searchGithub;
			vm.displayRepos = displayRepos;
			vm.resetForm = resetForm;


			function searchGithub(searchQuery) {

				if (vm.searchQuery != undefined && vm.searchQuery != '') {

					vm.showProgress = true;
					dataFactory.query = searchQuery;

					dataFactory.getRepos(searchQuery)

					.then(function (response) {
						console.log('dataFactory triggered');
						vm.repos = response.data;
						vm.showProgress = false;

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
			}

			if (vm.searchQuery != undefined && vm.searchQuery != '') {
				displayRepos();
			}

			function viewIssues(index, details) {

				$state.go('shell.issues');

				vm.showIssues = false;
				vm.showTotal = false;

				vm.showResults = false;
				vm.showProgress = true;

				vm.index = index;
				vm.details = details;

				vm.username = vm.details.items[index].owner.login;
				vm.repoName = vm.details.items[index].name;

				$http.get("https://api.github.com/search/issues?q=repo:" + vm.username + "/" + vm.repoName)
					.then(function (response) {

						console.log("Github API issues request");

						// API Response
						vm.issues = response.data;
						console.log(vm.issues);

						vm.showProgress = false;
						vm.gotError = false;
					})
					.catch(function (e) {
						console.log("Github API Error", e);
						vm.gotError = true;
						throw e;
					});

				vm.showIssues = true;
			}

			function resetForm() {
				vm.searchQuery = '';
				vm.showResults = false;
			};

		}]);
})();