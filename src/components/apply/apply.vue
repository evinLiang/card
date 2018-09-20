<template>
	<div class="apply" v-show="login">
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
                	<yd-datetime style="width:inherit; color: #ff7640" type="date" class="date-time" v-model="finishDate" slot="right" :start-date="startDate" :end-date="endDate"></yd-datetime>
                </span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">要求卡内最小可用额度</span>
                <span slot="right">{{smallQuota}}元</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">预计到账次数</span>
                <span slot="right">{{frequency}}次</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">服务费</span>
                <span slot="right">{{serviceCharge}}元</span>
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
			startDate: '',	  		  //开始时间
			endDate: '',	  		  //结束时间
			finishDate: '',	  		  //完成时间
			money: '',				  //还款金额
			adopt: true, 			  //控制"马上申请"按钮是否可以点击
			maskShow: false,		  //控制遮罩层显示
			smallQuota: '--',		  //要求卡内最小可用额度
			frequency: '--',		  //预计到账次数
			serviceCharge: '--',	  //服务费
			userInfo: {				  //用户信息
				token:'',
				email:''
			},
			login:false,
			msg: '',
			prePlanSwith:false
		};
	},
	methods: {
		applyClick() {

			//点击"马上申请"按钮,查询用户信息
			var _this = this;
			_this.$dialog.loading.open('请求中');
			_this.$axios.get(_this.api.server,{
				params: {
					act : _this.api.act.userQuery,
					r_type : 1,
					email : _this.userInfo.email,
			　　		token : _this.userInfo.token
			　　}
			}).then(res=>{
				//console.table(res.data);
				this.$dialog.loading.close();
				if(res.data.userAuth == 0){

					//没有实名认证，跳转到实名认证页面
					this.$router.push({ 
						name: 'realName'
					});
					return;
				}else {

					//已实名,保存用户姓名和身份证到sessionStorage
					sessionStorage.setItem('name',res.data.real_name);
					sessionStorage.setItem('idNo',res.data.id_no);
				}

				if(res.data.bindCard == 0){

					//没有绑定信用卡，跳转到绑定信用卡页面
					this.$router.push({ 
						name: 'binding'
					});
					return;
				}else {

					//已实名并且绑定信用卡则跳转信用卡列表
					this.$router.push({ 
						name: 'cards'
					});
				}
			}).catch(res=>{
				this.$dialog.loading.close();
				_this.$dialog.toast({
                    mes: '请求接口超时',
                    timeout: 2000,
                    icon: 'error'
                });
			});
		},
		getUserInfo(){

			//先判断浏览器是否存在token和email的sessionStorage，(用于记录用户信息的登录状态)
			if((sessionStorage.getItem('token') == undefined) || (sessionStorage.getItem('email') == undefined) ){
				
				//如果sessionStorage没有用户信息，查找路由的token和email的参数
				if((this.$route.query.token == undefined) || (this.$route.query.email == undefined)){

					//路由没有token和email的参数，弹框提示登录失败
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
	                return;
				}else {

					//获取路由的token和email的参数保存到sessionStorage，并且this.userInfo赋值
					this.userInfo.token = this.$route.query.token;
					this.userInfo.email = this.$route.query.email;
					sessionStorage.setItem('token',this.$route.query.token);
					sessionStorage.setItem('email',this.$route.query.email);
					//this.register();	//获取用户信息后，进行龙代还登记
					this.$dialog.loading.close();
					this.login = true;
				}

			}else{

				//sessionStorage存在用户信息，this.userInfo赋值
				this.userInfo.token = sessionStorage.getItem('token');
				this.userInfo.email = sessionStorage.getItem('email');
				//this.register();	//获取用户信息后，进行龙代还登记
				this.$dialog.loading.close();
				this.login = true;
			}
		},
		getDate(){

			//开始时间
			var startDate = new Date();
			var stratY = startDate.getFullYear(); 
			var stratM = startDate.getMonth() + 1;
			var startD = startDate.getDate();
			stratM = stratM < 10 ? ('0' + stratM) : stratM;
		    startD = startD < 10 ? ('0' + startD) : startD; 
		    this.startDate = stratY+'-'+stratM+'-'+startD;

		    //结束时间，为开始时间+14天
		    var endDate = new Date();
		    endDate.setDate(endDate.getDate() + 14);
		    var endY = endDate.getFullYear(); 
			var endM = endDate.getMonth() + 1;
			var endD = endDate.getDate();
			endM = endM < 10 ? ('0' + endM) : endM;
		    endD = endD < 10 ? ('0' + endD) : endD; 
		    this.endDate = endY+'-'+endM+'-'+endD;
		    this.finishDate = endY+'-'+endM+'-'+endD;
		},
		prePlan(){

			var _this = this;
			if(_this.prePlanSwith == false){
				return;
			}
			//更改plan的vuex
			_this.$store.commit('changePlan',{
				cAmount: _this.money,
				cEndDate: _this.finishDate
			});

			//预览预约计划
			_this.$axios.get(_this.api.server,{
				params: {
					act : _this.api.act.prePlan,
					r_type : 1,
					email : _this.userInfo.email,
					amount : _this.money,
			　　		token : _this.userInfo.token,
					endDate : _this.finishDate
			　　}
			}).then(res=>{
				console.log(res.data);
				if(res.data.response_code==1){
					_this.adopt = false;
					_this.smallQuota = res.data.firstAmt;
					_this.frequency = res.data.number;
					_this.serviceCharge = res.data.fee;
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
		},
		register(){

			//龙代还登记
			var _this = this;
			_this.$axios.get(_this.api.server,{
				params: {
					act : _this.api.act.register,
					r_type : 1,
					email : _this.userInfo.email,
			　　		token : _this.userInfo.token
			　　}
			}).then(res=>{
				_this.$dialog.loading.close();
				if(res.data.response_code !== 1){
					this.$dialog.confirm({
	                    title: '温馨提醒',
	                    mes: '用户还没有登记,请退出重新登录',
	                    opts: [
	                        {
	                            txt: '确定',
	                            color: true,
	                            callback: () => {
	                                console.log('用户还没有登记,请退出重新登录');
	                            }
	                        }
	                    ]
	                });
	                return;
				}else {
					_this.login = true;	//登录成功，显示页面内容
				}
			}).catch(res=>{
				_this.$dialog.loading.close();
				_this.$dialog.toast({
                    mes: '请求接口超时',
                    timeout: 5000,
                    icon: 'error'
                });
			});
		}
	},
	watch:{
		money:{
			handler(newValue,oldValue){
				if(newValue >= 500){
					this.prePlanSwith = true;
					this.prePlan();
				}else {
					this.prePlanSwith = false;
					this.adopt = true;
					this.smallQuota = '--';
					this.frequency = '--';
					this.serviceCharge = '--';
				}
			}
		},
		finishDate:{
			handler(newValue,oldValue){
				if(oldValue !== ''){
					this.prePlan();
				}
			}
		}
	},
	created(){
		this.$dialog.loading.open('加载中');
		this.getUserInfo();						//获取用户信息
		this.getDate();							//获取完成还款时间
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