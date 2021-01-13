<template>
	<div class="container">
		<h1>Customer Map</h1>
		
		<MapComponent v-if="!loading" :heatmap="installs" />

	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
// @ is an alias to /src
import MapComponent from '@/components/MapComponent.vue'
import ParseService, {Install} from '../parse-service'

@Component({
	components: {MapComponent}
})
export default class MapPage extends Vue {
	@Prop() private msg!: string
	private parseService = ParseService
	loading = false
	installs: Install[] = []
	markers: {lng:number, lat:number}[] = []

	created() {
		this.getCustomers()
	}
	
	getCustomers() {
		let userId = ParseService.swmId;
		ParseService.loadInstalls(userId).then(response => {
			console.log("loadInstalls ", response)
			this.installs = response
		})
		.catch((error:any) => {
			if (error.code == 1) this.$router.push('/login'); 
		})
		.finally(() => this.loading=false )
	}

	@Watch('parseService.swmId')
	vendorChanged(swmId:string) {
		console.log("vendorc?Hanged ", swmId)
		this.loading = true
		this.getCustomers()
	}

	// this.markers = this.installs.map( ins => {
	// 	return (ins && ins.coords) ? {
	// 		lat: ins.coords.latitude,
	// 		lng: ins.coords.longitude,
	// 	} : {lat:0,lng:0}
	// })

}
</script>
