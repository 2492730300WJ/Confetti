<template>
	<view>
		<view :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar search fixed" :style="style" :class="this.$Color">
				<view class="cu-avatar round" :style="{ backgroundImage:'url(' + (!isLogin?'../../static/img/noLoginAvatar.png':avatar) + ')' }"></view>
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索游戏" confirm-type="search"></input>
				</view>
			</view>
		</view>
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="3000"
		 duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view class="" style="height: ">
			<view class="padding flex justify-between align-center">
				<view>
					<view class='cu-avatar xl radius' @click="ClickGuess" style="background-image:url(https://hanyu-word-gif.cdn.bcebos.com/beaa6c5034b4a44438a3671810939112d.gif);">
						<view class="cu-tag badge">new</view>
					</view>
					<view style="text-align: center;font-size: 12px;">
						看图猜成语
					</view>
				</view>
				<view>
					<view class='cu-avatar xl radius' @click="ClickGuess" style="background-image:url(https://hanyu-word-gif.cdn.bcebos.com/beaa6c5034b4a44438a3671810939112d.gif);">
						<view class="cu-tag badge">new</view>
					</view>
					<view style="text-align: center;font-size: 12px;">
						看图猜成语
					</view>
				</view>
				<view>
					<view class='cu-avatar xl radius' @click="ClickGuess" style="background-image:url(https://hanyu-word-gif.cdn.bcebos.com/beaa6c5034b4a44438a3671810939112d.gif);">
						<view class="cu-tag badge">new</view>
					</view>
					<view style="text-align: center;font-size: 12px;">
						看图猜成语
					</view>
				</view>
				<view>
					<view class='cu-avatar xl radius' @click="ClickGuess" style="background-image:url(https://hanyu-word-gif.cdn.bcebos.com/beaa6c5034b4a44438a3671810939112d.gif);">
						<view class="cu-tag badge">new</view>
					</view>
					<view style="text-align: center;font-size: 12px;">
						看图猜成语
					</view>
				</view>
			</view>
			<view class="padding flex justify-between align-center">
				<view>
					<view class='cu-avatar xl radius' @click="ClickGuess" style="background-image:url(https://hanyu-word-gif.cdn.bcebos.com/beaa6c5034b4a44438a3671810939112d.gif);">
						<view class="cu-tag badge">new</view>
					</view>
					<view style="text-align: center;font-size: 12px;">
						看图猜成语
					</view>
				</view>
				<view>
					<view class='cu-avatar xl radius' @click="ClickGuess" style="background-image:url(https://hanyu-word-gif.cdn.bcebos.com/beaa6c5034b4a44438a3671810939112d.gif);">
						<view class="cu-tag badge">new</view>
					</view>
					<view style="text-align: center;font-size: 12px;">
						看图猜成语
					</view>
				</view>
				<view>
					<view class='cu-avatar xl radius' @click="ClickGuess" style="background-image:url(https://hanyu-word-gif.cdn.bcebos.com/beaa6c5034b4a44438a3671810939112d.gif);">
						<view class="cu-tag badge">new</view>
					</view>
					<view style="text-align: center;font-size: 12px;">
						看图猜成语
					</view>
				</view>
				<view>
					<view class='cu-avatar xl radius' @click="ClickGuess" style="background-image:url(https://hanyu-word-gif.cdn.bcebos.com/beaa6c5034b4a44438a3671810939112d.gif);">
						<view class="cu-tag badge">new</view>
					</view>
					<view style="text-align: center;font-size: 12px;">
						看图猜成语
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar tabbar bg-white margin-top-xl foot">
			<view class="action text-gray" @click="toIndex">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action text-gray" @click="toChat">
				<view class="cuIcon-weixin"></view>聊天
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add shadow" :class="this.$Color"></button>
				发布
			</view>
			<view class="action" :class="this.$BarColor">
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
				InputBottom: 0,
				isLogin: uni.getStorageSync("login"),
				avatar: uni.getStorageSync("avatar"),
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
			};
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
		onShow() {
			this.refresh();
		},
		methods: {
			refresh() {
				this.isLogin = uni.getStorageSync("login");
				this.avatar = uni.getStorageSync("avatar");
				this.$forceUpdate()
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			ClickGuess() {
				uni.navigateTo({
					url: "/pages/game/guess2/index"
				})
			},
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
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
