<template>
	<view class="page" :style="!isLogin?'background-color:#F6F6F6':''">
		<view class="my-top bg-topic-theme bg-gradual-pink radius shadow">
			<!-- head -->
			<view class="user-info">
				<view @click="onUserInfo" class="cu-avatar round xl margin-left margin-right" :style="{ backgroundImage:'url(' + (!isLogin?'../../static/img/noLoginAvatar.png':user.avatar) + ')' }">
					<view v-if="isLogin" class="cu-tag badge" :class="1%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
					<view v-if="isLogin" class="userLevel round shadow">
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

		<view v-if="isLogin">
			<view class=" card-menu cu-list grid margin-top shadow" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
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
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">图标 + 标题</text>
					</view>
				</view>
				<view class="cu-item arrow" >
					<view class="content">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">图片 + 标题</text>
					</view>
				</view>
				<view class="cu-item arrow" >
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">Open-type 按钮</text>
					</button>
				</view>
				<view class="cu-item arrow" >
					<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
						<text class="cuIcon-discoverfill text-orange"></text>
						<text class="text-grey">Navigator 跳转</text>
					</navigator>
				</view>
				<view class="cu-item arrow" >
					<view class="content">
						<text class="cuIcon-emojiflashfill text-pink"></text>
						<text class="text-grey">头像组</text>
					</view>
					<view class="action">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
							<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
						</view>
						<text class="text-grey text-sm">4 人</text>
					</view>
				</view>
				<view class="cu-item arrow" >
					<view class="content">
						<text class="cuIcon-btn text-green"></text>
						<text class="text-grey">按钮</text>
					</view>
					<view class="action">
						<button class="cu-btn round bg-green shadow">
							<text class="cuIcon-upload"></text> 上传</button>
					</view>
				</view>
				<view class="cu-item arrow" >
					<view class="content">
						<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
						<text class="text-grey">标签</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-orange light">音乐</view>
						<view class="cu-tag round bg-olive light">电影</view>
						<view class="cu-tag round bg-blue light">旅行</view>
					</view>
				</view>
				<!-- <view class="cu-item arrow" >
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">文本</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">小目标还没有实现！</text>
					</view>
				</view> -->
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
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				gridCol: 5,
				gridBorder: false,
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

	.myoperate {
		width: 94%;
		margin: 20rpx auto;
		margin-left: 3%;
		border-radius: 20rpx;
		overflow: hidden;
	}
</style>
