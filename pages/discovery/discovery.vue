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
					iconPath: '/static/location/postion_marker.png'
				}
			]
		};
	},
	
	onLoad() {
		this.loadCurrentLocation();
	},
	
	methods: {
		loadCurrentLocation() {
			uni.getLocation({
			    type: 'wgs84',
			    success: (res) => {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					
					this.covers.push({
						title:'我的位置',
						latitude: res.latitude,
						longitude: res.longitude,
						iconPath: '/static/location/my_position.png'
					})
			    }
			});
		}
	}
};
</script>

<style></style>
