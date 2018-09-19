<template>
	<div class="cards">
		<div class="cards-list">
			<div class="item" v-for="(item,index) in cards.card_list">
				<div class="top">
					<img :src="item.logo5" alt="">
					<span>{{item.name}}</span>
				</div>
				<p class="card-num"><span>{{item.card}}</span></p>
				<div class="choice-btn" @click="activeCards(index)">选择</div>
			</div>
		</div>
		<div class="addCard" @click="add()">+ 添加信用卡</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cards:'',
			userInfo:{
				token:sessionStorage.getItem('token'),
				email:sessionStorage.getItem('email')
			}
		};
	},
	methods:{
		add(){
			this.$router.push({ 
				name: 'binding'
			});
		},
		getData(){
			var _this = this;
			_this.$axios.get(_this.api.server,{
				params: {
					act : _this.api.act.cardList,
					r_type : 1,
					email : _this.userInfo.email,
			　　		token : _this.userInfo.token
			　　}
			}).then(res=>{
				if(res.status==200){
					_this.cards = res.data;
					_this.listStatus = 1;
					_this.$dialog.loading.close();
				}
			}).catch(res=>{
				console.log(res);
			});
		},
		activeCards(index){

			//更改plan的vuex
			var _this = this;
			_this.$store.commit('changeCard',{
				card_id: _this.cards.card_list[index].card_id
			});
			//选择银行卡后跳转到submit页面
			this.$router.push({ 
				name: 'submit'
			});
		},
		checkData(){

			//检查vuex的计划数据是否为空
			var _this = this;
			if((_this.$store.state.plan.amount == '') && (_this.$store.state.plan.endDate == '')){
				_this.$dialog.confirm({
                    title: '温馨提醒',
                    mes: '信用卡还款金额不能为空',
                    opts: [
                        {
                            txt: '确定',
                            color: true,
                            callback: () => {
                                this.$router.push({ 
                                    name: 'apply'
                                });
                            }
                        }
                    ]
                });
			}
		}
	},
	created(){
		this.$dialog.loading.open('加载中');
		this.checkData();
		this.getData();							//获取信用卡列表数据
	}
}
</script>

<style scoped>
	.cards {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.cards-list {
		padding: 0.3rem 0.4rem;
	}
	.cards-list .item {
		position: relative;
		z-index: 1;
		margin-bottom: 0.3rem;
		padding: 0.3rem 0.4rem;
		color: #fff;
		border-radius: 10px;
	}
	.cards-list .item:nth-child(3n-2) {
		background: #4e84ca;
		background:-webkit-linear-gradient(left top,#5ca1d8,#3f65cd);
		background:-o-linear-gradient(bottom right,#5ca1d8,#3f65cd);
		background:-moz-linear-gradient(bottom right,#5ca1d8,#3f65cd);
		background:linear-gradient(to bottom right,#5ca1d8,#3f65cd);		
	}
	.cards-list .item:nth-child(3n-1) {
		background: #ff6c6a;
		background:-webkit-linear-gradient(left top,#fa868d,#fc4d5a);
		background:-o-linear-gradient(bottom right,#fa868d,#fc4d5a);
		background:-moz-linear-gradient(bottom right,#fa868d,#fc4d5a);
		background:linear-gradient(to bottom right,#fa868d,#fc4d5a);		
	}
	.cards-list .item:nth-child(3n) {
		background: #069fad;
		background:-webkit-linear-gradient(left top,#06b3a9,#0190a7);
		background:-o-linear-gradient(bottom right,#06b3a9,#0190a7);
		background:-moz-linear-gradient(bottom right,#06b3a9,#0190a7);
		background:linear-gradient(to bottom right,#06b3a9,#0190a7);		
	}
	.cards-list .item .top {
	}
	.cards-list .item .top img {
		width: 0.74rem;
		height: 0.74rem;
		vertical-align: middle;
		margin-right: 0.15rem;
	}
	.cards-list .item .top span {
		vertical-align: middle;
		flex: 1;
		font-size: 17px;
	}
	.cards-list .item .card-num {
		padding: 0.3rem 0rem;
		text-align: center;
		font-size: 16px;
		letter-spacing: 0.1rem;
	}
	.choice-btn {
		position: absolute;
		z-index: 2;
		top: 0.4rem;
		right: 0.4rem;
		width: 1.37rem;
		height: 0.57rem;
		line-height: 0.57rem;
		border:1px solid #fff;
		text-align: center;
		border-radius: 5px;
	}
	.addCard {
		height: 1rem;
		line-height: 1rem;
		background: #f4f4f4;
		text-align: center;
		color: #ff7640;
		font-size: 18px;
	}
</style>