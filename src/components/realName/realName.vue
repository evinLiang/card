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
	            <yd-input slot="right" required v-model="card" :show-required-icon="false" max="19" regex="/^([1-9]{1})(\d{14}|\d{18})$/" placeholder="请输入银行卡号"></yd-input>
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
			idNo:''
		};
	},
	methods:{
		authentication(){
			var changeName = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/;	//验证中文
			var changeIdNo = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;	//验证身份证
			var changeCard = /^([1-9]{1})(\d{14}|\d{18})$/;	//验证银行卡

			if(!(changeName.test(this.name)) || !(this.name.length>1)){
				this.$dialog.toast({
                    mes: '请正确填写真实姓名',
                    timeout: 1500,
                    icon: 'error'
                });
				return;
			}
			if(!(changeIdNo.test(this.idNo))){
				this.$dialog.toast({
                    mes: '请正确填写身份证号',
                    timeout: 1500,
                    icon: 'error'
                });
				return;
			}
			if(!(changeCard.test(this.card))){
				this.$dialog.toast({
                    mes: '请正确填写银行卡号',
                    timeout: 1500,
                    icon: 'error'
                });
				return;
			}
		}
	}
}
</script>

<style scoped>
/*.realName .yd-input-warn:after {
	color: red;
}*/
</style>