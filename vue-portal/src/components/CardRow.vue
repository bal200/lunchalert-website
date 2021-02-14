<template>
	<div class="list-group-item list-group-item-action">
		<div class="media">
			<CardRender :html="card.html" :scrollbar="false" myWidth="150" myHeight="100"
				class="mr-3" :clickable="true" @click="cardClick" ></CardRender>
			<div class="media-body">
				<div class="d-flex w-100 justify-content-between align-items-start">
					<h5 class="mb-1">
						{{card.title}}
						<small><span class="badge badge-success">{{statusBadge(card)}}</span></small>
						<small><i> {{card.order}} - {{card.notiStatus}}</i></small>
					</h5>
					<div class="btn-group btn-group-toggle" @click.stop>
						<label class="btn btn-light btn-sm" :class="{'active': isOn}">
							<input type="radio" :name="'rad-'+card.id" value="on" :checked="isOn" @change="turn('on')" autocomplete="off"> On
						</label>
						<label class="btn btn-light btn-sm" :class="{'active': isOff}">
							<input type="radio" :name="'rad-'+card.id" value="off" :checked="isOff" @change="turn('off')" autocomplete="off"> Off
						</label>
						<label class="btn btn-light btn-sm" :class="{'active': isScheduled}">
							<input type="radio" :name="'rad-'+card.id" value="scheduled" :checked="isScheduled" @change="turn('scheduled')" autocomplete="off"> Scheduled
						</label>
					</div>
				</div>
				<!-- <h5 class="mt-0">
					{{card.title}}
					<small><span class="badge badge-success">{{statusBadge(card)}}</span></small>
					<small><i> {{card.order}} - {{card.notiStatus}}</i></small>
				</h5> -->
				<div class="mt-2">
					<button @click="editClick" type="button" class="btn btn-primary btn-sm mr-2">Edit</button>
					<button v-if="past" type="button" class="btn btn-secondary btn-sm mr-2">Run again</button>
				</div>
				<form v-if="card.schedulerActive" class="mt-2">
					<div class="row">
						<div class="col">
							<input v-model="card.startDate" type="text" class="form-control" placeholder="Start Date">
						</div>
						<div class="col">
							<input v-model="card.endDate" type="text" class="form-control" placeholder="End Date">
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
	
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import state from '../store/store'
import ParseService, {Install} from '../parse-service'
import Card from '../class/Card'

import CardRender from '../components/CardRender.vue'

@Component({
	components: {
		CardRender,
	}
})
export default class CardRow extends Vue {
	@Prop() private card!: Card
	@Prop({default: true}) past!: boolean

	get isOn() {
		return !this.card.schedulerActive && this.card.active
	}
	get isOff() {
		return !this.card.schedulerActive && !this.card.active
	}
	get isScheduled() {
		return this.card.schedulerActive
	}
	turn(state:string) {
		console.log("turn ", state)
		if (state=='on') {this.card.active = true; this.card.schedulerActive = false; }
		if (state=='off') {this.card.active = false; this.card.schedulerActive = false; }
		if (state=='scheduled') this.card.schedulerActive = true;
	}

	statusBadge(card:Card) {
		if (card.active) return "active";
		if (card.schedulerActive && !card.active) return "scheduled";
		if (!card.active) return "off";
		else return "";
	}

	cardClick() {
		this.$emit('preview-card', this.card)
	}
	editClick() {
		state.cardInEdit = this.card
		this.$router.push(`card/${this.card.id}`)
	}


}
</script>
