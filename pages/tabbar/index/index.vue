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
			uni.$on('labelChange',(res)=>{
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
		},
		mounted() {
			this.testInterface()
		},
		methods: {
			async testInterface() {
				//#ifdef H5
				this.$axios({
				  url: '/sys/login',
				  method: 'post',
				  data: this.$axios.adornParams({
					'captcha': 'nfxp4',
				    'username': 'admin',
					'password': 'admin',
					'uuid': '448847bf-5f98-4a06-86e6-cd2b6969fced'
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
				this.$axios({
				  url: '/sys/articleauthor/list',
				  method: 'get',
				  params: this.$axios.adornParams({
				    'page': 1,
				    'limit': 10
				  })
				}).then(({data}) => {
				  if (data && data.code === 0) {
				    console.log(data)
				  } else {
				    console.log(data)
				  }
				})
				//#endif
				//#ifndef H5
				let res = await this.$myRequest({
					methods: 'POST',
					data: this.$axios.adornParams({
					  'captcha': '6nanp',
					  'username': 'admin',
					  'password': 'admin',
					  'uuid': 'a357e967-e08b-4002-87f6-a0cb853ea6ea'
					}),
					header: {token: uni.getStorageSync('token') || ''},
					url: '/sys/login'
				})
				console.log(res)
				
				uni.setStorageSync('token', res.data.token);
				console.log(uni.getStorageSync('token'))
				
				let res2 = await this.$myRequest({
					methods: 'GET',
					data: this.$axios.adornParams({
					  'page': 1,
					  'limit': 10
					}),
					header: {token: uni.getStorageSync('token') || ''},
					url: '/sys/articleauthor/list'
				})
				console.log(res2)
				// this.$myRequest({
				// 	methods: 'POST',
				// 	data: this.$axios.adornParams({
				// 	  'captcha': 'dm5by',
				// 	  'username': 'admin',
				// 	  'password': 'admin',
				// 	  'uuid': '33dd7e9a-0d46-414d-8529-d01e392dfa48'
				// 	}),
				// 	header: {token: uni.getStorageSync('token') || ''},
				// 	url: '/sys/login'
				// }).then(res => {
				// 	console.log(res)
				// })
				//#endif
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
			getLabel() {
				// 调用云函数方法
				this.$api.get_label().then((res) => {
					const {
						data
					} = res
					console.log('标签 ',data);
					data.unshift({
						name:'全部'
					})
					this.tabList = data
					// 	console.log(this.tabList);
				})

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
