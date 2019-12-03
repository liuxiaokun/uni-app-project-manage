<template>
	<view>
		<swiper class="swi" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#2d8cf0">
			<swiper-item><image src="../../static/swiper/1.png" class="img"></image></swiper-item>
			<swiper-item><image src="../../static/swiper/2.png" class="img"></image></swiper-item>
			<swiper-item><image src="../../static/swiper/3.png" class="img"></image></swiper-item>
		</swiper>

		<scroll-view scroll-y="true">
			<block v-for="(item, index) in projectData" :key="index">
				<uni-card :title="item.name" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" :extra="item.remark" :note="item.codeGitUrl" is-shadow="true">
					{{ item.desc }}
				</uni-card>
			</block>
		</scroll-view>
	</view>
</template>

<script>
import {uniCard} from '@dcloudio/uni-ui';

export default {
	components:{
		uniCard
	},
	data() {
		return {
			projectData:[]
		};
	},
	onLoad() {
		this.loadProject()
	},

    onPullDownRefresh() {
		this.loadProject()
		console.log('load finish');
		uni.stopPullDownRefresh();
    },
	methods: {
		loadProject() {
			console.log("laod project")
			uni.request({
				method: 'GET',
				url: 'http://192.168.2.246:3333/project',
				dataType: 'JSON',
				success: (res) => {
					let dataObj = JSON.parse(res.data)
					this.projectData = dataObj.data;
				}
			})
		}
	}
};
</script>

<style>
.img {
	width: 100%;
	height: 100%;
}
.swi {
	height: 200px;
}
</style>
