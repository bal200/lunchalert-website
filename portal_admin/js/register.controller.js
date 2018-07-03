angular.module('lunchalert-portal')

.controller('RegisterCtrl', RegisterController);
RegisterController.$inject = ['$scope', '$location', '$rootScope'];
function RegisterController($scope, $location, $rootScope) {
  $scope.user = {};
  $scope.error = {};

  /* The Register button presssed */
  $scope.register = function() {
    $scope.error.message = '';
    // $scope.loading = $ionicLoading.show({
    //     content: 'Sending',    animation: 'fade-in',
    //     showBackdrop: true,    maxWidth: 200,
    //     showDelay: 0
    // });

      /* Sanity checks */
      if (!$scope.user.email) {
        $scope.error.message = 'Please enter a valid email address';
      }else if (!$scope.user.password) {
        $scope.error.message = 'Please create a password';
      }else if (!$scope.user.businessName) {
        $scope.error.message = 'Enter your business name as it will appear to customers using the app';
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
          $scope.error.good = 'User account created. objectId= '+user.id;
          //$location.path('/portal');
          $scope.$apply();
        },error: function(user, err) { /* Sign-up error */
          //$ionicLoading.hide();
          console.log('Error signing-up\n'+'code: '+err.code+' message: '+err.message +'\n');
          if (err.code === 125) {
            $scope.error.message = 'Please specify a valid email address';
          }else if (err.code === 202) {
            $scope.error.message = 'The email address is already registered';
          }else if (err.code === 100) {
            $scope.error.message = 'Cannot connect to the internet';
            //$ionicLoading.show({template: '<i class="icon ion-close-circled"></i> Cannot connect to the internet', duration: 3000});
          }else{
            $scope.error.message = "Error signing-up, code "+err.code;
          }
          $scope.$apply();
        }
      });

  };
}
