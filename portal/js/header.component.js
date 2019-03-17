angular.module('lunchalert-portal')

.component('portalheader', {
  bindings: {
    //vendor: '<',
    //onSave: '&'
  },
  templateUrl: 'templates/header.htm',
  controller: ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    
    this.$onInit = function() {
      $scope.business = $rootScope.user.get('businessName');
    };
console.log("header controller");

    this.$onChanges = function(changesObj) {
      console.log("header: onChanges.");
    }

    $scope.logout = function() {
      Parse.User.logOut();
      $rootScope.user = null;
      $rootScope.isLoggedIn = false;
      $location.path('/');
    };



  }]
});

