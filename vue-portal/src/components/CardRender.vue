<template>
<div>
	<div v-if="showIframe" class="iframe-wrap" :style="wrapStyle">
		<iframe ref="iframeRef" src="about:blank" :width="iWidth +'px'" :height="iHeight +'px'"
			:style="iframeStyle"
			:srcdoc="getIframeSrcdoc">
		</iframe>
		<div v-if="clickable" @click="onClick"
			style="position:absolute; height:100%; width:100%; bottom:0; right:0; background:'0000';"></div>
		
	</div>
	<!-- <p>{{html.substring(0,15)}}</p> -->
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import ParseService, { Vendor } from '@/parse-service';
import Card from '@/class/Card';

@Component
export default class CardRender extends Vue {
	@Prop() myWidth!: number
	@Prop() myHeight!: number
	//@Prop() card!: Card
	@Prop() html!: string
	@Prop({default: true}) scrollbar!: boolean
	@Prop({default:false}) clickable!: boolean

	publicPath = process.env.BASE_URL || ""
	showIframe = true
	iWidth: number = 375  /* Pixel width of the example phone to replicate */

	updated() {
		// Vue.nextTick( () => {
		// 	this.updateIframe( this.html );
		// });
	}

	get iframeStyle() {
		return {
			transform: "scale("+this.myScale+")",
			transformOrigin: "0 0",
		};
	}
	get wrapStyle() {
		return {
			margin: 'auto',
			width: this.myWidth +'px',
			height: this.myHeight +'px', 
			maxHeight: this.myHeight +'px',
			position: 'relative',
		}
	}
	get iHeight() {
		return this.myHeight / this.myScale;
	}
	get myScale() {
		return this.myWidth / this.iWidth ;
	}
	onClick() {
		console.log("Card render click")
		this.$emit('click')
	}

	//@Watch('html')
	updateIframe( html:string ) {
		let iframe = this.$refs.iframeRef as HTMLIFrameElement
		if (iframe) {
			// @ts-ignore
			var iframedoc = iframe.document;
			if (iframe.contentDocument)  iframedoc = iframe.contentDocument;
			else if (iframe.contentWindow)  iframedoc = iframe.contentWindow.document;
			if (iframedoc){
				console.log("redrawing iframe doc")
				iframedoc.open();
				//iframedoc.writeln( this.htmlHead + html + this.htmlFoot );
				iframedoc.writeln( this.buildCardHtml(html, this.publicPath, this.scrollbar) );
				iframedoc.close();
			}
		}
	}

	get getIframeSrcdoc() {
		return this.buildCardHtml(this.html, this.publicPath, this.scrollbar);
	}
	
	buildCardHtml( html:string, publicPath:string, scrollbar: boolean) {
		return `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
					<link href="${publicPath}ionic.css" rel="stylesheet">
				<style>
					html,body { overflow: ${scrollbar ? 'auto' : 'hidden'}; }
				</style>
			</head>
			<body ng-app="lunchalert">
				<ion-nav-view>
					${html}
				</ion-nav-view>
			</body>
			</html>
		`
	}
}
</script>

