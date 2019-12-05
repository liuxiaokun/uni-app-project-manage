<template>
	<view>
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper class="swi" :autoplay="true" :interval="3000" :duration="1000" @change="change">
				<swiper-item><image src="../../static/swiper/1.png" class="img"></image></swiper-item>
				<swiper-item><image src="../../static/swiper/2.png" class="img"></image></swiper-item>
				<swiper-item><image src="../../static/swiper/3.png" class="img"></image></swiper-item>
			</swiper>
		</uni-swiper-dot>

		<scroll-view scroll-y="true">
			<block v-for="(item, index) in projectData" :key="index">
				<uni-card
					:title="item.name"
					thumbnail="../../static/project.png"
					:extra="item.remark"
					:note="item.codeGitUrl"
					is-shadow="true"
					@tap="goFunctionPage(item.id, item.name)"
				>
					{{ item.desc }}
				</uni-card>
			</block>
		</scroll-view>
	</view>
</template>

<script>
import { uniCard, uniSwiperDot } from '@dcloudio/uni-ui';

export default {
	components: {
		uniCard,
		uniSwiperDot
	},
	data() {
		return {
			info: [
				{
					content: '一叶知秋'
				},
				{
					content: '吱吱呀呀'
				},
				{
					content: '一览众山小'
				}
			],
			current: 0,
			mode: 'nav',
			projectData: []
		};
	},
	onLoad() {
		const token = uni.getStorageSync('token');
		console.log('start token:' + token);
		if (!token) {
			uni.reLaunch({
				url: '/pages/login/login'
			});
			return
		}
		this.loadProject();
	},

	onPullDownRefresh() {
		this.loadProject();
		console.log('load finish');
		uni.stopPullDownRefresh();
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		loadProject() {
			console.log('start load project');
			uni.request({
				method: 'GET',
				url: 'http://192.168.2.246:3333/project',
				dataType: 'JSON',
				success: res => {
					let dataObj = JSON.parse(res.data);
					this.projectData = dataObj.data;
				}
			});
		},

		goFunctionPage(projectId, title) {
			console.log('click');
			uni.navigateTo({
				url: '/pages/function/function?id=' + projectId + '&title=' + title + '&onlyMe=false'
			});
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
