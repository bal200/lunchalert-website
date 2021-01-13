<template>
	<div>
		<div class="dropdown">
			<!-- <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Dropdown button
			</button> -->
			 <!-- @blur="inputBlured" -->
			<b-form-input v-model="inputBox" @keydown="inputChanged" 
					list="vendor-dropdown" :placeholder="placeholder">
			</b-form-input>
			<div class="dropdown-menu" :class="{'show':showDropdown}">
				<button class="dropdown-item" v-for="vendor in vendorResults" :key="vendor.id" 
						@click="selectItem(vendor)">{{vendor.businessName}}</button>
			</div>
		</div>
		<!-- <datalist id="vendor-dropdown">
			<option v-for="vendor in vendorResults" :key="vendor.id" :value="vendor.id">{{ vendor.businessName }}</option>
		</datalist> -->
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ParseService, { Vendor } from '@/parse-service';

@Component
export default class VendorChooser extends Vue {
	@Prop() public placeholder!: string;

	inputBox: string =""
	showDropdown: boolean = false;
	vendorResults: Vendor[] = []
	selected?: Vendor

	mounted() {}

	inputChanged( event:any ) {
		if (this.inputBox && this.inputBox.length>=3) {
			this.searchVendors(this.inputBox)
		}
	}
	searchVendors( searchText:string ) {
		//let user = ParseService.getSelectedUser();
		ParseService.searchVendors( searchText ).then(response => {
			console.log("searchVendors ", response)
			this.vendorResults = response
			this.showDropdown = true
		})
	}
	selectItem(vendor:Vendor) {
		console.log("selectVendor ", vendor)
		this.showDropdown = false
		this.selected = vendor
		this.inputBox = "" //vendor.businessName
		this.$emit("change", vendor)
	}
	inputBlured( event:any ) {
		console.log("inputBlured ", event)
		this.showDropdown = false
	}

	
}
</script>



<style lang="scss">
</style>
