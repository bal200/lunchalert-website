angular.module('lunchalert-portal', [
    'ngRoute' ,
    'pageCtrl',
    'uiGmapgoogle-maps',
    'naif.base64'
  ])

.value('ParseConfiguration', {
    /* DEV */
    //applicationId: "uKWkJW0IFFhthG7e3A1NPqh2JhazzKEfZD7d1RXr",
    //javascriptKey: "gXgY9Kf8wafGGU3WghwqrEWMfbrl7oi7e27om7J6",
    /* LIVE */
    applicationId: "MSfWHKif25kvcuMPxAhGBjfd7Aie1xyDe7WN6Myt",
    javascriptKey: "j1RTaGUP0kdj5c8iidSfrXeB7omaODiEijrDdzuC",
		serverURL:     "https://parseapi.back4app.com/"  /* parse server to connect to */
})

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.htm',
        controller: 'pageCtrl'
      })
      .when('/login', {
        templateUrl: 'templates/login.htm',
        controller: 'userCtrl'
      })
      .when('/portal/map', {
        templateUrl: 'templates/map.htm',
        controller: 'mapCtrl'
      })
      .when('/portal/offers', {
        templateUrl: 'templates/offers.htm',
        controller: 'offersCtrl'
      })
      .when('/portal/offer/edit', {
        templateUrl: 'templates/offerwizard.htm',
        controller: 'offerWizardCtrl'
      })
      .when('/portal/vans', {
        templateUrl: 'templates/vans.htm',
        controller: 'vansCtrl'
      })
      .when('/portal_edit', {
        redirectTo: '/portal'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
])

.config(['uiGmapGoogleMapApiProvider',
  function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: "AIzaSyATDW6hk6hgef14ZJcjK7mbETf9MIl9lso"
    });
  }
])

.run(function ($rootScope, ParseConfiguration) {

      Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
      Parse.serverURL = ParseConfiguration.serverURL;
      var currentUser = Parse.User.current();
      $rootScope.user = null;
			$rootScope.isLoggedIn = false;

			if (currentUser) {
				$rootScope.user = currentUser;
        $rootScope.isLoggedIn = true;
        $rootScope.business = currentUser.get("businessName");
				//$state.go('app.home');
			}
});

var mapReady=false;
function initMap(){
  mapReady=true;
}
