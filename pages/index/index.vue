<template>
	<view>
		<view></view>
		<view class="cu-bar tabbar bg-white margin-top-xl foot">
			<view class="action" :class="this.$BarColor">
				<view class="cuIcon-homefill"></view>首页
			</view>
			<view class="action text-gray" @click="toChat">
				<view class="cuIcon-weixin"></view>聊天
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add shadow" :class="this.$Color"></button>
				发布
			</view>
			<view class="action text-gray" @click="toGame">
				<view class="cuIcon-game"></view>游戏
			</view>
			<view class="action text-gray" @click="toHome">
				<view class="cuIcon-my"></view>我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'basics'
			}
		},
		onShow() {
			this.$forceUpdate();
		},
		onLoad() {
			uni.hideTabBar();
		},
		methods: {
			toGame() {
				uni.switchTab({
					url: "/pages/game/index"
				})
			},
			toHome() {
				uni.switchTab({
					url: "/pages/home/home"
				})
			},
			toChat() {
				uni.switchTab({
					url: "/pages/chat/index"
				})
			},
		}
	}
</script>

<style>

</style>
