<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 检查用户是否已登录
			this.checkLoginStatus()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 检查登录状态
			checkLoginStatus() {
				const token = uni.getStorageSync('userToken')
				const userInfo = uni.getStorageSync('userInfo')
				// 如果没有登录信息，则跳转到登录页面
				if (!token || !userInfo) {
					// 延迟执行，确保app完全初始化
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 100)
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	body {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		background-color: #f8f8f8;
	}
	
	/* 现代化按钮样式 */
	.btn-primary {
		background-color: #007aff;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	
	.btn-primary:hover {
		background-color: #0051d5;
		transform: translateY(-1px);
	}
	
	/* 输入框样式 */
	.input-field {
		width: 100%;
		padding: 12px 16px;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 16px;
		transition: border-color 0.3s ease;
	}
	
	.input-field:focus {
		outline: none;
		border-color: #007aff;
		box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
	}
	
	/* 卡片样式 */
	.card {
		background-color: #fff;
		border-radius: 12px;
		padding: 24px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}
</style>
