angular
  .module('pageCtrl')
  .controller('CardsCtrl', CardsController);

CardsController.$inject = ['$scope', '$location', '$rootScope'];
function CardsController($scope, $location, $rootScope) {
  
  /*********************** CARD *****************************************/
  var Card = Parse.Object.extend("Card", {
  },{ create: function (vendor, title, order) {
    var card = new Card();
    card.set("vendor", vendor); card.set("title", title); card.set("order", order);
    card.set("active", false); 
    return card;
  }});
  Card.prototype.__defineGetter__("title", function() {return this.get("title");});
  Card.prototype.__defineSetter__("title", function(val) {return this.set("title",val)});
  Card.prototype.__defineGetter__("html", function() {return this.get("html");});
  Card.prototype.__defineSetter__("html", function(val) {return this.set("html",val)});
  Card.prototype.__defineGetter__("active", function() {return this.get("active");});
  Card.prototype.__defineSetter__("active", function(val) {return this.set("active",val)});
  Card.prototype.__defineGetter__("order", function() {return this.get("order");});
  Card.prototype.__defineSetter__("order", function(val) {return this.set("order",val)});
  Card.prototype.__defineGetter__("type", function() { return ( (this.get("html"))?"custom":"simple" ); });
  Card.prototype.__defineSetter__("type", function(val) {console.log("@TODO: custom/simple cards")});

  Card.prototype.__defineGetter__("schedulerOn", function() {
    if (!this.campaign) { return false; }
    else { return this.campaign.get("active"); }
  });
  Card.prototype.__defineSetter__("schedulerOn", function(val) {
    if (!this.campaign) {
      this.campaign = Campaign.create(this.get("vendor"), this.get("title"), this);
      this.campaign.notiOn = false;
    }
    this.campaign.set("active",val);
    if (val==false) { this.campaign.notiOn = false; }
  });

  /******************** CAMPAIGN ****************************************/
  var Campaign = Parse.Object.extend("Campaign", {
  },{ create: function (vendor, comment, card) {
    var campaign = new Campaign();
    campaign.set("vendor", vendor); campaign.set("comment", comment); campaign.set("card", card);
    campaign.set("repeat","");
    return campaign;
  }});
  Campaign.prototype.__defineGetter__("comment", function() {return this.get("comment");});
  Campaign.prototype.__defineSetter__("comment", function(val) {return this.set("comment",val)});
  Campaign.prototype.__defineGetter__("repeat", function() {return this.get("repeat");});
  Campaign.prototype.__defineSetter__("repeat", function(val) {return this.set("repeat",val)});
  Campaign.prototype.__defineGetter__("startDate", function() {return this.get("startDate");});
  Campaign.prototype.__defineSetter__("startDate", function(val) {return this.set("startDate",new Date(val))});
  Campaign.prototype.__defineGetter__("endDate", function() {return this.get("endDate");});
  Campaign.prototype.__defineSetter__("endDate", function(val) {return this.set("endDate",new Date(val))});
  Campaign.prototype.__defineGetter__("active", function() { return this.get("active"); });
  Campaign.prototype.__defineSetter__("active", function(val) { return this.set("active",val) });
  Campaign.prototype.__defineGetter__("notiText", function() {return this.get("notiText");});
  Campaign.prototype.__defineSetter__("notiText", function(val) {return this.set("notiText",val)});
  Campaign.prototype.__defineGetter__("notiStatus", function() {return this.get("notiStatus");});
  Campaign.prototype.__defineSetter__("notiStatus", function(val) {return this.set("notiStatus",val)});
  Campaign.prototype.__defineGetter__("notiOn", function() {
    //console.log(this.get("comment")+" campaign Get notiOn:"+ this.get("notiStatus"));
    if (this.get("notiStatus").toLowerCase()=="wait") return true;
    if (this.get("notiStatus").substring(0,4).toLowerCase()=="sent") return true;
    return false;
  });
  Campaign.prototype.__defineSetter__("notiOn", function(val) {
    //console.log(this.get("comment")+" campaign Set notiOn: "+val );
    if (val==true) 
      { this.set("notiStatus","wait"); }
    else
      { this.set("notiStatus","off"); }
    //return false;
  });
  

  $scope.cards = [];
  $scope.swm=null;
  $scope.vendor={
    vendorInput: "",
    vendorList: []
  };
  $scope.edit={
    card: null, cardForm: null,
    title:"", text:""
  };
  $scope.deleteModal={
    card:null
  };
  $('.ui.dropdown').dropdown();
  $('.ui.modal').modal({ detachable: false });

  $scope.editClick = function(card, cardForm) {
    $scope.edit={
      card: card,
      cardForm: cardForm,
      title: card.title,
      text: card.html
    };
    $('#edit-modal').modal('show');
  };
  $scope.editClose = function() {  $('#edit-modal').modal('hide');  };
  $scope.editSave = function() {
    $scope.edit.card.html = $scope.edit.text;
    $('#edit-modal').modal('hide');
    $scope.edit.cardForm.$setDirty();
  };
  
  $scope.vendorPress = function() {
    console.log("vendorPress: key pressed");
    if (true) {
      /* We want them to have typed at least 3 letters so far */
      if ($scope.vendor.vendorInput.length >= 3) {
        console.log("calling findNamedVendors");
        Parse.Cloud.run("findNamedVendors", {
          searchText: $scope.vendor.vendorInput
        },{ success: function(res) {
          $scope.$apply(function() {
            $scope.vendor.vendorList = res;
          });
        }, error: function(err) {
          console.log("loadVendors error ("+err.code+") "+err.message);
        }});
      }
    }
  }

  $scope.confirmDelete = function(card) {
    $scope.deleteModal.card=card;
    $('#confirm-delete-modal').modal('show');
  }
  $scope.loadCards = function () {
    //var usrObj = Parse.User.current();
    //var swm = $scope.swm;
    //if ($scope.swm=="") {
    //  var swm = usrObj.id;
    //}
    Parse.Cloud.run("getCardsAndCampaigns", {
        userId: ($scope.swm ? $scope.swm.id : Parse.User.current().id)
    },{
      success: function(res) {
        $scope.$apply(function(){
          console.log("Retrieved cards and campaigns");
          linkCardsToCampaigns(res.cards, res.campaigns)
          //$scope.cards = parseToCardObject(res.cards, $scope.cards);
          //setParseGettersSetters($scope.cards, res.campaigns);
          $scope.cards = res.cards;
        });
      },
      error: function(err) { console.log("Error retreiving cards and campaigns ("+err.code+") "+err.message); }
    });
  };
  function linkCardsToCampaigns(cards, campaigns) {
    for (var n=0; n<campaigns.length; n++) {
      for (var m=0; m<cards.length; m++) {
        if (campaigns[n].get('card').id == cards[m].id) {
          cards[m].campaign = campaigns[n];
        }
      }
    }
  }

  $scope.saveCard = function(card, cardForm) {
    console.log(card);

    card.save({
      success: function(c) {
        console.log("Saved card "+c.get("title") );
        if (card.campaign) {
          card.campaign.save({
            success: function(campaign) {
              console.log("Saved campaign "+card.get("title") );    
              $scope.$apply(function() {
                //card.saveText="Saved";
                cardForm.$setPristine();
              });
            }, error: function(e) {console.log("Save Campaign error ("+e.code+") "+e.message);}
          });
        }else {
          $scope.$apply(function() {
            //card.saveText="Saved";
            cardForm.$setPristine();
          });
        }
      }, error: function(e) {console.log("Save Card error ("+e.code+") "+e.message);}
    });

  };
  $scope.deleteCard = function(card) {
    var t = card.get("title");
    var campaign = card.campaign;
    card.destroy({
      success: function(c) {
        console.log("Deleted Card "+t );
        if (campaign) {
          campaign.destroy({
            success: function(ca) {
              console.log("Deleted campaign ");    
              $scope.$apply(function() {
                removeFromArray($scope.cards, card);
              });
            }, error: function(e) {console.log("Delete Campaign error ("+e.code+") "+e.message);}
          });
        }else{
          $scope.$apply(function() {
            removeFromArray($scope.cards, card);
          });
        }
      }, error: function(e) {console.log("Delete Card error ("+e.code+") "+e.message);}
    });

  };
  function removeFromArray(array, value) {
    var idx = array.indexOf(value);
    if (idx !== -1) { array.splice(idx, 1); }
    return array;
  }
  $scope.addCard = function() {
    $scope.cards.push(
      Card.create(($scope.swm ? $scope.swm : Parse.User.current()), "", 10)
    );
  }

  /* not used */
  function parseToCardObject (cardP, cards) {
    for (var m=0; m<cardP.length; m++) {
      var card = {
        id: cardP.id,
        title: cardP.get('title'),
        html: cardP.get('html'),
        active: cardP.get('active'),
        order: cardP.get('order'),
        campaign: {
          id: cardP.campaign.id,
          comment: cardP.campaign.get('comment'),
          repeat: cardP.campaign.get('repeat'),
          startDate: cardP.campaign.get('startDate'),
          endDate: cardP.campaign.get('endDate'),
          active: cardP.campaign.get('active'),
          notiText: cardP.campaign.get('notiText'),
          notiStatus: cardP.campaign.get('notiStatus'),
          notiOn: false
        }
      };
      if (card.campaign.notiStatus.toLowerCase()=="wait") {console.log("Wait"); card.campaign.notiOn=true;}
      if (card.campaign.notiStatus.substring(0,4).toLowerCase()=="sent") card.campaign.notiOn=true;
      cards.push(card);
      console.log(card);
    }
    return cards;
  }
  /* not used */
  function setParseGettersSetters(cards, campaigns) {
    for (var n=0; n<campaigns.length; n++) {
      Object.setPrototypeOf(campaigns[n], Campaign);
    }
    for (var m=0; m<cards.length; m++) {
      Object.setPrototypeOf(cards[m], Card);
    }
  }

  $scope.loadCards();


}
