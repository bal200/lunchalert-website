<template>
	<div class="container">
		<h1>Cards</h1>
		<div v-if="loading">loading...</div>
		<div v-else>

			<p>Active and Future Cards</p>
			<div class="list-group">
				<a v-for="card in activeCards" :key="card.id" click.prevent.stop href=""
						class="list-group-item list-group-item-action">
					<div class="media">
						<CardPreview :html="card.html" :card="card" :scrollbar="false" myWidth="150" myHeight="100" class="mr-3" />
						<div class="media-body">
							<h5 class="mt-0">
								{{card.title}}
								<small><span class="badge badge-success">{{statusBadge(card)}}</span></small>
								<small><i> {{card.order}}</i></small>
							</h5>
							<!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> -->
							<div class="mt-2">
								<div class="btn-group btn-group-toggle mr-2">
									<label class="btn btn-secondary btn-sm active">
										<input type="radio" name="options" id="option1" autocomplete="off" checked> On
									</label>
									<label class="btn btn-secondary btn-sm">
										<input type="radio" name="options" id="option2" autocomplete="off"> Off
									</label>
									<label class="btn btn-secondary btn-sm">
										<input type="radio" name="options" id="option3" autocomplete="off"> Scheduled
									</label>
								</div>
								
								<button type="button" class="btn btn-primary btn-sm mr-2">Edit</button>
								<button type="button" class="btn btn-secondary btn-sm">Run again</button>
							</div>
							<form class="mt-2">
								<div class="row">
									<div class="col">
										<input type="text" class="form-control" placeholder="Start Date">
									</div>
									<div class="col">
										<input type="text" class="form-control" placeholder="End Date">
									</div>
								</div>
							</form>
						</div>
					</div>

				<!-- <div class="d-flex w-100 justify-content-between">
					<h5 class="mb-1">{{card.comment}}</h5>
					<small>{{card.active}}</small>
				</div>
				<p class="mb-1">Donec</small> -->
				
				</a>
			</div>


			<!-- <div v-for="card in activeCards" :key="card.id">
				<p>{{card.id}} - {{card.comment}} - {{card.active}}</p>
				<CardPreview :html="card.html" :card="card" :scrollbar="false"
						myWidth="150" myHeight="100" />
			</div> -->
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
	statusBadge(card:Card) {
		if (card.active) return "active";
		if (card.schedulerActive && !card.active) return "scheduled";
		if (!card.active) return "off";
		else return "";
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
