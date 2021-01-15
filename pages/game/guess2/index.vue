<template>
	<view class="content" style="background-color: #FED03B;height: 100vh;">
		<view class="cu-bar" style="z-index: 99;">
			<view class="action" @click="Back">
				<text class="cuIcon-back text-gray" style="color: #FFFFFF;">返回</text> 
			</view>
			<view class="content text-bold" style="color: #FFFFFF;">
				看 图 猜 成 语
			</view>
		</view>
		<view class="logo">
				<image class="img" src="./static/logo.png" mode="widthFix"/>
		</view>
		<view class="coverImg">
			<image src="./static/fm.png" mode="widthFix"></image>
		</view>
		<view class="btn">
			<view class="startGameBtn" @tap="startGame">
					开始游戏
			</view>
		</view>
	</view>
</template>

<script>
	const audioContext = uni.createInnerAudioContext();
	audioContext.src = "../static/btn.mp3";
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			Back(){
				uni.navigateBack({
					delta:1
				})
			},
			startGame(){
				audioContext.play();
				uni.navigateTo({
					url:'/pages/game/guess2/checkpoint'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.logo{
		margin-top: 60px;
		width: 100%;
		display: flex;
		justify-content: center;
		.img{
			width: 80%;
		}
	}
	.coverImg{
		margin-top: 200rpx;
		display: flex;
		justify-content: center;	
	}
	.btn{
		width: 100%;
		display: flex;
		margin-top: 150rpx;
		justify-content: center;
		.startGameBtn{
			width: 70%;
			height: 80rpx;
			background: #E64340;
			color: white;
			border-radius: 50px;
			text-align: center;
			line-height: 80rpx;
			&:active{
				opacity: .8;
			}
		}
	}
</style>
