<template>
	<div class="container">
		<div class="d-flex w-100 justify-content-between align-items-start">
			<h1>Card Wizard</h1>
		</div>
		<div v-if="loading">loading...</div>
		
		<div v-else class="row">
			<div class="col-sm-6">
				<form>
					<section v-if="page==1">
						<h2>Customise the App Card</h2>
						<p>Think of a great catchy line about your offer. This needs to draw your 
							customer in so think catchy, clear, simple, and appealing.
						</p>
						<template v-for="(varb, i) in card.templateVariables">
							<div class="form-group" :key="varb.name">
								<label :for="'tvInput'+i">{{varb.name}}</label>
								
								<textarea v-if="varb.type=='text'" @input="redrawCard" class="form-control" 
									v-model="varb.value" placeholder="Enter text" rows="1" :id="'varb'+i">
								</textarea>
								
								<input v-if="varb.type=='file'" type="file" class="form-control-file"
									maxsize="120" accept="image/*" do-not-parse-if-oversize base-sixty-four-input
									@change="fileInputChange($event, varb)" :id="'varb'+i">

								<!-- <small class="form-text text-muted">small</small> -->
							</div>
						</template>
						<!-- <div class="form-group">
							<label for="exampleInputEmail1">Title</label>
							<input v-model="card.title" class="form-control" placeholder="Enter title" type="text">
							<small class="form-text text-muted">We'll never share your email with anyone else.</small>
						</div> -->
					</section>
					<div class="d-flex w-100 justify-content-between align-items-start mt-4">
						<div>
							<button class="btn">Cancel</button>
						</div>
						<div>
							<button class="btn btn-secondary mr-2">Back</button>
							<button class="btn btn-primary">Next</button>
						</div>
					</div>
				</form>
			</div>
			<div class="col-sm-6">
				<CardRender :html="card.html" :scrollbar="false" myWidth="300" myHeight="400"
					class="" :clickable="false" >
				</CardRender>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ParseService, {Install, ParseCampaign, ParseCard} from '../parse-service'
import Card, { TemplateVariable } from '../class/Card'
import state from '../store/store'

import CardRender from '../components/CardRender.vue'

@Component({
	components: {
		CardRender,
	}
})
export default class CardWizardPage extends Vue {
	//@Prop() card!: Card

	card: Card = new Card(new ParseCard());
	page: Number = 1
	private parseService = ParseService
	loading = true

	created() {
		var id = this.$route.params.id
		console.log("created() id = ", id);
		/* Editing card */
		if (state.cardInEdit && state.cardInEdit.id == this.$route.params.id) {
			this.card = state.cardInEdit;
			if (this.card.template && this.card.templateVariables) {
				this.card.compileTemplate(this.card.template, this.card.templateVariables)
				.then(html => {
					if (this.card) this.card.html = html;
					this.loading=false;
				});
			}
			
		} else console.log("Route card id is different to the one in State!");
		/* a New card, using a template */
		if (id=='0') {
			this.createNewCard().finally( () => this.loading=false )
		}
	}
	createNewCard() {
		//this.card = new Card( new ParseCard() );
		this.card.resetCard( this.parseService.swm, "", 1 )
		this.card.linkCampaign( new ParseCampaign() )
		return this.parseService.loadVendorsTemplate(this.parseService.swm)
		.then( template => {
			if (this.card) {
				this.card.parseCampaign.set('template', template);
				this.card.template = template
				this.card.resetCardsTemplateVariables().then( () => {
					console.log("card ",this.card)
					return this.redrawCard();
				})
			}
		})
	}

	loadCards() {
	/*	let user = ParseService.swm;
		this.loading=true;
		ParseService.loadCardsAndCampaigns(user.id).then(result => {
			console.log("Retrieved cards and campaigns", result)

			this.cards = result.cards.map(c => new Card(c) )
			this.linkCardsToCampaigns(this.cards, result.campaigns)
			console.log("cards: ", this.cards)
		})
		.catch(err => console.log("Error retreiving cards and campaigns ("+err.code+") "+err.message))
		.finally(() => this.loading=false) */
	};

	redrawCard() {
		if (this.card && this.card.template && this.card.templateVariables) {
			return this.card.compileTemplate(this.card.template, this.card.templateVariables)
			.then(html => {
				if (this.card) this.card.html = html;
			});
		}
	}

	fileInputChange($event:any, varb:TemplateVariable) {
		if ($event && $event.target && $event.target.files) {
			var file = $event.target.files[0] as File
			console.log("File ", file);
			this.fileToBase64( file ).then(str => {
				varb.value = str
				this.redrawCard()
			});
		}
	}

	fileToBase64(file:File) :Promise<string> {
   	return new Promise<string> ((resolve,reject)=> {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => (reader.result ? resolve(reader.result.toString()) : reject(new Error('rusult was undefined')) );
			reader.onerror = error => reject(error);
   	})
	}

	@Watch('parseService.swmId')
	vendorChanged(swmId:string) {
		//this.loadCards()
	}
}
</script>
