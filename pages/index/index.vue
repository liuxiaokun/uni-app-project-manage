<template>
	<view>
		<swiper class="swi" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#2d8cf0">
			<swiper-item>
				<image src="../../static/swiper/1.png" class="img"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/swiper/2.png" class="img"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/swiper/3.png" class="img"></image>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style>
.img{
	width: 100%;
	height: 100%;
}
.swi{
	height: 200px;
}
</style>
