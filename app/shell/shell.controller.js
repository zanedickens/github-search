(function () {
	'use strict';

	angular
		.module('blackswan')
		.controller('ShellController', ['$http', '$interval', '$state', '$timeout', function ($http, $interval, $state, $timeout) {

			/* jshint validthis: true */
			var vm = this;

			// Initial Status of the app
			vm.hideResults = false;
			vm.haveResults = false;

			// functions
			vm.searchGithub = searchGithub;
			vm.viewIssues = viewIssues;
			vm.backToResults = backToResults;

			// Make this a service
			function searchGithub(searchQuery) {

				vm.showProgress = true;
				vm.query = searchQuery;
				console.log("searchGithub is running");

				$http.get("https://api.github.com/search/repositories?q=" + vm.query)
					.then(function (response) {

						console.log("Github API request");

						// API Response
						vm.details = response.data;

						vm.showProgress = false;
						vm.haveResults = true;
						vm.gotError = false;
					})
					.catch(function (e) {
						console.log("Github API Error", e);
						vm.gotError = true;
						throw e;
					});

			}

			function backToResults() {
				vm.hideResults = false;
				vm.showIssues = false;
			}

			function viewIssues(index, details) {

				vm.showIssues = false;
				vm.hideResults = true;
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
		}]);
})();