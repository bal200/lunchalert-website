angular.module('pageCtrl',[])
.controller('pageCtrl', ['$scope', function($scope) {
 
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
  
}]);

