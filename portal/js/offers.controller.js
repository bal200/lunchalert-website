angular.module('lunchalert-portal')

.controller('offersCtrl', ['$scope', '$rootScope', '$location', 
  function($scope, $rootScope, $location) {

    $scope.cards = [];
    $rootScope.currentCard = null;
    $scope.loading=false;

    $scope.addCard = function() {
      $rootScope.currentCard = null;
      $location.path('/portal/offer/edit');
    }

    $scope.editCard = function(card) {
      $rootScope.currentCard = card;
      $location.path('/portal/offer/edit');
    }

    $scope.loadCards = function () {
      $scope.loading=true;
      Parse.Cloud.run("getCardsAndCampaigns", {
          userId: ($scope.swmId ? $scope.swmId : Parse.User.current().id)
      },{
        success: function(res) {
          $scope.$apply(function(){
            linkCardsToCampaigns(res.cards, res.campaigns)
            $rootScope.cards = $scope.cards = res.cards;
            //$scope.vendors.loading=false;
            initTemplateVariables($scope.cards);
            $scope.loading=false;
            console.log($scope.cards);
          });
        },
        error: function(err) {
          console.log("Error retreiving cards and campaigns ("+err.code+") "+err.message);
          // TODO generates an error: offers.controller.js:33 Uncaught TypeError: Cannot set property 'loading' of undefined
          $scope.loading=false;
        }
      });
    };

    function linkCardsToCampaigns(cards, campaigns) {
      for (var n=0; n<campaigns.length; n++) {
        for (var m=0; m<cards.length; m++) {
          if (campaigns[n].get('card').id == cards[m].id) {
            cards[m].campaign = campaigns[n];
    } } }
    }

    function initTemplateVariables(cards) { for (var n=0; n<cards.length; n++) { initTemplateVariable( cards[n] ) } }
    function initTemplateVariable(card) {
      if (card.campaign && card.campaign.get('templateVariables')) {
        card.templateVariables = copyTemplateVars( card.campaign.get('templateVariables') );
      }
    }

    function copyTemplateVars( from ) {
      var to = [];
      for (var m=0; m<from.length; m++) {  
        to[m] = { name: from[m].name,
                  type: from[m].type,
                  value: (from[m].value ? from[m].value : "") };
      }
  
      return to;
    }
    if ($rootScope.cards) { $scope.cards = $rootScope.cards; }
    else { $scope.loadCards(); }
  }
]);