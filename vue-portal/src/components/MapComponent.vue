<template>
	<div class="mapcomponent"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import gmapsInit from './google-maps-init'
import { Install } from '@/parse-service';
//import google from 'googlemaps'

const locations = [{
	position: {lat: 48.160910, lng: 16.383330 },
},{
	position: {lat: 48.174270, lng: 16.329620 },
}];

@Component
export default class MapComponent extends Vue {
	@Prop() private markers!: object[];
	@Prop() private heatmap!: Install[];

	google: any;
	map?: any; //google.maps.Map
	gMarkers?: any;
	gHeatmap?: any;

	mounted() {
		gmapsInit().then(google => {
   	   console.log("gmaps loaded! ", google)
			this.google = google
			var startPoint = {lat: 53.6, lng: -2};
			this.map = new this.google.maps.Map(this.$el, {zoom: 8, center: startPoint});
			if (this.heatmap) this.heatmapChange(this.heatmap)
		})
		.catch(error => {
			console.log("gmaps init error ", error)
		})
	}
	@Watch('heatmap')
	heatmapChange( heatmap: Install[] ) {
		if (!heatmap) return;
		let heatmapData:any[] = []
		heatmap.forEach(pin => {
			if (pin && pin.coords)
				heatmapData.push( new this.google.maps.LatLng(pin.coords.latitude, pin.coords.longitude) );
		});
		this.gHeatmap = new this.google.maps.visualization.HeatmapLayer({
			data: heatmapData,
			dissipating: true,
			radius: 25,
			map: this.map,
		});
	}

	@Watch('markers')
	markersChange(newVal:object[], oldVal:object[]) {
		if (!newVal) return;
		console.log("change", newVal)
		this.gMarkers = newVal.map(x => {
			return new this.google.maps.Marker({position: x, map: this.map})
		})
	}
	
}
</script>



<style lang="scss">
  .mapcomponent {
	  height: 500px;
  }
</style>
