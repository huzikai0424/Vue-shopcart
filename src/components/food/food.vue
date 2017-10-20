<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="">
					<div class="back" @click="showFlag=false">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="sell-detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="low" v-show="food.oldPrice">{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food" @add="addFood"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" @click.stop.prevent="addFirst" v-show="!food.count||food.count===0"> 加入购物车</div>
					</transition>
				</div>
				<div class="info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<div class="rating-wrapper">
						<ul>
							<li class="rating-item" v-for="rating in food.ratings" v-show="rating.text">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" alt="">
								</div>
								<div class="time">{{rating.rateTime }}</div>
								<p class="text">{{rating.text}}</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</transition>	
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from "@/components/cartcontrol/cartcontrol";
import Vue from "vue";
	export default{
		props:{
			food:{
				type:Object,
				default:undefined
			},
		},
		components:{
			cartcontrol
		},
		data(){
			return {
				showFlag:false,
			}
		},
		methods:{
			show(){
				this.showFlag=true;
				this.$nextTick(() => {
					if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.food, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			addFood(target) {
				this.$emit('add', target);
			},
			addFirst(event){
				if(!event._constructed){
					return;
				}
				else{
					this.$emit('add', event.target);
					Vue.set(this.food,'count',1);
				}
			}
		},
		
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.food
		position:fixed
		left:0
		top:0
		bottom: 48px
		z-index: 30
		width:100%
		background:#fff
		transform: translate3d(0, 0, 0)
		&.move-enter-active, &.move-leave-active
			transition: all 0.2s linear
		&.move-enter, &.move-leave-active
			transform: translate3d(100%, 0, 0)
		.food-content
			background:#f3f5f7
			.image-header
				position:relative
				width:100%
				height:0
				padding-top:100%
				img
					width:100%
					height:100%
					position:absolute
					top:0
					left:0
				.back
					position: absolute
					top: 10px
					left: 0
					.icon-arrow_lift
						color:#fff
						display: block
						padding: 10px
						font-size: 20px
			.content,.info,div.rating
				padding:18px
				background:#fff
				width:100%;
				border-bottom:1px solid rgba(7,17,27,.1)
				box-sizing: border-box
				position:relative
				.title
					font-size:14px
					font-weight:700
					color:rgb(7,17,27)
					line-height:14px
				.sell-detail
					margin-top:8px
					margin-bottom:18px
					font-size:10px
					color:rgb(147,153,159)
					line-height:10px
					.sell-count
						margin-right:12px
				.price
					display:inline-block
					float:left
					.now
						font-size:14px
						font-weight:700
						color:rgb(240,20,20)
						line-height:24px
					.old
						font-size:10px;
						font-weight:700
						color:rgb(147,153,159)
						line-height:24px
				.cartcontrol-wrapper
					position: absolute
					right: 12px
					bottom: 12px
				.buy
					display:inline-block
					font-size:10px
					color:#fff
					line-height:12px
					padding:6px 12px
					border-radius:12px
					background:rgb(0,160,220)
					position: absolute
					right: 18px
					bottom: 18px
					&.fade-enter-active, &.fade-leave-active
					transition: all 0.2s
					&.fade-enter, &.fade-leave-active
						opacity: 0
						z-index: -1
			.info,.rating
				margin-top:16px
				.title
					line-height: 14px
					margin-bottom: 6px
					font-size: 14px
					color: #07111b
				.text
					font-size:12px
					font-weight:200
					color:rgb(77,85,93)
					line-height:24px
			.rating
				.rating-wrapper
					.rating-item
						.user
							float:right
							.name
								font-size:10px
								color:rgb(147,153,159)
								line-height:12px
							img
								width:12px
								height:12px
								border-radius:50%
						.time
							font-size:10px
							color:rgb(147,153,159)
							line-height:12px
							margin-bottom:6px
						.text
							font-size:12px
							color:rgb(7,17,27)
							line-height:24px
								
								
</style>