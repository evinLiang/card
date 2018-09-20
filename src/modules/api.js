module.exports = {
	server:'http://test3.mapi.xiaoshushidai.cn/mapi/index.php',
	//server:document.location.origin+"/mapi/index.php",
	act:{
		register : "creditCardRegister",				//龙代还登记
		prePlan : "creditCardPrePlan",					//预览预约计划
		userQuery : "creditCardUserQuery",				//查询用户信息 
		userAuth : "creditCardUserAuth",				//实名认证
		tiedCard: "creditCardTiedCard",					//申请添加信用卡(添加信用卡第一步)
		TiedCardConfirm: "creditCardTiedCardConfirm",	//添加信用卡确认（第二步）
		ResendBindSms: "creditCardResendBindSms",		//重新获取绑卡验证码(绑卡)
		preOrde	: "creditCardPreOrder",					//订单预览
		userOrderPlan : "creditCardUserOrderPlan",		//代偿计划
		orderList : "creditCardUserOrderList",			//申请记录
		cardList : "creditCardList",					//信用卡列表
		getPlan : "creditCardGetPlan"					//查看生成的预约计划 
	}
}