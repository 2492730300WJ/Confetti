<template>
	<view class="game">
		<view class="cu-bar" style="z-index: 99;">
			<view class="action" @click="Back">
				<text class="cuIcon-back text-gray" style="color: #FFFFFF;">返回</text> 
			</view>
			<view class="content text-bold" style="color: #FFFFFF;">
				{{'第'+(Number(this.proBlemIndex))+'关'}}
			</view>
		</view>
		<view class="problemBox">
			<view class="oldman">
				<image src="./static/laotou.png" class="img" mode="widthFix"></image>
			</view>
			<view class="problemImg">
				<image :src="'http://www.qn.xiaozhucyx.com/'+problemImg" class="img" mode="widthFix"></image>
			</view>
		</view>
		<view class="answer">
			<view class="answerBox" v-for="(item,index) in answerStr" :key="index" @tap="clearAnswer(index)">
				<view class="answerText" >
					<text class="text">{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="btnBox">
			<view class="btn" @tap="promptAnswer" ><text class="title">提示</text></view>
			<view class="time">
				<image src="./static/time.png" class="timeImg"></image>
				<text class="countdown">{{countdownNum}}s</text>
			</view>
			<view class="btn">
				<button type="default" open-type="share"><text class="title">求助</text></button>
				</view>
		</view>
		
		<view class="optionalAnswer">
			<view class="answerBox" v-for="(item,index) in optionalAnswer" :key="index" @tap="selectAnswer(index)">
				<view class="answerText" v-if="item!=''" >
					<text class="text">{{item}}</text>
				</view>
			</view>
		</view>
		<view v-if="checkResult=='success'">
			<SuccessModal :text="description" @next="nextCheckpoint" />
		</view>
		<view v-if="checkResult=='error'">
			<FailModal @continue="continueCheckpoint" @jump="jumpCheckpoint" />
		</view>
	</view>
</template>

<script>
	import appData from "./data.js"
	import SuccessModal from "./components/successModal.vue"
	import FailModal from "./components/failModal.vue"
	import _ from "lodash"
	const audioContext = uni.createInnerAudioContext();
	audioContext.src = "./static/btn.mp3";
	let time = null
	let countdownTime = null
	export default {
		components:{SuccessModal,FailModal},
		data() {
			return {
				problemImg:'',
				answerStr:'',
				optionalAnswer:'',
				proBlemIndex:0,
				checkResult:'await',
				description:'',
				promptNum:0,
				countdownNum:10
			};
		},
		onLoad({index}) {
			this.proBlemIndex = index
		},
		onShow() {
			this.parsingData()
		},
		
		methods:{
			Back(){
				uni.navigateBack({
					delta:1
				})
			},
			//解析数据
			parsingData(){
				this.countdownNum=10
				this.promptNum=0
				this.checkResult = 'await'
				this.problemImg = appData[this.proBlemIndex].problem
				audioContext.play();
				let arr = []
				for(let i=0;i<appData[this.proBlemIndex].answer.length;i++){
					arr.push({index:-1,text:''})
				}
				this.answerStr = arr
				
				let tmpArr = []
				let disturbStr = appData[this.proBlemIndex].disturb
				for(let i=0;i<disturbStr.length;i++){
					tmpArr.push(disturbStr[i])
				}
				this.optionalAnswer =_.shuffle(tmpArr) 
				this.description = appData[this.proBlemIndex].description
				
				this.countdown()
			},
			
			//填充答案
			selectAnswer(pickIndex){
				audioContext.src = "./static/btn.mp3";
				audioContext.play()
				
				let newList = this.answerStr
				try{
					newList.forEach((item,index)=>{
						if(item.text==''){
							newList[index].text=this.optionalAnswer[pickIndex]
							newList[index].index=pickIndex
							this.optionalAnswer[pickIndex] = ''
							throw new Error("EndIterative");
						}
					})
				}catch(error){
					if (error.message != "EndIterative") throw error;
				}
				this.answerStr = newList
				this.checkAnswer()
			},
			
			//清除答案
			clearAnswer(index){
				audioContext.src = "./static/btn.mp3";
				audioContext.play()
				let newList = this.answerStr
				this.optionalAnswer[newList[index].index] = newList[index].text
				newList[index].text= ''
				newList[index].index=-1
				this.answerStr = newList
			},
			
			//检测答案
			checkAnswer(){
				let result = ''
				this.answerStr.find((item)=>{
					result+=item.text
				})
				
				if(result.length != appData[this.proBlemIndex].answer.length){
					this.checkResult = 'await'
					return
				}
				if(result == appData[this.proBlemIndex].answer){
					audioContext.src = "./static/success.mp3";
					audioContext.play()
					this.checkResult = 'success'
					clearInterval(countdownTime)
					console.log('回答正确')
				}else{
					audioContext.src = "./static/fail.mp3";
					audioContext.play()
					console.log('回答错误')
					clearInterval(countdownTime)
					this.checkResult = 'error'
				}
			},
			
			//下一关
			nextCheckpoint(){
				audioContext.src = "./static/btn.mp3";
				audioContext.play()
				if(this.proBlemIndex>=appData.length-1){
					uni.showToast({
						title:'全部通关了',
						duration: 2000,
						complete:()=>{
							time = setTimeout(()=>{
								wx.reLaunch({
								  url: '/pages/index/index'
								})
							},2000)
							
						}
					})
					return
				}
				this.proBlemIndex++
				uni.setStorageSync('checkpint',this.proBlemIndex)
				this.parsingData()
			},
			
			//继续游戏
			continueCheckpoint(){
				audioContext.src = "./static/btn.mp3";
				audioContext.play()
				this.checkResult = 'await'
				this.parsingData()
			},
			
			//跳过本关
			jumpCheckpoint(){
				audioContext.src = "./static/btn.mp3";
				audioContext.play()
				this.nextCheckpoint()
			},
			
			//提示答案 开通广告后添加广告
			promptAnswer(){
				audioContext.src = "./static/btn.mp3";
				audioContext.play()
				this.optionalAnswer.forEach((item,index)=>{
					if(item==appData[this.proBlemIndex].answer[this.promptNum]){
						this.clearAnswer(this.promptNum)
						this.selectAnswer(index)
					}
				})
				this.promptNum++
			},
			
			//倒计时
			countdown(){
				if(countdownTime){
					clearInterval(countdownTime)
				}
				countdownTime = setInterval(()=>{
					this.countdownNum--
					if(this.countdownNum<=0){
						clearInterval(countdownTime)
						audioContext.src = "./static/fail.mp3";
						audioContext.play()
						this.checkResult = 'error'
					}
					
				},2000)
			}
			
			
		},
		
		onShareAppMessage(res) {
			audioContext.src = "./static/btn.mp3";
			audioContext.play()
			if (res.from === 'button') {
				return {
					title: '大哥大姐们啦，帮帮我吧，脑袋不够用了，太难了',
					path: '/pages/guess2/game?index='+this.proBlemIndex
				}
			}
		},
		onUnload() {
			if(time){
				clearTimeout(time)
			}
			if(countdownTime){
				clearInterval(countdownTime)
			}
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.game{
		padding: 0 10px;
		background-color: #FED03B;
		height: 100vh;
	}
	.problemBox{
		
		width: 100%;
		height: 519rpx;
		background-image:url('http://www.qn.xiaozhucyx.com/problembg.png');
		background-size:100%;
		background-repeat: no-repeat;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		.problemImg{
			width: 350rpx;
			.img{
				width: 100%;
			}
		}
	}
	.oldman{
		width: 220rpx;
		position:absolute;
		left: -10px;
		bottom: 0;
		.img{
			width: 100%;
		}
	}
	.answer{
		margin-top: 30px;
		display:flex;
		justify-content: center;
	}
	.answerBox{
		width: calc(100% / 6);
		height: 0;
		padding-bottom: calc(100% / 6);
		position: relative;
	}
	.answerText{
		position: absolute;
		left: 10rpx;
		right: 10rpx;
		bottom: 10rpx;
		top:10rpx;
		background: #FFEAA9;
		border: solid 2px #DF0024;
		display: flex;
		align-items: center;
		justify-content: center;
		.text{
			font-size:60rpx ;
		}
	}
	
	.btnBox{
		display: flex;
		justify-content: space-around;
		margin-top: 80rpx;
		.btn{
			width: 200rpx;
			height: 70rpx;
			background: #DF0024;
			border-radius: 35rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			&:active{
				opacity: .8;
			}
			.title{
				color: white;
			}
		}
		.time{
			display: flex;
			align-items: center;
			.timeImg{
				width: 50rpx;
				height: 50rpx;
			}
			.countdown{
				margin-left: 10rpx;
				color: white;
				font-size: 40rpx;
			}
		}
	}
	.optionalAnswer{
		margin-top:80rpx;
		display: flex;
		flex-wrap: wrap;
	}
	
	button{
		background-color:transparent !important;
		&:after{
				border: none;
		}
	}
</style>
