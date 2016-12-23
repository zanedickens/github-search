(function () {
	'use strict';

	angular
		.module('blackswan')
		.controller('ShellController', ['$state', 'dataFactory', function ($state, dataFactory) {

			/* jshint validthis: true */
			var vm = this;
			vm.state = $state;

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