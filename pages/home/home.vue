<template>
	<view class="page">
		<view class="my-top radius" :class="this.$Color">
			<!-- head -->
			<view class="user-info">
				<view @click="onUserInfo" class="cu-avatar round xl margin-left margin-right" :style="{ backgroundImage:'url(' + (!isLogin?'../../static/img/noLoginAvatar.png':user.avatar) + ')' }">
					<view v-if="isLogin" class="cu-tag badge" :class="1%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
					<view v-if="isLogin" class="userLevel round">
						<text class="text-yellow text-Abc text-sm">Lv {{user.level}}</text>
					</view>
				</view>
				<view v-if="!isLogin" class="info" @tap="hrefLogin">
					<text class="text-black text-bold text-lg">未登录，点击登录~</text>
				</view>
				<view v-if="isLogin" class="info">
					<view class="nickname">
						<text>{{user.userName}}</text>
					</view>
					<view class="rank">
						<view class="cu-progress round ">
							<view class="bg-olive" :style="[{ width:user.progressWidth}]"></view>
						</view>
						<view class="grow round margin-left-sm bg-white">
							<text class="text-white text-xs">成长值</text>
							<text class="text-white marginLeft text-xs">{{user.grow}}</text>
							<text class="text-white marginLeft cuIcon-right text-xs"></text>
						</view>
					</view>
				</view>
			</view>

			<!-- <view v-if="isLogin" class="my-card" @click="showCard" :style="isShowCard?'bottom:0rpx':'-70rpx'">
				<image class="bg-card" src="../../static/img/card_son.jpg"></image>
				<view class="label-name">
					<text class="text-white">我的名片</text>
					<text class="text-white" style="margin-left: auto;">查看</text>
				</view>
			</view> -->
		</view>
		<view  v-if="isLogin" class="grid col-3 bg-white shadow">
			<view class="" @click="follow">
				<view class="padding radius text-center">
					<view class="text-xl text-orange" style="font-weight: 400;">{{user.follow}}</view>
					<view class="margin-top-sm text-Abc">关注</view>
				</view>
			</view>
			<view class="" @click="fans">
				<view class="padding radius text-center">
					<view class="text-lg text-blue" style="font-weight: 400;">{{user.fans}}</view>
					<view class="margin-top-sm">粉丝</view>
				</view>
			</view>
			<view class="" @click="hot">
				<view class="padding radius text-center">
					<view class="text-lg text-green" style="font-weight: 400;">{{user.hot}}</view>
					<view class="margin-top-sm">热度</view>
				</view>
			</view>
		</view>
		<view v-if="isLogin">
			<view class=" card-menu cu-list grid margin-top" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" @click="switchClick(item.method)">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">GitHub</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-qr_code text-green"></text>
						<text class="text-grey">微信小程序</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-profile text-blue"></text>
						<text class="text-grey">关于我们</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-phone text-orange"></text>
						<text class="text-grey">联系我们</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="toJournal">
					<view class="content">
						<text class="cuIcon-edit text-green"></text>
						<text class="text-grey">更新日志</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-grey"></text>
						<text class="text-grey">问题反馈</text>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 90px;text-align: center;" class="text-cut text-grey">
		</view>
		<view class="cu-bar tabbar bg-white margin-top-xl foot">
			<view class="action text-gray" @click="toIndex">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action text-gray" @click="toChat">
				<view class="cuIcon-weixin"></view>聊天
			</view>
			<view class="action text-gray add-action" @click="toBuild()">
				<button class="cu-btn cuIcon-add shadow" :class="this.$Color"></button>
				发布
			</view>
			<view class="action text-gray" @click="toGame">
				<view class="cuIcon-game"></view>游戏
			</view>
			<view class="action" :class="this.$BarColor">
				<view class="cuIcon-my"></view>我的
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				scrollTop: 0,
				isLogin: false,
				isShowCard: false,
				user: {},
				cuIconList: [{
					cuIcon: 'magic',
					color: 'red',
					badge: 0,
					name: '天气',
					method: 'toColor'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像',
					method: 'toColor'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像',
					method: 'toColor'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知',
					method: 'toColor'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜',
					method: 'toColor'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤',
					method: 'toColor'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现',
					method: 'toColor'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助',
					method: 'toColor'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答',
					method: 'toColor'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权',
					method: 'toColor'
				}],
				gridCol: 5,
				gridBorder: false,
			}
		},
		onLoad() {
			uni.hideTabBar();
		},
		onShow() {
			this.initMy();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			...mapMutations("user", ["setUser"]),
			initMy() {
				// 校验是否存在refreshToken
				if (uni.getStorageSync("refreshToken").length == 0) {
					uni.redirectTo({
						url:"/pages/index/login"
					})
				} else {
					var that = this;
					uni.request({
						url: that.$Url + '/user/info', //请求接口
						header: {
							'content-type': 'application/json; charset=UTF-8', //自定义请求头信息
							'refreshToken': uni.getStorageSync("refreshToken"),
							'Authorization': uni.getStorageSync("token"),
						},
						method: 'POST',
						data: {
							userId: uni.getStorageSync("userId")
						},
						success: (res) => { //请求成功后返回
							console.log(res)
							if (res.data.code == 200) {
								that.user = res.data.data.user;
								that.user.follow = this.formatNumber(res.data.data.user.follow);
								that.user.fans = this.formatNumber(res.data.data.user.fans);
								that.user.hot = this.formatNumber(res.data.data.user.hot);
								uni.setStorageSync('avatar', res.data.data.user.avatar);
								that.isLogin = true;
								that.isShowCard = true;
								that.$forceUpdate();
							} else {
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: '登录过期请重新登录'
								});
								uni.redirectTo({
									url:"/pages/index/login"
								})
							}
						}
					});
				}

			},
			formatNumber(num) {
				return num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(1) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(1) + 'W' : num
			},
			showCard() {
				uni.navigateTo({
					url: "../home/myCard"
				})
			},
			login() {
				uni.navigateTo({
					url: "../index/login"
				})
			},
			follow() {
				uni.navigateTo({
					url: "../../view/follow"
				})
			},
			fans() {
				uni.navigateTo({
					url: "../../view/fans"
				})
			},
			toJournal() {
				uni.navigateTo({
					url: "../home/view/journal"
				})
			},
			toGame() {
				uni.switchTab({
					url: "/pages/game/index"
				})
			},
			toBuild() {
				uni.navigateTo({
					url: "/pages/blog/build"
				})
			},
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			toChat() {
				uni.switchTab({
					url: "/pages/chat/index"
				})
			},
			switchClick(method) {
				if (method == 'toColor') {
					uni.navigateTo({
						url: "/pages/home/view/color"
					})
				}
			},
			/**
			 * 用户信息点击
			 */
			onUserInfo() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/home/view/info'
					})
				}
			},
			//登陆
			hrefLogin() {
				uni.navigateTo({
					url: '../index/login'
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	@import 'my.scss';

	.marginLeft {
		margin-left: 2px;
	}
</style>
