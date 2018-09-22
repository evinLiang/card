<template>
	<div class="binding">
		<yd-cell-group class="pt20">
            <yd-cell-item>
                <span slot="left">持卡人姓名</span>
                <span slot="right">{{userInfo.name}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">身份证号</span>
                <span slot="right">{{userInfo.idNo}}</span>
            </yd-cell-item>
            <yd-cell-item>
	            <span slot="left">银行卡号：</span>
                <!-- <yd-input slot="right" type="number" required v-model="bankcard" :show-required-icon="false" max="19" regex="bankcard" placeholder="请输入信用卡号"></yd-input> -->
                <yd-input slot="right" v-model="bankcard" max="19" regex="/^\d{16}|\d{19}$/" placeholder="请输入银行卡号"></yd-input>
	        </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group class="mt20">
        	<yd-cell-item>
                <span slot="left">预留手机号：</span>
                <yd-input slot="right" v-model="mobile" required type="number" :show-required-icon="false" regex="mobile" placeholder="信用卡的预留手机号"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">有限期：</span>
                <yd-input slot="right" v-model="finitePeriod" type="number" placeholder="MMYY，09/21即填0921"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">CVV2：</span>
                <yd-input slot="right" v-model="CVV2" type="number" placeholder="信用卡背面签字条的后三位数字" ></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
                <input type="number" slot="right" placeholder="请输入短信验证码" v-model="sendCode">
                <yd-sendcode slot="right" 
                             v-model="start1" 
                             @click.native="sendCode1" 
                             type="warning"
                             second="60"
                             :init-str="sendCodeText"
                ></yd-sendcode>
            </yd-cell-item>
            <div class="seeBank"><span class="see-btn c-ff7640" @click="maskShow=true">查看支持绑定的银行</span></div>
        </yd-cell-group>
        <div class="pd0-24">
       		<button type="button" class="mt70 yd-btn-block" @click="toSubmit" :class="adopt ? 'yd-btn-disabled' : 'yd-btn-theme'" v-bind:disabled="adopt"><span>提交绑定</span></button>	
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
            confirmBankcard:'',     //防止绑卡第二步确认信用卡，客户更改信用卡input的值，所以建一个值
			mobile:'',
			finitePeriod:'',
			CVV2:'',
			maskShow:false,
            userInfo:{
                token:sessionStorage.getItem('token'),
                email:sessionStorage.getItem('email'),
                name:sessionStorage.getItem('name'),
                idNo:sessionStorage.getItem('idNo')
            },
            sendCode:'',
            start1: false,
            adopt: true,              //控制"提交绑定"按钮是否可以点击
            sendCodeText:'获取验证码',
            step:1,  //当前步骤
            amount:'',
            card_id:''
		};
	},
	methods:{
		toSubmit(){

            //绑卡第二步，确认绑卡
            var _this = this;
            //验证手机验证码
            if(_this.sendCode == ''){
                _this.$dialog.toast({
                    mes: '手机验证码不能为空',
                    timeout: 1500,
                    icon: 'error'
                });
                return;
            }

            this.$dialog.loading.open('请求中...');
            _this.$axios.get(_this.api.server,{
                params: {
                    act: _this.api.act.TiedCardConfirm,
                    r_type: 1,
                    email: _this.userInfo.email,
                    token: _this.userInfo.token,
                    sms_code: _this.sendCode,
                    amount: _this.amount,
                    card_no: _this.bankcard,
                    mobile: _this.mobile,
                    validity_period: _this.finitePeriod,
                    cvv2: _this.CVV2
            　　}
            }).then(res=>{
                console.table(res.data);
                if(res.data.response_code==1){
                    _this.$dialog.loading.close();
                    _this.$dialog.toast({
                        mes: '信用卡绑定成功',
                        icon: 'success',
                        timeout: 1500
                    });
                    //更改vuex信用卡card_id的值
                    _this.$store.commit('changeCard',{
                        card_id: res.data.card_id
                    });
                    //绑定信用卡挑到提交也
                    this.$router.push({ 
                        name: 'submit'
                    });
                
                }else {
                    if(res.data.needPay == 1){

                    }else {
                        _this.$dialog.toast({
                            mes: res.data.show_err,
                            timeout: 2000,
                            icon: 'error'
                        });
                    }
                    
                }

            }).catch(res=>{
                _this.$dialog.toast({
                    mes: '请求接口超时',
                    timeout: 2000,
                    icon: 'error'
                });
            });

		},
        sendCode1() {

            //点击“验证码”按钮
            var _this = this;
            var changeCard = /^\d{16}|\d{19}$/; //验证银行卡
            var changeMobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; //验证手机号

            //信用卡验证
            if(!(changeCard.test(_this.bankcard))){
                _this.$dialog.toast({
                    mes: '请正确填写信用卡号',
                    timeout: 1500,
                    icon: 'error'
                });
                return;
            }

            //手机号验证
            if(!(changeMobile.test(_this.mobile))){
                _this.$dialog.toast({
                    mes: '请正确填写手机号',
                    timeout: 1500,
                    icon: 'error'
                });
                return;
            }

            //验证有限期
            if((_this.finitePeriod == '') || (_this.finitePeriod.length !== 4)){
                _this.$dialog.toast({
                    mes: '请正确填写信用卡有限期',
                    timeout: 1500,
                    icon: 'error'
                });
                return;
            }

            //验证CVV2
            if((_this.CVV2 == '') || (_this.CVV2.length !== 3)){
                _this.$dialog.toast({
                    mes: '请正确填写信用卡背面的CVV2',
                    timeout: 1500,
                    icon: 'error'
                });
                return;
            }

            this.$dialog.loading.open('发送中...');
            if(_this.step == 1){
                _this.stepApply();
            }else {
                _this.stepConfirm();
            }

        },
        changeAmount(){

            //判断代偿金额是否为空
            if(this.$store.state.plan.amount == ''){
                this.$router.push({ 
                    name: 'apply'
                });
            }else {
                this.amount = this.$store.state.plan.amount;
            }
        },
        stepApply(){

            //第一步申请
            var _this = this;
            _this.$axios.get(_this.api.server,{
                params: {
                    act: _this.api.act.tiedCard,
                    r_type: 1,
                    email: _this.userInfo.email,
                    token: _this.userInfo.token,
                    amount: _this.amount,
                    card_no: _this.bankcard,
                    mobile: _this.mobile,
                    validity_period: _this.finitePeriod,
                    cvv2: _this.CVV2
            　　}
            }).then(res=>{
                console.table(res.data);
                _this.$dialog.loading.close();
                if(res.data.response_code==1){
                    // _this.card_id = res.data.card_id;
                    _this.start1 = true;
                    _this.$dialog.toast({
                        mes: '已发送',
                        icon: 'success',
                        timeout: 1500
                    });
                    _this.sendCodeText = '重新获取验证码';
                    _this.step = 2;
                    _this.adopt = false;
                    _this.confirmBankcard = _this.bankcard;
                
                }else {
                    if(res.data.needPay == 1){

                    }else {
                        _this.$dialog.toast({
                            mes: res.data.show_err,
                            timeout: 2000,
                            icon: 'error'
                        });
                    }
                    
                }
            }).catch(res=>{
                _this.$dialog.loading.close();
                _this.$dialog.toast({
                    mes: '请求接口超时',
                    timeout: 2000,
                    icon: 'error'
                });
            });


        },
        stepConfirm(){

            //第二步确认
            var _this = this;
            _this.$axios.get(_this.api.server,{
                params: {
                    act: _this.api.act.ResendBindSms,
                    r_type: 1,
                    email: _this.userInfo.email,
                    token: _this.userInfo.token,
                    card_no: _this.confirmBankcard
            　　}
            }).then(res=>{
                console.table(res);
                _this.$dialog.loading.close();
                if(res.data.response_code == 1){
                    _this.start1 = true;
                    _this.$dialog.toast({
                        mes: '已发送',
                        icon: 'success',
                        timeout: 1500
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
            });
        }
	},
    created(){
        this.changeAmount();
    }
}
</script>

<style scoped>
.yd-btn-warning:not(.yd-btn-loading){
    background: #ff7640;
    border-radius: 20px;
}
.seeBank {
	text-align: right;
}
.seeBank .see-btn {
	display: inline-block;
	padding:0.22rem 0.3rem;
}
</style>