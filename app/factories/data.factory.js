(function () {
	'use strict';

	angular
		.module('blackswan')
		.factory('dataFactory', ['$http', function ($http) {

				// Search Query from Search State
				var query = '';

				// Repo Data from Results State
				var index = [],
					repos = {},
					username = '',
					repoName = '',
					issues = {},
					dataFactory = [],
					status = false;

				// Results State
				dataFactory.getRepos = getRepos;

				// Issues State
				dataFactory.getIssues = getIssues;

				function getRepos(query) {
					return $http.get("https://api.github.com/search/repositories?q=" + query)
				};


				function getIssues(username, repoName) {
					return $http.get("https://api.github.com/search/issues?q=repo:" + username + "/" + repoName)
				}

				return dataFactory;

			}
		]);
})();