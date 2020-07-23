<template>
	<div>
		<div class="web-font">{{ title }}</div>
		<img src="../assets/imgs/kitty.jpg" class="logo" />
		<div class="logo"></div>
		<p class="text">学些vue，哈哈哈哈</p>
		<ve-line :data="chartData"></ve-line>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: '琴棋书画不会，洗衣做饭嫌累！',
			chartData: {
				columns: ['日期', '销售额'],
				rows: [
					{ 日期: '1月1日', 销售额: 123 },
					{ 日期: '1月2日', 销售额: 1223 },
					{ 日期: '1月3日', 销售额: 2123 },
					{ 日期: '1月4日', 销售额: 4123 },
					{ 日期: '1月5日', 销售额: 3123 },
					{ 日期: '1月6日', 销售额: 7123 },
				],
			},
		}
	},
}
</script>

<style lang="less">
.text {
	color: green;
	font-size: 20px;
}
</style>
