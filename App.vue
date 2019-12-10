<script>
export default {
	onLaunch: () => {
		console.log('App Launch');

		// #ifdef APP-PLUS
		console.log('App Launch APP-PLUS');
		const _handleReceive = function(message) {
			console.log("_handleReceive: " + message.payload);
			uni.navigateTo({
				url: message.payload
			});
		};
		const _handleClick = function(message) {
			console.log("_handleClick:" + message);
			
		};
		plus.push.addEventListener('click', _handleClick);
		plus.push.addEventListener('receive', _handleReceive);
		console.log('App Launch APP-PLUS end');
		// #endif
		console.log('App Launch END');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import './common/iconfont.css';
@import './common/uni.css';
</style>
