angular.module('lunchalert-portal')

/******************************** PORTAL CONTROLLER ************************************************/
.controller('DailyVanCtrl', ['$scope', '$rootScope', '$location', 'uiGmapGoogleMapApi',
function( $scope, $rootScope, $location, uiGmapGoogleMapApi ) {

  $('.button.popup-activator')
    .popup({
      inline: true,
      on: 'click'
    });

  if ($rootScope.isLoggedIn==false) { /* redirect if not logged in */
    $location.path('/login');
  }

  $scope.showPopup = false;
  $scope.editButtonDisabled = "disabled"; /* Class to add to edit button to turn it off */
  $scope.swmId="";
  $scope.map = { center: { latitude: 53.5, longitude: -2.5 },
                 zoom: 9,
                 options: { scaleControl:"true" } };
  $scope.markers=[];
  $scope.instMarkers=[];
  $scope.arrivalDate = new Date();
  $scope.showArrivalTimes = true;
  $scope.vendors={
    input: "",
    list: [],
    loading: false
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
    $scope.arrivalChange();
    $scope.installChange();
  }

  $scope.arrivalClick = function() {
    if ($scope.arrivalTick==true) {
      loadArrivals();
    }else{
      $scope.markers = [];
    }
  };
  $scope.installClick = function() {
    if ($scope.installTick==true) {
      loadInstalls();
    }else{
      $scope.instMarkers = [];
    }
  };
  $scope.editModeClick = function() {
    $scope.installChange();
  };

  $scope.arrivalChange = function() {
    //if ($scope.arrivalTick==true) {
      $scope.markers = [];
      loadArrivals();
    //}
  };

  $scope.dayDown = function() {
    $scope.markers = [];
    var d=new Date($scope.arrivalDate);
    d.setDate(d.getDate()-1);
    $scope.arrivalDate = d;
    loadArrivals();

  };
  $scope.dayUp = function() {
    $scope.markers = [];
    var d=new Date($scope.arrivalDate);
    d.setDate(d.getDate()+1);
    $scope.arrivalDate = d;
    loadArrivals();

  };
  $scope.installChange = function() {
    $scope.instMarkers = [];
    loadInstalls();
  };

  $scope.vanChange = function() {
    if ($scope.selectedVan == "") { /* All Vans selected */
      $scope.vanName = "";
      $scope.editButtonDisabled = "disabled";
    }else{
      $scope.vanName = $scope.vanList[$scope.selectedVan].name;
      $scope.editButtonDisabled = ""; /*On*/ }
    $scope.arrivalChange();
  };

  $scope.changeVanName = function () {
    var usrObj = Parse.User.current();
    var swmId = $scope.swmId;
    if ($scope.swmId=="") {
      var swmId = usrObj.id;
    }
    Parse.Cloud.run("editVanName", {
        userid: swmId,
        van: $scope.vanList[$scope.selectedVan].objId,
        name: $scope.vanName
    },{
      success: function(res) {
        $scope.$apply(function(){
          console.log("Saved new Van name "+$scope.vanName);
          $scope.vanList[$scope.selectedVan].name = $scope.vanName;
        });
        $('.button.popup-activator').popup('hide');
      },
      error: function(err) { console.log("Error saving new Van name ("+err.code+") "+err.message); }
    });
  };

  /* Call to populate the Van list */
  $scope.populateVanList = function() {
    var usrObj = Parse.User.current();
    if ($scope.swmId=="") {
      var swmId = usrObj.id;
    }else{
      var swmId = $scope.swmId;
    }
    Parse.Cloud.run("getVanList", {
        userid: swmId /* */
        //vanId: 0 //$scope.vanId
    },{
      success:function(res) {
        $scope.$apply(function () {
          $scope.vanList=[];
          for (var i = 0; i < res.length; i++) {
            van = {
                id: i,
                objId: res[i].id,
                vanId: res[i].get("vanId"),
                vanIdCrop: res[i].get("vanId").substr(0,5),
                name: res[i].get("name"),
                vendor: res[i].get("vendor")
            };
            $scope.vanList.push( van );
          }
          console.log("Got the Van list, "+res.length+" results.");
        });
      },
      error: function(err) { alert("get Vans error: "+err.code+" "+err.message); }
    });
  }

  /* Initialise */
  $scope.populateVanList();
  loadInstalls();

  /***************************** load Installs(), Customers Markers **************************************/
  function loadInstalls() {
    // Get the Customer Installs data from the Parse server
    var query = new Parse.Query(Parse.Installation);
    var usr = Parse.User.current();
    if ($scope.swmId=="") {
      var swmId = usr.id;
    }else{
      var swmId = $scope.swmId;
    }
    //query.equalTo('vanId', vansid);
    /* @Todo: Date range */
    var fromDate=null, toDate=null;
    if ($scope.installFromDate!=null & $scope.installFromDate!="") {
      //alert("scope.fromDate "+$scope.fromDate);
      fromDate=new Date($scope.installFromDate);
    }
    if ($scope.installToDate!=null & $scope.installToDate!="") {
      toDate=new Date($scope.installToDate);
      toDate.setHours(23); toDate.setMinutes(59); toDate.setSeconds(59); /* needs to be the end of this day to be inclusive */
    }

    Parse.Cloud.run("getCustInstalls", {
        userid: swmId, /* The S is put on by the cloud code; can ignore here */
        dateFrom: fromDate, //$scope.dateFrom,
        dateTo: toDate, //$scope.dateTo,
        vanId: 0 //$scope.vanId
    },{
      success:function(res) {
        for (var i = 0; i < res.length; i++) {
          var inst = res[i];
          if (inst.coords && inst.coords.latitude) {
            var marker = {
              id: i,
              objectId: inst.objectId,
              coords: {latitude: inst.coords.latitude,
                      longitude: inst.coords.longitude},
              options: {
                draggable: $scope.editMode,
                icon: "../markers/red_MarkerC.png"
              },
              events: {
                dragend: function (marker, eventName, args) {
                  //console.log(marker);
                  var objectId = marker.model.$parent.imarker.objectId; /* convoluted way, but it works */
                  Parse.Cloud.run("setInstallLocation", {
                    userid: swmId,
                    objectId: objectId,
                    lat: marker.getPosition().lat(),
                    lon: marker.getPosition().lng()
                  },{
                    success: function(res){
                      console.log("successfully saved "+res)
                    },
                    error: function(err) {
                      console.log("not able to save change to location: "+err.code+" "+err.message);
                      alert("not able to save change to location: "+err.code+" "+err.message);
                    }
                  });
                }
              }
            };
            if ($scope.showCustObjectIds == true) {
              marker.options.labelContent = inst.objectId;
              if (inst.comment)  marker.options.labelContent += " - "+inst.comment;
            }else{
              if (inst.comment)  marker.options.labelContent = inst.comment;
            }
            $scope.instMarkers.push( marker );
          }
        }
        console.log("Got "+res.length+" Installs results.");
        $scope.$apply();

      },
      error: function(err) { alert("get installations error: "+err.code+" "+err.message); }
    });

  }

  /*************************** load Arrivals(), Vendor Markers *****************************************/
  function loadArrivals() {
    // Get the Arrivals data from the Parse server
    var Arrival = Parse.Object.extend("Arrival");
    var query = new Parse.Query(Arrival);
    if ($scope.swmId=="") {
      var usr = Parse.User.current();
    }else{
      var usr=new Parse.User();
      usr.id = $scope.swmId;
    }

    query.equalTo('vendor', usr);

    /* Set a Date range */
    if ($scope.arrivalDate!=null & $scope.arrivalDate!="") {
      var d=new Date($scope.arrivalDate);
      d.setHours(00); d.setMinutes(00); d.setSeconds(00);
      query.greaterThan("createdAt", d);

      d=new Date($scope.arrivalDate);
      d.setHours(23); d.setMinutes(59); d.setSeconds(59); /* needs to be the end of this day to be inclusive */
      query.lessThan("createdAt", d);
    }

    if ($scope.selectedVan!=null & $scope.selectedVan!="") {
      query.equalTo('vanId', $scope.vanList[$scope.selectedVan].vanId );
    }
    //var d = new Date(document.getElementById('fromdate').value)
    //alert ("from date "+ d.getDate()+" "+ d.getMonth()+" "+ d.getFullYear() );

    query.limit(500);  /* default is 100, but we need as many results as we can */

    query.find({
      success: function(res) {
        //alert("Successfully retrieved " + res.length + " arrival records.");
        $scope.$apply(function () {
          for (var i = 0; i < res.length; i++) {
            var object = res[i];
            var loc = object.get('location');
            //alert("at: "+dateFormat(date(object.createdAt), "dd-mmm-yy hh:MM"));
            var marker = {
                  id: i,
                  coords: {latitude: loc.latitude,
                          longitude: loc.longitude},
                  options: {
                    /* label: "V", */
                    //labelContent: formatDate(new Date(object.createdAt)),
                    icon: "../markers/blue_MarkerV.png"
                  }
            };
            if ($scope.showArrivalTimes == true) {
              var d=new Date(object.createdAt);
              marker.options.labelContent = ""+digit2(d.getHours())+":"+digit2(d.getMinutes());
            }
            $scope.markers.push( marker );
          }
        });
        console.log("Got "+res.length+" arrivals results.");
        //$scope.$apply();
      },
      error: function(err) { alert("get arrivals error: "+err.code+" "+err.message); }
    });
  }

  function digit2(n){ return n > 9 ? ""+n : "0"+n }

  $scope.logout = function() {
    Parse.User.logOut();
    $rootScope.user = null;
    $rootScope.isLoggedIn = false;
    $location.path('/login');
  };

  function formatDate( date ) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = ""+date.getFullYear();
    return day+"-"+month+"-"+year.substr(-2);

  }

  uiGmapGoogleMapApi.then(function(maps) {
    console.log("uiGmapGoogleMapApi ready");
  });

}]);



