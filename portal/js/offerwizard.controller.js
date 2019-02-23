angular.module('lunchalert-portal')

.controller('offerWizardCtrl', ['$scope',  '$location', '$rootScope',
  function($scope,  $location, $rootScope) {

    $scope.card = null;
    $scope.page = 1;
    $scope.data = {pic:{}};

    $scope.pageNext = function() {
      //console.log($scope.picture);
      if ($scope.page <= 5) $scope.page++;
      if ($scope.page==4) {
        $scope.card.compileTemplate($scope.card.campaign.get('template'), $scope.card.campaign.templateVariables, function(html) {
          $scope.$apply(function() {
            $scope.card.html = html;
          });
        });
      }
    }
    $scope.pageBack = function() {
      if ($scope.page > 1) $scope.page--;
    }

    var newCard = function() {
      $scope.card = Card.create(getCurrentVendor(), "", 1);
      $scope.card.campaign = Campaign.create($scope.card.get("vendor"), "", $scope.card);
      $scope.card.schedulerOn = false; /* this also causes the campaign to get set to defaults */
      loadTemplate();
    }
    var loadTemplate = function() {
      var query = new Parse.Query(CardTemplate);
      query.equalTo("vendor", this.vendor );  /* templates for this vendor  */
      /** @TODO: correctly select the best Template  ****/
      query.find().then(function(templates) {
        //$scope.$apply(function() {
          console.log("got "+templates.length+" templates");
          var template = templates[0];
          $scope.card.campaign.template = template;
          $scope.card.initTemplate(function() {
            $scope.$apply();
          });
        //});
      });
    }
    /* save the card & campaign parse objects */
    $scope.saveCard = function( callback ) {
      var card = $scope.card;
      card.save({
        success: function(c) {
          console.log("Saved card "+card.get("title") );  
          if (card.campaign) {
            card.campaign.save({
              success: function(campaign) {
                console.log("Saved campaign "+card.get("title") );    
                callback();
              }, error: function(e) {console.log("Save Campaign error ("+e.code+") "+e.message);}
            });
          }else {
            callback();
          }
        }, error: function(e) {console.log("Save Card error ("+e.code+") "+e.message);}
      });
    };

    $scope.finished = function() {
      $scope.card.compileTemplate($scope.card.campaign.get('template'), $scope.card.campaign.templateVariables, function(html) {
        $scope.card.html = html;
        $scope.saveCard(function() {
          $scope.$apply(function() {
            //cardForm.$setPristine();
            if ( !$rootScope.currentCard ) {
              $rootScope.cards.push($scope.card);
            }
            $location.path('/portal/offers');
          });
        });
      });
    }

    $scope.base64Change = function() {
      console.log("base64Change() "+$scope.data.pic.filetype);
      //$scope.card.campaign.picture = $scope.picture;
      $scope.card.campaign.picture = 'data:' + $scope.data.pic.filetype + ';base64,' + $scope.data.pic.base64;

      $scope.card.compileTemplate($scope.card.campaign.get('template'), $scope.card.campaign.templateVariables, function(html) {
        $scope.$apply(function() {
          $scope.card.html = html;
        });
      });
    }

    $scope.fromDateChange = function() {
      console.log("fromDate change");
      $scope.card.schedulerOn = true;
    }
    $scope.toDateChange = function() {
      console.log("fromDate change");
    }

    $scope.cancelEdit = function() {
      $location.path('/portal/offers');
    }

    $scope.deleteConfirm = function() {
      $('.ui.basic.modal')
        .modal('show')
      ;
    }
    $scope.deleteOffer = function() {
      // TODO delete offer from DB
      var card = $scope.card;
      var t = card.get("title");
      console.log("Deleted Card "+t );
      var campaign = card.campaign;

      card.destroy({
        success: function(c) {
          if (campaign) {
            campaign.destroy({
              success: function(ca) {
                console.log("Deleted campaign");
              },
              error: function(e) {console.log("Delete Campaign error ("+e.code+") "+e.message);}
            });
          }
        }, error: function(e) {console.log("Delete Card error ("+e.code+") "+e.message);}
      });
      
      $location.path('/portal/offers');
    }

    $scope.card = $rootScope.currentCard; //$stateParams.card;
    //if ($scope.card) $scope.picture = $scope.card.campaign.picture; // hack as getters & settings not working with base64 input

    if ($scope.card == null) {
      newCard();
      //card.campaign.template = template;
      loadTemplate();
    }

    function getCurrentVendor() {
      return $scope.swmId ? newParseUser($scope.swmId) : Parse.User.current();
    }

  }
]);