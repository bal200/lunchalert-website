angular.module('pageCtrl',[])
.controller('pageCtrl', ['$scope',
function($scope) {
 
  $scope.selectChange = function() {
    switch ($scope.vans) {
      case "1":
        $scope.plan = "1 van";
        $scope.cost = '£40 per month';
        $scope.link="https://dashboard.gocardless.com/api/template_plans/12BFPZ1K8E/paylink";
        break;
      case "2":
        $scope.plan = "2 - 4 vans";
        $scope.cost = "£80 per month";
        $scope.link="https://dashboard.gocardless.com/api/template_plans/12BFPZ1K8E/paylink";
        break;
      case "3":
        $scope.plan = "5 - 10 vans";
        $scope.cost = "£150 per month";
        $scope.link="https://dashboard.gocardless.com/api/template_plans/12BFPZ1K8E/paylink";
        break;
      case "4":
        $scope.plan = "11 - 20 vans";
        $scope.cost = "£200 per month";
        $scope.link="https://dashboard.gocardless.com/api/template_plans/12BFPZ1K8E/paylink";
        break;
      case "5":
        $scope.plan = "21+ vans";
        $scope.cost = "£250 per month";
        $scope.link="https://dashboard.gocardless.com/api/template_plans/12BFPZ1K8E/paylink";
        break;
      default:
        $scope.plan = "";
        $scope.cost = "";
        $scope.link = "";
    }
    if($scope.plan != "") {
      $scope.summary = "You have selected the "+$scope.plan+" plan for "+$scope.cost+".  ";
    }else{
      $scope.summary="";
    }
    
  }
  
}])


.controller('userCtrl', ['$scope', '$rootScope', '$location',
function( $scope, $rootScope, $location ) {
  $scope.user = {
    username: null,
    password: null
  };

  $scope.error = {};

  $scope.login = function() {
    var user = $scope.user;
    Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
      success: function(user) {
        $rootScope.user = user;
        $rootScope.isLoggedIn = true;
        
        $location.path("/portal");
      },
      error: function(user, err) {
        // The login failed. Check error to see why.
        if (err.code == 101) {
          alert('Login failed');
        } else if (err.code == 100) {
          alert('No internet connection');
        } else {
          alert ( 'An unexpected error has ' +
              'occurred. Code '+err.code + ' ' + err.message);
          console.log('Login failed: ' + err.message);
        }
        $scope.$apply();
      }
    });
    return false;
  };
  $scope.logout = function() {
    Parse.User.logOut();
    $rootScope.user = null;
    $rootScope.isLoggedIn = false;
    $location.path('/');
  };

  $scope.forgot = function() {
    //$state.go('app.forgot');
  };
}])


/******************************** PORTAL CONTROLLER ************************************************/
.controller('portalCtrl', ['$scope', '$rootScope', '$location',
function( $scope, $rootScope, $location ) {

if ($rootScope.isLoggedIn==false) { /* redirect if not logged in */
  $location.path('/login');
}
$scope.swm="";
$scope.map = { center: { latitude: 53.5, longitude: -2.5 },
               zoom: 9,
               options: { scaleControl:"true" } };
$scope.markers=[];
$scope.instMarkers=[];

$scope.arrivalClick = function() {
  if ($scope.arrivalTick==true) {
    loadArrivals();
  }else{
    $scope.markers = [];
  }
}
$scope.installClick = function() {
  if ($scope.installTick==true) {
    loadInstalls();
  }else{
    $scope.instMarkers = [];
  }
}
$scope.editModeClick = function() {
  $scope.installChange();
}

$scope.arrivalChange = function() {
  if ($scope.arrivalTick==true) {
    $scope.markers = [];
    loadArrivals();
  }
}
$scope.installChange = function() {
  if ($scope.installTick==true) {
    $scope.instMarkers = [];
    loadInstalls();
  }
}
//$('#todate').onchange = calchange;

$('#rangestart').calendar({
  type: 'date',
  endCalendar: $('#rangeend')
});
$('#rangeend').calendar({
  type: 'date',
  startCalendar: $('#rangestart'),
  onChange: function() {
    $scope.arrivalChange();
    return true;
  },
  onHide: function() {
    //alert("hither");
    return true;
  }
});

/***************************** load Installs(), Customers Markers **************************************/
function loadInstalls() {
  // Get the Customer Installs data from the Parse server
  var query = new Parse.Query(Parse.Installation);
  var usr = Parse.User.current();
  if ($scope.swm=="") {
    var swm = usr.id;
  }else{
    var swm = $scope.swm;
  }
  //query.equalTo('vanId', vansid);
  /* @Todo: Date range */
  Parse.Cloud.run("getCustInstalls", {
      userid: swm, /* The S is put on by the cloud code; can ignore here */
      dateFrom: 0, //$scope.dateFrom,
      dateTo: 0, //$scope.dateTo,
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
              icon: "markers/red_MarkerC.png"
            },
            events: {
              dragend: function (marker, eventName, args) {
                //console.log(marker);
                var objectId = marker.model.$parent.imarker.objectId; /* convoluted way, but it works */
                Parse.Cloud.run("setInstallLocation", {
                  userid: swm,
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
          if (inst.comment) {
            marker.options.labelContent = inst.comment;
          }
          $scope.instMarkers.push( marker );
        }
      }
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
  if ($scope.swm=="") {
    var usr = Parse.User.current();
  }else{
    var usr=new Parse.User();
    usr.id = $scope.swm;
  }

  query.equalTo('vendor', usr);
  /* @Todo: filter by van id? */ 
  //query.equalTo('vanId', vansid);
  /* Set a Date range */ 
  if (document.getElementById('fromdate').value != "") {
    query.greaterThan("createdAt", new Date(document.getElementById('fromdate').value)); 
  }
  if (document.getElementById('todate').value != "") {
    var d=new Date(document.getElementById('todate').value);
    d.setHours(23); d.setMinutes(59); d.setSeconds(59); /* needs to be the end of this day to be inclusive */
    query.lessThan("createdAt", d);
  }
  //var d = new Date(document.getElementById('fromdate').value)
  //alert ("from date "+ d.getDate()+" "+ d.getMonth()+" "+ d.getFullYear() );
  
  query.find({
    success: function(res) { 
      //alert("Successfully retrieved " + res.length + " arrival records.");
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
                icon: "markers/blue_MarkerV.png"
              }
        };
        $scope.markers.push( marker ); 
      }
      $scope.$apply();
    },
    error: function(err) { alert("get arrivals error: "+err.code+" "+err.message); }
  });
}

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


}]);








