<template>
	<view>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">用户名：</view>
					<input v-model="dataForm.userName" class="uni-input" name="input" placeholder="这是一个输入框" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">密码：</view>
					<input v-model="dataForm.password" class="uni-input" name="input" placeholder="这是一个输入框" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">验证码：</view>
					<input v-model="dataForm.captcha" class="uni-input" name="input" placeholder="这是一个输入框" />
					<img :src="captchaPath" @click="getCaptcha()" alt="">
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
					<button type="default" form-type="reset">Reset</button>
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
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail))
				console.log('uuid为：' + this.uuid)
				console.log(e)
				this.$axios({
				  url: '/sys/login',
				  method: 'post',
				  data: this.$axios.adornParams({
					'captcha': this.dataForm.captcha,
				    'username': this.dataForm.userName,
					'password': this.dataForm.password,
					'uuid': this.uuid
				  })
				}).then(({data}) => {
				  if (data && data.code === 0) {
				    console.log(data)
				  } else {
				    console.log(data)
				  }
				  console.log(data.token)
				  uni.setStorageSync('token', data.token);
				})
				console.log(uni.getStorageSync('token'))
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style>

</style>
