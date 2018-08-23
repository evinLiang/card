<template>
	<div class="success">
		<div class="icon"><img src="./success.png" alt=""></div>
		<div class="info">
			<div class="item">
				<p>代还金额</p>
				<p>5000元</p>
			</div>
			<div class="item">
				<p>打款次数</p>
				<p>2次</p>
			</div>
			<div class="item c-ff7640">
				<p><u>预计完成时间</u></p>
				<p>2018-8-26</p>
			</div>
		</div>
		<button type="button" class="mt70 yd-btn-block yd-btn-theme" @click="toHome()"><span>确认</span></button>
		<div class="ad res-img">
			<img src="./lzx.png" alt="">
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		};
	},
	methods:{
		toHome(){
			this.$router.push({ 
				name: 'apply'
			});
		}
	}
}
</script>

<style scoped>
.success {
	width: 100%;
	height: 100%;
	background: #fff;
	padding: 0.24rem;
	box-sizing: border-box;
	text-align: center;
}
.success .icon img {
	margin-top: 0.7rem;
	max-width: 2.68rem;
}
.success .info {
	margin-top: 0.2rem;
	display: flex;
	font-size: 15px;
}
.success .info .item {
	flex: 1;
	line-height: 1.6;
}
.success .ad {
	margin-top: 0.55rem;
	padding-top: 0.5rem;
	border-top:1px dashed #d2d2d2;
}
</style>