(function () {
	'use strict';

	angular
		.module('blackswan')
		.controller('ShellController', ['$http', '$state', '$timeout', 'dataservice', function ($http, $state, $timeout, dataservice) {

			/* jshint validthis: true */
			var vm = this;

			// Initial Status of the app
			vm.bodyClass = '';
			vm.showResults = false;
			vm.haveResults = false;

			// functions
			vm.searchGithub = searchGithub;
			vm.viewIssues = viewIssues;
			vm.viewChart = viewChart;
			vm.backToResults = backToResults;
			vm.resetForm = resetForm;

			// Make this a service
			function searchGithub(searchQuery) {

				dataservice.getData(searchQuery);



				//vm.showResults = false;
				//vm.showIssues = false;
				//vm.showTotal = false;
				//vm.bodyClass = 'search';

				//vm.query = searchQuery;
				//console.log("searchGithub is running");

				//vm.showResults = true;
			}


			function backToResults() {
				vm.showResults = true;
				vm.showTotal = true;
				vm.showIssues = false;
				vm.bodyClass = 'results';
			}

			function resetForm() {

				$state.go('search');

				vm.searchQuery = '';
				vm.showResults = false;
				vm.showIssues = false;
				vm.bodyClass = 'search';
			};


			function viewIssues(index, details) {

				$state.go('issues');

				vm.showIssues = false;
				vm.showTotal = false;
				vm.bodyClass = 'issues';

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