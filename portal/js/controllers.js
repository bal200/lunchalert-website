angular.module('pageCtrl',['jkuri.datepicker'])
.controller('pageCtrl', ['$scope', '$location', '$rootScope',
function($scope, $location, $rootScope) {

  $scope.gotoMapPage = function() {
    $location.path('/portal/map');
  }
  $scope.gotoOffersPage = function() {
    $location.path('/portal/offers');
  }

  if ($rootScope.isLoggedIn==false) { /* redirect if not logged in */
    $location.path('/login');
  }

}])