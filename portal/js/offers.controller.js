angular.module('lunchalert-portal')

.controller('offersCtrl', ['$scope', '$rootScope', '$location',
  function($scope, $rootScope, $location) {
    $scope.addCard = function() {
      $location.path('/portal/offer/edit');
    }

  }
]);