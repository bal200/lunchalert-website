<template>
	<div class="container">
		<h1>Cards</h1>
		<div v-if="loading">loading...</div>
		<div v-else>
			<p>Active Cards</p>
			<div v-for="card in activeCards" :key="card.id">
				<p>{{card.id}} - {{card.comment}} - {{card.active}}</p>
				<CardPreview :html="card.html" :card="card" :scrollbar="false"
						myWidth="150" myHeight="100" />
			</div>
			<p>Past Cards</p>
			<div v-for="card in pastCards" :key="card.id">
				<p>{{card.id}} - {{card.comment}} - {{card.active}}</p>
				<CardPreview :html="card.html" :card="card" :scrollbar="false"
						myWidth="150" myHeight="100" />
			</div>

		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import ParseService, {Install} from '../parse-service'
import Card from '../class/Card'
import CardPreview from '../components/CardPreview.vue'

@Component({
	components: {
		CardPreview,
	}
})
export default class CardsPage extends Vue {
	//@Prop() private msg!: string
	
	private parseService = ParseService
	loading = false
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
			// unpackTemplateVariables($scope.cards);

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
	
	@Watch('parseService.swmId')
	vendorChanged(swmId:string) {
		this.loadCards()
	}
}
</script>
