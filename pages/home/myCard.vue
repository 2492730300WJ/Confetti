<template>
	<view>
		<cu-custom bgImage="" :isBack="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="card bg-gradual-Topic">

			<view class="my-card shadow-blur bg-img bg-mask" :style="{backgroundImage:'url('+user.avatar+')'}">
				<view class="share">
					<view class="share-left">
						<text class="cuIcon-hotfill text-white">{{user.hot}}</text>
						<text class="cuIcon-myfill text-white marginLeft">{{user.fans}}</text>
						<text class="cuIcon-likefill text-white marginLeft">{{user.follow}}</text>
					</view>
					<view class="share-right">
						<text class="cuIcon-share text-white">分享</text>
					</view>
				</view>
				<view class="avatar">
					<view class="cu-avatar round xl" :style="{backgroundImage:'url('+user.avatar+')'}"></view>
				</view>
				<view class="nickname">
					<text class="text-white text-bold" style="font-size: 45rpx;">{{user.nickname}}</text>
				</view>
				<view class="nickname margin-top">
					<text class="text-white text-bold" style="font-size: 30rpx;">{{user.description}}</text>
				</view>
				<view class="follow-msg marginTop">
					<view class="btn-view follow round">关注</view>
					<view style="width: 20px;"></view>
					<view class="btn-view msg round" @tap="hrefChat">私信</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					nickname: "haha",
					follow: '11.2k',
					fans: 100,
					hot: 20,
					avatar: '../../static/img/initAvatar.jpg',
					description: '一个神经病，无聊的神经病'
				}
			}
		},
		onLoad(option) {
		},
		methods: {
			hrefChat() {
				uni.navigateTo({
					url: "chatRoom"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.marginLeft {
		margin-left: 14rpx;
	}

	.card {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.my-card {
		width: 85vw;
		position: relative;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		height: 70vh;
		border-radius: 10px;

		.share {
			position: absolute;
			top: 0;
			width: 100%;
			padding: 15rpx 20rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.share-right {
				margin-left: auto;
			}
		}

		.marginTop {
			margin-top: 100rpx;
		}

		.follow-msg {
			width: 100%;
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;

			.btn-view {
				background-color: rgba(0, 0, 0, 0);
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 2px 25px;
			}

			.follow {
				border: 1px solid #F8D347;
				color: #F8D347;
			}

			.msg {
				border: 1px solid orange;
				color: orange;
			}
		}

		.fans-info {
			display: flex;
			align-items: center;
			width: 100%;

			.list {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				flex: 1;
				height: 100%;

				.num {
					display: flex;
					align-items: center;

					text {
						color: #FFFFFF;
						font-size: 36rpx;
						font-weight: bold;
					}
				}

				.title {
					display: flex;
					align-items: center;
					margin-top: 5rpx;

					text {
						color: #FFFFFF;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
