<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header__logo">
				<image :src="author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">
					{{author.authorName}}
				</view>
				<view class="detail-header__content-info">
					<text>{{article.createTime}}</text>
					<text>{{article.browseCount}} 浏览</text>
					<text>{{article.thumbsUpCount}} 赞</text>
				</view>
			</view>
			<button class="detail-header__button" type="default" @click="follow(author.id)">{{isFollow?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="article.content" :noData="noData"></u-parse>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in article.comments" :key="item.id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box" @click="open">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="isLike?'heart-filled':'heart'" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="thumbsup(formData._id)">
					<uni-icons :type="isThumbUp?'hand-thumbsup-filled':'hand-thumbsup' " size="22" color="#F07373"></uni-icons>
				</view>
			</view>
		</view>
		<release ref="popup" @reset="reset" @submit="submit"></release>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'

	export default {
		components:{
			uParse
		},
		data() {
			return {
				article: {},
				author: {},
				isFollow: false,
				isThumbUp: false,
				isLike: false,
				formData: {},
				noData:'<p style="text-align:center;color:#666">详情加载中...</p>',
				commentsList:[],
				replyFormData:{},
				showPopup:false
			}
		},
		computed: {
			// isFollow() {
			// 	// authorLikesIds
			// 	if (uni.getStorageSync('author').authorLikesIds !== null) {
			// 		return uni.getStorageSync('author').authorLikesIds.indexOf(this.author.id) > -1
			// 	} else {
			// 		return false
			// 	}
			// }
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			console.log(this.formData)
			this.getDetail()
			this.getAuthor()
			this.getComments()
		},
		methods: {
			/**
			 * 打开评论列表
			 */
			open(){
				uni.navigateTo({
					url:'../detail-comments/detail-comments?id='+this.formData._id
				})
			},
			// 点赞
			thumbsup(article_id){
				this.setUpdateThumbs(article_id)
			},
			// 收藏
			likeTap(article_id){
				console.log('收藏文章');
				this.setUpadteLike(article_id)
			},
			// 关注
			follow(author_id){
				console.log('关注');
				this.setUpdateAuhtor(author_id)
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
			// 发布
			submit(content){
				// this.setUpdateComment({content,...this.replyFormData})
				this.setUpdateComment(content)
			},
			reply(e){
				// this.replyFormData = {
				// 	"comment_id":e.comments.comment_id,
				// 	"is_reply": e.is_reply
				// }
				// if(e.comments.reply_id){
				// 	this.replyFormData.reply_id = e.comments.reply_id
				// }
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
			async setUpdateComment(content){
				console.log(content)
				// const formdata ={
				// 	article_id:this.formData._id,
				// 	...content
				// }
				// console.log(formdata);
				uni.showLoading()
				// this.$api.update_comment(formdata).then((res)=>{
				// 	console.log(res);
					// uni.hideLoading()
					// uni.showToast({
					// 	title:'评论发布成功'
					// })
				// 	this.getComments()
				// 	this.close()
				// 	this.replyFormData = {}
				// })
				let params = {}
				if (Object.keys(this.replyFormData).length === 0) {
					params = {
						articleId: this.formData._id,
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
			// 请求评论内容
			getComments(){
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res=>{
					console.log(res);
					const {data} = res
					this.commentsList = data
				})
			},
			// 获取详情信息
			async getDetail() {
				let res = await this.$myRequest({
					methods: 'GET',
					data: this.$axios.adornParams(),
					header: {token: uni.getStorageSync('token') || ''},
					url: `/arct/article/info/${this.formData._id}`
				})
				console.log(res)
				if (Object.keys(this.article).length === 0) {
					this.article = res.data.article
				} else {
					this.article.comments = res.data.article.comments
				}

				console.log(this.article)
				// this.$api.get_detail({
				// 	article_id: this.formData._id
				// }).then((res) => {
				// 	const {data} = res
				// 	this.formData = data
				// 	console.log(res);
				// })
			},
			async getAuthor() {
				let res_author = await this.$myRequest({
					methods: 'GET',
					data: this.$axios.adornParams(),
					header: {token: uni.getStorageSync('token') || ''},
					url: `/arct/author/info/${this.formData.author_id}`
				})
				this.author = res_author.data.author
				// uni.setStorageSync('author', this.author);
				console.log(this.author)
				this.checkStatus()
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
			checkStatus() {
				if (uni.getStorageSync('author').authorLikesIds !== null) {
					this.isFollow = uni.getStorageSync('author').authorLikesIds.indexOf(this.author.id) > -1
				} else {
					this.isFollow = false
				}
				if (uni.getStorageSync('author').articleLikesIds !== null) {
					this.isLike = uni.getStorageSync('author').articleLikesIds.indexOf(this.formData._id) > -1
				} else {
					this.isLike = false
				}
				if (uni.getStorageSync('author').thumpsUpArticleIds !== null) {
					this.isThumbUp = uni.getStorageSync('author').thumpsUpArticleIds.indexOf(this.formData._id) > -1
				} else {
					this.isThumbUp = false
				}
			},
			// 关注作者
			async setUpdateAuhtor(author_id){
				uni.showLoading()
				// this.$api.update_author({
				// 	author_id
				// }).then(res=>{
				// 	uni.hideLoading()
				// 	this.formData.is_author_like = !this.formData.is_author_like
				// 	uni.$emit('update_author')
				// 	uni.showToast({
				// 		title:this.formData.is_author_like?'关注作者成功':'取消关注作者',
				// 		icon:'none'
				// 	})
				// })
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornParams({
					  'id': this.formData._id,
					  'aid': uni.getStorageSync('author').id,
					  'type': 'fan',
					  'status': this.isFollow ? '0' : '1',
					}),
					header: {token: uni.getStorageSync('token') || '', 'Content-Type': 'application/x-www-form-urlencoded'},
					url: '/arct/article/save/option'
				})
				if (res.data.code === 0) {
					this.isFollow = !this.isFollow
					uni.hideLoading()
					this.updateAuthor()
					setTimeout(() => {
						uni.showToast({
							title: this.isFollow ? '关注作者成功' : '取消关注作者',
							icon: 'none'
						})
					}, 0)
				}
				uni.hideLoading()
			},
			// 收藏文章 
			async setUpadteLike(article_id){
				uni.showLoading()
				// this.$api.update_like({
				// 	article_id
				// }).then(res=>{
				// 	uni.hideLoading()
				// 	this.formData.is_like = !this.formData.is_like
				// 	uni.$emit('update_article','follow')
				// 	uni.showToast({
				// 		title:this.formData.is_like ?'收藏成功':'取消收藏',
				// 		icon:'none'
				// 	})
				// 	console.log('收藏成功');
				// })
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornParams({
					  'id': this.formData._id,
					  'aid': uni.getStorageSync('author').id,
					  'type': 'like',
					  'status': this.isLike ? '0' : '1',
					}),
					header: {token: uni.getStorageSync('token') || '', 'Content-Type': 'application/x-www-form-urlencoded'},
					url: '/arct/article/save/option'
				})
				if (res.data.code === 0) {
					this.isLike = !this.isLike
					uni.hideLoading()
					this.updateAuthor()
					setTimeout(() => {
						uni.showToast({
							title: this.isLike ? '收藏成功' : '取消收藏',
							icon: 'none'
						})
					}, 0)
				}
				uni.hideLoading()
			},
			async setUpdateThumbs(article_id){
				uni.showLoading()
				// this.$api.update_thumbsup({
				// 	article_id
				// }).then(res=>{
				// 	uni.hideLoading()
				// 	this.formData.is_thumbs_up = true
				// 	this.formData.thumbs_up_count++
				// 	uni.showToast({
				// 		title:res.msg
				// 	})
				// })
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornParams({
					  'id': this.formData._id,
					  'aid': uni.getStorageSync('author').id,
					  'type': 'thumbsup',
					  'status': this.isThumbUp ? '0' : '1',
					}),
					header: {token: uni.getStorageSync('token') || '', 'Content-Type': 'application/x-www-form-urlencoded'},
					url: '/arct/article/save/option'
				})
				if (res.data.code === 0) {
					this.isThumbUp = !this.isThumbUp
					uni.hideLoading()
					this.updateAuthor()
					setTimeout(() => {
						uni.showToast({
							title: this.isThumbUp ? '点赞成功' : '取消点赞',
							icon: 'none'
						})
					}, 0)
				}
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header__logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header__content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header__content-title {
				font-size: 14px;
				color: #333;
			}

			.detail-header__content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}
		.detail-header__button {
			padding: 0 15px;
			flex-shrink: 0;
			height: 30px;
			line-height: 30px;
			border-radius: 5px;
			font-size: 12px;
			color: #fff;
			background-color: $mk-base-color;
		}
	}

	.detail-content {
		margin-top: 20px;
		min-height: 500px;
		.detail-html {
			padding:0 15px;
		}
		.detail-comment {
			margin-top: 30px;
			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5ff solid;
			}
			.comment-content {
				padding: 0 15px;
				border-top: 1px #eee solid;
			}
		}
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom__input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;

			text {
				font-size: 14px;
				color: #999;
			}
		}

		.detail-bottom__icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom__icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}
	

</style>
