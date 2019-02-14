angular.module('lunchalert-portal')

.controller('offerWizardCtrl', ['$scope',  '$location', '$rootScope',
  function($scope,  $location, $rootScope) {

    $scope.card = null;
    $scope.page = 1;

    $scope.pageNext = function() {
      if ($scope.page <= 5) $scope.page++;
    }
    $scope.pageBack = function() {
      if ($scope.page > 1) $scope.page--;
    }

    var loadTemplate = function() {
      var query = new Parse.Query(CardTemplate);
      query.equalTo("vendor", this.vendor );  /* templates for this vendor  */

      query.find().then(function(templates) {
        $scope.$apply(function() {
          console.log("got "+templates.length+" templates");
          var template = templates[0];
          $scope.card.campaign.template = template;
        });
      });
    }

    $scope.card = $rootScope.card; //$stateParams.card;

    if ($scope.card == null) {
      $scope.card = Card.create(getCurrentVendor(), "", 1);
      $scope.card.campaign = Campaign.create($scope.card.get("vendor"), "", $scope.card);
      $scope.card.schedulerOn = false; /* this also causes the campaign to get set to defaults */
      //card.campaign.template = template;
      loadTemplate();
    }

    $scope.tVars = { 
      get title() { 
        return $scope.card.title; 
      },
      set title(val) { 
        $scope.card.title=val; 
      },
      get message() { 
        //return $scope.card.campaign.templateVariables; 
      },
      set message(val) { 
        //$scope.card.title=val; 
      }
    };
    


    function getCurrentVendor() {
      return $scope.swmId ? newParseUser($scope.swmId) : Parse.User.current();
    }

  }
]);