<template>
	<div id="app">
		<b-navbar toggleable="md" class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">LunchAlert</a>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<ul class="navbar-nav mr-auto">
					<li v-if="loggedIn" class="nav-item">
						<router-link to="/" class="nav-link">Home </router-link> 
					</li>
					<li v-if="!loggedIn" class="nav-item">
						<router-link to="/login" class="nav-link">Login</router-link>
					</li>
					<li v-if="loggedIn" class="nav-item">
						<router-link to="/map" class="nav-link">Map</router-link>
					</li>
					<li v-if="loggedIn" class="nav-item">
						<router-link to="/cards" class="nav-link">Cards</router-link>
					</li>
					<li v-if="loggedIn" class="nav-item">
						<router-link to="/vans" class="nav-link">Vans</router-link>
					</li>
				</ul>
				<!-- Right aligned nav items -->
      		<ul v-if="loggedIn" class="navbar-nav ml-auto">
					<!-- <b-nav-form v-if="isAdmin" > -->
						<!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
						<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->

						<!-- <VendorChooser placeholder="act as vendor" @change="vendorChange"></VendorChooser>
					</b-nav-form> -->
					<!-- <li class="nav-item">
						<a class="nav-link" href="#">{{userName}}</a>
					</li> -->
					<b-nav-item-dropdown :text="userName" right>
						<b-dropdown-item to="/profile">Profile</b-dropdown-item>
						<b-dropdown-item @click="logout">Log Out</b-dropdown-item>
						<div class="dropdown-divider"></div>
						<b-nav-form v-if="isAdmin" >
							<VendorChooser placeholder="impersonate vendor" @change="vendorChange"></VendorChooser>
						</b-nav-form>
					</b-nav-item-dropdown>
				</ul>

			</b-collapse>

		</b-navbar>
		<router-view/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VendorChooser from '@/components/VendorChooser.vue'
import ParseService, { Vendor } from './parse-service'

@Component({components:{VendorChooser}})
export default class App extends Vue {
	public parseService = ParseService

	created() {
		if (!this.parseService.loggedIn) this.$router.push('/login')
	}

	vendorChange(vendor:Vendor) {
		ParseService.changeVendor(vendor)
	}
	get userName() {
		return this.parseService.swmName
	}
	get loggedIn() {
		return this.parseService.loggedIn
	}
	get isAdmin() {
		return this.parseService.isAdmin
	}
	logout() {
		this.parseService.logout()
		.then(() => {
			this.$router.push("/login")
		})
	}
	
}
</script>


<style lang="scss">
#app {
	$lunchalert-red: #b91a15;

	//font-family: Avenir, Helvetica, Arial, sans-serif;
	//-webkit-font-smoothing: antialiased;
	//-moz-osx-font-smoothing: grayscale;
	//text-align: center;
	//color: #2c3e50;

	h1 {
		color: $lunchalert-red;
	}
}

// #nav {
// 	padding: 30px;

// 	a {
// 		font-weight: bold;
// 		color: #2c3e50;

// 		&.router-link-exact-active {
// 			color: #42b983;
// 		}
// 	}
// }
</style>
