<template>
	<view>
		<cu-custom :class="this.$Color" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人信息</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">昵称</view>
			<input name="input" :value="user.userName" style="text-align: right;" disabled="false"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">头像</view>
			<view class="cu-avatar round bg-gray" :style="{backgroundImage:'url('+user.avatar+')'}"></view>
		</view>
		<view class="cu-form-group">
			<view class="title">生日</view>
			<picker mode="date" :value="date" :end="new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >=10 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1))+ '-' + new Date().getDate()"
			 @change="DateChange">
				<view class="picker">
					{{date}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">性别</view>
			<switch class='switch-sex' @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">个人宣言</view>
			<input name="input" maxlength="15" :value="user.description" style="text-align: right;" disabled="false"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input name="input" :value="user.phone" disabled="false" style="text-align: right;"></input>
			<view class="cu-capsule radius">
				<view class='cu-tag bg-blue '>
					+86
				</view>
				<view class="cu-tag line-blue">
					中国大陆
				</view>
			</view>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">等级</view>
			<input name="input" :value="user.level" disabled="false" style="text-align: right;"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">成长值</view>
			<input name="input" :value="user.grow" disabled="false" style="text-align: right;"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">粉丝数</view>
			<input name="input" :value="user.fans" disabled="false" style="text-align: right;"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">关注数</view>
			<input name="input" :value="user.follow" disabled="false" style="text-align: right;"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">热度</view>
			<input name="input" :value="user.hot" disabled="false" style="text-align: right;"></input>
		</view>
		<!-- 		<view class="cu-form-group">
			<view class="title">地址</view>
			<picker mode="region" @change="RegionChange" :value="region">
				<view class="picker">
					{{region[0]}}，{{region[1]}}，{{region[2]}}
				</view>
			</picker>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '2018-12-25',
				region: ['广东省', '广州市', '海珠区'],
				switchC: false,
				user:{}
			};
		},
		onLoad() {
			this.initInfo()
		},
		methods: {
			initInfo() {
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
							that.$forceUpdate();
						} else {
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '请检查登录状态'
							});
							return;
						}
					}
				});
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
