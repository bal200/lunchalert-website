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
function( $scope, $location, $rootScope ) {
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
        /* Move to Home screen, but change the back button to the home button */

        $location.path('/portal');
        
      },
      error: function(user, err) {
        // The login failed. Check error to see why.
        if (err.code == 101) {
          alert('Login failed');
        } else if (err.code == 100) {
          alert('No internet connection');
        } else {
          $scope.error.message = 'An unexpected error has ' +
              'occurred. Code '+err.code + ' ' + err.message;
          console.log('Login failed: ' + err.message);
        }
        $scope.$apply();
      }
    });
    return false;
  };

  $scope.forgot = function() {
    //$state.go('app.forgot');
  };
}])


.controller('portalCtrl', ['$scope', '$rootScope', '$location',
function( $scope, $location, $rootScope ) {
var beaches = [
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];



  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: -33.9, lng: 151.2}
  });

  for (var i = 0; i < beaches.length; i++) {
    var beach = beaches[i];
    var marker = new google.maps.Marker({
      position: {lat: beach[1], lng: beach[2]},
      map: map,
      title: beach[0]
      //zIndex: beach[3]
    });
  }



  // Get the Arrivals data from the Parse server
  var Arrival = Parse.Object.extend("Arrival");
  var query = new Parse.Query(Arrival);
  var usr = Parse.User.current();
  query.equalTo('vendor', usr);
  /* @Todo: Date range */ 
  query.find({
    success: function(res) { 
      //alert("Successfully retrieved " + res.length + " scores.");
      for (var i = 0; i < res.length; i++) {
        var object = res[i];
        //alert(object.id + ' - ' + object.get('location').latitude);
      }
      
      
    },
    error: function(err) { alert("get arrivals error: "+err.code+" "+err.message); }
  });





}]);







