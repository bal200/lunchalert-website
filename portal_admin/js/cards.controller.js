angular.module('lunchalert-portal')

.controller('CardsCtrl', ['$scope', '$location', '$rootScope',
function($scope, $location, $rootScope) {
  
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
  Card.prototype.__defineGetter__("type", function() { return ( (this.get("html"))?"html":"simple" ); });
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
  Campaign.prototype.__defineGetter__("startDate", function() {
    var d=this.get("startDate");
    console.log("get date "+d);
    //return ""+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    //return "2000-01-01";
    return d;
  });
  Campaign.prototype.__defineSetter__("startDate", function(val) {
    console.log("set date "+val);
    this.setOnlyDate( "startDate", val );
  });
  Campaign.prototype.__defineGetter__("startTime", function() {
    return this.getOnlyTime("startDate");
  });
  Campaign.prototype.__defineSetter__("startTime", function(val) {
    this.setOnlyTime("startDate", val);
  });
  Campaign.prototype.__defineGetter__("endDate", function() {return this.get("endDate");});
  Campaign.prototype.__defineSetter__("endDate", function(val) { this.setOnlyDate( "endDate", val ); });
  Campaign.prototype.__defineGetter__("endTime", function() { return this.getOnlyTime("endDate"); });
  Campaign.prototype.__defineSetter__("endTime", function(val) { this.setOnlyTime("endDate", val); });
  Campaign.prototype.__defineGetter__("active", function() { return this.get("active"); });
  Campaign.prototype.__defineSetter__("active", function(val) { return this.set("active",val) });

  Campaign.prototype.__defineGetter__("template", function() { return this.get("template"); });
  Campaign.prototype.__defineSetter__("template", function(val) { return this.set("template",val) });

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
  Campaign.prototype.setOnlyDate = function(parseColumn, dateStr) {
    var nw = new Date(dateStr);
    var d=this.get(parseColumn);
    if (!d) { this.setOnlyTime(parseColumn, (parseColumn=="startDate" ? '800' : '1700') ); d=this.get(parseColumn); }
    d.setFullYear(nw.getFullYear(), nw.getMonth(), nw.getDate());
    this.set(parseColumn, d);
  }
  Campaign.prototype.setOnlyTime = function(parseColumn, timeStr) {
    var d=this.get(parseColumn);
    if (!d) d=new Date();
    var hours = timeStr.substr(0, 2 );
    var mins = timeStr.substr(-2, 2);
    d.setHours(hours, mins, 00, 0);
    this.set(parseColumn, d);
  }
  Campaign.prototype.getOnlyTime = function(parseColumn) {
    var d=this.get(parseColumn);
    if (d) {
      return zeroPad(d.getHours())+":"+zeroPad(d.getMinutes());
    }else{
      return "";
    }
  }
  function zeroPad(n) { return (n<10 ? "0"+n : ""+n) }

  $scope.cards = [];
  $scope.swmId=null; /* vendor parse Obj */
  $scope.vendors={
    input: "",
    list: [],
    loading: false
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

  /* Datepicker controls */
  $scope.fromDateChange = function(card) {
    
  };
  $scope.toDateChange = function(card) {
    
  };

  /* HTML Editor Modal */
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

  /* Vendor Search Dropdown */
  $scope.vendorPress = function() {
    if (true) {
      /* We want them to have typed at least 3 letters so far */
      if ($scope.vendors.input.length >= 3) {
        console.log("calling findNamedVendors");
        $scope.vendors.loading=true;
        Parse.Cloud.run("findNamedVendors", {
          searchText: $scope.vendors.input
        },{ success: function(res) {
          $scope.$apply(function() {
            $scope.vendors.list = res; $scope.vendors.loading=false;
          });
        }, error: function(err) {
          console.log("loadVendors error ("+err.code+") "+err.message); $scope.vendors.loading=false;
        }});
      }
    }
  }
  $scope.vendorSelect = function( v ) {
    $scope.vendors.input = v.businessName;
    $scope.swmId = v.id;
    $scope.vendors.list = [];
    $scope.loadCards();
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
    $scope.vendors.loading=true;
    Parse.Cloud.run("getCardsAndCampaigns", {
        userId: ($scope.swmId ? $scope.swmId : Parse.User.current().id)
    },{
      success: function(res) {
        $scope.$apply(function(){
          console.log("Retrieved cards and campaigns");
          linkCardsToCampaigns(res.cards, res.campaigns)
          //$scope.cards = parseToCardObject(res.cards, $scope.cards);
          //setParseGettersSetters($scope.cards, res.campaigns);
          $scope.cards = res.cards;
          $scope.vendors.loading=false;
          sortVariables($scope.cards);
        });
      },
      error: function(err) { console.log("Error retreiving cards and campaigns ("+err.code+") "+err.message); $scope.vendors.loading=false; }
    });
  };
  function sortVariables(cards) {
    for (var n=0; n<cards.length; n++) {
      if (cards[n].campaign && cards[n].campaign.get('templateVariables')) {
        var v = cards[n].campaign.get('templateVariables');
        console.log(v);
      }
    }
  }
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
      Card.create(($scope.swmId ? newParseUser($scope.swmId) : Parse.User.current()), "", 10)
    );
  }

  function newParseUser(id) {
    var user = new Parse.User();
    user.id = id; 
    return user;
  }

  $scope.loadCards();


}]);



/*
Code for previewing cards, possibly:

<iframe id="iframe"></iframe>

var doc = document.getElementById('iframe').contentWindow.document;
doc.open();
doc.write('<div style="background-color:red; margin:0px; width:50vw;">Hello</div>');
doc.close();


*/