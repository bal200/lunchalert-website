import Parse from 'parse';

type TemplateVariable={
	name: string
	type: string
	value: string
}

export default class Card {
	constructor( public parseCard:Parse.Object ) {
		this.unpackCard()
	}
	public parseCampaign!:Parse.Object

	id!: string /* card id */
	vendor!: Parse.Object
	title!: string
	html!: string
	active!: string
	order!: boolean
	//schedulerOn!: boolean

	comment!: string
	repeat!: string
	startDate!: Date
	startTime!: string
	endDate!: Date
	endTime!: string
	schedulerActive!: boolean
	template!: Parse.Object
	
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
		this.type = this.calculateType()
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
		this.template = this.parseCampaign.get('template')
		this.type = this.calculateType()
	}
	packCampaign() {
		if (this.comment !== this.parseCampaign.get('comment'))  this.parseCampaign.set('comment', this.comment);
		if (this.repeat !== this.parseCampaign.get('repeat'))  this.parseCampaign.set('repeat', this.repeat)
		if (this.startDate !== this.parseCampaign.get('startDate'))  this.parseCampaign.set('startDate', this.startDate)
		if (this.endDate !== this.parseCampaign.get('endDate'))  this.parseCampaign.set('endDate', this.endDate)
		if (this.schedulerActive !== this.parseCampaign.get('active'))  this.parseCampaign.set('active', this.schedulerActive)
		if (this.template !== this.parseCampaign.get('template'))  this.parseCampaign.set('template', this.template)
	}
	save() {
		this.packCard()
		return this.parseCard.save()
	}


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
	templateVariableFind(tv:TemplateVariable[], search:string) {
		if (Array.isArray(tv)) {
			for (var n=0; n<tv.length; n++) {
				if (tv[n].name == search) return tv[n];
			}
		} else {
			return '';
		}
	}
	calculateType() {
		if (this.template) return "templated";
		else return "simple";
	}

}

