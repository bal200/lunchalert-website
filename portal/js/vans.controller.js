angular.module('lunchalert-portal')

.controller('vansCtrl', ['$scope', '$rootScope', '$location', '$filter',
function( $scope, $rootScope, $location, $filter ) {

  var usrObj = Parse.User.current();
  var swm = usrObj.id;
  var vendorObj = $scope.swmId ? newParseUser($scope.swmId) : Parse.User.current();

  /* Work out the difference in days between two dates */
  $scope.differenceInDays = function(firstdate, seconddate) {

    var dt1 = firstdate.split('/'),
        dt2 = seconddate.split('/'),
        one = new Date(dt1[2], dt1[1]-1, dt1[0]),
        two = new Date(dt2[2], dt2[1]-1, dt2[0]);

    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    return Math.floor(days);
  };

  $scope.vanList=[];

  // obtain a list of all registered vans for the vendor
  var Van = Parse.Object.extend("Van");
  var query = new Parse.Query(Van);
  query.equalTo("vendor", vendorObj);
  query.find({
    success: function(vendorVans) 
    {
/*
for each van in result
create a query to get the vans updatedat info from the Arrival table
add the array of van querys as a query._orQuery( vendorQuery ) and execute it
put results in to van object for rendering as a list
*/
      var Arrival = Parse.Object.extend("Arrival");
      var arrivalQueries = [];

      // Obtain a list of last stop for each van in a vendors fleet
      for(var i = 0; i < vendorVans.length; i++) {
        arrivalQueries[i] = new Parse.Query(Arrival);
        arrivalQueries[i].equalTo("vanId", vendorVans[i].get('vanId'));
      }

      // One query to rule all the vans
      var query = new Parse.Query(Arrival);
      query._orQuery( arrivalQueries );
      query.descending('updatedAt');
      query.find({ success: function(vanArrivals) {

        console.log(vanArrivals); // TODO currently returns 100 results - needs to be just one per van (7)

        for(var o = 0; o < vanArrivals.length; o++) {
          // Work out status flag based on date
          f = $scope.differenceInDays(
            $filter('date')(vanArrivals[o].get("updatedAt"), "dd/MM/yyyy"),
            $filter('date')(new Date, "dd/MM/yyyy")
          );
          if(f < 2) {
            flag = 'positive';
            $scope.activedrivers++;
          }else if(f <= 3) {
            flag = 'warning';
          }else {
            flag = 'negative';
          }

          var van = {
            id: o,
            objId: vanArrivals[o].id,
            vanId: vanArrivals[o].get("vanId"),
            vanIdCrop: vanArrivals[o].get("vanId").substr(0,5),
            name: '', //vendorVans[o].get("name"),
            vendor: vanArrivals[o].get("vendor"),
            active: vanArrivals[o].get("updatedAt"),
            flag: flag,
          };
          $scope.vanList.push( van );
        }

        // A list of all the vans 
        console.log('a list of vans and their last arrival times...');
        console.log($scope.vanList);

      }, error: function(err) {response.error("Van last arrival List error: "+err.code+" "+err.message);}});
    },
    error: function(err) {response.error("find van List error: "+err.code+" "+err.message);}
  });




  // Parse.Cloud.run("getVanList", {
  //     userid: swm
  // },{
  //   success:function(res) {
  //     $scope.$apply(function () {
  //       var flag = '';
  //       $scope.activedrivers = 0;
  //       for (var i = 0; i < res.length; i++) {
  //         console.log(res[i]);

  //         /* Work out status flag based on date */
  //         f = $scope.differenceInDays(
  //           $filter('date')(res[i].get("updatedAt"), "dd/MM/yyyy"),
  //           $filter('date')(new Date, "dd/MM/yyyy")
  //         );
  //         if(f < 2) {
  //           flag = 'positive';
  //           $scope.activedrivers++;
  //         }else if(f <= 3) {
  //           flag = 'warning';
  //         }else {
  //           flag = 'negative';
  //         }

  //         van = {
  //             id: i,
  //             objId: res[i].id,
  //             vanId: res[i].get("vanId"),
  //             vanIdCrop: res[i].get("vanId").substr(0,5),
  //             name: res[i].get("name"),
  //             vendor: res[i].get("vendor"),
  //             active: res[i].get("updatedAt"),
  //             flag: flag,
  //         };
  //         $scope.vanList.push( van );
  //       }
  //     });
  //   },
  //   error: function(err) { alert("get Vans error: "+err.code+" "+err.message); }
  // });
}]);