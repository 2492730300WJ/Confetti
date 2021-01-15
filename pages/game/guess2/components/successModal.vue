<template>
	<view class="modal">
		<view class="window">
			<view class="successImg">
				<image class="img" src="../static/success.png" mode="widthFix"></image>
			</view>
			<view class="successText">
				回答正确
			</view>
			<view class="determinateText">
				<view class="title">解释</view>
				<view class="subTitle">
					{{text}}
				</view>
			</view>
			<view class="btnBox">
				<view class="btn" @tap="nextCheckpoint">下一关</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:['text'],
		methods:{
			nextCheckpoint(){
				this.$emit('next')
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
			min-height: 480rpx;
			background: white;
			border-radius: 20rpx;
			position: relative;
			animation:show 1s 1;
			.successText{
				margin-top: 100rpx;
				text-align: center;
				color:#2AB46E ;
				font-size: 60rpx;
				font-weight: bold;
			}
		}
		@keyframes show
		{
			from {opacity:0}
			to {opacity:1}
		}
		
		.successImg{
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
	.determinateText{
		padding: 20rpx;
		.title{
			font-weight: bold;
			font-size: 35rpx;
		}
		.subTitle{
			font-size: 30rpx;
		}
	}
	
	.btnBox{
		margin: 20rpx 0;
		display: flex;
		justify-content: center;
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
