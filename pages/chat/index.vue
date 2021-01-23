<template>
	<view>
		<view :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="this.$Color">
				<view class="cu-avatar round" :style="{ backgroundImage:'url(' + (!isLogin?'../../static/img/noLoginAvatar.png':avatar) + ')' }"></view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					消息列表
				</view>
				<view class="action" :style="[{top:StatusBar + 'px'}]">
					<text>好友列表</text>
				</view>
			</view>
		</view>
		<!-- 消息列表 -->
		<view class="cu-list menu-avatar">
			<view class="cu-item cur" @click="ListClick(item)" v-for="(item, key) in friends" :key="key" :id="item.friendId">
				<view class="cu-avatar radius lg" :style="'background-image:url(' + item.avatar +  ');'">
					<view class="cu-tag badge"></view>
				</view>
				<view class="content">
					<view>
						<view class="text-cut">{{item.friendName}}</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut"></view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cuIcon-notice_forbid_fill text-gray"></view>
				</view>
			</view>
		</view>
		<view style="height: 90px;text-align: center;" class="text-cut text-grey">
		</view>
		<view class="cu-bar tabbar bg-white margin-top-xl foot">
			<view class="action text-gray" @click="toIndex">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action" :class="this.$BarColor">
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
				modalName: null,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isLogin: uni.getStorageSync("login"),
				avatar: uni.getStorageSync("avatar"),
				friends: []
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
			this.isLogin = uni.getStorageSync("login");
			this.avatar = uni.getStorageSync("avatar");
			this.getFriends();
			this.$forceUpdate();
		},
		methods: {
			getFriends() {
				let that = this;
				uni.request({
					url: that.$Url + '/chat/friend', //请求接口
					header: {
						'content-type': 'application/json; charset=UTF-8', //自定义请求头信息
					},
					method: 'POST',
					data: {
						userId: uni.getStorageSync("userId")
					},
					success: (res) => { //请求成功后返回
						console.log(res)
						if (res.data.code == 200) {
							that.friends = [];
							that.friends = [].concat(res.data.data.friends);
							that.$forceUpdate();
						} else {
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '请求数据失败'
							});
							return;
						}
					}
				});
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			// 选择消息
			ListClick(item) {
				console.log(item.friendId)
				uni.navigateTo({
					url: "/pages/chat/chat?friendId=" + item.friendId + "&friendName=" + item.friendName
				})
			},
			toGame() {
				uni.switchTab({
					url: "/pages/game/index"
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
		},
	}
</script>

<style>
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
