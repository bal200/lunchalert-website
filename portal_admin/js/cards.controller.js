angular
  .module('pageCtrl')
  .controller('CardsCtrl', CardsController);

CardsController.$inject = ['$scope', '$location', '$rootScope'];
function CardsController($scope, $location, $rootScope) {

  $scope.cards = [1,2,3];

  $scope.loadCards = function () {
    var usrObj = Parse.User.current();
    var swm = $scope.swm;
    if ($scope.swm=="") {
      var swm = usrObj.id;
    }
    Parse.Cloud.run("getCardsAndCampaigns", {
        userid: swm
    },{
      success: function(res) {
        $scope.$apply(function(){
          console.log("Retrieved cards and campaigns for "+swm);
          $scope.cards = res;
        });
      },
      error: function(err) { console.log("Error retreiving cards and campaigns ("+err.code+") "+err.message); }
    });
  };

}
