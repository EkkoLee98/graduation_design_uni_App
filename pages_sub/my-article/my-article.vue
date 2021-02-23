<template>
	<view>
		<uni-load-more v-if="lists.length === 0" status="loading"></uni-load-more>
		<list-card v-for="item in lists" :key="item.id" :item="item"></list-card>
		<button @click="publish" size="mini" type="warn" style="position: fixed;bottom: 10rpx;right: 10rpx;">发表文章</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: []
			}
		},
		// onLoad() {
		// 	this.getMyArticle()
		// },
		created() {
			this.getMyArticle()
		},
		methods: {
			publish() {
				uni.navigateTo({
					url: '../upload-article-main/upload-article-main'
				})
			},
			async getMyArticle() {
				// this.$api.get_my_article().then(res => {
				// 	console.log(res);
				// 	const {
				// 		data
				// 	} = res
				// 	this.lists = data
				// })
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornParams({
					  'articleIds': uni.getStorageSync('author').articleIds,
					}),
					header: {token: uni.getStorageSync('token') || '', 'Content-Type': 'application/x-www-form-urlencoded'},
					url: '/arct/article/list/my'
				})
				res.data.articles.forEach(a => {
					if (typeof a.cover === 'string' && a.cover !== null && a.cover !== '') {
						a.cover = JSON.parse(a.cover)
						console.log('===========')
						console.log(a.cover)
						console.log('===========')
					}
				})
				this.lists = res.data.articles
			}
		}
	}
</script>

<style>

</style>
