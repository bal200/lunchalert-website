angular.module('lunchalert-portal')

.component('vendorchooser', {
  bindings: {
    swmId: '='
  },
  templateUrl: '../lib/templates/vendorchooser.html',
  controller: ['$scope', '$timeout', function($scope, $timeout) {
    $scope.vendors={
      input: "",
      list: [],
      loading: false
    };
    this.iframeid;
    this.$onInit = function() {
    }.bind(this);

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

    this.$onChanges = function(changesObj) {
      console.log("onchanges");
    }


  }]
});

