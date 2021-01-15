<template>
	<view class="page" :style="!isLogin?'background-color:#F6F6F6':''">
		<view class="my-top bg-topic-theme">
			<!-- head -->
			<view class="user-info" @click="onUserInfo">
				<view class="cu-avatar round xl margin-left margin-right" :style="{ backgroundImage:'url(' + (!isLogin?'../../static/img/noLoginAvatar.png':user.avatar) + ')' }">
					<view v-if="isLogin" class="cu-tag badge" :class="1%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
					<view v-if="isLogin" class="userLevel round shadow">
						<text class="text-yellow text-Abc text-sm">Lv {{user.leavel}}</text>
					</view>
				</view>
				<view v-if="!isLogin" class="info" @tap="hrefLogin">
					<text class="text-black text-bold text-lg">未登录，点击登录~</text>
				</view>
				<view v-if="isLogin" class="info">
					<view class="nickname">
						<text>{{user.nickname}}</text>
					</view>
					<view class="rank">
						<view class="cu-progress round ">
							<view class="bg-olive" :style="[{ width:progressWidth}]"></view>
						</view>
						<view class="grow round marginLeft">
							<text class="text-white text-xs">成长值</text>
							<text class="text-white marginLeft text-xs">{{user.grow}}</text>
							<text class="text-white marginLeft cuIcon-right text-xs"></text>
						</view>
					</view>
				</view>
			</view>

			<!-- 关注/粉丝、热度 -->
			<view v-if="isLogin" class="focus-area">
				<view class="list" @click="follow">
					<view class="num">
						<text class="text-black text-bold">{{user.follow}}</text>
					</view>
					<view class="title">
						<text>关注</text>
					</view>
				</view>
				<view class="list" @click="fans">
					<view class="num">
						<text class="text-black text-bold">{{user.fans}}</text>
					</view>
					<view class="title">
						<text class="text-black">粉丝</text>
					</view>
				</view>
				<view class="list">
					<view class="num">
						<text class="text-black text-bold">{{user.hot}}</text>
					</view>
					<view class="title">
						<text class="text-black">热度</text>
					</view>
				</view>
			</view>

			<view v-if="isLogin" class="my-card" @click="showCard" :style="isShowCard?'bottom:0rpx':'-70rpx'">
				<image class="bg-card" src="../../static/img/card_son.jpg"></image>
				<view class="label-name">
					<text class="text-white">我的名片</text>
					<text class="text-white" style="margin-left: auto;">查看</text>
				</view>
			</view>
		</view>

		<view v-if="!isLogin" class="noLogin-img">
			<image src="../../static/empty/empty_groupon.png"></image>
		</view>
		<view v-if="!isLogin" class="noLogin-text" @tap="hrefLogin">
			<text class="text-gray text-lg">请先登陆~</text>
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
				progressWidth: "15%",
				isLogin: false,
				isShowCard: false,
				user: {
					grow: 854,
					leavel: 96
				}
			}
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
					this.isLogin = false;
					this.isShowCard = false;
				} else {
					var that = this;
					uni.request({
						url: that.$Url + '/user/info', //请求接口
						header: {
							'content-type': 'application/json; charset=UTF-8', //自定义请求头信息
							'refreshToken': uni.getStorageSync("refreshToken"),
							'token': uni.getStorageSync("token"),
						},
						method: 'POST',
						data: {
							userId: uni.getStorageSync("userId")
						},
						success: (res) => { //请求成功后返回
							console.log(res)
							if (res.data.code == 200) {
								that.user.nickname = res.data.data.user.userName;
								that.user.follow = this.formatNumber(res.data.data.user.follow);
								that.user.fans = this.formatNumber(res.data.data.user.fans);
								that.user.hot = this.formatNumber(res.data.data.user.hot);
								that.user.avatar = res.data.data.user.avatar;
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
								this.isLogin = false;
								this.isShowCard = false;
								uni.setStorageSync('login', false)
								uni.setStorageSync('avatar', null);
								return;
							}
						}
					});
				}

			},
			formatNumber(num) {
			    return num >= 1e4 && num < 1e8 ? (num / 1e4).toFixed(1) + '万' : num >= 1e8 ? (num / 1e8).toFixed(1) + '亿' : num
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
			/**
			 * 用户信息点击
			 */
			onUserInfo() {},
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

	.myoperate {
		width: 94%;
		margin: 20rpx auto;
		margin-left: 3%;
		border-radius: 20rpx;
		overflow: hidden;
	}
</style>
