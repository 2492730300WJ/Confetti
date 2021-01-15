<template>
	<view class="modal">
		<view class="window">
			<view class="failImg">
				<image class="img" src="../static/fail.png" mode="widthFix"></image>
			</view>
			<view class="failText">
				回答错误
			</view>
			<view class="btnBox">
				<view class="btn" @tap="continueBtn">再来一次</view>
				<view class="btn" @tap="jumpCheckpoint">跳过本关</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		methods:{
			continueBtn(){
				this.$emit('continue')
			},
			jumpCheckpoint(){
				this.$emit('jump')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal{
		position: absolute;
		top:0;
		left:0;
		bottom: 0;
		right: 0;
		background:rgba($color: #000000, $alpha: .6);
		display: flex;
		align-items: center;
		justify-content: center;
		.window{
			width: 85%;
			min-height: 420rpx;
			background: white;
			border-radius: 20rpx;
			position: relative;
			animation:show 1s 1;
			.failText{
				margin-top: 140rpx;
				text-align: center;
				color:#EE3435 ;
				font-size: 60rpx;
				font-weight: bold;
			}
		}
		@keyframes show
		{
			from {opacity:0}
			to {opacity:1}
		}
		
		.failImg{
			position: absolute;
			height: 400rpx;
			// background: red;
			top:-246rpx ;
			width: 100%;
			display: flex;
			justify-content: center;
			
			.img{
				width: 400rpx;
			}
		}
	}
	
	.btnBox{
		margin:80rpx 0 20rpx 0;
		display: flex;
		justify-content: space-around;
		.btn{
			width: 220rpx;
			height: 70rpx;
			border-radius: 35rpx;
			background: #EE3435;
			color: white;
			text-align: center;
			line-height: 70rpx;
			&:active{
				opacity: .8;
			}
		}
	}
</style>
