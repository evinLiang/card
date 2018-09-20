<template>
	<div class="plan">
		<yd-cell-group class="pt20">
			<div class="money-panel">
				<yd-flexbox>
		            <yd-flexbox-item>
		            	<h3 class="font-20p">信用卡还款金额(元)</h3>
		            </yd-flexbox-item>
		        </yd-flexbox>
		        <div class="m-input">{{planData.order.amount}}</div>
		        <div class="apply-info">
		            <p><span class="left">开始时间</span><span class="line c-fff">——</span><span class="flex1">结束时间</span><span>手续费</span></p>
		            <p><span class="left" v-text="planData.order.start_date"></span><span class="line">——</span><span class="flex1" v-text="planData.order.end_date"></span><span>￥{{planData.order.fee}}</span></p>
		        </div>
			</div>
		</yd-cell-group>	
		<yd-cell-group class="mt20">
			<div class="orderDetails">
				<ul>
					<li class="title"><span>日期</span><span>代偿金额(元)</span><span>服务费元</span><span>状态</span></li>

					<li v-for="item in planData.subOrder"><span>{{item.executeTime | time}}</span><span>￥{{item.stagesAmt}}</span><span>￥{{item.stagesFee}}</span><span>{{item.status}}</span></li>
				
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
			planData:{
		        order: {
		            "compAmount": 675.84,//已完成金额
		            "amount": 10000,//代偿总金额
		            "fee": 8803,//总服务费
		            "uuid": "56990E05-8BAF-9AE7-B5E4-35225B869815",
		            "start_date": "08月16日",//开始时间
		            "end_date": "08月30日"//结束时间
		        },
		        subOrder: {
		            "1": {
		                "subOrderId": "3837637369974521856",//子订单id
		                "stagesAmt": 349.14,//金额
		                "stagesFee": 3.03,//服务费
		                "executeTime": "2018-08-16 17:41:06",//执行时间
		                "status": "成功"
		            },
		            "2": {
		                "subOrderId": "3837637369974521857",
		                "stagesAmt": 326.7,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-16 17:45:06",
		                "status": "成功"
		            },
		            "3": {
		                "subOrderId": "3837637369974521858",
		                "stagesAmt": 345.2,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-17 08:11:00",
		                "status": "人工取消 "
		            },
		            "4": {
		                "subOrderId": "3837637369974521859",
		                "stagesAmt": 330.83,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-17 08:25:00",
		                "status": "人工取消 "
		            },
		            "5": {
		                "subOrderId": "3837637369974521860",
		                "stagesAmt": 338,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-18 08:08:00",
		                "status": "人工取消 "
		            },
		            "6": {
		                "subOrderId": "3837637369974521861",
		                "stagesAmt": 317.47,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-18 08:29:00",
		                "status": "人工取消 "
		            },
		            "7": {
		                "subOrderId": "3837637369974521862",
		                "stagesAmt": 335.26,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-19 08:08:00",
		                "status": "人工取消 "
		            },
		            "8": {
		                "subOrderId": "3837637369974521863",
		                "stagesAmt": 317.77,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-19 08:31:00",
		                "status": "人工取消 "
		            },
		            "9": {
		                "subOrderId": "3837637369974521864",
		                "stagesAmt": 349.68,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-20 08:11:00",
		                "status": "人工取消 "
		            },
		            "10": {
		                "subOrderId": "3837637369974521865",
		                "stagesAmt": 331.87,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-20 08:31:00",
		                "status": "人工取消 "
		            },
		            "11": {
		                "subOrderId": "3837637369974521866",
		                "stagesAmt": 341.21,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-21 08:09:00",
		                "status": "人工取消 "
		            },
		            "12": {
		                "subOrderId": "3837637369974521867",
		                "stagesAmt": 321.42,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-21 08:33:00",
		                "status": "人工取消 "
		            },
		            "13": {
		                "subOrderId": "3837637369974521868",
		                "stagesAmt": 344.46,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-22 08:06:00",
		                "status": "人工取消 "
		            },
		            "14": {
		                "subOrderId": "3837637369974521869",
		                "stagesAmt": 332.26,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-22 08:31:00",
		                "status": "人工取消 "
		            },
		            "15": {
		                "subOrderId": "3837637369974521870",
		                "stagesAmt": 341.25,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-23 08:13:00",
		                "status": "人工取消 "
		            },
		            "16": {
		                "subOrderId": "3837637369974521871",
		                "stagesAmt": 331.53,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-23 08:34:00",
		                "status": "人工取消 "
		            },
		            "17": {
		                "subOrderId": "3837637369974521872",
		                "stagesAmt": 338.92,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-24 08:13:00",
		                "status": "人工取消 "
		            },
		            "18": {
		                "subOrderId": "3837637369974521873",
		                "stagesAmt": 317.23,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-24 08:31:00",
		                "status": "人工取消 "
		            },
		            "19": {
		                "subOrderId": "3837637369974521874",
		                "stagesAmt": 337.13,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-25 08:10:00",
		                "status": "人工取消 "
		            },
		            "20": {
		                "subOrderId": "3837637369974521875",
		                "stagesAmt": 325.15,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-25 08:34:00",
		                "status": "人工取消 "
		            },
		            "21": {
		                "subOrderId": "3837637369974521876",
		                "stagesAmt": 347.74,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-26 08:05:00",
		                "status": "人工取消 "
		            },
		            "22": {
		                "subOrderId": "3837637369974521877",
		                "stagesAmt": 328.92,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-26 08:33:00",
		                "status": "人工取消 "
		            },
		            "23": {
		                "subOrderId": "3837637369974521878",
		                "stagesAmt": 347.28,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-27 08:06:00",
		                "status": "人工取消 "
		            },
		            "24": {
		                "subOrderId": "3837637369974521879",
		                "stagesAmt": 319.68,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-27 08:31:00",
		                "status": "人工取消 "
		            },
		            "25": {
		                "subOrderId": "3837637369974521880",
		                "stagesAmt": 345.23,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-28 08:09:00",
		                "status": "人工取消 "
		            },
		            "26": {
		                "subOrderId": "3837637369974521881",
		                "stagesAmt": 328.81,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-28 08:32:00",
		                "status": "人工取消 "
		            },
		            "27": {
		                "subOrderId": "3837637369974521882",
		                "stagesAmt": 336.71,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-29 08:05:00",
		                "status": "人工取消 "
		            },
		            "28": {
		                "subOrderId": "3837637369974521883",
		                "stagesAmt": 326.12,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-29 08:29:00",
		                "status": "人工取消 "
		            },
		            "29": {
		                "subOrderId": "3837637369974521884",
		                "stagesAmt": 335.04,
		                "stagesFee": 3.03,
		                "executeTime": "2018-08-30 08:08:00",
		                "status": "人工取消 "
		            },
		            "30": {
		                "subOrderId": "3837637369974521885",
		                "stagesAmt": 311.99,
		                "stagesFee": 3.13,
		                "executeTime": "2018-08-30 08:33:00",
		                "status": "人工取消 "
		            }
		        }
			}
		};
	},
	filters: {
	  // status(value) {
	  // 	if(value == 0){
	  // 		return '待执行'
	  // 	}
	  // },
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

			//代偿计划数据
			var _this = this;
			_this.$axios.get(_this.api.server,{
				params: {
					act: _this.api.act.getPlan,
					r_type: 1,
					email: _this.userInfo.email,
			　　		token: _this.userInfo.token,
					order_id: _this.order_id
			　　}
			}).then(res=>{
				console.log(res.data);
				return;
				_this.$dialog.loading.close();
				if(res.response_code==1){
					_this.cards = res.data;
				}else{
					this.$dialog.toast({
	                    mes: res.data.show_err,
	                    timeout: 1500,
	                    icon: 'error'
	                });
				}
			}).catch(res=>{
				_this.$dialog.loading.close();
				this.$dialog.toast({
                    mes: '出错了',
                    timeout: 1500,
                    icon: 'error'
                });
			});
		},
		getOrder(){
			if(this.$route.params.order_id == undefined){
				this.$router.push({ 
					name: 'apply'
				});
			}else {
				this.order_id = this.$route.params.order_id;
			}
		}
	},
	created(){
		this.$dialog.loading.open('加载中');
		//this.getOrder();
		//this.getPlanData();
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