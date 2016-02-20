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


.controller('portalCtrl', ['$scope', '$rootScope', '$location',
function( $scope, $rootScope, $location ) {

if ($rootScope.isLoggedIn==false) { /* redirect if not logged in */
  $location.path('/login');
}
$scope.swm="";
$scope.map = { center: { latitude: 53.5, longitude: -2.5 }, zoom: 9 };
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

/********************************* load Installs() *********************************************/
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
      //console.log(res);
      for (var i = 0; i < res.length; i++) {
        var inst = res[i];
        if (inst.coords && inst.coords.latitude) {
          var marker = {
                id: i,
                coords: {latitude: inst.coords.latitude,
                        longitude: inst.coords.longitude},
                options: {
                  icon: "markers/red_MarkerC.png"
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

/********************************* load Arrivals() *********************************************/
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
  //query.equalTo('vanId', vansid);
  /* @Todo: Date range */

  query.find({
    success: function(res) { 
      //alert("Successfully retrieved " + res.length + " arrival records.");
      for (var i = 0; i < res.length; i++) {
        var object = res[i];
        var loc = object.get('location');
        var marker = {
              id: i,
              coords: {latitude: loc.latitude,
                      longitude: loc.longitude},
              options: {
                /* label: "V", */
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




}]);








