<template>
	<div class="cards">
		<div class="cards-list">
			<div class="item" v-for="item in cards">
				<div class="top">
					<img :src="item.logo3" alt="">
					<span>招商银行</span>
				</div>
				<p class="card-num"><span>{{item.card}}</span></p>
				<div class="choice-btn">选择</div>
			</div>
		</div>
		<div class="addCard" @click="add()">+ 添加信用卡</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cards:[
				{
					"card_id": "FEBF08C0-0864-A52A-D1DF-1A0D63531FDE",
					"name": "广东发展银行",
					"logo": "http://image.xiaoshushidai.cn/public/bank/15.jpg",
					"logo2": "http://image.xiaoshushidai.cn/public/bank/new/15.png",
					"logo3": "http://image.xiaoshushidai.cn/public/bank/icon3/15.png",
					"logo4": "http://image.xiaoshushidai.cn/public/bank/icon4/15.png",
					"logo5": "http://image.xiaoshushidai.cn/public/bank/icon5/15.png",
					"card": "**** **** **** 7839"
				},
				{
					"card_id": "FEBF08C0-0864-A52A-D1DF-1A0D63531FDE",
					"name": "广东发展银行",
					"logo": "http://image.xiaoshushidai.cn/public/bank/15.jpg",
					"logo2": "http://image.xiaoshushidai.cn/public/bank/new/15.png",
					"logo3": "http://image.xiaoshushidai.cn/public/bank/icon4/15.png",
					"logo4": "http://image.xiaoshushidai.cn/public/bank/icon4/15.png",
					"logo5": "http://image.xiaoshushidai.cn/public/bank/icon3/15.png",
					"card": "**** **** **** 7839"
				},
				{
					"card_id": "FEBF08C0-0864-A52A-D1DF-1A0D63531FDE",
					"name": "广东发展银行",
					"logo": "http://image.xiaoshushidai.cn/public/bank/15.jpg",
					"logo2": "http://image.xiaoshushidai.cn/public/bank/new/15.png",
					"logo3": "http://image.xiaoshushidai.cn/public/bank/icon5/15.png",
					"logo4": "http://image.xiaoshushidai.cn/public/bank/icon4/15.png",
					"logo5": "http://image.xiaoshushidai.cn/public/bank/icon3/15.png",
					"card": "**** **** **** 7839"
				}
			]
		};
	},
	methods:{
		add(){
			this.$router.push({ 
				name: 'binding'
			});
		}
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