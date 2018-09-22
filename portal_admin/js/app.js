angular.module('lunchalert-portal', [
    'ngRoute',
    'uiGmapgoogle-maps',
    'jkuri.datepicker',
    'naif.base64'
  ])

.value('ParseConfiguration', {
    /* DEV */
    applicationId: "uKWkJW0IFFhthG7e3A1NPqh2JhazzKEfZD7d1RXr",
    javascriptKey: "gXgY9Kf8wafGGU3WghwqrEWMfbrl7oi7e27om7J6",
    /* LIVE */
    // applicationId: "MSfWHKif25kvcuMPxAhGBjfd7Aie1xyDe7WN6Myt",
    // javascriptKey: "j1RTaGUP0kdj5c8iidSfrXeB7omaODiEijrDdzuC",
		serverURL:     "https://parseapi.back4app.com/"  /* parse server to connect to */
})

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.htm',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: 'templates/login.htm',
        controller: 'UserCtrl'
      })
      .when('/portal', {
        templateUrl: 'templates/portal.htm',
        controller: 'PortalCtrl'
      })
      .when('/cards', {
        templateUrl: 'templates/cards.htm',
        controller: 'CardsCtrl'
      })
      .when('/register', {
        templateUrl: 'templates/register.htm',
        controller: 'RegisterCtrl'
      })

      .otherwise({
        redirectTo: '/'
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
				//$state.go('app.home');
			}
});

//var mapReady=false;
//function initMap(){
//  mapReady=true;
//}
