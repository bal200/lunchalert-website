angular
  .module('pageCtrl')
  .controller('CardsCtrl', CardsController);

CardsController.$inject = ['$scope', '$location', '$rootScope'];
function CardsController($scope, $location, $rootScope) {
  
  var Card = Parse.Object.extend("Card", {
  },{ create: function (vendor, title) {
    var card = new Card();
    card.set("vendor", vendor); card.set("title", title);
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
  
  var Campaign = Parse.Object.extend("Campaign", {
  },{ create: function (vendor, comment, card) {
    var campaign = new Campaign();
    campaign.set("vendor", vendor); campaign.set("comment", comment); campaign.set("card", card);
    return campaign;
  }});
  Campaign.prototype.__defineGetter__("comment", function() {return this.get("comment");});
  Campaign.prototype.__defineSetter__("comment", function(val) {return this.set("comment",val)});
  Campaign.prototype.__defineGetter__("repeat", function() {return this.get("repeat");});
  Campaign.prototype.__defineSetter__("repeat", function(val) {return this.set("repeat",val)});
  Campaign.prototype.__defineGetter__("startDate", function() {return this.get("startDate");});
  Campaign.prototype.__defineSetter__("startDate", function(val) {return this.set("startDate",val)});
  Campaign.prototype.__defineGetter__("endDate", function() {return this.get("endDate");});
  Campaign.prototype.__defineSetter__("endDate", function(val) {return this.set("endDate",val)});
  Campaign.prototype.__defineGetter__("active", function() {return this.get("active");});
  Campaign.prototype.__defineSetter__("active", function(val) {return this.set("active",val)});
  Campaign.prototype.__defineGetter__("notiText", function() {return this.get("notiText");});
  Campaign.prototype.__defineSetter__("notiText", function(val) {return this.set("notiText",val)});
  Campaign.prototype.__defineGetter__("notiStatus", function() {return this.get("notiStatus");});
  Campaign.prototype.__defineSetter__("notiStatus", function(val) {return this.set("notiStatus",val)});
  Campaign.prototype.__defineGetter__("notiOn", function() {
    if (this.get("notiStatus").toLowerCase()=="wait") return true;
    if (this.get("notiStatus").substring(0,4).toLowerCase()=="sent") return true;
    return false;
  });
  Campaign.prototype.__defineSetter__("notiOn", function(val) {
    if (val=true) return this.set("notiStatus","wait");
    return this.set("notiStatus","off");
  });
  


  $scope.cards = [];
  $scope.swm="";

  $scope.loadCards = function () {
    var usrObj = Parse.User.current();
    var swm = $scope.swm;
    if ($scope.swm=="") {
      var swm = usrObj.id;
    }
    Parse.Cloud.run("getCardsAndCampaigns", {
        userId: swm
    },{
      success: function(res) {
        $scope.$apply(function(){
          console.log("Retrieved cards and campaigns for "+swm);
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
