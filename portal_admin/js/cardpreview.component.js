angular.module('lunchalert-portal')

.component('cardpreview', {
  bindings: {
    card: '=',
    html: '<',
    mywidth: '=',
    myheight: '='
  },
  templateUrl: 'templates/cardpreview.html',
  controller: ['$scope', '$timeout', function($scope, $timeout) {
    
    this.iframeid;
    $scope.showIframe = true; //(this.card.title == "Bals butties TEST");
    $scope.myscale = 1.0; $scope.scaleStyle={transform: "scale(0.50)"};
    $scope.iwidth = 400; $scope.iheight=600;
    that=this;
    this.$onInit = function() {
      if ($scope.showIframe) {
        $timeout(function() {
           this.updateChanges();
        }.bind(this), 500);
      }
      this.iframeid = "iframe-"+this.card.id;
    }.bind(this);

    this.$onChanges = function(changesObj) {
      console.log("onchanges");
      //console.log(changesObj);
      this.updateChanges();
    }

    this.updateChanges=function() {
      this.updateSizes();
      this.updateIframe(this.iframeid, this.html);
    }

    this.updateSizes=function() {
      this.myscale = parseInt(this.mywidth) / $scope.iwidth ;
      //console.log("iwidth "+$scope.iwidth);
      //console.log("mywidth "+this.mywidth);
      $scope.scaleStyle={'transform': "scale("+this.myscale+")"};
      //console.log($scope.scaleStyle);
    }
    
    this.updateIframe=function( iframeid, html ) {
      var iframe = document.getElementById( iframeid );
      if (iframe) {
        var iframedoc = iframe.document;
        if (iframe.contentDocument)  iframedoc = iframe.contentDocument;
        else if (iframe.contentWindow)  iframedoc = iframe.contentWindow.document;
        if (iframedoc){
          console.log("redrawing iframe doc")
          iframedoc.open();
          iframedoc.writeln( htmlHead + html + htmlFoot );
          iframedoc.close();
        }
      }
    }
    var htmlHead =`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="css/ionic.css" rel="stylesheet">
  </head>
  <body ng-app="lunchalert">
    <ion-nav-view>
    `;
    var htmlFoot =`
    </ion-nav-view>
  </body>
</html>
    `;
  }]
});

