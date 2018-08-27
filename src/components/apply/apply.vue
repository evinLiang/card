<template>
	<div class="apply" v-show="userInfo.token">
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
                	<yd-datetime style="width:inherit; color: #ff7640" type="date" class="date-time" v-model="applyDate" slot="right" :start-date="applyDate"></yd-datetime>
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
			applyDate:'2018-08-02',	//最迟完成还款日期
			money:'',	//还款金额
			adopt:true, 	//控制"马上申请"按钮是否可以点击
			maskShow:false,
			userInfo:{
				token:'',
				email:''
			}
		};
	},
	methods: {
		applyClick() {
			this.$dialog.loading.open('很快加载好了');

            setTimeout(() => {
                this.$dialog.loading.close();
                this.$router.push({ 
					name: 'binding'
				});
            }, 2000);
		},
		getUserInfo(){

			//先判断浏览器是否存在token和email的sessionStorage，用于记录用户信息的登录状态
			if((sessionStorage.getItem('token') == undefined) || (sessionStorage.getItem('email') == undefined) ){
				
				//如果sessionStorage没有用户信息，查找路由的token和email的参数
				if((this.$route.query.token == undefined) || (this.$route.query.email == undefined)){

					//sessionStorage没有用户信息并且路由没有token和email的参数，弹框提示登录失败
					this.$dialog.loading.close();
					this.$dialog.confirm({
	                    title: '温馨提醒',
	                    mes: '获取用户信息失败,请退出重新登录',
	                    opts: [
	                        {
	                            txt: '确定',
	                            color: true,
	                            callback: () => {
	                                console.log('获取用户信息失败,请退出重新登录');
	                            }
	                        }
	                    ]
	                });
				}else {

					//获取路由的token和email的参数保存到sessionStorage，并且组件data.userInfo获取
					this.userInfo.token = this.$route.query.token;
					this.userInfo.email = this.$route.query.email;
					sessionStorage.setItem('token',this.$route.query.token);
					sessionStorage.setItem('email',this.$route.query.email);
					this.$dialog.loading.close();
				}

			}else{

				//sessionStorage存在用户信息，直接组件data.userInfo获取
				this.userInfo.token = sessionStorage.getItem('token');
				this.userInfo.email = sessionStorage.getItem('email');
				this.$dialog.loading.close();
			}
		},
		getDate(){
			var nowDate = new Date(),
			y = nowDate.getFullYear(), 
		    m = nowDate.getMonth() + 1,    
		    d = nowDate.getDate();  
		    m = m < 10 ? ('0' + m) : m;
		    d = d < 10 ? ('0' + d) : d;  
		    this.applyDate = y+'-'+m+'-'+d
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
		this.$dialog.loading.open('加载中');
		this.getUserInfo();
		this.getDate();
	}
}
</script>

<style scoped>
	.date-time:after {
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