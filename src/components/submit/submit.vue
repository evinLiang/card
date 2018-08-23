<template>
	<div class="submit">
		<yd-cell-group class="pt20">
			<div class="money-panel">
				<yd-flexbox>
		            <yd-flexbox-item>
		            	<h3 class="font-20p">信用卡还款金额(元)</h3>
		            </yd-flexbox-item>
		            <div class="c-ff7640">代偿计划 ></div>
		        </yd-flexbox>
		        <div class="m-input">{{money}}</div>
                <div class="apply-info">
                    <p><span class="left">开始时间</span><span class="line c-fff">——</span><span class="flex1">结束时间</span><span>手续费</span></p>
                    <p><span class="left">08月08日</span><span class="line">——</span><span class="flex1">08月18日</span><span>￥35.00</span></p>
                </div>
			</div>
		</yd-cell-group>
		<yd-cell-group class="mt20">
            <yd-cell-item>
                <span slot="left">代偿信用卡</span>
                <span slot="right">尾数7839（广发银行 信用卡）</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">持卡人</span>
                <span slot="right">张伯伦</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">CVV2</span>
                <span slot="right">387</span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group class="mt20">
            <yd-cell-item>
                <span slot="left">预留手机号</span>
                <span slot="right">13412345678</span>
            </yd-cell-item>
            <yd-cell-item>
	            <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
	            <input type="text" slot="right" placeholder="请输入短信验证码">
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
        	<button type="button" class="mt70 yd-btn-block yd-btn-theme" @click="toSuccess"><span>马上申请</span></button>
        	<div class="mt20"><yd-checkbox v-model="agreement" size="18" color="#ff7640"><span class="c-ff7640" style="font-size:13px">同意《龙分期关于通联支付余额代偿服务协议》</span></yd-checkbox></div>
        	<p class="consider"><router-link to="/">我再考虑考虑></router-link></p>
        </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			money:'5000.00',
			start1: false,
			agreement:false
		};
	},
	methods: {
            sendCode1() {
                this.$dialog.loading.open('发送中...');
                setTimeout(() => {

                    this.start1 = true;
                    this.$dialog.loading.close();

                    this.$dialog.toast({
                        mes: '已发送',
                        icon: 'success',
                        timeout: 1500
                    });

                }, 1000);
            },
            toSuccess(){
            	if(this.agreement==true){
            		this.$router.push({ 
						name: 'success'
					});
            	}else {
            		this.$dialog.toast({
	                    mes: '请先同意协议内容',
	                    timeout: 1500
	                });
            	}
            }
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