angular.module('lunchalert-portal')

.controller('vansCtrl', ['$scope', '$rootScope', '$location', '$filter',
function( $scope, $rootScope, $location, $filter ) {

  var usrObj = Parse.User.current();
  var swm = usrObj.id;
  var vendorObj = $scope.swmId ? newParseUser($scope.swmId) : Parse.User.current();

  if ($rootScope.isLoggedIn==false) { /* redirect if not logged in */
    $location.path('/login');
  }

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

  Parse.Cloud.run("getVanList", {
      userid: swm
  },{
    success:function(res) {
      $scope.$apply(function () {
        var flag = '';
        var icon = '';
        $scope.activedrivers = 0;
        for (var i = 0; i < res.length; i++) {

          /* Work out status flag based on date */
          f = $scope.differenceInDays(
            $filter('date')(res[i].get("updatedAt"), "dd/MM/yyyy"),
            $filter('date')(new Date, "dd/MM/yyyy")
          );
          if(f < 2) {
            flag = 'positive';
            icon = 'smile outline';
            $scope.activedrivers++;
          }else if(f <= 3) {
            flag = 'warning';
            icon = 'meh outline';
          }else {
            flag = 'negative';
            icon = 'frown outline';
          }

          van = {
              id: i,
              objId: res[i].id,
              vanId: res[i].get("vanId"),
              vanIdCrop: res[i].get("vanId").substr(0,5),
              name: res[i].get("name"),
              vendor: res[i].get("vendor"),
              active: res[i].get("updatedAt"),
              flag: flag,
              icon: icon
          };
          $scope.vanList.push( van );
        }
      });
    },
    error: function(err) { alert("get Vans error: "+err.code+" "+err.message); }
  });
}]);