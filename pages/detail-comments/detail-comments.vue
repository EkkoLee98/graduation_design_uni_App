<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item" @reply="reply"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>
		<release ref="popup" @reset="reset" @submit="submit"></release>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsList: [],
				replyFormData:{},
				article_id: '',
				page: 1,
				pageSize: 5,
				loading:'loading'
			}
		},
		onLoad(query) {
			this.article_id = query.id
			console.log(query);
			this.getDetail()
			// this.getComments()
		},
		/**
		 * 上拉加载
		 */
		onReachBottom() {
			if(this.loading === 'noMore') return
			this.page++
			// this.getComments()
		},
		methods: {
			// 获取详情信息
			async getDetail() {
				let res = await this.$myRequest({
					methods: 'GET',
					data: this.$axios.adornParams(),
					header: {token: uni.getStorageSync('token') || ''},
					url: `/arct/article/info/${this.article_id}`
				})
				console.log(res)
				// 对象复制
				// let oldFormData = JSON.parse(JSON.stringify(this.commentsList))
				// oldFormData.push(...res.data.article.comments)
				// this.commentsList = oldFormData
				this.commentsList = res.data.article.comments
			},
			// 发布评论
			submit(content){
				this.setUpdateComment(content)
			},
			// 打开评论发布窗口
			openComment(){
				this.$refs.popup.open()
			},
			// 关闭弹窗
			close(){
				this.$refs.popup.close()
			},
			reset() {
				console.log('清除状态')
				this.replyFormData = {}
			},
			/**
			 * 监听回复 
			 * @param {Object} e
			 */
			reply(e){
				console.log(e);
				if (e.is_reply) {
					this.replyFormData = {
						toName: e.comments.author.authorName,
						commentId: e.comments.commentId,
						isReply: '1'
					}
				} else {
					this.replyFormData = {
						toName: e.comments.author.authorName,
						commentId: e.comments.id,
						isReply: '1'
					}
				}
				console.log(this.replyFormData)
				this.openComment()
			},
			async updateAuthor() {
				let res = await this.$myRequest({
					methods: 'GET',
					data: this.$axios.adornParams(),
					header: {token: uni.getStorageSync('token') || ''},
					url: `/arct/author/info/${uni.getStorageSync('author').id}`
				})
				uni.setStorageSync('author', res.data.author);
			},
			/**
			 * 更新评论
			 * @param {Object} content
			 */
			async setUpdateComment(content){
				console.log(content)
				uni.showLoading()
				let params = {}
				if (Object.keys(this.replyFormData).length === 0) {
					params = {
						articleId: this.article_id,
						authorId: uni.getStorageSync('author').id,
						createTime: new Date().getTime(),
						isReply: '0',
						commentContent: content.content,
						rate: content.rate
					}
				} else {
					params = {
						authorId: uni.getStorageSync('author').id,
						createTime: new Date().getTime(),
						commentContent: content.content,
						...this.replyFormData
					}
				}
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornParams(params),
					header: {token: uni.getStorageSync('token') || '', 'Content-Type': 'application/json'},
					url: `/arct/${Object.keys(this.replyFormData).length === 0 ? 'comments' : 'reply'}/save`
				})
				if (res.data.code === 0) {
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功'
					})
					this.close()
					this.reset()
					this.getDetail()
					this.updateAuthor()
				} else {
					uni.hideLoading()
					uni.showToast({
						title:'评论发布失败'
					})
					this.close()
					this.reset()
				}
				console.log(res)
			},
			/**
			 * 获取评论
			 */
			getComments() {
				this.$api.get_comments({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					const {
						data
					} = res
					if(data.length === 0){
						this.loading = 'noMore'
						return
					}
					// 对象复制
					let oldFormData = JSON.parse(JSON.stringify(this.commentsList))
					oldFormData.push(...data)
					console.log(res);
					this.commentsList = oldFormData
				})
			}
		}
	}
</script>

<style lang="scss">
	.comments-content {
		padding: 0 15px;
	}
</style>
