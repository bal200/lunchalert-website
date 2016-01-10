angular.module('lunchalert-website', [
    'ngRoute' ,
    'pageCtrl'
  ])

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
      .otherwise({
        redirectTo: '/'
      });
  }]);
  
