angular.module('pageCtrl',['jkuri.datepicker'])
.controller('pageCtrl', ['$scope', '$location', '$rootScope',
function($scope, $location, $rootScope) {

  /* Put a fancy menu page here */

  $location.path('/login');

  if ($rootScope.isLoggedIn==false) { /* redirect if not logged in */
    $location.path('/login');
  }

}])