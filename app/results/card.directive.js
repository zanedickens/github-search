angular.module('blackswan')
	.directive('card', function () {
		return {
			restrict: 'E',
			templateUrl: 'app/results/card.directive.html'
		}
	})