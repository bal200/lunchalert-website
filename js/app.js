angular.module('lunchalert-website', [
    'ngRoute' ,
    'pageCtrl',
    'uiGmapgoogle-maps'
  ])

.value('ParseConfiguration', {
    /* DEV */
    applicationId: "uKWkJW0IFFhthG7e3A1NPqh2JhazzKEfZD7d1RXr",
    javascriptKey: "gXgY9Kf8wafGGU3WghwqrEWMfbrl7oi7e27om7J6"
})
    
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.htm',
        controller: 'pageCtrl'
      })
      .when('/alert', {
        templateUrl: 'templates/alert.htm',
        controller: 'pageCtrl'
      })
      .when('/notify', {
        templateUrl: 'templates/notify.htm',
        controller: 'pageCtrl'
      })
      .when('/contact', {
        templateUrl: 'templates/contact.htm',
        controller: 'pageCtrl'
      })
      .when('/pricing', {
        templateUrl: 'templates/pricing.htm',
        controller: 'pageCtrl'
      })
      .when('/install', {
        templateUrl: 'templates/install.htm',
        controller: 'pageCtrl'
      })
      .when('/login', {
        templateUrl: 'templates/login.htm',
        controller: 'userCtrl'
      })
      .when('/portal', {
        templateUrl: 'templates/portal.htm',
        controller: 'portalCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
])

.run(function ($rootScope, ParseConfiguration) {
			
      Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
			var currentUser = Parse.User.current();
			$rootScope.user = null;
			$rootScope.isLoggedIn = false;

			if (currentUser) {
				$rootScope.user = currentUser;
				$rootScope.isLoggedIn = true;
				//$state.go('app.home');
			}
});

var mapReady=false;
function initMap(){
  mapReady=true;
}


