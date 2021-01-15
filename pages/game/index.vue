<template>
	<view>
		<view class="cu-bar search" style="background-color: #6739B6;">
			<view class="cu-avatar round" :style="{ backgroundImage:'url(' + (!isLogin?'../../static/img/noLoginAvatar.png':avatar) + ')' }"></view>
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索游戏" confirm-type="search"></input>
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
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				isLogin: uni.getStorageSync("login"),
				avatar: uni.getStorageSync("avatar")
			};
		},
		onShow() {
			this.refresh();
		},
		methods: {
			refresh() {
				this.isLogin = uni.getStorageSync("login");
				this.avatar = uni.getStorageSync("avatar");
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
			}
		}
	}
</script>

<style>
</style>
