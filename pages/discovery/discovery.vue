<template>
	<view class="page-body">
		<view class="page-section page-section-gap"><map style="width: 100%; height: 1320rpx;" :latitude="latitude" :longitude="longitude" :markers="covers"></map></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '百益信科技',
			latitude: 37.56382,
			longitude: 121.18263,
			covers: [
				{
					title:'百益信环保科技有限公司',
					latitude: 37.56382,
					longitude: 121.18263,
					iconPath: '/static/postion_marker.png'
				}
			]
		};
	},
	methods: {}
};
</script>

<style></style>
