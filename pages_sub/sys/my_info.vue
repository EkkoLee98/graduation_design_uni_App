<template>
	<div>
		<div class="form-item">
			<span>名字: </span>
			<input style="margin-left: 50rpx;" v-model="authorName"/>
		</div>
		<div class="form-item">
			<span>自我介绍: </span>
			<input style="margin-left: 50rpx;" v-model="motto"/>
		</div>
		<div class="form-item">
			<span>头像: </span>
			<image :src="avatar" style="width: 150rpx;height: 150rpx;margin-left: 50rpx;" @click="uploadAvator"></image>
		</div>
		<div class="form-item">
			<span>性别: </span>
            <radio-group style="margin-left: 50rpx;" @change="radioChange">
			    <label class="radio"><radio value="男" :checked="gender === '男'"/>男</label>
			    <label class="radio" style="margin-left: 30rpx;"><radio value="女" :checked="gender === '女'"/>女</label>
            </radio-group>
		</div>
		<div class="form-item">
			<span>职业: </span>
			<input style="margin-left: 50rpx;" v-model="professional"/>
		</div>
		<div class="form-item">
			<span>地址: </span>
			<input style="margin-left: 50rpx;" v-model="address"/>
		</div>
		<button type="primary" @click="updateAuthor">修改</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '',
				authorName: '',
				motto: '',
				professional: '',
				address: '',
				gender: ''
			}
		},
		computed: {
			userInfo() {
				return uni.getStorageSync('author')
			}
		},
		watch: {
			userInfo: {
				handler(val) {
					console.log(val)
					this.avatar = val.avatar
					this.authorName = val.authorName
					this.motto = val.motto
					this.professional = val.professional
					this.address = val.address
					this.gender = val.gender
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			async updateAuthor() {
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornParams({
                      'id': this.userInfo.id,
                      'authorName': this.authorName,
                      'avatar': this.avatar,
                      'motto': this.motto,
                      'gender': this.gender,
                      'professional': this.professional,
                      'address': this.address
					}),
					header: {token: uni.getStorageSync('token') || '', 'Content-Type': 'application/json'},
					url: '/arct/author/update'
				})
				if (res.data.code === 0) {
					uni.showToast({
						title:'修改成功'
					})
					let res2 = await this.$myRequest({
						methods: 'GET',
						data: this.$axios.adornParams(),
						header: {token: uni.getStorageSync('token') || ''},
						url: `/arct/author/info/${uni.getStorageSync('author').id}`
					})
					uni.setStorageSync('author', res2.data.author);
				} else {
					uni.showToast({
						title:'修改失败'
					})
				}
			},
			radioChange(e) {
				this.gender = e.detail.value
				console.log(this.gender)
			},
			uploadAvator() {
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            // url: 'http://localhost:8080/renren-fast/api/upload', //仅为示例，非真实的接口地址
							url: 'https://159.75.101.5/renren-fast/api/upload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
							header: {token: uni.getStorageSync('token')},
				            success: (uploadFileRes) => {
				                console.log(uploadFileRes.data);
								this.avatar = JSON.parse(uploadFileRes.data).url
				            }
				        });
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-input-input {
		// color: red;
		// border: 1px solid #898989;
	}
	.form-item {
		display: flex;
		height: 100rpx;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 30rpx;
	}
</style>
