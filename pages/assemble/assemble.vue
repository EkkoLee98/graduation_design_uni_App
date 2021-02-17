<template>
	<view style="overflow-y: auto;">
        <view class="uni-list">
            <view class="uni-list-cell">
                <view style="display: inline-flex;" class="uni-list-cell-left">
                    主板:
                </view>
                <view style="display: inline-flex; margin-left:50rpx;" class="uni-list-cell-db">
                    <picker @change="bindPickerChangeMainBoard" :value="index" :range="main_board">
                        <view class="uni-input">{{main_board_obj.goodName || main_board[index]}}</view>
                    </picker>
                </view>
            </view>
			<view class="uni-list-cell">
			    <view style="display: inline-flex;" class="uni-list-cell-left">
			        显卡:
			    </view>
			    <view style="display: inline-flex; margin-left:50rpx;" class="uni-list-cell-db">
			        <picker @change="bindPickerChangeGraphicsCard" :value="index" :range="graphics_card">
			            <view class="uni-input">{{graphics_card_obj.goodName || graphics_card[index]}}</view>
			        </picker>
			    </view>
			</view>
			<view class="uni-list-cell">
			    <view style="display: inline-flex;" class="uni-list-cell-left">
			        内存:
			    </view>
			    <view style="display: inline-flex; margin-left:50rpx;" class="uni-list-cell-db">
			        <picker @change="bindPickerChangeMemory" :value="index" :range="memory">
			            <view class="uni-input">{{memory_obj.goodName || memory[index]}}</view>
			        </picker>
			    </view>
			</view>
			<view class="uni-list-cell">
			    <view style="display: inline-flex;" class="uni-list-cell-left">
			        CPU:
			    </view>
			    <view style="display: inline-flex; margin-left:50rpx;" class="uni-list-cell-db">
			        <picker @change="bindPickerChangeCpu" :value="index" :range="cpu">
			            <view class="uni-input">{{cpu_obj.goodName || cpu[index]}}</view>
			        </picker>
			    </view>
			</view>
			<view class="uni-list-cell">
			    <view style="display: inline-flex;" class="uni-list-cell-left">
			        电源:
			    </view>
			    <view style="display: inline-flex; margin-left:50rpx;" class="uni-list-cell-db">
			        <picker @change="bindPickerChangePowerSupply" :value="index" :range="power_supply">
			            <view class="uni-input">{{power_supply_obj.goodName || power_supply[index]}}</view>
			        </picker>
			    </view>
			</view>
        </view>
		<view>
			<view v-if="showMainBoard" class="good-info">
				<image :src="main_board_obj.goodImg"></image>
				<view style="display: flex;flex-direction: column;">
					<text>{{main_board_obj.goodName}}</text>
					<text style="color: red;">￥{{main_board_obj.goodPrice}}</text>
				</view>
			</view>
			<view v-if="showGraphicsCard" class="good-info">
				<image :src="graphics_card_obj.goodImg"></image>
				<view style="display: flex;flex-direction: column;">
					<text>{{graphics_card_obj.goodName}}</text>
					<text style="color: red;">￥{{graphics_card_obj.goodPrice}}</text>
				</view>
			</view>
			<view v-if="showMemory" class="good-info">
				<image :src="memory_obj.goodImg"></image>
				<view style="display: flex;flex-direction: column;">
					<text>{{memory_obj.goodName}}</text>
					<text style="color: red;">￥{{memory_obj.goodPrice}}</text>
				</view>
			</view>
			<view v-if="showCpu" class="good-info">
				<image :src="cpu_obj.goodImg"></image>
				<view style="display: flex;flex-direction: column;">
					<text>{{cpu_obj.goodName}}</text>
					<text style="color: red;">￥{{cpu_obj.goodPrice}}</text>
				</view>
			</view>
			<view v-if="showPowerSupply" class="good-info">
				<image :src="power_supply_obj.goodImg"></image>
				<view style="display: flex;flex-direction: column;">
					<text>{{power_supply_obj.goodName}}</text>
					<text style="color: red;">￥{{power_supply_obj.goodPrice}}</text>
				</view>
			</view>
		</view>
		<view style="float: left;margin-top: 55rpx;">
			<view style="color: red;margin-bottom: 10rpx;">最终得分: {{integral}}</view>
			<view>性价比参照:</view>
			<view>低500~1000</view>
			<view>中1000~1500</view>
			<view>高1500~2000</view>
			<view style="margin-bottom: 20rpx;">可以多尝试几种方案哟~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				good_list: [],
				weight: {},
				integral: 0,
				main_board: [],
				graphics_card: [],
				memory: [],
				cpu: [],
				power_supply: [],
				index: 0,
				main_board_obj: {},
				graphics_card_obj: {},
				memory_obj: {},
				cpu_obj: {},
				power_supply_obj: {}
			};
		},
		onLoad() {
			this.getGoods()
			this.getWeight()
		},
		computed: {
			showMainBoard() {
				return Object.keys(this.main_board_obj).length !== 0
			},
			showGraphicsCard() {
				return Object.keys(this.graphics_card_obj).length !== 0
			},
			showMemory() {
				return Object.keys(this.memory_obj).length !== 0
			},
			showCpu() {
				return Object.keys(this.cpu_obj).length !== 0
			},
			showPowerSupply() {
				return Object.keys(this.power_supply_obj).length !== 0
			},
		},
		methods: {
			bindPickerChangeMainBoard(e) {
				console.log(e.detail.value)
				this.main_board_obj = this.good_list.filter(g => g.goodName === this.main_board[e.detail.value])[0]
				console.log(this.main_board_obj)
				this.calPrice()
			},
			bindPickerChangeGraphicsCard(e) {
				console.log(e.detail.value)
				this.graphics_card_obj = this.good_list.filter(g => g.goodName === this.graphics_card[e.detail.value])[0]
				console.log(this.graphics_card_obj)
				this.calPrice()
			},
			bindPickerChangeMemory(e) {
				console.log(e.detail.value)
				this.memory_obj = this.good_list.filter(g => g.goodName === this.memory[e.detail.value])[0]
				console.log(this.memory_obj)
				this.calPrice()
			},
			bindPickerChangeCpu(e) {
				console.log(e.detail.value)
				this.cpu_obj = this.good_list.filter(g => g.goodName === this.cpu[e.detail.value])[0]
				console.log(this.cpu_obj)
				this.calPrice()
			},
			bindPickerChangePowerSupply(e) {
				console.log(e.detail.value)
				this.power_supply_obj = this.good_list.filter(g => g.goodName === this.power_supply[e.detail.value])[0]
				console.log(this.power_supply_obj)
				this.calPrice()
			},
			calPrice() {
				if (this.showCpu && this.showGraphicsCard && this.showMainBoard && this.showMemory && this.showPowerSupply) {
					this.integral = this.main_board_obj.goodPrice * this.weight.mainBoard
					              + this.graphics_card_obj.goodPrice * this.weight.graphicsCard
								  + this.main_board_obj.goodPrice * this.weight.memory
								  + this.cpu_obj.goodPrice * this.weight.cpu
								  + this.power_supply_obj.goodPrice * this.weight.powerSupply
				    console.log(this.integral)
					this.integral = this.integral.toFixed(0)
				} else {
					return false
				}
			},
			async getWeight() {
				let res = await this.$myRequest({
					methods: 'GET',
					data: this.$axios.adornParams({
						'page': 1,
						'limit': 10
					}),
					header: {token: uni.getStorageSync('token') || ''},
					url: '/arct/goodweight/list'
				})
				console.log(res)
				this.weight = res.data.page.list.filter(l => l.usingStatus === 1)[0]
				console.log(this.weight)
			},
			async getGoods() {
				let res = await this.$myRequest({
					methods: 'GET',
					data: this.$axios.adornParams({
						'page': 1,
						'limit': 50
					}),
					header: {token: uni.getStorageSync('token') || ''},
					url: '/arct/goods/list'
				})
				console.log(res)
				this.good_list = res.data.page.list
				let tmpArr = res.data.page.list
				console.log(tmpArr)
				this.main_board = ['请选择'].concat(tmpArr.filter(t => t.goodClassify === 'main_board').map(t => t.goodName))
				this.graphics_card = ['请选择'].concat(tmpArr.filter(t => t.goodClassify === 'graphics_card').map(t => t.goodName))
				this.memory = ['请选择'].concat(tmpArr.filter(t => t.goodClassify === 'memory').map(t => t.goodName))
				this.cpu = ['请选择'].concat(tmpArr.filter(t => t.goodClassify === 'cpu').map(t => t.goodName))
				this.power_supply = ['请选择'].concat(tmpArr.filter(t => t.goodClassify === 'power_supply').map(t => t.goodName))
			},
		},
	}
</script>

<style lang="scss">
	.uni-list-cell {
		margin: 30rpx auto;
	}
	.uni-list {
		// height: 1000rpx;
		// overflow-y: auto;
	}
	.good-info {
		display: flex;
		border: 1px solid #C0C0C0;
		border-radius: 4rpx;
		justify-content: flex-start;
		align-items: center;
		height: 200rpx;
		image {
			width: 150rpx;
			height: 150rpx;
		}
	}
</style>
