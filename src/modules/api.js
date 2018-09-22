module.exports = {
	server:'http://test3.mapi.xiaoshushidai.cn/mapi/index.php',
	//server:document.location.origin+"/mapi/index.php",
	act:{
		register : "creditCardRegister",				//龙代还登记（注：apply组件请求“预览预约计划”接口根据返回的参数 is_register == 0 就需要请求这个接口进行龙登记注册）
		prePlan : "creditCardPrePlan",					//预览预约计划（注：apply组件输入代偿金额请求的接口）
		userQuery : "creditCardUserQuery",				//查询用户信息 （注：apply组件点击“马上申请”按钮请求的接口，根据用户是否实名、绑定信用卡跳到相对应的页面）
		userAuth : "creditCardUserAuth",				//信用卡实名认证（注：realName组件进行姓名认证的接口）
		tiedCard: "creditCardTiedCard",					//申请添加信用卡（注：binding组件绑定信用卡第一步：申请绑定)
		TiedCardConfirm: "creditCardTiedCardConfirm",	//添加信用卡确认（注：binding组件绑定信用卡第二步：确认绑定）
		ResendBindSms: "creditCardResendBindSms",		//重新获取绑卡验证码（注：binding组件绑定信用卡：重新获取验证码)
		preOrde	: "creditCardPreOrder",					//订单预览（注意：submit组件第一步：打开页面请求获取订单新）
		applyOrder : "creditCardApplyOrder",			//短信发送申请订单（注：submit组件第二步用来发送验证码）
		order: "creditCardOrder",						//创建订单（注：submit组件用来第三步提交订单）
		orderList : "creditCardUserOrderList",			//申请记录（注：record组件查看用户所有申请记录)
		userOrderPlan : "creditCardUserOrderPlan",		//订单执行计划 (注：plan组件查看订单计划)
		terminateOrder : "creditCardTerminateOrder",	//中止订单（注：suspend组件点击中止订单）
		cardList : "creditCardList",					//信用卡列表（注：cards组件查看用户信用卡）
		getPlan : "creditCardGetPlan",					//查看生成的预约计划 （注：reservationPlan组件请求预约计划数据）
		QueryOrder : "creditCardQueryOrder"				//查询订单
	}
}