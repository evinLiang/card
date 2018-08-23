<template>
	<div class="plan">
		<yd-cell-group class="pt20">
			<div class="money-panel">
				<yd-flexbox>
		            <yd-flexbox-item>
		            	<h3 class="font-20p">信用卡还款金额(元)</h3>
		            </yd-flexbox-item>
		        </yd-flexbox>
		        <div class="m-input">{{money}}</div>
		        <div class="apply-info">
		            <p><span class="left">开始时间</span><span class="line c-fff">——</span><span class="flex1">结束时间</span><span>手续费</span></p>
		            <p><span class="left">08月08日</span><span class="line">——</span><span class="flex1">08月18日</span><span>￥35.00</span></p>
		        </div>
			</div>
		</yd-cell-group>	
		<yd-cell-group class="mt20">
			1
		</yd-cell-group>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			money:5000
		};
	}
}
</script>

<style scoped>
	.money-panel {
	    padding-bottom: 0rem;
	}
		.m-input {
		color: #6c6c6c;
	}
</style>