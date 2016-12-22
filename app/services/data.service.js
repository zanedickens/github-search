(function () {
	'use strict';

	angular
		.module('blackswan')
		.factory('dataservice', dataservice);


	/* @ngInject */
	function dataservice($http) {

		var data = {
			getData: getGithubData
		};

		return data;


		function getGithubData(searchQuery) {

			$http.get("https://api.github.com/search/repositories?q=" + searchQuery)
				.then(function (response) {

					console.log("Github API request");

					// API Response
					var details = response.data;

					return details;

				})
				.catch(function (e) {
					console.log("Github API Error", e);
					throw e;
				});

		}

		console.log(data);

	}

})();