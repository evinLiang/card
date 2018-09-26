<template>
	<div class="submit">
		<yd-cell-group class="pt20">
			<div class="money-panel">
				<yd-flexbox>
		            <yd-flexbox-item>
		            	<h3 class="font-20p">信用卡还款金额(元)</h3>
		            </yd-flexbox-item>
		            <div class="c-ff7640" @click="orderPlan">代偿计划 ></div>
		        </yd-flexbox>
		        <div class="m-input">{{preOrderData.amount}}</div>
                <div class="apply-info">
                    <p><span class="left">开始时间</span><span class="line c-fff">——</span><span class="flex1">结束时间</span><span>手续费</span></p>
                    <p><span class="left" v-text="preOrderData.start_date_format"></span><span class="line">——</span><span class="flex1" v-text="preOrderData.end_date_format"></span><span>￥{{preOrderData.fee}}</span></p>
                </div>
			</div>
		</yd-cell-group>
		<yd-cell-group class="mt20">
            <yd-cell-item>
                <span slot="left">代偿信用卡</span>
                <span slot="right" v-text="preOrderData.credit_card"></span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">持卡人</span>
                <span slot="right" v-text="preOrderData.real_name"></span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">CVV2</span>
                <span slot="right" v-text="preOrderData.cvv2">387</span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group class="mt20">
            <yd-cell-item>
                <span slot="left">预留手机号</span>
                <span slot="right" v-text="preOrderData.mobile"></span>
            </yd-cell-item>
            <yd-cell-item>
	            <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
	            <input type="text" slot="right" placeholder="请输入短信验证码" v-model="sendCode">
	            <yd-sendcode slot="right" 
	                         v-model="start1" 
	                         @click.native="sendCode1" 
	                         type="warning"
	                         second="60"
	                         init-str="获取验证码"
	            ></yd-sendcode>
	        </yd-cell-item>
        </yd-cell-group>
        <div class="pd0-24 text-c">
        	<button type="button" class="mt70 yd-btn-block" @click="toSuccess" :class="adopt ? 'yd-btn-disabled' : 'yd-btn-theme'" v-bind:disabled="adopt"><span>马上申请</span></button>
        	<div class="mt20"><yd-checkbox v-model="agreement" size="18" color="#ff7640"><span class="c-ff7640" style="font-size:13px">同意《龙分期关于通联支付余额代偿服务协议》</span></yd-checkbox></div>
        	<p class="consider"><router-link to="/">我再考虑考虑></router-link></p>
        </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			start1: false,
			agreement:false,
            userInfo:{
                token:sessionStorage.getItem('token'),
                email:sessionStorage.getItem('email')
            },
            preOrderData:'',    //订单预览请求获取的参数
            applyOrderData:'',  //发送验证码请求获取的参数
            successData:'',     //生成订单成功的参数
            sendCode:'',
            adopt:true,
		};
	},
	methods: {
        sendCode1() {

            //发送验证码
            var _this = this;
            _this.$dialog.loading.open('发送中...');
            _this.$axios.get(_this.api.server,{
                params: {
                act: _this.api.act.applyOrder,
                r_type: 1,
                email: _this.userInfo.email,
                token: _this.userInfo.token,
                amount: _this.$store.state.plan.amount,
                cvv2: _this.preOrderData.cvv2,
                expired_date: _this.preOrderData.expired_date
            　　}
            }).then(res=>{
                //console.table(res);
                _this.$dialog.loading.close();
                if(res.data.response_code == 1){
                    _this.applyOrderData = res.data;
                    _this.adopt = false;
                    _this.start1 = true;
                    _this.$dialog.toast({
                        mes: '已发送',
                        icon: 'success',
                        timeout: 1500
                    });
                }else {
                    _this.$dialog.toast({
                        mes: res.data.show_err,
                        timeout: 5000,
                        icon: 'error'
                    });
                }
            }).catch(res=>{
                _this.$dialog.loading.close();
                _this.$dialog.toast({
                    mes: '请求接口超时',
                    timeout: 5000,
                    icon: 'error'
                });
                _this.preOrder();
            });
        },
        toSuccess(){

            //提交订单
            var _this = this;
            if(_this.sendCode == ''){
               _this.$dialog.toast({
                    mes: '手机验证码不能为空',
                    timeout: 1500
                });
                return; 
            }
        	if((_this.agreement==false)){
        		_this.$dialog.toast({
                    mes: '请先同意协议内容',
                    timeout: 1500
                });
                return;
        	}
            _this.$dialog.loading.open('请求中...');
            _this.$axios.get(_this.api.server,{
                params: {
                act: _this.api.act.order,
                r_type: 1,
                email: _this.userInfo.email,
                token: _this.userInfo.token,
                ver_code: _this.sendCode,
                applyOrderId: _this.applyOrderData.applyOrderId
            　　}
            }).then(res=>{
                //console.log(res);
                _this.$dialog.loading.close();
                if(res.data.response_code == 1){
                    _this.successData = res.data;
                    //跳到成功页面
                    _this.$router.push({ 
                        name: 'success',
                        params: { 
                            amount: _this.successData.amount,
                            pay_frequency: _this.successData.pay_frequency,
                            complete_time: _this.successData.complete_time 
                        } 
                    });
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
                //_this.toSuccess();
            });

        },
        preOrder(){

            //订单预览
            var _this = this;
            _this.$axios.get(_this.api.server,{
                params: {
                act: _this.api.act.preOrde,
                r_type: 1,
                email: _this.userInfo.email,
                token: _this.userInfo.token,
                amount: _this.$store.state.plan.amount,
                endDate: _this.$store.state.plan.endDate,
                card_id: _this.$store.state.card.card_id
            　　}
            }).then(res=>{
                //console.log(res.data);
                _this.$dialog.loading.close();
                if(res.data.response_code == 1){
                    _this.preOrderData = res.data;
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
        checkData(){

            //检查vuex的银行卡或者计划数据是否为空
            var _this = this;
            if((_this.$store.state.card.card_id == "") || (_this.$store.state.plan.amount == "") || (_this.$store.state.plan.endDate == "")){
                _this.$router.push({ 
                    name: 'apply'
                });
                return;
            }else {
                _this.preOrder();
            }
        },
        orderPlan(){

            //代偿计划（查看预约计划）
            //console.log(this.preOrderData.order_id);
            this.$router.push({ 
                name: 'reservationPlan',
                params: { 
                    preOrderData:{
                       order_id: this.preOrderData.order_id,
                       amount: this.preOrderData.amount,
                       start_date_format: this.preOrderData.start_date_format,
                       end_date_format: this.preOrderData.end_date_format,
                       fee: this.preOrderData.fee
                    }
                     
                } 
            });
        }
    },
    created(){
        this.$dialog.loading.open('请求中...');
        this.checkData();
    }
}
</script>

<style scoped>
.yd-btn-warning:not(.yd-btn-loading){
	background: #ff7640;
	border-radius: 20px;
}
.consider {
	font-size: 13px;
	color: #696969;
	margin-top: 0.4rem;
	padding-bottom: 0.6rem;
}
.m-input {
	color: #6c6c6c;
}
.money-panel {
    padding-bottom: 0rem;
}
</style>