<template>
	<div class="container">
		<div class="d-flex w-100 justify-content-between align-items-start">
			<h1>Cards</h1>
			<button @click="addCard" class="btn btn-primary">Add Card</button>
		</div>
		<div v-if="loading">loading...</div>
		<div v-else>

			<h4 v-if="activeCards">Active and Future Cards</h4>
			<div v-if="activeCards" class="list-group">
				<CardRow v-for="card in activeCards" :key="card.id" :card="card" 
					@preview-card="previewCard">
				</CardRow>
			</div>

			<h4 v-if="pastCards">Past Cards</h4>
			<div v-if="pastCards" class="list-group">
				<CardRow v-for="card in pastCards" :key="card.id" :card="card" :past="true"
					@preview-card="previewCard">
				</CardRow>
			</div>

			<!-- <div v-for="card in pastCards" :key="card.id">
				<p>{{card.id}} - {{card.comment}} - {{card.active}}</p>
				<CardRender :html="card.html" :card="card" :scrollbar="false"
						myWidth="150" myHeight="100" />
			</div> -->

		</div>
		<b-modal v-model="showModal" :title="showModalCard.title +' preview'">
			<CardRender :html="showModalCard.html" :clickable="false" :scrollbar="true" 
				myWidth="320" myHeight="420">
			</CardRender>
		</b-modal>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import state from '../store/store'
import ParseService, {Install} from '../parse-service'
import Card from '../class/Card'

import CardRender from '../components/CardRender.vue'
import CardRow from '../components/CardRow.vue'

@Component({
	components: {
		CardRender,
		CardRow,
	}
})
export default class CardsPage extends Vue {
	//@Prop() private msg!: string
	
	private parseService = ParseService
	loading = false
	showModal = false /* the card preview modal open or closed */
	showModalCard:any = {html: ''};
	cards:Card[] = []

	created() {
		this.loadCards();
	}

	get activeCards() {
		return this.cards.filter( card => card.active )
	}
	get pastCards() {
		return this.cards.filter( card => !card.active )
	}
	
	loadCards() {
		let user = ParseService.swm;
		this.loading=true;
		ParseService.loadCardsAndCampaigns(user.id).then(result => {
			console.log("Retrieved cards and campaigns", result)

			this.cards = result.cards.map(c => new Card(c) )
			this.linkCardsToCampaigns(this.cards, result.campaigns)
			console.log("cards: ", this.cards)
		})
		.catch(err => console.log("Error retreiving cards and campaigns ("+err.code+") "+err.message))
		.finally(() => this.loading=false)

	};

	linkCardsToCampaigns(cards:Card[], campaigns:Parse.Object[]) {
		for (var n=0; n<campaigns.length; n++) {
			for (var m=0; m<cards.length; m++) {
				if (campaigns[n].get('card').id == cards[m].id) {
					cards[m].linkCampaign( campaigns[n] )
	} } } }

	previewCard(card:Card) {
		console.log("previewCard")
		//this.$set(this, 'showModalCard', card)
		this.showModalCard = card
		this.showModal = true
	}

	addCard() {
		this.$router.push('card/0')
	}
	
	@Watch('parseService.swmId')
	vendorChanged(swmId:string) {
		this.loadCards()
	}
}
</script>
