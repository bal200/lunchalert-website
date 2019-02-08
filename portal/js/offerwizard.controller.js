angular.module('lunchalert-portal')

.controller('offerWizardCtrl', ['$scope',  '$location', '$rootScope',
  function($scope,  $location, $rootScope) {

    $scope.currentCard = null;
    $scope.page = 1;

    $scope.pageNext = function() {
      if ($scope.page <= 5) $scope.page++;
    }
    $scope.pageBack = function() {
      if ($scope.page > 1) $scope.page--;
    }



    $scope.currentCard = $rootScope.currentCard; //$stateParams.card;

    if ($scope.currentCard == null) {
      $scope.currentCard = Card.create(getCurrentVendor(), "", 1);
    }

    function getCurrentVendor() {
      return $scope.swmId ? newParseUser($scope.swmId) : Parse.User.current();
    }


  }
]);