<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in list" :key="index">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.img"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ item.title }}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{ item.content }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					img: '/static/message/message.png',
					title: 'Team Work 2.0.0 上线啦',
					content: 'Team Work 2.0.0 正式发布，新增扫码，消息中心，复制手机号等更多功能！'
				},
				{
					img: '/static/message/warning.png',
					title: '每天下班前一定要标记进度',
					content: '每天下班前一定要标记进度，以供项目经理可以精确把握项目进度！'
				}
			]
		};
	},
	methods: {}
};
</script>

<style></style>
