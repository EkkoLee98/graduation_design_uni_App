<template>
	<view>
		<robin-editor class="editor"
		    @cancel="hideEditor" 
		    @save="saveEditor" 
		    v-model="html"
		    :imageUploader="uploadImg" 
		    :muiltImage="true">
		</robin-editor>
	</view>
</template>

<script>
	export default {
		name: 'activity-detail',
		data() {
			return {
				html: '',
				tmp: '',
			}
		},
		methods: {
			hideEditor() {
				uni.navigateTo({
					url: '../upload-article-main/upload-article-main'
				})
			},
			saveEditor(e) {
				console.log(e)
				this.html = e.text
				this.tmp = e.html
				console.log(this.html)
				uni.setStorageSync('content', this.tmp)
				uni.navigateTo({
					url: '../upload-article-main/upload-article-main'
				})
			},
			uploadImg(img, callback) {
				console.log(img)
				console.log(callback)
				callback()
			}
		}
			//提交按钮
	};
</script>

<style lang="scss">
</style>
