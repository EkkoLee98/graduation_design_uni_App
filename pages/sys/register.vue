<template>
	<view class="main" style="position: relative;margin-top: 70rpx;">
		<view style="padding: 20rpx;">
			<view style="width: 200rpx;height: 200rpx;margin: 0 auto;">
				<image style="width: 100%;height: 100%;" src="../../static/follow-active.png"></image>
			</view>
			<view style="width: 400rpx;height: 80rpx;margin: 20rpx auto;">
				<text style="font-size: 50rpx;color: #F07373;">电脑产品推荐系统</text>
			</view>

			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column login-item">
					<uni-icons type="contact" size="20"></uni-icons>
					<view style="display: inline-flex;" class="title">用户名：</view>
					<input style="display: inline-flex;" v-model="dataForm.userName" class="uni-input" name="input" placeholder="输入用户名" />
				</view>
				<view class="uni-form-item uni-column login-item">
					<uni-icons type="eye-filled" size="20"></uni-icons>
					<view style="display: inline-flex;" class="title">密码  ：</view>
					<input password="true" style="display: inline-flex;margin-left: 20rpx;" v-model="dataForm.password" class="uni-input" name="input" placeholder="输入密码" />
				</view>
				<view class="uni-form-item uni-column login-item">
					<uni-icons type="email-filled" size="20"></uni-icons>
					<view style="display: inline-flex;" class="title">邮箱  ：</view>
					<input email style="display: inline-flex;margin-left: 20rpx;" v-model="dataForm.password" class="uni-input" name="input" placeholder="输入邮箱" />
				</view>
				<view style="display: flex;align-items: center;">
					<view class="uni-form-item uni-column login-item">
						<view style="display: inline-flex;" class="title">验证码：</view>
						<input style="display: inline-flex;" v-model="dataForm.captcha" class="uni-input" name="input" placeholder="输入验证码" />
					</view>
					<img style="width: 220rpx;height: 80rpx;" :src="captchaPath" @click="getCaptcha()" alt="">
				</view>
				<view class="uni-btn-v login-item">
					<button type="primary" style="width: 300rpx;" form-type="submit">注册</button>
					<button type="default" style="width: 300rpx;" form-type="reset">重置</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		getUUID
	} from '@/utils'
	export default {
		data() {
			return {
				dataForm: {
					userName: '',
					password: '',
					email: '',
					captcha: ''
				},
				uuid: '',
				captchaPath: ''
			}
		},
		created() {
			this.getCaptcha()
		},
		methods: {
			// 获取验证码
			async getCaptcha() {
				this.uuid = getUUID()
				// console.log(this.uuid)
				// //#ifdef H5
				// this.$axios({
				// 	url: `http://localhost:8080/renren-fast/captcha.jpg/${this.uuid}`,
				// 	method: 'get',
				// }).then(({
				// 	data
				// }) => {
				// 	if (data && data.code === 0) {
				// 		console.log(data)
				// 		this.captchaPath = data;
				// 	} else {
				// 		console.log(data)
				// 	}
				// })
				// //#endif
				// let res = await this.$myRequest({
				// 	methods: 'GET',
				// 	url: `/captcha.jpg?uuid=${this.uuid}`
				// })
				this.captchaPath = this.$axios.adornUrl(`/captcha.jpg?uuid=${this.uuid}`)
				console.log(this.captchaPath)
			},
			async formSubmit(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail))
				console.log('uuid为：' + this.uuid)
				console.log(e)
				// this.$axios({
				//   url: '/sys/login',
				//   method: 'post',
				//   data: this.$axios.adornParams({
				// 	'captcha': this.dataForm.captcha,
				//  'username': this.dataForm.userName,
				// 	'password': this.dataForm.password,
				// 	'uuid': this.uuid
				//   })
				// }).then(({data}) => {
				//   if (data && data.code === 0) {
				//     console.log(data)
				//   } else {
				//     console.log(data)
				//   }
				//   console.log(data.token)
				//   uni.setStorageSync('token', data.token);
				// })
				// console.log(uni.getStorageSync('token'))
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornParams({
					  'captcha': this.dataForm.captcha,
				      'username': this.dataForm.userName,
					  'password': this.dataForm.password,
					  'email': this.dataForm.email,
					  'uuid': this.uuid
					}),
					header: {token: uni.getStorageSync('token') || ''},
					url: '/sys/user/register'
				})
				console.log(res)
				if (res.data.code === 0) {
					uni.showToast({
						title: '请到邮箱确认注册后登录~'
					})
					uni.navigateTo({
					  url: "/pages/sys/login"
					})
				}
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		// height: 815px;
		// width: 100%;
		// background-size: 100% 100%;
		// background-image: url(../../static/bg.png);
	}
	.title {
		font-weight: 100;
		color: #000000;
	}
	.login-item {
		margin: 50rpx 0 50rpx 0;
		display: flex;
		justify-content: center;
		&:hover {
			color: #F07373;
		}
		// &:focus {
		// 	color: #F07373;
		// }
	}
	.uni-btn-v {
		margin-top: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>
