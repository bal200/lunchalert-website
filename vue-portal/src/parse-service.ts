//import {parse} from 'parse'
let Parse = require('parse')
import Van from './class/Van';

export type Install = {
	id: number,
	deviceType: string,
	installationId: string,
	objectId: string,
	coords: { latitude: number, longitude: number },
}
export type Vendor = {
	id: string,
	businessName: string,
	checked: boolean,
	line: number,
	tagLine?: string,
}
export const ParseCardTemplate = Parse.Object.extend("CardTemplate");
export const ParseCard = Parse.Object.extend("Card");
export const ParseCampaign = Parse.Object.extend("Campaign");

const ParseConfiguration = {
	/* DEV */
	//applicationId: "uKWkJW0IFFhthG7e3A1NPqh2JhazzKEfZD7d1RXr",
	//javascriptKey: "gXgY9Kf8wafGGU3WghwqrEWMfbrl7oi7e27om7J6",
	/* LIVE */
	applicationId: "MSfWHKif25kvcuMPxAhGBjfd7Aie1xyDe7WN6Myt",
	javascriptKey: "j1RTaGUP0kdj5c8iidSfrXeB7omaODiEijrDdzuC",
	serverURL:     "https://parseapi.back4app.com/"
}
const adminAccount = "ijFXE" + "yYLBR";

class ParseServiceClass {
	public loggedIn:boolean = false
	public isAdmin:boolean = false
	
	/* The Selected User to act as, if we're in Admin mode. Otherwise the logged in user. */
	public swm:Parse.Object
	public swmId: string =''
	public swmName:string = ''

	constructor() {
		Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
		Parse.serverURL = ParseConfiguration.serverURL
		this.swm = Parse.User.current();
		if (this.swm) {
			this.loggedIn = true;
			this.swmId = this.swm.id
			this.swmName = this.swm.get("businessName");
			this.checkAdmin( this.swm )
		}
	}
	private checkAdmin(vendor:Vendor | any) { /* any means a Parse _User obj */
		this.isAdmin = (vendor.id == adminAccount ? true : false)
	}
	public login( username:string, password:string) {
		return Parse.User.logIn(username.toLowerCase(), password)
		.then (() => {
			this.swm = Parse.User.current();
			if (this.swm) {
				this.loggedIn = true;
				this.swmId = this.swm.id
				this.swmName = this.swm.get("businessName");
				this.checkAdmin( this.swm )
			}
		})
	}
	public logout() {
		return Parse.User.logOut().then(() => {
			this.loggedIn = false
			this.isAdmin = false
			this.swm = Parse.User.current();  // this will now be null
		});
	}
	public getLoggedInUser() {
		return Parse.User.current();
	}
	public changeVendor(vendorShort:Vendor) {
		let vendor=new Parse.User();
		vendor.id = vendorShort.id;
		vendor.fetch().then((v:any) => {
			console.log("fetched Vendor", v)
			this.swm = v
			this.swmId = this.swm.id
			this.swmName = this.swm.get("businessName");
		})
	}

	/*************************************************/
	public loadInstalls(swmId:string, installFromDate?:Date, installToDate?:Date) {
		// Get the Customer Installs data from the Parse server

		//query.equalTo('vanId', vansid);
		/* @Todo Date range */
		var fromDate=null, toDate=null;
		if (installFromDate) {
			fromDate=new Date(installFromDate);
		}
		if (installToDate) {
			toDate=new Date(installToDate);
			toDate.setHours(23); toDate.setMinutes(59); toDate.setSeconds(59); /* needs to be the end of this day to be inclusive */
		}
  
		return Parse.Cloud.run("getCustInstalls", {
			userid: swmId, /* The S is put on by the cloud code; can ignore here */
			dateFrom: fromDate, //$scope.dateFrom,
			dateTo: toDate, //$scope.dateTo,
			vanId: 0 //$scope.vanId
		}) as Promise<Install[]>
	}
	public searchVendors( searchText:string ) {
		// @TODO check if admin user only
		return Parse.Cloud.run("findNamedVendors", {
			searchText: searchText
		})  as Promise<Vendor[]>
	}
	public loadVanList( swmId:string ) {
		return Parse.Cloud.run("getVanList", {
			userid: swmId,
		}) as Promise<Parse.Object[]>
	}
	public loadCardsAndCampaigns( swmId:string ) {
		return Parse.Cloud.run("getCardsAndCampaigns", {
			userId: swmId,
		}) as Promise<{
			cards: Parse.Object[],
			campaigns: Parse.Object[],
		}>
	}

	checkError(error:any) {
		console.log( `ERROR: (${error.code}) ${error.message}` )

		if (error.code == 1) {
			
		}
	}

	async loadVendorsTemplate( vendor: Parse.Object ) {
		var query1 = new Parse.Query(ParseCardTemplate);
		var query2 = new Parse.Query(ParseCardTemplate);
		query1.equalTo("vendor", vendor );  /* templates for this vendor  */
		query2.equalTo("vendor", null );    /* OR templates for ANY vendor */
		var query:Parse.Query = Parse.Query.or(query1, query2);
		query.equalTo("default", true ); 
		const templates = await query.find();
		var template = this.pickTheDefaultTemplate(templates, vendor);
		return template;
	}
	//$scope.card.initTemplate(function() {

	/* Look through an array of templates for this vendors default, else the global default */
	pickTheDefaultTemplate(templates: Parse.Object[], vendor: Parse.Object) {
		for (var t of templates) {
		  if (t.get('vendor') && t.get('vendor').id == vendor.id ) return t;
		}
		for (var t of templates) {
		  if (t.get('vendor') == null ) return t;
		}
	 }
}

const ParseService = new ParseServiceClass();
export default ParseService
