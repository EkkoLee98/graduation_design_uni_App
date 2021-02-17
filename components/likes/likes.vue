<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				like: false
			};
		},
		computed: {
			author() {
				return uni.getStorageSync('author')
			}
		},
		watch: {
			item: {
				handler(val) {
					if (this.author.articleLikesIds.includes(val.id)) {
						this.like = true
					} else {
						this.like = false
					}
				},
				immediate: true,
				deep: true
			}
		},
		created() {
			// this.like = this.item.is_like
		},
		methods: {
			async likeTap() {
				this.like = !this.like
				uni.showLoading()
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornParams({
					  'id': this.item.id,
					  'aid': this.author.id,
					  'type': 'like',
					  'status': this.like ? '1' : '0',
					}),
					header: {token: uni.getStorageSync('token') || '', 'Content-Type': 'application/x-www-form-urlencoded'},
					url: '/arct/article/save/option'
				})
				if (res.data.code === 0) {
					uni.showToast({
						title: this.like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
					this.getAuthor()
					uni.hideLoading()
				}
				uni.hideLoading()
				console.log(res)
				// this.setUpdateLikes()
				// console.log('收藏成功');
			},
			async getAuthor() {
				let res = await this.$myRequest({
					methods: 'GET',
					data: this.$axios.adornParams(),
					header: {token: uni.getStorageSync('token') || ''},
					url: `/arct/author/info/${uni.getStorageSync('author').id}`
				})
				uni.setStorageSync('author', res.data.author);
				console.log(this.author)
			},
			setUpdateLikes() {
				uni.showLoading()
				this.$api.update_like({
					user_id: '5fbe4b44822f1e0001eab420',
					article_id: this.item._id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: this.like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
					uni.$emit('update_article',this.types)
					console.log(res);

				}).catch(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
