<template>
	<div class="apply">
		<yd-cell-group class="pt20">
			<div class="money-panel">
				<yd-flexbox>
		            <yd-flexbox-item>
		            	<h3 class="font-20p">信用卡还款金额(元)</h3>
		            </yd-flexbox-item>
		            <div class="c-ff7640"><router-link to="/record">申请记录 ></router-link></div>
		        </yd-flexbox>
		        <input type="number" class="m-input" placeholder="请输入金额" v-model="money">
		        <p class="tips">*还款额度必须大于500元</p>
			</div>
		</yd-cell-group>
		<yd-cell-group class="mt20">
            <yd-cell-item>
                <span slot="left">最迟完成还款日期</span>
                <span slot="right">
                	<yd-datetime style="width:inherit; color: #ff7640" type="date" class="datetime" v-model="datetime" slot="right"></yd-datetime>
                </span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">要求卡内最小可用额度</span>
                <span slot="right">1000.00元</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">预计到账次数</span>
                <span slot="right">10次</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">服务费</span>
                <span slot="right">1元</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" class="cell-small-text c-ff7640">常见问题</span>
                <span slot="right" class="cell-small-text c-ff7640" @click="maskShow=true">卡内可用余额不够?</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="pd0-30">
        	<button type="button" class="mt70 yd-btn-block" :class="adopt ? 'yd-btn-disabled' : 'yd-btn-theme'" v-bind:disabled="adopt" @click="applyClick"><span>马上申请</span></button>
        	<p class="cop">*该产品服务由通联支付-小通币咚提供</p>
        </div>
        <transition name="fade">
        <div class="mask" v-show="maskShow">       	
        	<div class="tableCell res-img" >
        		<img src="./noBalance.png" alt="">
        		<div class="yd-btn-theme btn-theme mt70" @click="maskShow=false">好的</div>
        	</div>
        </div>
        </transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			datetime:'2018-08-21',	//最迟完成还款日期
			money:'',	//还款金额
			adopt:true, 	//控制"马上申请"按钮是否可以点击
			maskShow:false
		};
	},
	methods: {
		applyClick: function(){
			this.$dialog.loading.open('很快加载好了');

            setTimeout(() => {
                this.$dialog.loading.close();
                this.$router.push({ 
					name: 'binding'
				});
            }, 2000);
		}
	},
	watch:{
		money:{
			handler(newValue,oldValue){
				if(newValue >= 500){
					this.adopt = false
				}else {
					this.adopt = true
				}
			}
		}
	},
	created(){
		// this.$axios.get(this.api.host,{
		// 	params: {
		// 		act:"creditCardList",
		// 		r_type:1,
		// 		email:"gfds",
		// 　　		token:"8a6f2805b4515ac12058e79e66539be9"
		// 　　}
		// }).then(res=>{
		// 	console.log(res.data);
		// }).catch(res=>{
		// 	console.log(res);
		// });
	}
}
</script>

<style scoped>
	.datetime:after {
		content: ">";
		margin-left:0.1rem;
	}
	.cell-small-text {
		font-size: 12px;
	}
	.apply .yd-datetime-head>a:last-child {
		color: #ff7640;
	}
	.cop {
		margin-top: 0.25rem;
		color: #a0a0a0;
		text-align: center;
	}
	.tips {
		padding-top: 0.1rem;
		color: #969696;
		text-align: right;
	}
</style>