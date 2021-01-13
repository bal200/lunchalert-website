import Parse from 'parse';

export default class Van {
	constructor( public p:Parse.Object ) {
		this.unpack()
	}
	editing:boolean=false

	id!: string
	name!: string
	vanId!: string
	archive!: boolean
	updatedAt!: Date

	get vanIdCropped():string { return this.vanId.substr(0,5) }

	get activeDaysAgo() {
		return this.differenceInDays( new Date(), this.updatedAt);
	}
	get lastActiveString() {
		return this.updatedAt.toDateString()
	}

	unpack() {
		this.id = this.p.id
		this.name = this.p.get('name')
		this.vanId = this.p.get('vanId')
		this.archive = this.p.get('archive')
		this.updatedAt = this.p.get('updatedAt')
	}
	pack() {
		if (this.name !== this.p.get('name'))  this.p.set('name', this.name);
		if (this.vanId !== this.p.get('vanId'))  this.p.set('vanId', this.vanId)
		if (this.archive !== this.p.get('archive'))  this.p.set('archive', this.archive)
		if (this.updatedAt !== this.p.get('updatedAt'))  this.p.set('updatedAt', this.updatedAt)
	}
	save() {
		this.pack()
		return this.p.save()
	}


	/* Work out the difference in days between two dates */
	private differenceInDays(firstDate:Date, secondDate:Date) {
		var millisecondsPerDay = 1000 * 60 * 60 * 24;
		var millisBetween = firstDate.getTime() - secondDate.getTime();
		var days = millisBetween / millisecondsPerDay;
		return Math.floor(days);
	};

}

// Parse.Object.registerSubclass('Van', Van);

