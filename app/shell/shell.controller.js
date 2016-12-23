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

			// Make this a service
			function searchGithub(searchQuery) {

				dataFactory.query = searchQuery;

				$state.go('shell.results');

				dataFactory.status = true;
			}

		}]);
})();