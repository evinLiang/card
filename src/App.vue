<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  max-width: 750px;
  min-width: 300px;
  height: 100%;
  color: #4e4e4e;
}
.yd-btn-theme {
    background-color: #ff7640;
    color: #fff;
    box-shadow:0px 0px 0px rgba(0,0,0,0)
}
.res-img img {
	max-width: 100%;
}
.mt20 {
	margin-top: 0.2rem;
}
.mt30 {
  margin-top: 0.3rem;
}
.pt20 {
	padding-top: 0.2rem;
}
.mt70 {
	margin-top: 0.7rem;
}
.pd0-30 {
	padding: 0rem 0.3rem;
}
.pd0-24 {
  padding: 0rem 0.24rem;
}
.text-c {
  text-align: center;
}
.c-ff7640 {
	color: #ff7640;
}
.c-969696 {
	color: #969696;
}
.btn-theme {
	font-size: .3rem;
    height: .9rem;
    line-height: .9rem;
    border-radius: 3px;
}
.mask {
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  box-sizing: border-box;
  padding: 0rem 0.68rem;
  display: table;
}
.tableCell {
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    text-align: center;
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.2s ease-out;
  opacity: 1;
}
.fade-enter{
  opacity: 0;
}
.fade-leave-active{
  opacity: 0;
}
.money-panel {
  padding:0.6rem 0.24rem 0.3rem 0.24rem;
}
.font-20p {
  font-size: 20px;
}
.m-input {
  width: 100%;
  font-size: 28px;
  border:none;
  border-bottom: 1px solid #a5a5a6;
  padding-bottom: 0.2rem;
  margin-top: 0.1rem;
  color: #ff7640;
}
.apply-info {
    padding: 0.1rem 0rem;
}
.apply-info p {
    display: flex;
    font-size: 13px;
    margin-bottom: 0.11rem;
}
.apply-info p .flex1 {
    flex: 1;
}
.apply-info p .left {
    min-width: 55px;
}
.apply-info p .line {
    padding: 0rem 0.1rem;
    color: #c7c7c7;
}
.apply-info p .line.c-fff {
    color: #fff;
}
.orderDetails ul li {
  font-size: 15px;
  text-align: center;
  display: flex;
  border-bottom: 1px solid #e7e9f0;
  line-height: 0.9rem;
  color: #969696;
}
.orderDetails ul li.title {
  border-color: #d5d6da;
  color: #6c6c6c;
}
.orderDetails ul li span {
  flex: 1;
}
</style>
