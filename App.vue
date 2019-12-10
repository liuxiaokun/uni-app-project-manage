<script>
export default {
	onLaunch: () => {
		console.log('App Launch');

		// #ifdef APP-PLUS
		var info = plus.push.getClientInfo();
		console.log("device info:" + JSON.stringify( info ) );
		plus.push.addEventListener('click', message => {
			console.log('_handleClick:' + JSON.stringify(message));
		});
		plus.push.addEventListener('receive', message => {
			console.log('_handleReceive: ' +JSON.stringify(message));
			uni.navigateTo({
				url: message.payload
			});
		});
		// #endif
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
