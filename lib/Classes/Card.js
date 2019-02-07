/*********************** CARD *****************************************/
var Card = Parse.Object.extend("Card", { },{ 
  create: function (vendor, title, order) {
    var card = new Card();
    card.set("vendor", vendor); card.set("title", title); card.set("order", order);
    card.set("active", false); 
    return card;
  }
});
Card.prototype.__defineGetter__("title", function() {return this.get("title");});
Card.prototype.__defineSetter__("title", function(val) {return this.set("title",val)});
Card.prototype.__defineGetter__("html", function() {return this.get("html");});
Card.prototype.__defineSetter__("html", function(val) {return this.set("html",val)});
Card.prototype.__defineGetter__("active", function() {return this.get("active");});
Card.prototype.__defineSetter__("active", function(val) {return this.set("active",val)});
Card.prototype.__defineGetter__("order", function() {return this.get("order");});
Card.prototype.__defineSetter__("order", function(val) {return this.set("order",val)});
Card.prototype.__defineGetter__("type", function() { return ( (this.get("html"))?"html":"simple" ); });
Card.prototype.__defineSetter__("type", function(val) {console.log("@TODO: custom/simple cards")});
Card.prototype.__defineGetter__("picture", function() {return this.get("picture");});
Card.prototype.__defineSetter__("picture", function(val) {return this.set("picture",val)});

Card.prototype.__defineGetter__("schedulerOn", function() {
  if (!this.campaign) { return false; }
  else { return this.campaign.get("active"); }
});
Card.prototype.__defineSetter__("schedulerOn", function(val) {
  if (!this.campaign) {
    this.campaign = Campaign.create(this.get("vendor"), this.get("title"), this);
    this.campaign.notiOn = false;
  }
  this.campaign.set("active",val);
  if (val==false) { this.campaign.notiOn = false; }
});