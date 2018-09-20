<template>
	<div class="realName">
		<yd-cell-group class="pt20">
            <yd-cell-item>
                <span slot="left">真实姓名：</span>
                <yd-input slot="right" required regex="^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$" v-model="name" max="20" min="2" :show-required-icon="false" placeholder="请输入真实姓名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">身份证号：</span>
                <yd-input slot="right" required v-model="idNo" :show-required-icon="false" regex="/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/" placeholder="请输入身份证号" max="18"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
	            <span slot="left">银行卡号：</span>
	            <yd-input slot="right" required v-model="card" type="number" :show-required-icon="false" max="19" regex="/^([1-9]{1})(\d{14}|\d{18})$/" placeholder="请输入银行卡号"></yd-input>
	        </yd-cell-item>
        </yd-cell-group>
        <div class="pd0-24">
       		<button type="button" class="mt70 yd-btn-block yd-btn-theme" @click="authentication"><span>提交认证</span></button>	
        </div>		
	</div>
</template>

<script>
export default {
	data() {
		return {
			card:'',
			name:'',
			idNo:'',
			userInfo:{
				token:sessionStorage.getItem('token'),
				email:sessionStorage.getItem('email')
			},
		};
	},
	methods:{
		authentication(){

			//实名认证
			var _this = this;
			var changeName = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;	//验证中文
			var changeIdNo = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;	//验证身份证
			var changeCard = /^([1-9]{1})(\d{14}|\d{18})$/;	//验证银行卡

			if(!(changeName.test(_this.name)) || !(_this.name.length>1)){
				_this.$dialog.toast({
                    mes: '请正确填写真实姓名',
                    timeout: 1500,
                    icon: 'error'
                });
				return;
			}
			if(!(changeIdNo.test(_this.idNo))){
				_this.$dialog.toast({
                    mes: '请正确填写身份证号',
                    timeout: 1500,
                    icon: 'error'
                });
				return;
			}
			if(!(changeCard.test(_this.card))){
				_this.$dialog.toast({
                    mes: '请正确填写银行卡号',
                    timeout: 1500,
                    icon: 'error'
                });
				return;
			}

			_this.$dialog.loading.open('请求中');
			_this.$axios.get(_this.api.server,{
				params: {
					act : _this.api.act.userAuth,
					r_type : 1,
					email : _this.userInfo.email,
			　　		token : _this.userInfo.token,
					cardNo : _this.card,
					idCardNo : _this.idNo,
					realName : _this.name
			　　}
			}).then(res=>{
				console.table(res.data);
				if(res.data.response_code == 1){
					this.$dialog.loading.close();
					this.$dialog.toast({
	                    mes: '实名认证成功',
	                    timeout: 1500,
	                    icon: 'success'
	                });

					//实名成功保存用户信息跳转绑卡页面
					sessionStorage.setItem('name',res.data.real_name);
					sessionStorage.setItem('idNo',res.data.id_no);
					//实名成功跳转绑卡
					this.$router.push({ 
						name: 'binding'
					});
				}
			}).catch(res=>{
				_this.$dialog.toast({
                    mes: '请求接口超时',
                    timeout: 2000,
                    icon: 'error'
                });
			});
		},
		register(){

			//已实名校验成功，请求接口获取用户姓名和身份证
			var _this = this;
			_this.$axios.get(_this.api.server,{
				params: {
					act : _this.api.act.userQuery,
					r_type : 1,
					email : _this.userInfo.email,
			　　		token : _this.userInfo.token
			　　}
			}).then(res=>{
				//console.table(res.data);
				_this.$dialog.loading.close();
				if(res.data.userAuth == 1){

					_this.$dialog.loading.close();
					//实名认证，实名成功保存用户信息跳转绑卡页面、跳转到实名认证页面
					sessionStorage.setItem('name',res.data.real_name);
					sessionStorage.setItem('idNo',res.data.id_no);

					if(res.data.bindCard == 0){

						//没有绑卡跳转到绑卡页面
						_this.$router.push({ 
							name: 'binding'
						});
						return;
					}else{
						//已绑卡跳转到银行卡页面
						_this.$router.push({ 
							name: 'cards'
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
		}
	},
	created(){
		this.$dialog.loading.open('请求中');
		this.register();
	}
}
</script>

<style scoped>
/*.realName .yd-input-warn:after {
	color: red;
}*/
</style>