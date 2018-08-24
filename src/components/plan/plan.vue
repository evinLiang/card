<template>
	<div class="plan">
		<yd-cell-group class="pt20">
			<div class="money-panel">
				<yd-flexbox>
		            <yd-flexbox-item>
		            	<h3 class="font-20p">信用卡还款金额(元)</h3>
		            </yd-flexbox-item>
		        </yd-flexbox>
		        <div class="m-input">{{money}}</div>
		        <div class="apply-info">
		            <p><span class="left">开始时间</span><span class="line c-fff">——</span><span class="flex1">结束时间</span><span>手续费</span></p>
		            <p><span class="left">08月08日</span><span class="line">——</span><span class="flex1">08月18日</span><span>￥35.00</span></p>
		        </div>
			</div>
		</yd-cell-group>	
		<yd-cell-group class="mt20">
			<div class="orderDetails">
				<ul>
					<li class="title"><span>日期</span><span>代偿金额(元)</span><span>服务费元</span><span>状态</span></li>

					<li v-for="item in planData"><span>{{item.executeTime | time}}</span><span>￥{{item.payMoney}}</span><span>￥{{item.feePayMoney}}</span><span>{{item.status | status}}</span></li>
				
				</ul>
			</div>
		</yd-cell-group>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			money:5000,
			planData:[
				        {
				            "orderId": "YEDC-1534325946288",
				            "serialNumber": "1",
				            "stagesAmt": "129228",
				            "stagesFee": "1137",
				            "executeTime": "2018-08-15 17:45:06",
				            "status": "0",
				            "subOrderId": "3834746329306103808",
				            "costTakeStatus": "0",
				            "feeTakeStatus": "0",
				            "costPayMoney": "129228",
				            "feePayMoney": null,
				            "payMoney": "129228",
				            "channelShare": null,
				            "fundCost": null,
				            "routeOrder": null,
				            "isDel": null,
				            "createTime": null,
				            "updateTime": null,
				            "customerName": null,
				            "bond": "0",
				            "bondState": null,
				            "transMode": "2",
				            "backAmount": "0",
				            "backFee": "0",
				            "backBond": "0",
				            "comPayAmount": "0"
				        },
				        {
				            "orderId": "YEDC-1534325946288",
				            "serialNumber": "2",
				            "stagesAmt": "123318",
				            "stagesFee": "1137",
				            "executeTime": "2018-08-15 17:50:06",
				            "status": "0",
				            "subOrderId": "3834746329306103809",
				            "costTakeStatus": "0",
				            "feeTakeStatus": "0",
				            "costPayMoney": "123318",
				            "feePayMoney": null,
				            "payMoney": "123318",
				            "channelShare": null,
				            "fundCost": null,
				            "routeOrder": null,
				            "isDel": null,
				            "createTime": null,
				            "updateTime": null,
				            "customerName": null,
				            "bond": "0",
				            "bondState": null,
				            "transMode": "2",
				            "backAmount": "0",
				            "backFee": "0",
				            "backBond": "0",
				            "comPayAmount": "0"
				        },
				        {
				            "orderId": "YEDC-1534325946288",
				            "serialNumber": "3",
				            "stagesAmt": "128923",
				            "stagesFee": "1137",
				            "executeTime": "2018-08-16 08:07:00",
				            "status": "0",
				            "subOrderId": "3834746329306103810",
				            "costTakeStatus": "0",
				            "feeTakeStatus": "0",
				            "costPayMoney": "128923",
				            "feePayMoney": null,
				            "payMoney": "128923",
				            "channelShare": null,
				            "fundCost": null,
				            "routeOrder": null,
				            "isDel": null,
				            "createTime": null,
				            "updateTime": null,
				            "customerName": null,
				            "bond": "0",
				            "bondState": null,
				            "transMode": "2",
				            "backAmount": "0",
				            "backFee": "0",
				            "backBond": "0",
				            "comPayAmount": "0"
				        },
				        {
				            "orderId": "YEDC-1534325946288",
				            "serialNumber": "4",
				            "stagesAmt": "123503",
				            "stagesFee": "1137",
				            "executeTime": "2018-08-16 08:26:00",
				            "status": "0",
				            "subOrderId": "3834746329306103811",
				            "costTakeStatus": "0",
				            "feeTakeStatus": "0",
				            "costPayMoney": "123503",
				            "feePayMoney": null,
				            "payMoney": "123503",
				            "channelShare": null,
				            "fundCost": null,
				            "routeOrder": null,
				            "isDel": null,
				            "createTime": null,
				            "updateTime": null,
				            "customerName": null,
				            "bond": "0",
				            "bondState": null,
				            "transMode": "2",
				            "backAmount": "0",
				            "backFee": "0",
				            "backBond": "0",
				            "comPayAmount": "0"
				        },
				        {
				            "orderId": "YEDC-1534325946288",
				            "serialNumber": "5",
				            "stagesAmt": "126118",
				            "stagesFee": "1137",
				            "executeTime": "2018-08-17 08:13:00",
				            "status": "0",
				            "subOrderId": "3834746329306103812",
				            "costTakeStatus": "0",
				            "feeTakeStatus": "0",
				            "costPayMoney": "126118",
				            "feePayMoney": null,
				            "payMoney": "126118",
				            "channelShare": null,
				            "fundCost": null,
				            "routeOrder": null,
				            "isDel": null,
				            "createTime": null,
				            "updateTime": null,
				            "customerName": null,
				            "bond": "0",
				            "bondState": null,
				            "transMode": "2",
				            "backAmount": "0",
				            "backFee": "0",
				            "backBond": "0",
				            "comPayAmount": "0"
				        },
				        {
				            "orderId": "YEDC-1534325946288",
				            "serialNumber": "6",
				            "stagesAmt": "120577",
				            "stagesFee": "1137",
				            "executeTime": "2018-08-17 08:33:00",
				            "status": "0",
				            "subOrderId": "3834746329306103813",
				            "costTakeStatus": "0",
				            "feeTakeStatus": "0",
				            "costPayMoney": "120577",
				            "feePayMoney": null,
				            "payMoney": "120577",
				            "channelShare": null,
				            "fundCost": null,
				            "routeOrder": null,
				            "isDel": null,
				            "createTime": null,
				            "updateTime": null,
				            "customerName": null,
				            "bond": "0",
				            "bondState": null,
				            "transMode": "2",
				            "backAmount": "0",
				            "backFee": "0",
				            "backBond": "0",
				            "comPayAmount": "0"
				        },
				        {
				            "orderId": "YEDC-1534325946288",
				            "serialNumber": "7",
				            "stagesAmt": "128903",
				            "stagesFee": "1137",
				            "executeTime": "2018-08-18 08:14:00",
				            "status": "0",
				            "subOrderId": "3834746329306103814",
				            "costTakeStatus": "0",
				            "feeTakeStatus": "0",
				            "costPayMoney": "128903",
				            "feePayMoney": null,
				            "payMoney": "128903",
				            "channelShare": null,
				            "fundCost": null,
				            "routeOrder": null,
				            "isDel": null,
				            "createTime": null,
				            "updateTime": null,
				            "customerName": null,
				            "bond": "0",
				            "bondState": null,
				            "transMode": "2",
				            "backAmount": "0",
				            "backFee": "0",
				            "backBond": "0",
				            "comPayAmount": "0"
				        },
				        {
				            "orderId": "YEDC-1534325946288",
				            "serialNumber": "8",
				            "stagesAmt": "119430",
				            "stagesFee": "1141",
				            "executeTime": "2018-08-18 08:28:00",
				            "status": "0",
				            "subOrderId": "3834746329306103815",
				            "costTakeStatus": "0",
				            "feeTakeStatus": "0",
				            "costPayMoney": "119430",
				            "feePayMoney": null,
				            "payMoney": "119430",
				            "channelShare": null,
				            "fundCost": null,
				            "routeOrder": null,
				            "isDel": null,
				            "createTime": null,
				            "updateTime": null,
				            "customerName": null,
				            "bond": "0",
				            "bondState": null,
				            "transMode": "2",
				            "backAmount": "0",
				            "backFee": "0",
				            "backBond": "0",
				            "comPayAmount": "0"
				        }
				    ],
		};
	},
	filters: {
	  status(value) {
	  	if(value == 0){
	  		return '待执行'
	  	}
	  },
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