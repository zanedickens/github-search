(function () {
	'use strict';

	angular
		.module('blackswan')
		.controller('IssuesController', ['$state', function ($state) {

			/* jshint validthis: true */
			var vm = this;

			console.log("IssuesController");

			function backToResults() {
				$state.go('shell.results');

				vm.showResults = true;
				vm.showTotal = true;
			}

		}]);
})();