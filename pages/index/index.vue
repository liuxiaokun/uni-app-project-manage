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
import urlConfig from '@/common/config.js'
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
	},
    
    onNavigationBarSearchInputConfirmed(e) {
        console.log(e)
        uni.navigateTo({
        	url: '/pages/search/search?value=' + e.text
        });
    },
    
	methods: {
		change(e) {
			this.current = e.detail.current;
		},
		loadProject() {
			console.log('start load project');
			uni.request({
				method: 'GET',
				url: urlConfig + 'project',
				dataType: 'JSON',
				success: res => {
					let dataObj = JSON.parse(res.data);
					this.projectData = dataObj.data;
				},
				complete() {
					uni.stopPullDownRefresh();
				}
			});
		},

		goFunctionPage(projectId, title) {
			console.log('click');
			uni.navigateTo({
				url: '/pages/function/function?id=' + projectId + '&title=' + title + '&onlyMe=false'
			});
		}
	},
	
	onNavigationBarButtonTap(button) {
		console.log(button.index)
		
		if(button.index === 0) {
			console.log("scan start...")
			uni.scanCode({
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
                    
                    uni.navigateTo({
                        url:"/pages/scanResut/scanResut?type=" + res.scanType +"&result=" + res.result,
                    })
			    }
			});
		} else if (button.index === 1) {
			uni.navigateTo({
				url: '/pages/message/message'
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
