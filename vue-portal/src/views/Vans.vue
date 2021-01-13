<template>
<div class="container">
	<h1>Your Driver Activity</h1>	

	<p>Monitor driver activity on a daily basis using our at a glance status board 
		for your van fleet.</p>
	<table class="table" v-if="!loading">
		<thead class="thead-light">
			<tr><th>{{activeVans.length}} drivers</th>
			<th>{{countActiveToday}} active today</th></tr>
		</thead>
	</table>

	<table class="table table-hover" v-if="!loading">
		<thead class="thead-light">
			<tr>
				<th scope="col">Name</th>
				<th scope="col">Last Active</th>
				<th scope="col">Van ID</th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="van in activeVans" :class="getRowClass(van)" :key="van.id">
				<td v-if="van.editing">
					<input type="text" v-model="vanEditBox" @keyup.enter="endEditing" @keydown.esc="cancelEditing"
						@blur="cancelEditing" class="form-control" />
				</td>
				<td v-else>
					{{ van.name }}
					<a class="text-muted" @click.prevent="startEditing(van);" href=""><small>[edit]</small></a>
				</td>
				<!-- style="font-size: small; color: #BBB; text-decoration: underline;"  -->
				<td>{{ van.lastActiveString }}</td>
				<td>{{ van.vanIdCropped }}</td>
				<td><a class="text-muted" @click.prevent="archive(van);" href=""><small>[archive]</small></a></td>
			</tr>
		</tbody>
	</table>
	<a v-if="!loading && !showArchived" class="text-muted mt-5" @click.prevent="showArchived = true" href=""><small>see archived vans</small></a>
	<table class="table table-hover mt-5" v-if="!loading && showArchived">
		<thead class="thead-light">
			<tr>
				<th scope="col">Archived Name</th>
				<th scope="col">Last Active</th>
				<th scope="col">Van ID</th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="van in archivedVans" :key="van.id">
				<td v-if="van.editing">
					<input type="text" v-model="vanEditBox" @keyup.enter="endEditing" @keydown.esc="cancelEditing"
						@blur="cancelEditing" class="form-control" />
				</td>
				<td v-else>
					{{ van.name }}
					<a class="text-muted" @click.prevent="startEditing(van);" href="">[edit]</a>
				</td>
				<td>{{ van.lastActiveString }}</td>
				<td>{{ van.vanIdCropped }}</td>
				<td><a class="text-muted" @click.prevent="unarchive(van);" href=""><small>[re-instate]</small></a></td>
			</tr>
		</tbody>
	</table>
	<p v-if="loading">loading...</p>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator'
import ParseService from '../parse-service'
import Van from '@/class/Van'

@Component({
	components: {}
})
export default class VansPage extends Vue {
	// @Prop() private msg!: string
	private parseService = ParseService
	loading: boolean = true
	vans: Van[] = []
	vanInEdit?: Van 
	vanEditBox: string=''
	showArchived = false

	created() {
		this.loadVanList();
	}
	
	loadVanList() {
		let userId = ParseService.swmId;
		ParseService.loadVanList(userId).then((response:Parse.Object[]) => {
			console.log("parse vans ", response)
			this.vans = response.map(v => {
				let newVan = new Van(v)
				//Object.assign(newVan, v)
				console.log("newVan ", newVan)
				return newVan
			})
			// console.log("vans ", this.vans)
		})
		.catch((error:any) => {
			if (error.code == 1) this.$router.push('/login'); 
		})
		.finally(() => this.loading=false )
	}
	getRowClass(van:Van) {
		if(van.activeDaysAgo < 2) return 'table-success';
		else if(van.activeDaysAgo <= 4) return 'table-warning';
		else return 'table-danger';
	}

	get activeVans() {
		return this.dateSort(this.vans.filter(v => !v.archive) )
	}
	get archivedVans() {
		return this.dateSort( this.vans.filter(v => v.archive) )
	}
	dateSort(v:Van[]) {
		return v.sort( (a,b) => {
			if (a.updatedAt > b.updatedAt) return -1;
			if (a.updatedAt < b.updatedAt) return  1;
			return 0;
		})
	}

	get countActiveToday() :number {
		return this.vans.reduce( (count, v) => (v.activeDaysAgo < 2 ? ++count : count), 0 )
	}
	startEditing(van:any) {
		console.log("startEditing ", van)
		if (this.vanInEdit) return
		van.editing = true
		this.vanInEdit = van
		this.vanEditBox = van.name
	}
	endEditing() {
		console.log("endEditing ")
		if (this.vanInEdit) {
			let van = this.vanInEdit;
			this.vanInEdit.name = this.vanEditBox
			this.vanInEdit.editing = false
			this.vanInEdit = undefined
			van.save().then((result:any) => { console.log("van edit success", result) })
				.catch((error:any) => { console.log("van edit ERROR", error) });
		}
	}
	cancelEditing() {
		console.log("cancelEditing ")
		if (this.vanInEdit) {
			this.vanInEdit.editing = false
			this.vanInEdit = undefined
		}
	}
	archive(van:Van) {
		van.archive = true;
		van.save()
		.then((result:any) => {
			console.log("archive success", result);
		})
		.catch((error:any) => {
			console.log("archive error", error);
		});
	}
	unarchive(van:Van) {
		van.archive = false;
		van.save()
		.then((result:any) => {
			console.log("un archive success", result);
		})
		.catch((error:any) => {
			console.log("un archive error", error);
		});
	}
	
	/* Work out the difference in days between two dates */
	differenceInDays(firstDate:Date, secondDate:Date) {
	 	//var dt1 = firstdate.split('/'),
			//  dt2 = seconddate.split('/'),
			//  one = new Date(dt1[2], dt1[1]-1, dt1[0]),
			//  two = new Date(dt2[2], dt2[1]-1, dt2[0]);
		var millisecondsPerDay = 1000 * 60 * 60 * 24;
		var millisBetween = firstDate.getTime() - secondDate.getTime();
		var days = millisBetween / millisecondsPerDay;
		return Math.floor(days);
	};


	@Watch('parseService.swmId')
	vendorChanged(swmId:string) {
		this.loading = true
		this.loadVanList()
	}

	
}
</script>
