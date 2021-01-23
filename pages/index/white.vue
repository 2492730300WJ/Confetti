<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {
			uni.request({
				url: this.$Url + '/user/info', //请求接口
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
					if (res.data.code == 200) {
						uni.switchTab({
							url: "/pages/home/home"
						})
					} else {
						uni.redirectTo({
							url: "/pages/index/login"
						})
					}
				}
			});
		},
		methods: {

		}
	}
</script>

<style>

</style>
