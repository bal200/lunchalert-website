angular.module('pageCtrl',['jkuri.datepicker'])
.controller('pageCtrl', ['$scope', '$location', '$rootScope',
function($scope, $location, $rootScope) {

  /* Put a fancy menu page here */

  if ($rootScope.isLoggedIn==false) { /* redirect if not logged in */
    $location.path('/login');
  }

}])