<template>
	<view>
		<view :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar search fixed" :style="style" :class="this.$Color">
				<view class="cu-avatar round" :style="{ backgroundImage:'url('+avatar + ')' }"></view>
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索卡片/文章/视频" confirm-type="search"></input>
				</view>
			</view>
		</view>
		<view class="cu-bar tabbar bg-white margin-top-xl foot">
			<view class="action" :class="this.$BarColor">
				<view class="cuIcon-homefill"></view>首页
			</view>
			<view class="action text-gray" @click="toChat">
				<view class="cuIcon-weixin"></view>聊天
			</view>
			<view class="action text-gray add-action" @click="toBuild">
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
				PageCur: 'basics',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				avatar: uni.getStorageSync("avatar"),
			}
		},
		onShow() {
			this.$forceUpdate();
		},
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			}
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
			toBuild() {
				uni.navigateTo({
					url: "/pages/blog/build"
				})
			},
		}
	}
</script>

<style>

</style>
