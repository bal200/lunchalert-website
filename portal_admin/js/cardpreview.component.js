angular.module('lunchalert-portal')

.component('cardpreview', {
  bindings: {
    card: '='
  },
  templateUrl: 'templates/cardpreview.html',
  controller: function() {
    
    this.iframeid="iframeid";
    this.showIframe = (this.card.title == "Sandwich Meal Deal");


    this.$onInit = function() {
      if (this.showIframe) {
        setTimeout(function() {
          updateIframe("iframeid", this.card.html);
        }.bind(this), 1000);
      }
    }
    
    
    function updateIframe( iframeid, html ) {
      var iframe = document.getElementById( iframeid );
      console.log(iframe);
      var iframedoc = iframe.document;
      if (iframe.contentDocument)  iframedoc = iframe.contentDocument;
      else if (iframe.contentWindow)  iframedoc = iframe.contentWindow.document;
      if (iframedoc){
        iframedoc.open();
        iframedoc.writeln( htmlHead + html + htmlFoot );
        iframedoc.close();
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
  }
});

