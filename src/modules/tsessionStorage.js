module.exports = {
	sessionUserInfo : {
		token : sessionStorage.getItem('token'),
		email : sessionStorage.getItem('email')
	},
	getUserInfo(error,success){
		if((this.sessionUserInfo.token == undefined) || (this.sessionUserInfo.email == undefined) ){
			error();
		}else {
			success(this.sessionUserInfo);
		}
	},
	setUserInfo(urlUserInfo,success){
		sessionStorage.setItem("token", urlUserInfo.token);
		sessionStorage.setItem("email", urlUserInfo.email);
		this.sessionUserInfo.token == sessionStorage.getItem('token');
		this.sessionUserInfo.email == sessionStorage.getItem('email');
		success();
	}
}