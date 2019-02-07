/*********************** CARD TEMPLATE *****************************************/
var CardTemplate = Parse.Object.extend("CardTemplate", { },{ 
  create: function (vendor, title) {
    var cardTemplate = new CardTemplate();
    cardTemplate.set("vendor", vendor);
    cardTemplate.set("title", title); 
    return cardTemplate;
  }
});
CardTemplate.prototype.__defineGetter__("title", function() {return this.get("title");});
CardTemplate.prototype.__defineSetter__("title", function(val) {return this.set("title",val)});

CardTemplate.prototype.__defineGetter__("html", function() {return this.get("html");});
CardTemplate.prototype.__defineSetter__("html", function(val) {return this.set("html",val)});

CardTemplate.prototype.__defineGetter__("vendor", function() {return this.get("vendor");});
CardTemplate.prototype.__defineSetter__("vendor", function(val) {return this.set("vendor",val)});

