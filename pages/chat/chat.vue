<template>
	<view>
		<cu-custom :bgColor="this.$Color" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<scroll-view class="cu-chat" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
		 :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
			<!-- 布局 -->
			<view v-for="(item, key) in msgList" :key="key" :id="item.id">
				<view v-if="item.isMy == 'Y'" class="cu-item self">
					<view class="main">
						<view class="content bg-green shadow">
							<text>{{item.message}}</text>
						</view>
					</view>
					<view class="cu-avatar radius" :style="'background-image:url(' + item.avatar +  ');'"></view>
					<view class="date">{{item.time}}</view>
				</view>
				<view v-if="item.isMy == 'N'" class="cu-item">
					<view class="cu-avatar radius" :style="'background-image:url(' + item.avatar +  ');'"></view>
					<view class="main">
						<view class="content bg-green shadow">
							<text>{{item.message}}</text>
						</view>
					</view>
					<view class="date">{{item.time}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :value="text" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur" @input="changeText"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @click="sendMessage">发送</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				text: "",
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',
				msgList: [],
				title: "",
				friendId:""
			};
		},
		onShow() {
			let that = this;
			uni.closeSocket();
			uni.connectSocket({
				url: 'ws://47.102.121.70:9999/websocket/' + uni.getStorageSync("userId")
				// url: 'ws://localhost:9999/websocket/' + uni.getStorageSync("userId")
			});
			uni.onSocketOpen((res) => {
				console.log('连接成功', res);
			});
			uni.onSocketMessage(function(res) {
				that.scrollAnimation = true
				console.log('收到服务器内容：' + res.data);
				let msg = JSON.parse(res.data)
				msg.id = 'msg' + (Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36))
				msg.classify = "user"
				if (!that.msgList) {
					that.msgList = [];
				}
				that.msgList.push(msg)
				// 滚动到最新的消息
				that.scrollToView = msg.id
				that.$forceUpdate()
			});
			that.$forceUpdate()
		},
		onLoad(option) {
			this.friendId = option.friendId
			this.title = option.friendName;
			this.getMsg();
			this.$forceUpdate();
		},
		methods: {
			getMsg(){
				let that = this;
				uni.request({
					url: that.$Url + '/chat/private-msg', //请求接口
					header: {
						'content-type': 'application/json; charset=UTF-8', //自定义请求头信息
					},
					method: 'POST',
					data: {
						fromUser: uni.getStorageSync("userId"),
						toUser: that.friendId
					},
					success: (res) => { //请求成功后返回
						console.log(res)
						if (res.data.code == 200) {
							that.msgList = [];
							that.msgList = [].concat(res.data.data.msg);
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
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			sendMessage(e) {
				console.log(1)
				if (this.text != "" && this.friendId != "") {
					console.log(2)
					let message = {
						fromUser: uni.getStorageSync("userId"),
						toUser: this.friendId,
						message: this.text,
						type: 1,
						msgtype: 1
					}
					uni.sendSocketMessage({
						data: JSON.stringify(message)
					});
					this.text = ""
				}
			},
			changeText(e) {
				this.text = e.detail.value;
			},
			// 查看历史记录
			loadHistory() {
				console.log('查看历史记录');
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 100upx;
	}
</style>

<style scoped lang="scss">
	.chatroomBox {
		display: flex;
		flex-direction: column;
		height: 100%;

		.chat-top {
			flex-grow: 1;
			overflow: hidden;

			.msg-list {
				height: 100%
			}

			.h-bg {
				position: absolute;
				height: 100%;
				width: 100%;

				image {
					width: 100%;
					height: 100%;
					filter: blur(1px);
					opacity: 0.7;
				}
			}
		}

		.chat-bottom {
			width: 100%;
			min-height: 100rpx;
			background: #f1f1f1;
		}
	}

	.my {
		padding: 20rpx 0;
		width: 100%;
		display: flex;
		justify-content: flex-end;

		.chat-list-content {
			margin-right: 10rpx;
			max-width: 70%;
			min-height: 50rpx;
		}

		.bubble {
			background-color: #f06c7a;
			color: #fff;
			border-radius: 10rpx;
			padding: 15rpx 20rpx;
			display: flex;
			align-items: center;
			font-size: 32rpx;
			word-break: break-word;

			&.img {
				background-color: transparent;
				padding: 0;
				overflow: hidden;

				image {
					flex: 1;
					max-width: 350rpx;
					max-height: 350rpx;
				}
			}

		}

		.voice {
			.my-voice {
				transform: rotate(180deg);
				font-size: 42rpx;
				display: flex;
				align-items: center;
				color: #fff;
			}

			.my-voice:after {
				content: " ";
				width: 100%;
				height: 100%;
				border-radius: 100%;
				position: absolute;
				box-sizing: border-box;
			}

			.length {
				font-size: 28rpx;
				margin-right: 20rpx;
				word-break: keep-all;
			}

		}

		.play {
			@keyframes my-play {
				0% {
					transform: translateX(-80%);
				}

				100% {
					transform: translateX(0%);
				}
			}

			.my-voice:after {
				border-right: solid 10rpx rgba(240, 108, 122, .5);
				animation: my-play 1s linear infinite;
			}

		}

		.chat-list-head {
			flex-shrink: 0;
			width: 80rpx;
			height: 80rpx;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
			}
		}
	}

	.other {
		flex-direction: row-reverse;

		.chat-list-content {
			margin-right: 0;
			margin-left: 10rpx;
		}

		.bubble {
			background-color: #fff;
			color: #333;
		}

		.voice {
			flex-direction: row-reverse;

			.my-voice {
				transform: rotate(0deg);
				color: #333;
			}
		}

		.play {
			.my-voice:after {
				border-right: solid 10rpx rgba(255, 255, 255, .5);
			}

		}
	}
</style>
