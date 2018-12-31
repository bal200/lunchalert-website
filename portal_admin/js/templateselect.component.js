angular.module('lunchalert-portal')

.component('templateselect', {
  bindings: {
    vendor: '<',
    show: '<',
    onSave: '&'
  },
  templateUrl: 'templates/templateselect.html',
  controller: ['$scope', '$timeout', function($scope, $timeout) {
    
    $('.ui.modal').modal({ detachable: false });

    this.$onInit = function() {
    };

    this.$onChanges = function(changesObj) {
      console.log("onchanges template select");
      console.log(changesObj);
      
      if (this.show) {
        $('#template-select-modal').modal('show');
        this.loadTemplates();
      }else {
        //$('#template-select-modal').modal('hide');
      }

    }

    $scope.closeClick = function() {  
      this.show=false;
      $('#template-select-modal').modal('hide');  
    }.bind(this);

    this.loadTemplates = function() {
      var CardTemplate = Parse.Object.extend("CardTemplate");
  
      var query1 = new Parse.Query(CardTemplate);
      var query2 = new Parse.Query(CardTemplate);
      query1.equalTo("vendor", this.vendor );  /* templates for this vendor  */
      query2.equalTo("vendor", null );         /* OR templates for ANY vendor */
      var query = Parse.Query.or(query1, query2);
  
      query.find().then(function(templates) {
        $scope.$apply(function() {
          console.log("got "+templates.length+" templates");
          $scope.templates = templates;
        });
      });
      //.catch(function(e) { console.log("Error finding a CardTemplate ("+e.code+") "+e.message) });
    }
    $scope.templateClick = function(template) {
      console.log("Making a card from template "+template.title);
      /* Build new Card and Campaign objects */
      var newCard = Card.create(this.vendor, "", 1);
      var newCampaign = Campaign.create(newCard.get("vendor"), "", newCard);
      newCard.campaign = newCampaign;
      newCard.schedulerOn = false; /* this also causes the campaign to get set to defaults */
    
          //var template = chooseTemplate(templates, getCurrentVendor() );
      newCampaign.set('template', template);

      this.onSave( { value: newCard } );

      this.show=false;
      $('#template-select-modal').modal('hide');  

    }.bind(this);


  }]
});

