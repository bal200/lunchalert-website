import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePage from '../views/Home.vue'
import LoginPage from '../views/Login.vue'
import MapPage from '../views/Map.vue'
import VansPage from '../views/Vans.vue'
import CardsPage from '../views/CardsPage.vue'
import ProfilePage from '../views/Profile.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: HomePage
	},{
		path: '/login',
		name: 'Login',
		component: LoginPage,
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		//component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},{
		path: '/map',
		name: 'Map',
		component: MapPage,
	},{
		path: '/cards',
		name: 'Cards',
		component: CardsPage,
	},{
		path: '/vans',
		name: 'Vans',
		component: VansPage,
	},{
		path: '/profile',
		name: 'Profile',
		component: ProfilePage,
	}
]

const router = new VueRouter({
	routes
})

export default router
