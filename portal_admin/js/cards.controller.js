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
    //console.log("get date "+d);
    //return ""+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    //return "2000-01-01";
    return d;
  });
  Campaign.prototype.__defineSetter__("startDate", function(val) {
    //console.log("set date "+val);
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

  Campaign.prototype.__defineGetter__("templateVariables", function() { return this.get("templateVariables"); });
  Campaign.prototype.__defineSetter__("templateVariables", function(val) { return this.set("templateVariables",val) });

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
          initTemplateVariables($scope.cards);
        });
      },
      error: function(err) { console.log("Error retreiving cards and campaigns ("+err.code+") "+err.message); $scope.vendors.loading=false; }
    });
  };
  function linkCardsToCampaigns(cards, campaigns) {
    for (var n=0; n<campaigns.length; n++) {
      for (var m=0; m<cards.length; m++) {
        if (campaigns[n].get('card').id == cards[m].id) {
          cards[m].campaign = campaigns[n];
  } } } }
  

  /* Take variables array from Template and combine with Values from Campaign */
  function initTemplateVariables(cards) {
    for (var n=0; n<cards.length; n++) {
      var crd = cards[n];
      if (crd.campaign && crd.campaign.get('templateVariables')) {
        crd.templateVariables = copyTemplate( crd.campaign.get('templateVariables') );
        console.log(crd.templateVariables);
      }
    }
  }
  $scope.applyTemplateVariables = function(card) {
    card.campaign.set('templateVariables', copyTemplate(card.templateVariables) );
    console.log(card.templateVariables);

    compileTemplate(""/*templateFileXX*/, card.templateVariables, card);
  }
  function copyTemplate( from ) {
    var to = [];
    for (var m=0; m<from.length; m++) {
      to[m] = { name: from[m].name,
                value: (from[m].value ? from[m].value : "") };
    }
    return to;
  }

  function compileTemplate(template, variables, card) {
    //var template = 'hello {{title}}! the message is {{message}}.';
    var template = '<div class="list card card-transition"><div class="item item-divider" style="height:200%;">'
    + '<img style="float:left; margin-right:12px; width:40px;height:40px;"src="data:image/png;base64,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">'
    + '<p>{{subTitle}}</p><h2 style="">{{title}}</h2></div>'
    + '<div class="item item-body"><p>{{message}}</p></div>'
    + '<div class="item item-divider"><p class="subdued">{{bottom}}</p></div></div>';

    var replacements = {};
    for (n=0; n<variables.length; n++) {
      replacements[ variables[n].name ] = variables[n].value;
    }
    /* Use lodash template function to create the card html*/
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    var compiled = _.template( template );
    card.html = compiled( replacements );

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