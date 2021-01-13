<template>
	<div class="container">
		<h1>Login</h1>
		<div class="row mt-5">
		<form class="offset-sm-3 col-sm-6 card">
			<div class="card-body">
				<h5 class="card-title">Login to the LunchAlert Portal</h5>
				<div class="form-group">
					<label for="userName1">Email address</label>
					<input type="email" class="form-control" id="userName1" v-model="username">
					<small class="form-text text-muted"></small>
				</div>
				<div class="form-group">
					<label for="passwordInput1">Password</label>
					<input type="password" class="form-control" id="passwordInput1" v-model="password">
				</div>
				<div v-if="errorMessage" class="alert alert-danger" role="alert">{{errorMessage}}</div>

				<button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
			</div>
		</form>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ParseService from '../parse-service'
//import {parse} from 'parse'
//var Parse = require('parse')

@Component
export default class LoginPage extends Vue {
	@Prop() private msg!: string
	
	username: string =""
	password: string =""
	errorMessage: string = "";

	created() {
	}

	login() {
		this.errorMessage = "";
		ParseService.login(this.username, this.password)
		.then( (user:any) => {
			console.log('Login success! ', user)
			//ParseService.setLoggedIn();
			this.$router.push('/')
		})
		.catch( (err:any) => {
			console.log('Login failed: '+err.code +" "+ err.message)
			//if (err.code==101) {
				this.errorMessage =err.message;
			//}
		});
		
		// var user = $scope.user;
		// Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
		// 	success: function(user) {
		// 		$rootScope.user = user;
		// 		$rootScope.isLoggedIn = true;
		// 		$location.path("/portal");
		// 		$scope.$apply();
		// 	},
		// 	error: function(user, err) {
		// 		// The login failed. Check error to see why.
		// 		$scope.error.message = err.message;
		// 		console.log('Login failed: '+err.code +" "+ err.message);
		// 		$scope.$apply();
		// 	}
		// });
		// return false;
	};

	// $scope.logout = function() {
	// 	Parse.User.logOut();
	// 	$rootScope.user = null;
	// 	$rootScope.isLoggedIn = false;
	// 	$location.path('/');
	// };

	
}
</script>
