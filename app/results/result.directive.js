angular.module('blackswan')
	.directive('card', function () {
		return {
			restrict: 'E',
			templateUrl: 'app/results/result.directive.html'
		}
	})