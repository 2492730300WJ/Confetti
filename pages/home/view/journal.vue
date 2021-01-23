<template>
	<view>
		<cu-custom :bgColor="this.$Color" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">更新日志</block>
		</cu-custom>
		<view class="cu-timeline" style="height: 100vh;">
			<view class="cu-item">
				<view class="content" :class="this.$Color">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-white">v1.0.02</view>
						<view class="cu-tag line-cyan" style="color: white;">2020-01-23</view>
					</view>
					<view class="margin-top">
						<text>
							1.基础聊天功能\n2.登录优化\n3.bug修复\n
						</text>
					</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content" :class="this.$Color">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-white">v1.0.01</view>
						<view class="cu-tag line-cyan" style="color: white;">2020-01-20</view>
					</view>
					<view class="margin-top">
						<text>
							1.新增更新日志\n2.我的页面功能升级\n3.自由更改背景颜色\n4.导航栏全新升级
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
