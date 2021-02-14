import Parse from 'parse';
import _ from "lodash";
import { Vue } from 'vue-property-decorator'

export type TemplateVariable={
	name: string
	type: string
	value?: string
	example?: string
}
type KeyValues = { [key:string]:string|undefined; }

export default class Card {
	constructor( public parseCard:Parse.Object ) {
		//this.id = undefined
		//this.vendor =undefined
		//this.title = undefined
		//this.html = undefined
		//this.active = undefined
		//this.order = undefined
		
		this.schedulerActive = undefined
		this.comment = undefined
		this.repeat = undefined
		this.startDate = undefined
		this.startTime = undefined
		this.endDate = undefined
		this.endTime = undefined
		this.schedulerActive = undefined
		this.notiText = undefined
		this.notiStatus = undefined
		this.template = undefined
		this.templateVariables = undefined
		
		//this.tv = {}
		this.parseCard = parseCard
		if (parseCard) this.unpackCard();
	}
	public parseCampaign!:Parse.Object
	
	// card
	id!: string /* card id */
	vendor!: Parse.Object
	title!: string
	html!: string
	active!: boolean
	order!: number
	
	// campaign
	comment?: string
	repeat?: string
	startDate?: Date
	startTime?: string
	endDate?: Date
	endTime?: string
	schedulerActive?: boolean
	notiText?: string
	notiStatus?: string
	template?: Parse.Object
	templateVariables?: TemplateVariable[]
	
	// tv's
	//tv: KeyValues = {}
	//message?: string
	
	type!: 'templated' | 'simple'

	linkCampaign(parseCampaign:Parse.Object) {
		this.parseCampaign = parseCampaign
		this.unpackCampaign()
	}
	unpackCard() {
		this.id = this.parseCard.id
		this.vendor = this.parseCard.get('vendor')
		this.title = this.parseCard.get('title')
		this.html = this.parseCard.get('html')
		this.active = this.parseCard.get('active')
		this.order = this.parseCard.get('order')
	}
	packCard() {
		if (this.vendor !== this.parseCard.get('vendor'))  this.parseCard.set('vendor', this.vendor);
		if (this.title !== this.parseCard.get('title'))  this.parseCard.set('title', this.title)
		if (this.html !== this.parseCard.get('html'))  this.parseCard.set('html', this.html)
		if (this.active !== this.parseCard.get('active'))  this.parseCard.set('active', this.active)
		if (this.order !== this.parseCard.get('order'))  this.parseCard.set('order', this.order)
	}
	unpackCampaign() {
		this.comment = this.parseCampaign.get('comment')
		this.repeat = this.parseCampaign.get('repeat')
		this.startDate = this.parseCampaign.get('startDate')
		this.endDate = this.parseCampaign.get('endDate')
		this.schedulerActive = this.parseCampaign.get('active')
		this.notiText = this.parseCampaign.get('notiText')
		this.notiStatus = this.parseCampaign.get('notiStatus')
		this.template = this.parseCampaign.get('template')
		this.templateVariables = Vue.observable( this.parseCampaign.get('templateVariables') )
		//this.tv = Vue.observable( this.unpackTemplateVariables( this.templateVariables ) )
		//this.message = this.templateVariableFind('message')
		this.type = this.calculateType()
	}
	packCampaign() {
		if (this.comment !== this.parseCampaign.get('comment'))  this.parseCampaign.set('comment', this.comment);
		if (this.repeat !== this.parseCampaign.get('repeat'))  this.parseCampaign.set('repeat', this.repeat)
		if (this.startDate !== this.parseCampaign.get('startDate'))  this.parseCampaign.set('startDate', this.startDate)
		if (this.endDate !== this.parseCampaign.get('endDate'))  this.parseCampaign.set('endDate', this.endDate)
		if (this.schedulerActive !== this.parseCampaign.get('active'))  this.parseCampaign.set('active', this.schedulerActive)
		if (this.notiText !== this.parseCampaign.get('notiText'))  this.parseCampaign.set('notiText', this.notiText)
		if (this.notiStatus !== this.parseCampaign.get('notiStatus'))  this.parseCampaign.set('notiStatus', this.notiStatus)
		
		if (this.template !== this.parseCampaign.get('template'))  this.parseCampaign.set('template', this.template)
		
		// @TODO pack each templateVariables
		//this.templateVariables = this.packTemplateVariables(this.tv)
		if (this.templateVariables !== this.parseCampaign.get('templateVariables'))  this.parseCampaign.set('templateVariables', this.templateVariables)
	
	}
	save() {
		this.packCard()
		return this.parseCard.save()
	}

