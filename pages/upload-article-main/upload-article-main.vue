<template>
	<div>
		<div class="form-item">
			<span>标题: </span>
			<input style="margin-left: 50rpx;" v-model="title"/>
		</div>
		<div class="form-item">
			<span>内容: </span>
			<button size="mini" type="primary" @click="editContent">编辑内容</button>
		</div>
		<div class="form-item">
			<span>模式: </span>
            <radio-group style="margin-left: 50rpx;" @change="radioChange">
			    <label class="radio"><radio value="base" :checked="mode === '普通'"/>普通</label>
			    <label class="radio" style="margin-left: 30rpx;"><radio value="column" :checked="mode === '多图'"/>多图</label>
				<label class="radio" style="margin-left: 30rpx;"><radio value="image" :checked="mode === '大图'"/>大图</label>
            </radio-group>
		</div>
		<div class="form-item">
			<span>封面图: </span>
			<button type="primary" size="mini" @click="uploadCover">上传封面图</button>
		</div>
		<div class="form-item" style="display: flex;flex-direction: column;">
			<view v-for="(item, index) in coverName" :key="item">
				<view style="margin: 10rpx auto;">
					<button size="mini" @click="deleteCover(index)">{{item}}</button>
				</view>
			</view>
		</div>
		<button style="margin-top: 160rpx;" type="primary" @click="uploadArticle">发布</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				cover: [],
				coverName: [],
				mode: ''
			}
		},
		// computed: {
		// 	userInfo() {
		// 		return uni.getStorageSync('author')
		// 	}
		// },
		// watch: {
		// 	userInfo: {
		// 		handler(val) {
		// 			console.log(val)
		// 			this.avatar = val.avatar
		// 			this.authorName = val.authorName
		// 			this.motto = val.motto
		// 			this.professional = val.professional
		// 			this.address = val.address
		// 			this.gender = val.gender
		// 		},
		// 		immediate: true,
		// 		deep: true
		// 	}
		// },
		onLoad() {
			this.title = uni.getStorageSync('title')
			this.mode = uni.getStorageSync('mode')
			this.cover = uni.getStorageSync('cover') || []
			this.coverName = uni.getStorageSync('coverName') || []
		},
		methods: {
			deleteCover(index) {
				this.cover.splice(index, 1)
				this.coverName.splice(index, 1)
			},
			editContent() {
				uni.setStorageSync('title', this.title)
				uni.setStorageSync('mode', this.mode)
				uni.setStorageSync('cover', this.cover)
				uni.setStorageSync('coverName', this.coverName)
				uni.navigateTo({
					url: '../upload-article/upload-article'
				})
			},
			async uploadArticle() {
				console.log(uni.getStorageSync('content'))
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornData({
                      'title': this.title,
					  'authorId': uni.getStorageSync('author').id,
                      'content': uni.getStorageSync('content'),
                      'cover': JSON.stringify(this.cover),
                      'mode': this.mode,
					  'createTime': new Date().getTime(),
                      'classify': '推友分享',
					  'browseCount': 0,
					  'thumbsUpCount': 0,
					  'collectionCount': 0
					}),
					header: {token: uni.getStorageSync('token') || '', 'Content-Type': 'application/json; charset=UTF-8'},
					url: '/arct/article/save'
				})
				if (res.data.code === 0) {
					uni.showToast({
						title:'上传成功'
					})
					uni.setStorageSync('title', '')
					uni.setStorageSync('mode', '')
					uni.setStorageSync('cover', [])
					uni.setStorageSync('coverName', [])
					uni.switchTab({
						url:'/pages/tabbar/my/my'
					})
				} else {
					uni.showToast({
						title:'上传失败'
					})
				}
			},
			radioChange(e) {
				this.mode = e.detail.value
				console.log(this.mode)
			},
			uploadCover() {
				if (this.cover.length === 3) {
					uni.showToast({
						title:'最多可上传三张'
					})
					return false
				}
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: 'http://localhost:8080/renren-fast/api/upload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
							header: {token: uni.getStorageSync('token')},
				            success: (uploadFileRes) => {
								console.log(this.cover)
				                console.log(uploadFileRes.data);
								let tmpObj = {
									name: JSON.parse(uploadFileRes.data).name,
									url: JSON.parse(uploadFileRes.data).url
								}
								this.cover.push(tmpObj)
								this.coverName.push(JSON.parse(uploadFileRes.data).name)
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
