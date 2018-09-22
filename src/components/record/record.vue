<template>
	<div class="record">
		<div class="yRecord" v-show="listStatus==1">
			<div class="record-tips">单日代偿笔数最晚在22:00之前完成</div>
			<div class="record-list">
				<div class="record-item" v-for="(item, index) in recordList" @click="plan(item.order_id)">
					<div class="header">
						<div class="bank">
							<div class="icon">
								<img :src="item.logo4" alt="">
								<span class="name">{{item.bankInfo.name}}</span>
							</div>
						</div>
						<div class="status">{{item.status}}</div>
					</div>
					<div class="card-num">{{item.bankInfo.card}}</div>
					<div class="record-info">
						<p><span class="name">代偿金额：</span>￥<span class="amount">{{item.amount}}</span></p>
						<p><span class="name">服务费：</span>￥<span class="compAmount">{{item.compAmount}}</span></p>
						<p><span class="name">申请时间：</span><span class="apply_date">{{item.apply_date}}</span></p>
					</div>
					<div @click.stop class="suspend-btn" v-if="item.status == '处理中'" @click="suspend(item.order_id)">申请中止</div>
				</div>
			</div>
		</div>
		<div class="nRecord" v-show="listStatus==0">
			<div class="box">
				<img src="./box.png" alt="">
				<p class="text">您当前暂无申请记录</p>
			</div>
			<button type="button" class="mt70 yd-btn-block yd-btn-theme" @click="toApply"><span>马上申请</span></button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			listStatus:-1,
			recordList:'',
            userInfo:{
				token:sessionStorage.getItem('token'),
				email:sessionStorage.getItem('email')
			}
		};
	},
	methods:{
		suspend(id){

			//订单中止
			//console.log("申请记录页的订单id:"+id);
			this.$router.push({ 
				name: 'suspend', 
				params: { 
					card_info: {
						order_id: id,
						card_logo: this.recordList[id].logo4,
						bank_name: this.recordList[id].bankInfo.name,
						card_num: this.recordList[id].bankInfo.card
					} 
				} 
			});
		},
		plan(id){

			//查看订单状态
			//console.log("订单状态:"+id);
			this.$router.push({ 
				name: 'plan', 
				params: { order_id: id } 
			});
		},
		getData: function(){
			var _this = this;
			_this.$axios.get(_this.api.server,{
				params: {
					act: _this.api.act.orderList,
					r_type: 1,
			　　		email : _this.userInfo.email,
			　　		token : _this.userInfo.token
			　　}
			}).then(res=>{
				//console.log(res);
				if(res.status == 200){
					if(res.data.response_code == 0){
						_this.listStatus = 0;
						_this.$dialog.loading.close();
					}else {
						_this.recordList = res.data.data;
						_this.listStatus = 1;
						_this.$dialog.loading.close();
					}
				
				}else {
					console.log("请求出错");
				}
			}).catch(res=>{
				_this.$dialog.toast({
                    mes: '请求接口超时',
                    timeout: 2000,
                    icon: 'error'
                });
			});
		},
		toApply(){

			//跳转到申请页
			this.$router.push({ 
				name: 'apply'
			});
		}
	},
	created() {
		this.$dialog.loading.open('加载中');
		this.getData();
	},
}
</script>

<style scoped>
	.record {
		width: 100%;
		height: 100%;
		color: #727272;
	}
	.record-tips {
		height: 0.6rem;
		line-height: 0.6rem;
		color: #ff7640;
		text-align: center;
	}
	.record-item {
		position: relative;
		z-index: 1;
		background: #fff;
		padding: 0.24rem 0.48rem 0.24rem 0.24rem;
		box-shadow: 0px 0px 1px rgba(244,244,244,0.6);
		margin-bottom: 0.2rem;
	}
	.record-item:after {
	    height: 1px;
	    position: absolute;
	    z-index: 0;
	    bottom: 0;
	    left: 0;
	    content: "";
	    width: 100%;
	    background-image: -webkit-gradient(linear,left bottom, left top,color-stop(50%, #e4e4e4),color-stop(0, transparent));
	    background-image: linear-gradient(0deg,#e4e4e4 50%,transparent 0);
	}
	.record-item .header {
		display: flex;
	}
	.record-item .header .bank {
		flex: 1;
	}
	.bank .icon img {
		max-height: 0.6rem;
		vertical-align: middle;
	}
	.bank .icon span {
		font-size: 16px;
		vertical-align:middle;
	}
	.record-item .header .status {
		color: #3bd74a;
		padding-top: 0.12rem;
		font-weight: bold;
		font-size: 13px;
	}
	.record-item .card-num {
		margin-top: 0.2rem;
		font-size: 15px;
	}
	.record-item .record-info {
		margin-top: 0.2rem;
		font-size: 15px;
	}
	.record-item .record-info p {
		line-height: 1.6;
	}
	.record-item .record-info p .name {
		display: inline-block;
		min-width: 77px;
	}
	.record-item .suspend-btn {
		position: absolute;
		z-index: 2;
		bottom: 0.3rem;
		right: 0.3rem;
		width: 1.3rem;
		height: 0.5rem;
		line-height: 0.55rem;
		background: #ff2b2b;
		color: #fff;
		text-align: center;
		border-radius: 20px;
		font-size: 12px;
		box-shadow: 0px 1px 5px rgba(255,43,43,0.6);
	}
	.nRecord {
		width: 100%;
		height: 100%;
		background: #fff;
		padding: 0rem 0.24rem;
		text-align: center;
	}
	.nRecord .box {
		padding-top: 1.17rem;
	}
	.nRecord .box img {
		max-width: 1.98rem;
		vertical-align: middle;
	}
	.nRecord .box .text {
		margin-top: 0.25rem;
		font-size: 17px;
		color: #333;
	}

</style>