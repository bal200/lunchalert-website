angular.module('pageCtrl',['jkuri.datepicker'])
.controller('pageCtrl', ['$scope', '$location',
function($scope, $location) {

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

  $location.path('/login');

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

        if (user.id == 'oQYkaXWmop'){
          $location.path("/portal_edit");
        }else{
          $location.path("/portal");
        }
        $scope.$apply();
      },
      error: function(user, err) {
        // The login failed. Check error to see why.
        $scope.error.message = err.message;
        console.log('Login failed: '+err.code +" "+ err.message);
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
  $scope.gotoRegisterPage = function() {
    $location.path('/portal_register');
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
      //$scope.$apply();
      loadArrivals();
    }
  }
  $scope.installChange = function() {
    if ($scope.installTick==true) {
      $scope.instMarkers = [];
      loadInstalls();
    }
  }
  $scope.dateChange = function() {
      $scope.arrivalChange();
      $scope.installChange();
  }
  $scope.vanChange = function() {
      $scope.arrivalChange();
  }

  /* Call to populate the Van list */
  $scope.populateVanList = function() {
    var usrObj = Parse.User.current();
    if ($scope.swm=="") {
      var swm = usrObj.id;
    }else{
      var swm = $scope.swm;
    }
    Parse.Cloud.run("getVanList", {
        userid: swm /* */
        //vanId: 0 //$scope.vanId
    },{
      success:function(res) {
        $scope.$apply(function () {
          $scope.vanList=res;

          console.log("Got the Van list, "+res.length+" results.");
        });
      },
      error: function(err) { alert("get Vans error: "+err.code+" "+err.message); }
    });
  }

  $scope.populateVanList();

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
    var fromDate=null, toDate=null;
    if ($scope.fromDate!=null & $scope.fromDate!="") {
      //alert("scope.fromDate "+$scope.fromDate);
      fromDate=new Date($scope.fromDate);
    }
    if ($scope.toDate!=null & $scope.toDate!="") {
      toDate=new Date($scope.toDate);
      toDate.setHours(23); toDate.setMinutes(59); toDate.setSeconds(59); /* needs to be the end of this day to be inclusive */
    }

    Parse.Cloud.run("getCustInstalls", {
        userid: swm, /* The S is put on by the cloud code; can ignore here */
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
    if ($scope.swm=="") {
      var usr = Parse.User.current();
    }else{
      var usr=new Parse.User();
      usr.id = $scope.swm;
    }

    query.equalTo('vendor', usr);

    /* Set a Date range */
    if ($scope.fromDate!=null & $scope.fromDate!="") {
      query.greaterThan("createdAt", new Date($scope.fromDate));
    }
    if ($scope.toDate!=null & $scope.toDate!="") {
      var d=new Date($scope.toDate);
      d.setHours(23); d.setMinutes(59); d.setSeconds(59); /* needs to be the end of this day to be inclusive */
      query.lessThan("createdAt", d);
    }
    if ($scope.vanId!=null & $scope.vanId!="") {
      query.equalTo('vanId', $scope.vanId);
    }
    //var d = new Date(document.getElementById('fromdate').value)
    //alert ("from date "+ d.getDate()+" "+ d.getMonth()+" "+ d.getFullYear() );

    query.limit(1000);  /* default is 100, but we need as many results as we can */

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
          if ($scope.showArrivalTimes == true) {
            var d=new Date(object.createdAt)
            marker.options.labelContent = ""+d.getHours()+":"+d.getMinutes();
          }
          $scope.markers.push( marker );
        }
        console.log("Got "+res.length+" arrivals results.");
        //$scope.$apply();
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


}])


.controller('registerCtrl', ['$scope', '$location', '$rootScope',
function ($scope, $location, $rootScope) {
  $scope.user = {};
  $scope.message = {};

  /* The Register button presssed */
  $scope.register = function() {
    $scope.message.error = '';
    $scope.message.good = '';
    // $scope.loading = $ionicLoading.show({
    //     content: 'Sending',    animation: 'fade-in',
    //     showBackdrop: true,    maxWidth: 200,
    //     showDelay: 0
    // });

      /* Sanity checks */
      if (!$scope.user.email) {
        $scope.message.error = 'Please enter a valid email address'; return;
      }else if (!$scope.user.password) {
        $scope.message.error = 'Please create a password'; return;
      }else if (!$scope.user.businessName) {
        $scope.message.error = 'Enter your business name as it will appear to customers using the app'; return;
      }
      // if ($scope.error.message) {
      //   $ionicLoading.hide();
      //   $scope.$apply();
      //   return;
      // }
      var point = new Parse.GeoPoint({
        latitude: 53.47, /* making something up */
        longitude: -2.24
      });
      var user = new Parse.User();
      user.set("username", $scope.user.email.toLowerCase());
      user.set("password", $scope.user.password);
      user.set("email", $scope.user.email);
      user.set("businessName", $scope.user.businessName);
      user.set("businessNameSearch", $scope.user.businessName.toLowerCase());
      user.set("location", point);

      user.signUp(null, {
        success: function(user) {
          //$ionicLoading.hide();
          //$rootScope.user = user;
          //$rootScope.isLoggedIn = true;
          /* Move to Home screen, but change the back button to the home button */
          //$ionicHistory.nextViewOptions( {disableBack: true} );
          $scope.message.good = 'User account successfully created.';
          $scope.message.good2 ='The objectId is '+user.id;
          //$location.path('/portal');
          $scope.$apply();
        },error: function(user, err) { /* Sign-up error */
          //$ionicLoading.hide();
          console.log('Error signing-up\n'+'code: '+err.code+' message: '+err.message +'\n');
          if (err.code === 125) {
            $scope.message.error = 'Please specify a valid email address';
          }else if (err.code === 202) {
            $scope.message.error = 'The email address is already registered';
          }else if (err.code === 100) {
            $scope.message.error = 'Cannot connect to the internet';
            //$ionicLoading.show({template: '<i class="icon ion-close-circled"></i> Cannot connect to the internet', duration: 3000});
          }else{
            $scope.message.error = 'Error signing-up\n'+' code: '+err.code+' message: '+err.message +'\n';
          }
          $scope.$apply();
        }
      });

  }
}]);
