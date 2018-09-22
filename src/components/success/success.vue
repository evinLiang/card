<template>
	<div class="success">
		<div class="icon"><img src="./success.png" alt=""></div>
		<div class="info">
			<div class="item">
				<p>代还金额</p>
				<p>{{amount}}元</p>
			</div>
			<div class="item">
				<p>打款次数</p>
				<p>{{pay_frequency}}次</p>
			</div>
			<div class="item c-ff7640">
				<p><u>预计完成时间</u></p>
				<p>{{complete_time}}</p>
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
			amount: '',
			pay_frequency: '',
			complete_time: ''
		};
	},
	methods:{
		toHome(){
			this.$router.push({ 
				path: 'apply'
			});
		},
		getOrder(){
			if((this.$route.params.amount == undefined) || (this.$route.params.pay_frequency == undefined) || (this.$route.params.complete_time == undefined) ){
				this.$router.push({ 
					name: 'apply'
				});
			}else {
				this.amount = this.$route.params.amount;
				this.pay_frequency = this.$route.params.pay_frequency;
				this.complete_time = this.$route.params.complete_time;
			}
		}
	},
	created(){
		this.getOrder();
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