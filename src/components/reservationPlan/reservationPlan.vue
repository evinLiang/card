<template>
	<div class="plan">
		<yd-cell-group class="pt20">
			<div class="money-panel">
				<yd-flexbox>
		            <yd-flexbox-item>
		            	<h3 class="font-20p">信用卡还款金额(元)</h3>
		            </yd-flexbox-item>
		        </yd-flexbox>
		        <div class="m-input">{{preOrderData.amount}}</div>
		        <div class="apply-info">
		            <p>
		            	<span class="left">开始时间</span>
		            	<span class="line c-fff">——</span>
		            	<span class="flex1">结束时间</span>
		            	<span>手续费</span>
		            </p>
		            <p>
		            	<span class="left" v-text="preOrderData.start_date_format"></span>
		            	<span class="line">——</span>
		            	<span class="flex1" v-text="preOrderData.end_date_format"></span>
		            	<span>￥{{preOrderData.fee}}</span>
		            </p>
		        </div>
			</div>
		</yd-cell-group>	
		<yd-cell-group class="mt20">
			<div class="orderDetails" v-if="planData != '' ">
				<ul>
					<li class="title">
						<span>日期</span>
						<span>代偿金额(元)</span>
						<span>服务费元</span>
					</li>
					<li v-for="item in planData">
						<span>{{item.executeTime | time}}</span>
						<span>￥{{item.stagesAmt}}</span>
						<span>￥{{item.stagesFee}}</span>
					</li>				
				</ul>
			</div>
		</yd-cell-group>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			order_id: '',
			userInfo:{
				token:sessionStorage.getItem('token'),
				email:sessionStorage.getItem('email')
			},
			planData:'',
			preOrderData:''
		};
	},
	filters: {
	  time(value){

	  	var telDate = new Date(value.replace(/-/g, '/')).getTime();	//兼容 苹果机选择的时间戳,不然手机端会出现NaN
	  	var date = new Date(telDate);	//再把时间戳转为时间格式
	    var y = date.getFullYear(); 
	    var m = date.getMonth() + 1;  
	    m = m < 10 ? ('0' + m) : m;  
	    var d = date.getDate();  
	    d = d < 10 ? ('0' + d) : d;  
	    return m+'月'+d+'日';
	  }
	},
	methods:{
		getPlanData(){

			//订单执行计划数据
			var _this = this;
            _this.$axios.get(_this.api.server,{
                params: {
                act: _this.api.act.getPlan,
                r_type: 1,
                email: _this.userInfo.email,
                token: _this.userInfo.token,
                amount: _this.preOrderData.amount,
                order_id: _this.preOrderData.order_id
            　　}
            }).then(res=>{
                //console.log(res.data);
                _this.$dialog.loading.close();
                if(res.data.response_code == 1){
                    _this.planData = res.data.data;
                }else {
                    _this.$dialog.toast({
                        mes: res.data.show_err,
                        timeout: 2000,
                        icon: 'error'
                    });
                }
            }).catch(res=>{
                _this.$dialog.loading.close();
                _this.$dialog.toast({
                    mes: '请求接口超时',
                    timeout: 2000,
                    icon: 'error'
                });
                _this.preOrder();
            });
		},
		getOrder(){
			if(this.$route.params.preOrderData == undefined){
				this.$router.push({ 
					name: 'submit'
				});
			}else {
				this.preOrderData = this.$route.params.preOrderData;
				this.getPlanData();
			}
		}
	},
	created(){
		this.$dialog.loading.open('加载中');
		this.getOrder();
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