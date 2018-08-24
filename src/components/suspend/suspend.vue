<template>
	<div class="suspend">
		<yd-cell-group class="pt20">
			<div class="tips-panel">
				<p class="notice c-ff7640" v-show="status == 0">确认中止当前代偿订单！<br>已完成部分不能中止！</p>
				<div class="success" v-show="status == 1">
					<img class="icon" src="./success.png" alt="">
					<p class="text">您的订单已中止成功</p>
				</div>
			</div>
		</yd-cell-group>
		<yd-cell-group class="mt20">
			<div class="card-panel">
				<div class="card-info">
						<img src="./zs.png" alt="">
						<span class="name">招商银行</span>
						<span class="cardNum">**** **** **** 7839</span>
				</div>
			</div>
			<div class="orderDetails">
				<ul>
					<li class="title"><span>代偿总金额</span><span>已代偿金额</span><span>已收取服务费</span></li>
					<li><span>￥5000.00</span><span>￥20.00</span><span>￥20.00</span></li>
					<li><span>￥5000.00</span><span>￥20.00</span><span>￥20.00</span></li>
					<li><span>￥5000.00</span><span>￥20.00</span><span>￥20.00</span></li>
				</ul>
			</div>
			<div class="btns">
				<div class="choice-btns" v-show="status == 0">
					<button type="button" class="mt70 yd-btn-block yd-btn-theme" @click="confirm()"><span>确认</span></button>
					<button type="button" class="mt30 yd-btn-block yd-btn-theme" @click="cancel()"><span>取消</span></button>
				</div>
				<button v-show="status == 1" type="button" class="mt70 yd-btn-block yd-btn-theme" @click="cancel()"><span>好的</span></button>
			</div>
		</yd-cell-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			order_id:this.$route.params.order_id,
			status:0,
		};
	},
	methods:{
		cancel(){
			this.$router.push({ 
				name: 'record'
			});
		},
		confirm(){
			this.$dialog.loading.open('加载中');
			setTimeout(() => {
                    this.$dialog.loading.close();
                    this.status = 1;
            }, 2000);
		}
	}
}
</script>

<style scoped>
	.tips-panel {
		text-align: center;
		padding: 0.7rem 0rem 0.65rem;
	}
	.notice {
		font-size: 18px;
		font-weight: bold;
		line-height: 2;
	}
	.success .icon {
		max-width: 1.42rem;
	}
	.success .text {
		font-size: 16px;
	}
	.card-panel {
		padding: 0.24rem;
	}
	.card-info img {
		max-height: 0.6rem;
		vertical-align: middle;
	}
	.card-info .name {
		font-size: 16px;
		vertical-align:middle;
		margin-left: 0.2rem;
		font-weight: bold;
	}
	.card-info .cardNum {
		font-size: 16px;
		vertical-align:middle;
		margin-left: 0.5rem;
	}
	.btns {
		padding: 0rem 0.24rem 1rem;
	}
</style>