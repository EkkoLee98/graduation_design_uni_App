<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" :tabIndex="tabIndex"  @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {
		getUUID
	} from '@/utils/index.js'
	// easyCom components/组件名/组件名.vue 局部引入
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: [],
				tabIndex:0,
				activeIndex:0
			}
		},
		computed:{
			...mapState(['userinfo'])
		},
		watch:{
			userinfo(newVal){
				this.getLabel()
			}
		},
		onLoad() {
			// this.getLabel()
			uni.$on('labelChange',(res)=>{
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
		},
		created() {
			this.getLabel()
		},
		mounted() {
			// this.testInterface()
			console.log(uni.getStorageSync('token'))
			console.log(uni.getStorageSync('author'))
			console.log(uni.getStorageSync('role'))
		},
		methods: {
			async testInterface() {
				// this.$axios({
				//   url: '/sys/login',
				//   method: 'post',
				//   data: this.$axios.adornParams({
				// 	'captcha': 'nfxp4',
				//     'username': 'admin',
				// 	'password': 'admin',
				// 	'uuid': '448847bf-5f98-4a06-86e6-cd2b6969fced'
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
				// this.$axios({
				//   url: '/sys/articleauthor/list',
				//   method: 'get',
				//   params: this.$axios.adornParams({
				//     'page': 1,
				//     'limit': 10
				//   })
				// }).then(({data}) => {
				//   if (data && data.code === 0) {
				//     console.log(data)
				//   } else {
				//     console.log(data)
				//   }
				// })
			},
			change(current){
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前swiper的值：',current);
			},
			tab({data,index}){
				console.log(data,index);
				this.activeIndex = index
			},
			async getLabel() {
				
				let res2 = await this.$myRequest({
					methods: 'GET',
					data: this.$axios.adornParams({
					  'page': 1,
					  'limit': 10
					}),
					header: {token: uni.getStorageSync('token') || ''},
					url: '/arct/classify/list'
				})
				
				if (res2.data.code === 0) {
					res2.data.page.list.forEach(l => {
						l.name = l.classify
						l.current = true
					})
					let tmpArr = [{name: '全部'}]
					this.tabList = tmpArr.concat(res2.data.page.list)
					console.log(this.tabList)
				}
			
				// 调用云函数方法
				// this.$api.get_label().then((res) => {
				// 	const {
				// 		data
				// 	} = res
				// 	console.log('标签 ',data);
				// 	data.unshift({
				// 		name:'全部'
				// 	})
				// 	this.tabList = data
				// 	// 	console.log(this.tabList);
				// })

			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}
	.home  {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list {
			flex:1;
			box-sizing: border-box;
		}
	}
</style>
