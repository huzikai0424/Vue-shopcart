<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img v-bind:src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" @click="showDetail=true">
				<span class="count">5个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background"><img :src="seller.avatar"></div>
		<transition name="fade">
		<div class="detail" v-show="showDetail">
			<div class="detail-wrapper">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title"><span class="text margintop">优惠信息</span></div>
					<ul class="supports" v-if="seller.supports">
						<li v-for="(item,index) in seller.supports">
							<span class="icon" :class="classMap[item.type]"></span>
							<span class="text">{{item.description}}</span>
						</li>
					</ul>
					<div class="title"><span class="text margintop">商家公告</span></div>
					<div class="bulletin">{{seller.bulletin}}</div>
				</div>
			</div>
			<div class="detail-close" @click="showDetail=false">
				<i class="icon-close"></i>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
import star from '@/components/star/star';
	export default{
	props: {
      seller: {
        type: Object
      },
    },
    data(){
    	return{
    		showDetail:false
    	}
    },
    created(){
    	this.classMap=['decrease','discount','guarantee','invoice','special'];
    },
    components:{
    	star
    }

}
</script>

<style>
@import "../../common/css/icon.css";
body,html{
	font-family: PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif;
}
.content-wrapper{
	padding:24px 12px 18px 24px;
	font-size:0;
	position: relative;
}
.avatar,.content{
	display: inline-block;
}
.avatar img{
	width: 64px;
	height: 64px;
	border-radius: 2px;
}
.title .name{
	font-size:16px;
	color:#fff;
	font-weight: bold;
	line-height: 18px;
	display: inline-block;
}
.title .brand{
	background-image: url("brand@2x.png") ;
	width: 30px;
	height:18px;
	display: inline-block;
	background-size: 30px 18px;
    background-repeat: no-repeat;
    vertical-align:top;
    margin-right:6px;
}
.description{
	font-size:12px;
	color:#fff;
	font-weight: 200;
	line-height: 12px;
	margin-bottom: 10px;
}
.supports .text{
	font-size:10px;
	color: #fff;
	font-weight:200;
	line-height: 12px;
}
.content{
	padding:2px 0 2px 16px;
	vertical-align: top;
}
.content .title{
	margin-bottom: 8px
}
.header{
	position: relative;
	background: rgba(7,17,27,.5);
	overflow: hidden;
}
div.supports .icon{
	display: inline-block;
	width: 12px;
	height: 12px;
	background-size: 12px 12px;
	margin-right: 4px;
	background-repeat: no-repeat;
	vertical-align: top;
}
ul.supports .icon{
	display: inline-block;
	width: 16px;
	height: 16px;
	background-size: 16px 16px;
	margin-right: 6px;
	background-repeat: no-repeat;
	vertical-align: top;
}
ul.supports{
	font-size:0;
}
ul.supports li{
	padding:0 12px 12px 12px;
}
ul.supports li:last-child{
	padding-bottom: 0;
}
.background{
	position: absolute;
	width: 100%;
	height: 100%;
	-webkit-filter: blur(10px);
    filter: blur(10px);
    z-index: -1;
    top:0;
    left:0;
}
.background img{
	width: 100%;
	height: 100%;
}
div.supports .decrease{
	background-image: url('decrease_1@2x.png');
}
div.supports .discount{
	background-image: url('discount_1@2x.png');
}
div.supports .guarantee{
	background-image: url('guarantee_1@2x.png');
}
div.supports .invoice{
	background-image: url('invoice_1@2x.png');
}
div.supports .special{
	background-image: url('special_2@2x.png');
}
ul.supports .decrease{
	background-image: url('decrease_2@2x.png');
}
ul.supports .discount{
	background-image: url('discount_2@2x.png');
}
ul.supports .guarantee{
	background-image: url('guarantee_2@2x.png');
}
ul.supports .invoice{
	background-image: url('invoice_2@2x.png');
}
ul.supports .special{
	background-image: url('special_2@2x.png');
}
.support-count{
	position: absolute;
	background-color:rgba(0,0,0,.2);
	padding: 0 8px;
	right: 12px;
    bottom: 14px;
	border-radius: 14px;
	height: 24px;
    line-height: 24px;
}
.support-count .count{
	font-size:10px;
	color:#fff;
	font-weight: 200;
	line-height: 24px;
	vertical-align: top;
}
.header .content-wrapper .support-count .icon-keyboard_arrow_right {
    margin-left: 2px;
    line-height: 24px;
    font-size: 10px;
    color:#fff;
}
.bulletin-wrapper{
	height: 28px;
	line-height: 28px;
	overflow: hidden;
    text-overflow: ellipsis;
	background-color:rgba(7,17,27,0.2);
	white-space: nowrap;
	position: relative;
	padding: 0 22px 0 12px;
	color:#fff;
}
.bulletin-wrapper .bulletin-title{
	margin:8px 4px 8px 0;
	background-image: url('bulletin@2x.png');
	display: inline-block;
	white-space: nowrap;
	background-size: 22px 12px;
    background-repeat: no-repeat;
    width: 22px;
    height: 12px;
    vertical-align: top;
}
.bulletin-wrapper .bulletin-text{
	font-size: 10px;
	color:#fff;
	font-weight:200;
	line-height: 28px;
	margin-right: 4px;
	vertical-align: bottom;
}
.bulletin-wrapper .icon-keyboard_arrow_right{
	position: absolute;
	bottom: 8px;
	right:12px;
	color:#fff;
	font-size: 10px;
}
.detail{
	color: #fff;
	width: 100%;
	height: 100%;
	position: fixed;
	top:0;
	left:0;
	z-index:999;
	opacity: 1;
    background: rgba(7, 17, 27, 0.8);
	-webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s
}
.fade-enter, .fade-leave-to {
	background: rgba(7, 17, 27, 0);
  	opacity: 0;
}
.detail .detail-wrapper{
	min-height: 100%;
}
.detail .detail-wrapper .detail-main{
	padding: 64px 36px 0 36px;
}
.detail .detail-main h1.name{
	font-size:16px;
	font-weight: 700;
	line-height: 16px;
	text-align: center;
}
.detail-main .title{
	position: relative;
	display: flex;
	z-index: 0;
	margin: 28px auto 24px;
}
.detail-main .title:before, .detail-main .title:after{
	display: inline-block;
    content: '';
    flex:1;
  	border-bottom: 1px solid rgba(255,255,255,.2);
   	z-index: -1;
   	transform: translateY(-50%);
   	
}
.detail-main .title .text{
	font-size:14px;
	font-weight: 700;
	color: #fff;
	line-height: 14px;
	position: relative;
	z-index: 1;
	padding:0 12px;
}
.detail-main .bulletin{
	font-size:12px;
	font-weight: 200;
	color:#fff;
	line-height: 24px;
	padding:0 12px;
}
.detail-close{
	font-size:32px;
	color:rgba(255,255,255,.5);
	width: 32px;
	height: 32px;
	margin: -64px auto 0;
}
.clearfix {
    display: inline-block;
}
.clearfix:after{
	clear:both;
	display: block;
	height: 0;
	line-height: 0;
	font-size: 0;
	visibility: hidden;
	content: '';
}
</style>