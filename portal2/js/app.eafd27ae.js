(function(t){function e(e){for(var n,r,o=e[0],c=e[1],l=e[2],d=0,h=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&h.push(i[r][0]),i[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(h.length)h.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==i[c]&&(n=!1)}n&&(s.splice(e--,1),t=r(r.s=a[0]))}return t}var n={},i={app:0},s=[];function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=n,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/portal2/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},1:function(t,e){},10:function(t,e){},11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},15:function(t,e){},2:function(t,e){},3:function(t,e){},4:function(t,e){},"49fd":function(t,e,a){"use strict";var n=a("b365"),i=a.n(n);i.a},5:function(t,e){},"5c0b":function(t,e,a){"use strict";var n=a("9c0c"),i=a.n(n);i.a},6:function(t,e){},7:function(t,e){},8:function(t,e){},9:function(t,e){},"9c0c":function(t,e,a){},b365:function(t,e,a){},cd49:function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),i=a("5f5b"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("b-navbar",{staticClass:"navbar navbar-expand-lg navbar-light bg-light",attrs:{toggleable:"md"}},[a("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[t._v("LunchAlert")]),a("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),a("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[a("ul",{staticClass:"navbar-nav mr-auto"},[t.loggedIn?a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/"}},[t._v("Home ")])],1):t._e(),t.loggedIn?t._e():a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/login"}},[t._v("Login")])],1),t.loggedIn?a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/map"}},[t._v("Map")])],1):t._e(),t.loggedIn?a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/cards"}},[t._v("Cards")])],1):t._e(),t.loggedIn?a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/vans"}},[t._v("Vans")])],1):t._e()]),t.loggedIn?a("ul",{staticClass:"navbar-nav ml-auto"},[a("b-nav-item-dropdown",{attrs:{text:t.userName,right:""}},[a("b-dropdown-item",{attrs:{to:"/profile"}},[t._v("Profile")]),a("b-dropdown-item",{on:{click:t.logout}},[t._v("Log Out")]),a("div",{staticClass:"dropdown-divider"}),t.isAdmin?a("b-nav-form",[a("VendorChooser",{attrs:{placeholder:"impersonate vendor"},on:{change:t.vendorChange}})],1):t._e()],1)],1):t._e()])],1),a("router-view")],1)},r=[],o=a("d4ec"),c=a("bee2"),l=a("262e"),u=a("2caf"),d=a("9ab4"),h=a("60a3"),v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"dropdown"},[a("b-form-input",{attrs:{list:"vendor-dropdown",placeholder:t.placeholder},on:{keydown:t.inputChanged},model:{value:t.inputBox,callback:function(e){t.inputBox=e},expression:"inputBox"}}),a("div",{staticClass:"dropdown-menu",class:{show:t.showDropdown}},t._l(t.vendorResults,(function(e){return a("button",{key:e.id,staticClass:"dropdown-item",on:{click:function(a){return t.selectItem(e)}}},[t._v(t._s(e.businessName))])})),0)],1)])},p=[],m=(a("99af"),a("bf48")),f={applicationId:"MSfWHKif25kvcuMPxAhGBjfd7Aie1xyDe7WN6Myt",javascriptKey:"j1RTaGUP0kdj5c8iidSfrXeB7omaODiEijrDdzuC",serverURL:"https://parseapi.back4app.com/"},g="ijFXEyYLBR",b=function(){function t(){Object(o["a"])(this,t),this.loggedIn=!1,this.isAdmin=!1,this.swm={},this.swmId="",this.swmName="",m.initialize(f.applicationId,f.javascriptKey),m.serverURL=f.serverURL,this.swm=m.User.current(),this.swm&&(this.loggedIn=!0,this.swmId=this.swm.id,this.swmName=this.swm.get("businessName"),this.checkAdmin(this.swm))}return Object(c["a"])(t,[{key:"checkAdmin",value:function(t){this.isAdmin=t.id==g}},{key:"login",value:function(t,e){var a=this;return m.User.logIn(t.toLowerCase(),e).then((function(){a.swm=m.User.current(),a.swm&&(a.loggedIn=!0,a.swmId=a.swm.id,a.swmName=a.swm.get("businessName"),a.checkAdmin(a.swm))}))}},{key:"logout",value:function(){var t=this;return m.User.logOut().then((function(){t.loggedIn=!1,t.isAdmin=!1,t.swm=m.User.current()}))}},{key:"getLoggedInUser",value:function(){return m.User.current()}},{key:"changeVendor",value:function(t){var e=this,a=new m.User;a.id=t.id,a.fetch().then((function(t){console.log("fetched Vendor",t),e.swm=t,e.swmId=e.swm.id,e.swmName=e.swm.get("businessName")}))}},{key:"loadInstalls",value:function(t,e,a){var n=null,i=null;return e&&(n=new Date(e)),a&&(i=new Date(a),i.setHours(23),i.setMinutes(59),i.setSeconds(59)),m.Cloud.run("getCustInstalls",{userid:t,dateFrom:n,dateTo:i,vanId:0})}},{key:"searchVendors",value:function(t){return m.Cloud.run("findNamedVendors",{searchText:t})}},{key:"loadVanList",value:function(t){return m.Cloud.run("getVanList",{userid:t})}},{key:"loadCardsAndCampaigns",value:function(t){return m.Cloud.run("getCardsAndCampaigns",{userId:t})}},{key:"checkError",value:function(t){console.log("ERROR: (".concat(t.code,") ").concat(t.message)),t.code}}]),t}(),y=new b,C=y,k=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.inputBox="",t.showDropdown=!1,t.vendorResults=[],t}return Object(c["a"])(a,[{key:"mounted",value:function(){}},{key:"inputChanged",value:function(t){this.inputBox&&this.inputBox.length>=3&&this.searchVendors(this.inputBox)}},{key:"searchVendors",value:function(t){var e=this;C.searchVendors(t).then((function(t){console.log("searchVendors ",t),e.vendorResults=t,e.showDropdown=!0}))}},{key:"selectItem",value:function(t){console.log("selectVendor ",t),this.showDropdown=!1,this.selected=t,this.inputBox="",this.$emit("change",t)}},{key:"inputBlured",value:function(t){console.log("inputBlured ",t),this.showDropdown=!1}}]),a}(h["c"]);Object(d["a"])([Object(h["b"])()],k.prototype,"placeholder",void 0),k=Object(d["a"])([h["a"]],k);var _=k,w=_,O=a("2877"),j=Object(O["a"])(w,v,p,!1,null,null,null),E=j.exports,x=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.parseService=C,t}return Object(c["a"])(a,[{key:"created",value:function(){this.parseService.loggedIn||this.$router.push("/login")}},{key:"vendorChange",value:function(t){C.changeVendor(t)}},{key:"logout",value:function(){var t=this;this.parseService.logout().then((function(){t.$router.push("/login")}))}},{key:"userName",get:function(){return this.parseService.swmName}},{key:"loggedIn",get:function(){return this.parseService.loggedIn}},{key:"isAdmin",get:function(){return this.parseService.isAdmin}}]),a}(h["c"]);x=Object(d["a"])([Object(h["a"])({components:{VendorChooser:E}})],x);var I=x,A=I,S=(a("5c0b"),Object(O["a"])(A,s,r,!1,null,null,null)),D=S.exports,P=a("8c4f"),L=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},V=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",[t._v("Home Page")]),a("div",{staticClass:"row mt-4"},[a("div",{staticClass:"col-sm-6"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[t._v("Card title")]),a("h6",{staticClass:"card-subtitle mb-2 text-muted"},[t._v("Card subtitle")]),a("p",{staticClass:"card-text"},[t._v("Some quick example text to build on the card title and make up the bulk of the card's content.")]),a("a",{staticClass:"card-link",attrs:{href:"#"}},[t._v("Card link")]),a("a",{staticClass:"card-link",attrs:{href:"#"}},[t._v("Another link")])])])]),a("div",{staticClass:"col-sm-6"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[t._v("Card title")]),a("h6",{staticClass:"card-subtitle mb-2 text-muted"},[t._v("Card subtitle")]),a("p",{staticClass:"card-text"},[t._v("Some quick example text to build on the card title and make up the bulk of the card's content.")]),a("a",{staticClass:"card-link",attrs:{href:"#"}},[t._v("Card link")]),a("a",{staticClass:"card-link",attrs:{href:"#"}},[t._v("Another link")])])])])]),a("div",{staticClass:"row mt-4"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[t._v("Card title")]),a("h6",{staticClass:"card-subtitle mb-2 text-muted"},[t._v("Card subtitle")]),a("p",{staticClass:"card-text"},[t._v("Some quick example text to build on the card title and make up the bulk of the card's content.")]),a("a",{staticClass:"card-link",attrs:{href:"#"}},[t._v("Card link")]),a("a",{staticClass:"card-link",attrs:{href:"#"}},[t._v("Another link")])])])])])])}],B=(a("b0c0"),function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.name="",t}return Object(c["a"])(a,[{key:"created",value:function(){}}]),a}(h["c"]));Object(d["a"])([Object(h["b"])()],B.prototype,"msg",void 0),B=Object(d["a"])([Object(h["a"])({components:{}})],B);var M=B,N=M,$=Object(O["a"])(N,L,V,!1,null,null,null),T=$.exports,H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",[t._v("Login")]),a("div",{staticClass:"row mt-5"},[a("form",{staticClass:"offset-sm-3 col-sm-6 card"},[a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[t._v("Login to the LunchAlert Portal")]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"userName1"}},[t._v("Email address")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"email",id:"userName1"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),a("small",{staticClass:"form-text text-muted"})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"passwordInput1"}},[t._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"passwordInput1"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t.errorMessage?a("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[t._v(t._s(t.errorMessage))]):t._e(),a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"},on:{click:function(e){return e.preventDefault(),t.login(e)}}},[t._v("Login")])])])])])},R=[],W=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.username="",t.password="",t.errorMessage="",t}return Object(c["a"])(a,[{key:"created",value:function(){}},{key:"login",value:function(){var t=this;this.errorMessage="",C.login(this.username,this.password).then((function(e){console.log("Login success! ",e),t.$router.push("/")})).catch((function(e){console.log("Login failed: "+e.code+" "+e.message),t.errorMessage=e.message}))}}]),a}(h["c"]);Object(d["a"])([Object(h["b"])()],W.prototype,"msg",void 0),W=Object(d["a"])([h["a"]],W);var U,z,q=W,K=q,Y=Object(O["a"])(K,H,R,!1,null,null,null),F=Y.exports,J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",[t._v("Customer Map")]),t.loading?t._e():a("MapComponent",{attrs:{heatmap:t.installs}})],1)},G=[],X=(a("d3b7"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mapcomponent"})}),Z=[],Q=(a("4160"),a("d81d"),a("159b"),"AIzaSyATDW6hk6hgef14ZJcjK7mbETf9MIl9lso"),tt="gmapsCallback",et=!!window.google,at=new Promise((function(t,e){U=t,z=e}));function nt(){if(et)return at;et=!0,window[tt]=function(){return U(window.google)};var t=document.createElement("script");return t.async=!0,t.defer=!0,t.src="https://maps.googleapis.com/maps/api/js?key=".concat(Q,"&callback=").concat(tt,"&libraries=visualization"),t.onerror=z,document.querySelector("head").appendChild(t),at}var it=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(o["a"])(this,a),e.apply(this,arguments)}return Object(c["a"])(a,[{key:"mounted",value:function(){var t=this;nt().then((function(e){console.log("gmaps loaded! ",e),t.google=e;var a={lat:53.6,lng:-2};t.map=new t.google.maps.Map(t.$el,{zoom:8,center:a}),t.heatmap&&t.heatmapChange(t.heatmap)})).catch((function(t){console.log("gmaps init error ",t)}))}},{key:"heatmapChange",value:function(t){var e=this;if(t){var a=[];t.forEach((function(t){t&&t.coords&&a.push(new e.google.maps.LatLng(t.coords.latitude,t.coords.longitude))})),this.gHeatmap=new this.google.maps.visualization.HeatmapLayer({data:a,dissipating:!0,radius:25,map:this.map})}}},{key:"markersChange",value:function(t,e){var a=this;t&&(console.log("change",t),this.gMarkers=t.map((function(t){return new a.google.maps.Marker({position:t,map:a.map})})))}}]),a}(h["c"]);Object(d["a"])([Object(h["b"])()],it.prototype,"markers",void 0),Object(d["a"])([Object(h["b"])()],it.prototype,"heatmap",void 0),Object(d["a"])([Object(h["d"])("heatmap")],it.prototype,"heatmapChange",null),Object(d["a"])([Object(h["d"])("markers")],it.prototype,"markersChange",null),it=Object(d["a"])([h["a"]],it);var st=it,rt=st,ot=(a("49fd"),Object(O["a"])(rt,X,Z,!1,null,null,null)),ct=ot.exports,lt=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.parseService=C,t.loading=!1,t.installs=[],t.markers=[],t}return Object(c["a"])(a,[{key:"created",value:function(){this.getCustomers()}},{key:"getCustomers",value:function(){var t=this,e=C.swmId;C.loadInstalls(e).then((function(e){console.log("loadInstalls ",e),t.installs=e})).catch((function(e){1==e.code&&t.$router.push("/login")})).finally((function(){return t.loading=!1}))}},{key:"vendorChanged",value:function(t){console.log("vendorc?Hanged ",t),this.loading=!0,this.getCustomers()}}]),a}(h["c"]);Object(d["a"])([Object(h["b"])()],lt.prototype,"msg",void 0),Object(d["a"])([Object(h["d"])("parseService.swmId")],lt.prototype,"vendorChanged",null),lt=Object(d["a"])([Object(h["a"])({components:{MapComponent:ct}})],lt);var ut=lt,dt=ut,ht=Object(O["a"])(dt,J,G,!1,null,null,null),vt=ht.exports,pt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",[t._v("Your Driver Activity")]),a("p",[t._v("Monitor driver activity on a daily basis using our at a glance status board for your van fleet.")]),t.loading?t._e():a("table",{staticClass:"table"},[a("thead",{staticClass:"thead-light"},[a("tr",[a("th",[t._v(t._s(t.activeVans.length)+" drivers")]),a("th",[t._v(t._s(t.countActiveToday)+" active today")])])])]),t.loading?t._e():a("table",{staticClass:"table table-hover"},[t._m(0),a("tbody",t._l(t.activeVans,(function(e){return a("tr",{key:e.id,class:t.getRowClass(e)},[e.editing?a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.vanEditBox,expression:"vanEditBox"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.vanEditBox},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.endEditing(e)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.cancelEditing(e)},blur:t.cancelEditing,input:function(e){e.target.composing||(t.vanEditBox=e.target.value)}}})]):a("td",[t._v(" "+t._s(e.name)+" "),a("a",{staticClass:"text-muted",attrs:{href:""},on:{click:function(a){return a.preventDefault(),t.startEditing(e)}}},[a("small",[t._v("[edit]")])])]),a("td",[t._v(t._s(e.lastActiveString))]),a("td",[t._v(t._s(e.vanIdCropped))]),a("td",[a("a",{staticClass:"text-muted",attrs:{href:""},on:{click:function(a){return a.preventDefault(),t.archive(e)}}},[a("small",[t._v("[archive]")])])])])})),0)]),t.loading||t.showArchived?t._e():a("a",{staticClass:"text-muted mt-5",attrs:{href:""},on:{click:function(e){e.preventDefault(),t.showArchived=!0}}},[a("small",[t._v("see archived vans")])]),!t.loading&&t.showArchived?a("table",{staticClass:"table table-hover mt-5"},[t._m(1),a("tbody",t._l(t.archivedVans,(function(e){return a("tr",{key:e.id},[e.editing?a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.vanEditBox,expression:"vanEditBox"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.vanEditBox},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.endEditing(e)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.cancelEditing(e)},blur:t.cancelEditing,input:function(e){e.target.composing||(t.vanEditBox=e.target.value)}}})]):a("td",[t._v(" "+t._s(e.name)+" "),a("a",{staticClass:"text-muted",attrs:{href:""},on:{click:function(a){return a.preventDefault(),t.startEditing(e)}}},[t._v("[edit]")])]),a("td",[t._v(t._s(e.lastActiveString))]),a("td",[t._v(t._s(e.vanIdCropped))]),a("td",[a("a",{staticClass:"text-muted",attrs:{href:""},on:{click:function(a){return a.preventDefault(),t.unarchive(e)}}},[a("small",[t._v("[re-instate]")])])])])})),0)]):t._e(),t.loading?a("p",[t._v("loading...")]):t._e()])},mt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"thead-light"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Name")]),a("th",{attrs:{scope:"col"}},[t._v("Last Active")]),a("th",{attrs:{scope:"col"}},[t._v("Van ID")]),a("th",{attrs:{scope:"col"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"thead-light"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Archived Name")]),a("th",{attrs:{scope:"col"}},[t._v("Last Active")]),a("th",{attrs:{scope:"col"}},[t._v("Van ID")]),a("th",{attrs:{scope:"col"}})])])}],ft=(a("4de4"),a("13d5"),function(){function t(e){Object(o["a"])(this,t),this.p=e,this.editing=!1,this.unpack()}return Object(c["a"])(t,[{key:"unpack",value:function(){this.id=this.p.id,this.name=this.p.get("name"),this.vanId=this.p.get("vanId"),this.archive=this.p.get("archive"),this.updatedAt=this.p.get("updatedAt")}},{key:"pack",value:function(){this.name!==this.p.get("name")&&this.p.set("name",this.name),this.vanId!==this.p.get("vanId")&&this.p.set("vanId",this.vanId),this.archive!==this.p.get("archive")&&this.p.set("archive",this.archive),this.updatedAt!==this.p.get("updatedAt")&&this.p.set("updatedAt",this.updatedAt)}},{key:"save",value:function(){return this.pack(),this.p.save()}},{key:"differenceInDays",value:function(t,e){var a=864e5,n=t.getTime()-e.getTime(),i=n/a;return Math.floor(i)}},{key:"vanIdCropped",get:function(){return this.vanId.substr(0,5)}},{key:"activeDaysAgo",get:function(){return this.differenceInDays(new Date,this.updatedAt)}},{key:"lastActiveString",get:function(){return this.updatedAt.toDateString()}}]),t}()),gt=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.parseService=C,t.loading=!0,t.vans=[],t.vanEditBox="",t.showArchived=!1,t}return Object(c["a"])(a,[{key:"created",value:function(){this.loadVanList()}},{key:"loadVanList",value:function(){var t=this,e=C.swmId;C.loadVanList(e).then((function(e){console.log("parse vans ",e),t.vans=e.map((function(t){var e=new ft(t);return console.log("newVan ",e),e}))})).catch((function(e){1==e.code&&t.$router.push("/login")})).finally((function(){return t.loading=!1}))}},{key:"getRowClass",value:function(t){return t.activeDaysAgo<2?"table-success":t.activeDaysAgo<=4?"table-warning":"table-danger"}},{key:"dateSort",value:function(t){return t.sort((function(t,e){return t.updatedAt>e.updatedAt?-1:t.updatedAt<e.updatedAt?1:0}))}},{key:"startEditing",value:function(t){console.log("startEditing ",t),this.vanInEdit||(t.editing=!0,this.vanInEdit=t,this.vanEditBox=t.name)}},{key:"endEditing",value:function(){if(console.log("endEditing "),this.vanInEdit){var t=this.vanInEdit;this.vanInEdit.name=this.vanEditBox,this.vanInEdit.editing=!1,this.vanInEdit=void 0,t.save().then((function(t){console.log("van edit success",t)})).catch((function(t){console.log("van edit ERROR",t)}))}}},{key:"cancelEditing",value:function(){console.log("cancelEditing "),this.vanInEdit&&(this.vanInEdit.editing=!1,this.vanInEdit=void 0)}},{key:"archive",value:function(t){t.archive=!0,t.save().then((function(t){console.log("archive success",t)})).catch((function(t){console.log("archive error",t)}))}},{key:"unarchive",value:function(t){t.archive=!1,t.save().then((function(t){console.log("un archive success",t)})).catch((function(t){console.log("un archive error",t)}))}},{key:"differenceInDays",value:function(t,e){var a=864e5,n=t.getTime()-e.getTime(),i=n/a;return Math.floor(i)}},{key:"vendorChanged",value:function(t){this.loading=!0,this.loadVanList()}},{key:"activeVans",get:function(){return this.dateSort(this.vans.filter((function(t){return!t.archive})))}},{key:"archivedVans",get:function(){return this.dateSort(this.vans.filter((function(t){return t.archive})))}},{key:"countActiveToday",get:function(){return this.vans.reduce((function(t,e){return e.activeDaysAgo<2?++t:t}),0)}}]),a}(h["c"]);Object(d["a"])([Object(h["d"])("parseService.swmId")],gt.prototype,"vendorChanged",null),gt=Object(d["a"])([Object(h["a"])({components:{}})],gt);var bt=gt,yt=bt,Ct=Object(O["a"])(yt,pt,mt,!1,null,null,null),kt=Ct.exports,_t=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",[t._v("Cards")]),t.loading?a("div",[t._v("loading...")]):a("div",[a("p",[t._v("Active Cards")]),t._l(t.activeCards,(function(e){return a("div",{key:e.id},[a("p",[t._v(t._s(e.id)+" - "+t._s(e.comment)+" - "+t._s(e.active))]),a("CardPreview",{attrs:{html:e.html,card:e,scrollbar:!1,myWidth:"150",myHeight:"100"}})],1)})),a("p",[t._v("Past Cards")]),t._l(t.pastCards,(function(e){return a("div",{key:e.id},[a("p",[t._v(t._s(e.id)+" - "+t._s(e.comment)+" - "+t._s(e.active))]),a("CardPreview",{attrs:{html:e.html,card:e,scrollbar:!1,myWidth:"150",myHeight:"100"}})],1)}))],2)])},wt=[],Ot=(a("38cf"),function(){function t(e){Object(o["a"])(this,t),this.parseCard=e,this.unpackCard()}return Object(c["a"])(t,[{key:"linkCampaign",value:function(t){this.parseCampaign=t,this.unpackCampaign()}},{key:"unpackCard",value:function(){this.id=this.parseCard.id,this.vendor=this.parseCard.get("vendor"),this.title=this.parseCard.get("title"),this.html=this.parseCard.get("html"),this.active=this.parseCard.get("active"),this.order=this.parseCard.get("order"),this.type=this.calculateType()}},{key:"packCard",value:function(){this.vendor!==this.parseCard.get("vendor")&&this.parseCard.set("vendor",this.vendor),this.title!==this.parseCard.get("title")&&this.parseCard.set("title",this.title),this.html!==this.parseCard.get("html")&&this.parseCard.set("html",this.html),this.active!==this.parseCard.get("active")&&this.parseCard.set("active",this.active),this.order!==this.parseCard.get("order")&&this.parseCard.set("order",this.order)}},{key:"unpackCampaign",value:function(){this.comment=this.parseCampaign.get("comment"),this.repeat=this.parseCampaign.get("repeat"),this.startDate=this.parseCampaign.get("startDate"),this.endDate=this.parseCampaign.get("endDate"),this.schedulerActive=this.parseCampaign.get("active"),this.template=this.parseCampaign.get("template"),this.type=this.calculateType()}},{key:"packCampaign",value:function(){this.comment!==this.parseCampaign.get("comment")&&this.parseCampaign.set("comment",this.comment),this.repeat!==this.parseCampaign.get("repeat")&&this.parseCampaign.set("repeat",this.repeat),this.startDate!==this.parseCampaign.get("startDate")&&this.parseCampaign.set("startDate",this.startDate),this.endDate!==this.parseCampaign.get("endDate")&&this.parseCampaign.set("endDate",this.endDate),this.schedulerActive!==this.parseCampaign.get("active")&&this.parseCampaign.set("active",this.schedulerActive),this.template!==this.parseCampaign.get("template")&&this.parseCampaign.set("template",this.template)}},{key:"save",value:function(){return this.packCard(),this.parseCard.save()}},{key:"getOnlyTime",value:function(t){var e=this.parseCampaign.get(t);return e?this.zeroPad(e.getHours())+":"+this.zeroPad(e.getMinutes()):""}},{key:"zeroPad",value:function(t){return t<10?"0"+t:""+t}},{key:"templateVariableFind",value:function(t,e){if(!Array.isArray(t))return"";for(var a=0;a<t.length;a++)if(t[a].name==e)return t[a]}},{key:"calculateType",value:function(){return this.template?"templated":"simple"}}]),t}()),jt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.showIframe?a("div",{staticClass:"iframe-wrap",style:t.wrapStyle},[a("iframe",{ref:"iframeRef",staticStyle:{"transform-origin":"0 0"},style:t.iframeStyle,attrs:{src:"about:blank",width:t.iWidth+"px",height:t.iHeight+"px"}})]):t._e()},Et=[],xt=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.publicPath="/portal2/",t.showIframe=!0,t.iWidth=375,t}return Object(c["a"])(a,[{key:"mounted",value:function(){this.updateIframe(this.html)}},{key:"updateIframe",value:function(t){var e=this.$refs.iframeRef;if(e){var a=e.document;e.contentDocument?a=e.contentDocument:e.contentWindow&&(a=e.contentWindow.document),a&&(console.log("redrawing iframe doc"),a.open(),a.writeln(this.buildCardHtml(t,this.publicPath,this.scrollbar)),a.close())}}},{key:"buildCardHtml",value:function(t,e,a){return'\n\t\t\t<!DOCTYPE html>\n\t\t\t<html>\n\t\t\t<head>\n\t\t\t\t<meta charset="utf-8">\n\t\t\t\t\t<link href="'.concat(e,'ionic.css" rel="stylesheet">\n\t\t\t\t<style>\n\t\t\t\t\thtml,body { overflow: ').concat(a?"auto":"hidden",'; }\n\t\t\t\t</style>\n\t\t\t</head>\n\t\t\t<body ng-app="lunchalert">\n\t\t\t\t<ion-nav-view>\n\t\t\t\t\t').concat(t,"\n\t\t\t\t</ion-nav-view>\n\t\t\t</body>\n\t\t\t</html>\n\t\t")}},{key:"iframeStyle",get:function(){return{transform:"scale("+this.myScale+")",transformOrigin:"0 0"}}},{key:"wrapStyle",get:function(){return{width:this.myWidth+"px",height:this.myHeight+"px",maxHeight:this.myHeight+"px"}}},{key:"iHeight",get:function(){return this.myHeight/this.myScale}},{key:"myScale",get:function(){return this.myWidth/this.iWidth}}]),a}(h["c"]);Object(d["a"])([Object(h["b"])()],xt.prototype,"myWidth",void 0),Object(d["a"])([Object(h["b"])()],xt.prototype,"myHeight",void 0),Object(d["a"])([Object(h["b"])()],xt.prototype,"card",void 0),Object(d["a"])([Object(h["b"])()],xt.prototype,"html",void 0),Object(d["a"])([Object(h["b"])({default:!0})],xt.prototype,"scrollbar",void 0),Object(d["a"])([Object(h["d"])("html")],xt.prototype,"updateIframe",null),xt=Object(d["a"])([h["a"]],xt);var It=xt,At=It,St=Object(O["a"])(At,jt,Et,!1,null,null,null),Dt=St.exports,Pt=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.parseService=C,t.loading=!1,t.cards=[],t}return Object(c["a"])(a,[{key:"created",value:function(){this.loadCards()}},{key:"loadCards",value:function(){var t=this,e=C.swm;this.loading=!0,C.loadCardsAndCampaigns(e.id).then((function(e){console.log("Retrieved cards and campaigns",e),t.cards=e.cards.map((function(t){return new Ot(t)})),t.linkCardsToCampaigns(t.cards,e.campaigns),console.log("cards: ",t.cards)})).catch((function(t){return console.log("Error retreiving cards and campaigns ("+t.code+") "+t.message)})).finally((function(){return t.loading=!1}))}},{key:"linkCardsToCampaigns",value:function(t,e){for(var a=0;a<e.length;a++)for(var n=0;n<t.length;n++)e[a].get("card").id==t[n].id&&t[n].linkCampaign(e[a])}},{key:"vendorChanged",value:function(t){this.loadCards()}},{key:"activeCards",get:function(){return this.cards.filter((function(t){return t.active}))}},{key:"pastCards",get:function(){return this.cards.filter((function(t){return!t.active}))}}]),a}(h["c"]);Object(d["a"])([Object(h["d"])("parseService.swmId")],Pt.prototype,"vendorChanged",null),Pt=Object(d["a"])([Object(h["a"])({components:{CardPreview:Dt}})],Pt);var Lt=Pt,Vt=Lt,Bt=Object(O["a"])(Vt,_t,wt,!1,null,null,null),Mt=Bt.exports,Nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",[t._v("Your Profile")]),a("p"),a("form",{staticClass:"mt-5"},[a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-3 col-form-label",attrs:{for:"i1"}},[t._v("Business Name")]),a("div",{staticClass:"col-sm-9"},[a("input",{staticClass:"form-control",attrs:{type:"text",id:"i1"},domProps:{value:t.businessName}})])]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-3 col-form-label",attrs:{for:"i2"}},[t._v("Tag line")]),a("div",{staticClass:"col-sm-9"},[a("input",{staticClass:"form-control",attrs:{type:"text",id:"i2"},domProps:{value:t.tagLine}})])]),t._m(0),t._m(1),t._m(2)]),t.loading?a("p",[t._v("loading...")]):t._e()])},$t=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-3 col-form-label",attrs:{for:"i3"}},[t._v("Password")]),a("div",{staticClass:"col-sm-9"},[a("button",{staticClass:"btn btn-link",attrs:{id:"i3"}},[t._v("Change password")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-3 col-form-label",attrs:{for:"i4"}},[t._v("Logo Icon")]),a("div",{staticClass:"col-sm-9"},[a("input",{staticClass:"form-control",attrs:{type:"text",id:"i4"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-sm-10"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Save changes")])])])}],Tt=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.parseService=C,t.loading=!1,t.vans=[],t.vanInEdit=null,t.vanEditBox="",t}return Object(c["a"])(a,[{key:"created",value:function(){}},{key:"loadVanList",value:function(){C.swmId}},{key:"startEditing",value:function(t){console.log("startEditing ",t),this.vanInEdit||(t.editing=!0,this.vanInEdit=t,this.vanEditBox=t.get("name"))}},{key:"endEditing",value:function(){console.log("endEditing "),this.vanInEdit&&(this.vanInEdit.editing=!1,this.vanInEdit=null)}},{key:"cancelEditing",value:function(){console.log("cancelEditing "),this.vanInEdit&&(this.vanInEdit.editing=!1,this.vanInEdit=null)}},{key:"businessName",get:function(){return this.parseService.swm.get("businessName")}},{key:"tagLine",get:function(){return this.parseService.swm.get("tagLine")}},{key:"objectId",get:function(){return this.parseService.swmId}}]),a}(h["c"]);Tt=Object(d["a"])([Object(h["a"])({components:{}})],Tt);var Ht=Tt,Rt=Ht,Wt=Object(O["a"])(Rt,Nt,$t,!1,null,null,null),Ut=Wt.exports;n["default"].use(P["a"]);var zt=[{path:"/",name:"Home",component:T},{path:"/login",name:"Login",component:F},{path:"/map",name:"Map",component:vt},{path:"/cards",name:"Cards",component:Mt},{path:"/vans",name:"Vans",component:kt},{path:"/profile",name:"Profile",component:Ut}],qt=new P["a"]({routes:zt}),Kt=qt;a("f9e3"),a("2dd8");n["default"].config.productionTip=!1,n["default"].use(i["a"]),new n["default"]({router:Kt,render:function(t){return t(D)}}).$mount("#app")}});