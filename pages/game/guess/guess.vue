<template>
	<view>
	<view class="cu-bar" style="z-index: 99;">
		<view class="action" @click="Back">
			<text class="cuIcon-back text-gray" style="color: #FFFFFF;">返回</text> 
		</view>
		<view class="content text-bold" style="color: #FFFFFF;">
			看 图 猜 成 语
		</view>
	</view>
	<view class="container">

		<image src="/static/bg.jpg" mode="aspectFill"></image>
		<view class="flex_col">
			<view class="content_box">
				<view class="flex_col flex_space top_label">
					<view>称号：{{title}}</view>
					<view>金币：{{gold}}</view>
					<view>关卡：{{passIndex+1}}</view>
				</view>
				<view class="img_box">
					<image :src="list[passIndex][0]" mode="aspectFill"></image>
					<view class="btn flex_col flex_space">
						<view class="b1" @tap="useHelp">提 示</view>
						<view class="b2" @tap="share">分 享</view>
					</view>
				</view>
				<view class="flex_col flex_space selected_box">
					<view v-for="(item,index) in selected" class="item" :key="index" :data-index="index" @tap="cancelPicker">{{item.txt}}</view>
					<view class="reset" @tap="resetPicker">重选</view>
				</view>
				<view class="select_box flex_col flex_wrap">
					<view v-for="(item,index) in selectList" :key="index">
						<view :data-index="index" @tap="picker">{{item}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import list from './data.js'
	export default {
		data() {
			return {
				list:list.dataList,
				passIndex:0,
				gold:20,
				selected:[{},{},{},{}],
				selectList:[]
			}
		},
		onLoad() {
			this.setPassInfo();
		},
		computed:{
			title(){
				if(this.passIndex<10){
					return '童生';
				}
				if(this.passIndex<30){
					return '秀才';
				}
				if(this.passIndex<50){
					return '举人';
				}
				if(this.passIndex<100){
					return '贡士';
				}
				if(this.passIndex<200){
					return '进士';
				}
				if(this.passIndex<200){
					return '探花';
				}
				if(this.passIndex<500){
					return '榜眼';
				}
				return '状元';
			}
		},
		methods: {
			Back(){
				uni.navigateBack({
					delta:1
				})
			},
			/* 设置关卡信息 */
			setPassInfo(){
				/* 初始化默认已选择列表 */
				let selectedArr=[];
				for(let i=0;i<4;i++){
					selectedArr.push({
						txt:'',
						index:-1
					})
				}
				
				let info=this.list[this.passIndex][1];
				info=info.split("").sort(()=>{
					/* 随机打乱 */
					return Math.random()>.5 ? -1 : 1;
				});
				
				this.selected=selectedArr;
				this.selectList=info;
			},
			/* 下一关 */
			nextPass(){
				if((this.list.length-1)<=this.passIndex){
					uni.showToast({
						title: '恭喜已通关',
						icon:'success',
						duration: 2000
					});
				}else{
					this.passIndex++;
					this.setPassInfo();
				}
			},
			/* 选择 */
			picker(e){
				let index=Number(e.currentTarget.dataset.index);
				if(this.selectList[index]){
					for(let i=0;i<this.selected.length;i++){
						if(!this.selected[i].txt){
							this.$set(this.selected,i,{
								txt:this.selectList[index],
								index
							});
							this.$set(this.selectList,index,'');
							this.$nextTick(()=>{
								this.verify();
							});
							break;
						}
					}
				}
			},
			/* 答案校验 */
			verify(){
				if(this.findIndex()<0){
					let data=this.list[this.passIndex];
					this.gold+=5;
					uni.showModal({
						title:data[2],
						content:`[释义]:${data[3]}`,
						showCancel:false,
						confirmText:"下一关",
						success:()=>{
							this.nextPass();
						}
					})
				}
			},
			/* 查找错误位置 */
			findIndex(){
				let result=this.list[this.passIndex][2];
				let index=-1;
				for(let i=0;i<this.selected.length;i++){
					if(this.selected[i].txt!=result.charAt(i)){
						index=i;
						break;
					}
				}
				return index;
			},
			/* 重新选择 */
			resetPicker(){
				let selectedArr=[];
				this.selected.forEach((item,index)=>{
					if(item.index>=0){
						this.$set(this.selectList,item.index,item.txt);
					}
					selectedArr.push({
						txt:'',
						index:-1
					});
				});
				this.selected=selectedArr;
			},
			/* 取消选择 */
			cancelPicker(e){
				let index=Number(e.currentTarget.dataset.index);
				if(this.selected[index].index<0){
					return;
				}
				this.$set(this.selectList,this.selected[index].index,this.selected[index].txt);
				this.$set(this.selected,index,{
					txt:"",
					index:-1
				})
			},
			/* 使用帮助 */
			useHelp(){
				if(this.gold<10){
					uni.showToast({
						title: '金币不足',
						icon:'none',
						duration: 2000
					});
					return;
				}
				/* 当前错误项 */
				let errIndex=this.findIndex();
				/* 正确项位置 */
				let selectIndex=this.selectList.findIndex((item,index)=>{
					if(item==this.list[this.passIndex][2].charAt(errIndex)){
						return index;
					}
				})
				/* 当前错误项上已经存在已选值，则将已选值放回选择列表中 */
				if(this.selected[errIndex].index>=0){
					this.$set(this.selectList,this.selected[errIndex].index,this.selected[errIndex].txt);
				}
				this.$set(this.selected,errIndex,{
					txt:this.selectList[selectIndex],
					index:selectIndex
				});
				this.$set(this.selectList,selectIndex,'');
				this.$nextTick(()=>{
					this.gold-=10;
					this.verify();
				});				
			},
			/* 分享 */
			share(){
				uni.showModal({
					title:"欢迎体验看图猜成语",
					content:"1111",
					showCancel:false,
					confirmText:"我知道了"
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	/* 列式弹性盒子 */
	.flex_col {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	/* 行式弹性盒子 */
	.flex_row {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
	}

	/* 弹性盒子弹性容器 */
	.flex_col .flex_grow {
		width: 0;
		flex-grow: 1;
	}

	.flex_row .flex_grow {
		flex-grow: 1;
	}

	/* 弹性盒子允许换行 */
	.flex_col.flex_wrap {
		flex-wrap: wrap;
	}

	/* 弹性盒子居中对齐 */
	.flex_col.flex_center,
	.flex_row.flex_center {
		justify-content: center;
	}

	/* 列式弹性盒子两端对齐 */
	.flex_col.flex_space {
		justify-content: space-between;
	}

	.container {
		// position: relative;
		height: 100%;
		font-size: 28upx;
		color: #333;

		&>image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
		}
		&>view {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
		}
		
		.content_box{
			box-sizing: border-box;
			width: 100%;
			padding: 0 20upx 80upx 20upx;
			
			
			.top_label{
				margin-bottom: 30upx;
				text-align: center;
				color: #0069b7;
				
				&>view{
					box-sizing: border-box;
					background-color: rgba(255,255,255,0.8);
					width: 200upx;
					line-height: 60upx;
					border-radius: 30upx;
					padding: 0 20upx;
				}
			}
		}
		
		.img_box{
			background-color: #0069b7;
			padding: 30upx 40upx;
			border-radius: 8px;
			
			&>image{
				height: 400upx;
				width: 100%;
			}
			
			.btn{
				margin: 20upx 100upx 0 100upx;
				
				&>view{
					color: #fff;
					line-height: 70upx;
					width: 150upx;
					text-align: center;
					border-radius: 35upx;
					font-size: 30upx;
					
					&.b1{
						background-color: #41cf5a;
						
						&:active{
							background-color: #4cd565;
						}
					}
					&.b2{
						background-color: #ffb047;
						&:active{
							background-color: #faba63;
						}
					}
				}
			}
		}
		.selected_box{
			margin: 40upx 100upx;
			&>view{
				width: 80upx;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: 32upx;
				
				&.item{
					background-color: #fff;
					border-radius: 3px;
					color: #0069b7;
				}
				&.reset{
					color: #0069b7;
				}
			}
		}
		.select_box{
			margin: 10upx 50upx 0 50upx;
			&>view{
				width: 20%;
				line-height: 68upx;
				text-align: center;
				margin-bottom: 20upx;
				color: #fff;
				
				&>view{
					height: 68upx;
					width: 68upx;
					margin: 0 auto;
					background-color: #0069b7;
					border-radius: 3px;
					
					&:active{
						background-color: #1e85d7;
					}
				}
			}
		}
	}
</style>
