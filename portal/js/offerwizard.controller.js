angular.module('lunchalert-portal')

.controller('offerWizardCtrl', ['$scope', '$rootScope', '$location',
  function($scope, $rootScope, $location) {

    $scope.currentCard = null;
    $scope.page = 1;

    $scope.pageNext = function() {
      if ($scope.page <= 5) $scope.page++;
    }
    $scope.pageBack = function() {
      if ($scope.page > 1) $scope.page--;
    }


    $scope.addCard = function() {
      
    }

    if ($scope.currentCard == null) {
      $scope.currentCard = Card.create(getCurrentVendor(), "HI", 1);

    }

    function getCurrentVendor() {
      return $scope.swmId ? newParseUser($scope.swmId) : Parse.User.current();
    }


  }
]);