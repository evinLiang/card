module.exports = {
	server:'http://test3.mapi.xiaoshushidai.cn/mapi/index.php',
	act:{
		register : "creditCardRegister",			//龙代还登记
		prePlan : "creditCardPrePlan",				//预览预约计划
		userQuery : "creditCardUserQuery",			//查询用户信息 
		preOrde	: "creditCardPreOrder",				//订单预览
		userOrderPlan : "creditCardUserOrderPlan",	//代偿计划
		orderList : "creditCardUserOrderList",		//申请记录
		cardList : "creditCardList",				//信用卡列表
		getPlan : "creditCardGetPlan"				//查看生成的预约计划 
	}
}