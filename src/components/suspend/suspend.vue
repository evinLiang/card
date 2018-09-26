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
						<img :src="card_info.card_logo" alt="">
						<span class="name" v-text="card_info.bank_name"></span>
						<span class="cardNum" v-text="card_info.card_num"></span>
				</div>
			</div>
			<div class="orderDetails" v-if="planData != ''">
				<ul>
					<li class="title">
						<span>代偿总金额</span>
						<span>已代偿金额</span>
						<span>已收取服务费</span>
						<span v-show="status == 1">未代偿金额</span>
					</li>
					<li>
						<span>￥{{planData.order.amount}}</span>
						<span>￥{{planData.order.compAmount}}</span>
						<span>￥{{planData.order.compFee}}</span>
						<span v-show="status == 1" >￥{{planData.order.amount - planData.order.compAmount}}</span>
					</li>
				</ul>
				<div class="text-tips" v-show="status == 0">您当前订单仍有 <span class="c-ff7640">￥{{planData.order.amount - planData.order.compAmount}}</span> 未代偿，确认停止代偿？</div>
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
			card_info:'',		//信用卡数据
			status:0,
			planData:'',		//计划数据
			userInfo:{
				token:sessionStorage.getItem('token'),
				email:sessionStorage.getItem('email')
			}
		};
	},
	methods:{

		//取消“中止订单”
		cancel(){
			this.$router.push({ 
				name: 'record'
			});
		},
		confirm(){

			//确认“中止订单”
			var _this = this;
			_this.$dialog.loading.open('请求中');
			_this.$axios.get(_this.api.server,{
				params: {
					act: _this.api.act.terminateOrder,
					r_type: 1,
					email: _this.userInfo.email,
			　　		token: _this.userInfo.token,
					order_id: _this.card_info.order_id
			　　}
			}).then(res=>{
				console.log(res.data);
				_this.$dialog.loading.close();
				if(res.data.response_code == 1){
					_this.status = 1;
				}else{
					_this.$dialog.toast({
	                    mes: res.data.show_err,
	                    timeout: 1500,
	                    icon: 'error'
	                });
				}
			}).catch(res=>{
				_this.$dialog.loading.close();
				_this.$dialog.toast({
                    mes: '出错了',
                    timeout: 1500,
                    icon: 'error'
                });
			});
		},
		getCardData(){

			//获取信用卡信息
			if(this.$route.params.card_info == undefined){
				this.$dialog.loading.close();
				this.$router.push({ 
					name: 'record'
				});
			}else {
				this.card_info = this.$route.params.card_info;
				this.getPlanData();
				//console.log("中止订单页的order_id:"+this.card_info.order_id);
			}
		},
		getPlanData(){

			//获取计划数据
			var _this = this;
			_this.$axios.get(_this.api.server,{
				params: {
					act: _this.api.act.userOrderPlan,
					r_type: 1,
					email: _this.userInfo.email,
			　　		token: _this.userInfo.token,
					order_id: _this.card_info.order_id
			　　}
			}).then(res=>{
				//console.log(res.data);
				_this.$dialog.loading.close();
				if(res.data.response_code == 1){
					_this.planData = res.data.data;
					//console.log(_this.planData);
				}else{
					_this.$dialog.toast({
	                    mes: res.data.show_err,
	                    timeout: 1500,
	                    icon: 'error'
	                });
	                setTimeout(() => {
		                _this.$router.push({ 
							name: 'record'
						});
	            	},1500)
				}
			}).catch(res=>{
				_this.$dialog.loading.close();
				_this.$dialog.toast({
                    mes: '出错了',
                    timeout: 1500,
                    icon: 'error'
                });
			});

		}
	},
	created(){
		this.$dialog.loading.open('加载中');
		this.getCardData();
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
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0px 0px 5px rgba(248,248,248,0.6);
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
	.text-tips {
		padding: 0.24rem;
		text-align: center;
		font-size: 14px;
	}
</style>