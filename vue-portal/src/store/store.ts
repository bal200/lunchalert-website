import Vue from 'vue';
import Card from '@/class/Card';

const state = Vue.observable({ // this is the magic
	cardInEdit: undefined,
} as {
	cardInEdit?: Card
});

export default state
