(function () {
	'use strict';

	angular
		.module('blackswan')
		.factory('dataFactory', ['$http', function ($http) {

				var query = '';

				var dataFactory = [];

				dataFactory.getRepos = getRepos;

				function getRepos(query) {
					return $http.get("https://api.github.com/search/repositories?q=" + query)
				};


				/*var service = {};

				service.details = details;
				service.benefits = benefits;
				service.questions = questions;
				service.banks = banks;
				service.history = history;
				service.exit = exit;
				service.help = help;
				service.quote = quote;

				return service;

				function benefits() {
					return $resource('/workplaceLivingServicesREST/member/benefits', null, {
						'get': {
							method: 'POST',
							headers: {
								'Authorization': TokenHandler.get()
							}
						}
					});
				};

				/* data.repos = function getGithubData(query) {

					$http.get("https://api.github.com/search/repositories?q=" + query)
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

				}*/

				return dataFactory;

			}
		]);
})();