	resetCard( vendor:Parse.Object, title:string, order:number ) {
		this.vendor = vendor
		this.html = ""
		this.active = false
		this.notiStatus = 'off'
		this.schedulerActive = false
		this.order = order
		this.title = title
	}

	/* unpackTemplateVariables( templateVariables?:TemplateVariable[]) : KeyValues {
		var tv:any ={};
		if (Array.isArray(templateVariables)) {
			templateVariables.forEach( t => tv[t.name] = t.value )
		} 
		return tv;
	} */
	// @TODO
	/* packTemplateVariables( tv: KeyValues ) :TemplateVariable[] {
		return []
	} */


	/* Library Functions */
	getOnlyTime(parseColumn:string) {
		var d=this.parseCampaign.get(parseColumn);
		if (d) {
			return this.zeroPad(d.getHours())+":"+this.zeroPad(d.getMinutes());
		}else{
			return "";
		}
	}
	zeroPad(n:number) { return (n<10 ? "0"+n : ""+n) }
	templateVariableFind(key:string) {
		if (Array.isArray(this.templateVariables)) {
			let tv = this.templateVariables.find( t => t.name === key )
			if (tv) return tv.value;
		} 
	}
	templateVariableSet(key:string, value?:string) {
		if (Array.isArray(this.templateVariables)) {
			let tv = this.templateVariables.find( t => t.name === key )
			if (tv) tv.value = value;
		} 
	}

	/* initialise a new template just added to a card */
	async resetCardsTemplateVariables() {
		var template:Parse.Object = this.parseCampaign.get("template");
		const tmpl = await template.fetch();
		var from = tmpl.get('variables');
		this.templateVariables = this.copyTemplateVars(from);
	}
	
	copyTemplateVars( from : TemplateVariable[] ): TemplateVariable[] {
		return from.map(tv => ({
			name: tv.name,
			type: tv.type,
			value: (tv.value ? tv.value : ""),
		}))
	}

	/* init default template Variables for a brand new Campaign from a CardTemplate */
	// defaultTemplateVariables( cardTemplate ) {
	// 	var to = this.get('templateVariables');
	// 	var from = cardTemplate.get('variables');
	// 	if (!to) to = [];
	
	// 	for (n=0; n<from.length; n++) {
	// 	var newName = from[n].name;
	// 	var found=false;
	// 	for (m=0; m<to.length; m++) {
	// 		if (to[m].name == newName) {found=true; break;}
	// 	}
	// 	if (found==false) to.push( {
	// 		name: newName,
	// 		type: from[n].type,
	// 		value: ""
	// 	} );
	// 	}
	// 	this.set('templateVariables', to);
	// }

	/* take the template and Campaign Variables and create the card HTML, returning it */
	async compileTemplate(cardTemplate:Parse.Object, variables:TemplateVariable[]) {
		var replacements :any = {};
		console.log('compiling template');
		const vend = await this.vendor.fetch();
		
		variables.forEach(variable => replacements[variable.name] = variable.value )
		replacements['vendorid'] = this.vendor.id;
		replacements['vendor'] = vend.get("businessName");
		
		const ctemplate = await cardTemplate.fetch();
		
		/* Use lodash template function to create the card html */
		_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
		var compiled = _.template(ctemplate.get('html'));
		var html = compiled(replacements);
		return (html);
	}

	calculateType() {
		if (this.template) return "templated";
		else return "simple";
	}

}

