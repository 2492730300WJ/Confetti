<template>
	<view class="content">
		<robin-editor class="editor" @cancel="hideEditor" @save="saveEditor" v-model="html" :imageUploader="uploadImg"
			:muiltImage="true"></robin-editor>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				html: '<b style="color:#ff0000">HTML 片段1</b>'
			}
		},
		methods: {
			hideEditor: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			saveEditor: function(e) {
				console.log(e.html)
				uni.showToast({
					title: "保存成功~",
					icon: "none",
					duration: 500
				})
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					})
				}, 500)
			},
			uploadImg: function(img, callback) {
				//上传图片逻辑,将图片链接传给回调函数
				callback(img)
			},
			changeHtml(i) {
				//从远程获取数据赋值
				this.html = i == 1 ? this.html : this.html2
			}
		}
	}
</script>

<style>
	view {
		box-sizing: border-box;
	}

	.html {
		width: 100%;
		word-break: break-all;
	}

	.editor {
		width: 100%;
	}
</style>
