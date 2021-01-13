<template>
<div class="container">
	<h1>Your Profile</h1>	
	<p>&nbsp;</p>

	<form class="mt-5">
		<div class="form-group row">
			<label for="i1" class="col-sm-3 col-form-label">Business Name</label>
			<div class="col-sm-9">
				<input type="text" :value="businessName" class="form-control" id="i1">
			</div>
		</div>
		<div class="form-group row">
			<label for="i2" class="col-sm-3 col-form-label">Tag line</label>
			<div class="col-sm-9">
				<input type="text" :value="tagLine" class="form-control" id="i2">
			</div>
		</div>
		<div class="form-group row">
			<label for="i3" class="col-sm-3 col-form-label">Password</label>
			<div class="col-sm-9">
				<button id="i3" class="btn btn-link">Change password</button>
			</div>
		</div>
		<div class="form-group row">
			<label for="i4" class="col-sm-3 col-form-label">Logo Icon</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" id="i4">
			</div>
		</div>

		<div class="form-group row">
			<div class="col-sm-10">
				<button type="submit" class="btn btn-primary">Save changes</button>
			</div>
		</div>
	</form>

	<p v-if="loading">loading...</p>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator'
import ParseService from '../parse-service'

@Component({
	components: {}
})
export default class ProfilePage extends Vue {
	// @Prop() private msg!: string
	private parseService = ParseService
	loading: boolean = false
	vans: any[] = []
	vanInEdit: any = null
	vanEditBox: string=''

	created() {
		//this.loadVanList();
	}
	
	loadVanList() {
		let userId = ParseService.swmId;
		// ParseService.getVanList(userId).then(response => {
		// 	console.log("getVanList ", response)
		// 	this.vans = response.map(v => {
		// 		v.editing = false
		// 		return v
		// 	})
		// })
		// .finally(() => this.loading=false )
	}
	get businessName() {
		return this.parseService.swm.get('businessName')
	}
	get tagLine() {
		return this.parseService.swm.get('tagLine')
	}
	get objectId() {
		return this.parseService.swmId
	}

	startEditing(van:any) {
		console.log("startEditing ", van)
		if (this.vanInEdit) return
		van.editing = true
		this.vanInEdit = van
		this.vanEditBox = van.get("name")
	}
	endEditing() {
		console.log("endEditing ")
		if (this.vanInEdit) {
			this.vanInEdit.editing = false
			this.vanInEdit = null
		}
	}
	cancelEditing() {
		console.log("cancelEditing ")
		if (this.vanInEdit) {
			this.vanInEdit.editing = false
			this.vanInEdit = null
		}
	}


	
}
</script>
