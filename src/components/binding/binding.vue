<template>
	<div class="binding">
		<yd-cell-group class="pt20">
            <yd-cell-item>
                <span slot="left">持卡人姓名</span>
                <span slot="right">小黄</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">身份证号</span>
                <span slot="right">4409800000000000</span>
            </yd-cell-item>
            <yd-cell-item>
	            <span slot="left">银行卡号：</span>
	            <yd-input slot="right" v-model="bankcard" regex="bankcard" placeholder="请输入银行卡号"></yd-input>
	        </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group class="mt20">
        	<yd-cell-item>
                <span slot="left">预留手机号：</span>
                <yd-input slot="right" v-model="mobile" regex="mobile" placeholder="信用卡的预留手机号"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">有限期：</span>
                <yd-input slot="right" v-model="finitePeriod" placeholder="MMYY，09/21即填0921"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">CVV2：</span>
                <yd-input slot="right" v-model="CVV2" placeholder="信用卡背面签字条的后三位数字"></yd-input>
            </yd-cell-item>
            <div class="seeBank"><span class="see-btn c-ff7640" @click="maskShow=true">查看支持绑定的银行</span></div>
        </yd-cell-group>
        <div class="pd0-24">
       		<button type="button" class="mt70 yd-btn-block yd-btn-theme" @click="toSubmit"><span>提交绑定</span></button>	
        </div>
        <transition name="fade">
        <div class="mask" v-show="maskShow">       	
        	<div class="tableCell res-img" >
        		<img src="./banks.png" alt="">
        		<div class="yd-btn-theme btn-theme mt30" @click="maskShow=false">好的</div>
        	</div>
        </div>
        </transition>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			bankcard:'',
			mobile:'',
			finitePeriod:'',
			CVV2:'',
			maskShow:false
		};
	},
	methods:{
		toSubmit(){
			this.$dialog.loading.open('很快加载好了');

            setTimeout(() => {
                this.$dialog.loading.close();
                this.$router.push({ 
					name: 'submit'
				});
            }, 2000);
		}
	}
}
</script>

<style>
.seeBank {
	text-align: right;
}
.seeBank .see-btn {
	display: inline-block;
	padding:0.22rem 0.3rem;
}
</style>