<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left"  @click="showListWrap">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':foodsCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':foodsCount>0}"></i>
              <div class="num" v-show="foodsCount">{{foodsCount}}</div>
            </div>
          </div>
          <div class="pprice" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="ddesc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" :class="payClass" @click="payNow">{{payDes}}</div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="slide">
      <div class="shopcart-list" v-show="ifShow">
        <div class="list-header">
          <h1>购物车</h1>
          <span @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="food in selectFoods" class="food">
              <span class="name">{{food.name}}</span>
              <div class="cartcontrol-wrapper">
                <cartcontrol @add="addFood" :food="food"></cartcontrol>
              </div>
              <div class="price">￥{{food.price*food.count}}</div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="main-mask" v-show="ifShow" @click="showFlag=false"><div class="list-mask"></div></div>
    </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import cartcontrol from "@/components/cartcontrol/cartcontrol"
  export default{
    props:{
      deliveryPrice:Number,
      minPrice:Number,
      selectFoods: Array
    },
    data(){
      return{
        balls:[
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          }
        ],
        dropBalls:[],
        showFlag:false,
        countFlag:false
      }
    },
    watch:{
      foodsCount(val){
        if(val==0){
          this.countFlag=false;
          this.showFlag=false;
        }
        else{
          this.countFlag=true;
        }
      }
    },
    created(){
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    computed:{
      totalPrice(){
        let sum=0;
        this.selectFoods.forEach((food)=>{
          sum+=food.price * food.count;
        });
        return sum;
      },
      payDes(){
        let money=this.totalPrice;
        if(money==0)
          return "￥"+this.minPrice+"起送";
        if(money<this.minPrice)
          return "还差￥"+(this.minPrice-money)+"起送";
        else
          return "去结算";
      },
      payClass() {
        if(this.totalPrice>=this.minPrice)
          return "enough";
        else
          return "";
      },
      foodsCount(){
        let count = 0;
        this.selectFoods.forEach((food)=>{
          if(food.count){
            count+=food.count;
          }
        });
        return count;
      },
      ifShow(){
        if(this.countFlag&&this.showFlag){
          return true;
        }else{
          return false;
        }
      }
    },
    methods:{
      drop(el){
        for(let i=0;i<this.balls.length;i++){
          let ball=this.balls[i];
          if(!ball.show){
            ball.show=true;
            ball.el=el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      payNow(){
        if(this.payClass=="enough"){
          let sum=this.deliveryPrice+this.totalPrice;
          alert("一共支付"+sum+"元");
        }
        return false;
      },
      empty(){
        this.selectFoods.forEach((food)=>{
            food.count=0;
            this.showFlag=false;
        });
      },
      addFood(target) {
        this.drop(target);
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      showListWrap(){
        if(this.foodsCount>0){
        this.showFlag=!this.showFlag;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        else{
          return false;
        }
      }
    },
    components:{
      cartcontrol
    }
  }
</script>
<style lang="stylus" type="stylesheet/stylus">
  .shopcart
    position:fixed
    height:48px
    z-index:50
    bottom:0
    width:100%
    left:0
    .content
      padding:0
      display:flex
      font-family:"Microsoft YaHei"
      background-color: #141d27
      .content-left
        flex:1
        font-size:0
        .logo-wrapper
          display:inline-block
          .logo
            width:44px
            height:44px
            border:6px solid #141d27
            background-color: rgb(43,52,60)
            position:relative
            top: -10px;
            border-radius:50%
            text-align:center
            margin:0 12px;
            &.highlight
              background: #00a0dc
            .icon-shopping_cart
              font-size:24px
              color:rgb(128, 133, 138)
              line-height:44px
              &.highlight
                  color: #fff
            .num
              background-color:#f01414
              color:#fff
              font-size:9px
              line-height:16px
              width:24px
              height:16px
              border-radius:18px
              position:absolute
              right:-6px
              top:-6px
              box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
              font-weight:700
        .pprice
          color: rgb(128, 133, 138)
          display:inline-block
          margin-top: 12px
          vertical-align: top
          line-height:24px
          font-size:16px
          font-weight:700
          padding-right:12px
          border-right:1px solid rgba(255,255,255,.1)
          &.highlight
            color:#fff
        .ddesc
          font-size:10px
          color: rgb(128, 133, 138)
          display:inline-block
          margin-top: 12px
          vertical-align: top
          line-height:24px
          padding-left:12px
      .content-right
        flex:0 0 105px
        color:rgba(255,255,255,.4)
        font-weight:700
        line-height:48px
        font-size:12px
        background-color:#2B333B
        height:48px
        text-align: center
      .enough
        color:#fff
        background-color:#00b43c
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position:absolute
      top:0
      left:0
      width:100%
      z-index:-1
      background:#fff
      transform: translateY(-100%)
      &.slide-enter,&.slide-leave-to
        opacity:0
        transform: translateY(0)
      &.slide-enter-to,&.slide-leave
        opacity:1
      &.slide-enter-active, &.slide-leave-active
        transition: all 0.5s
      .list-header
        background-color:#f3f5f7
        height:40px
        padding:0 18px
        border-top:1px solid rgba(7,17,27,.1)
        border-bottom:1px solid rgba(7,17,27,.1)
        h1
          font-size:14px
          font-weight:200
          color:rgb(7,17,27)
          line-height:40px
          display:inline-block
          float:left
        span
          font-size:12px
          color:rgb(0,160,220)
          line-height:40px
          float:right
      .list-content
        max-height:217px
        background:#fff
        padding:0 18px
        overflow:hidden
        ul
          li.food
            height:48px
            position:relative;
            .name
              font-size:14px
              color:rgb(7,17,27)
              line-height:48px
              float:left
            .price
              float:right
              color:rgb(240,20,20)
              line-height:48px
              font-size:14px
              font-weight:700
              margin-right:12px
              display:inline-block
            .cartcontrol-wrapper
              display:inline-block
              float:right
              padding:6px 0
  .main-mask
    overflow:hidden
    position:fixed
    background:rgba(7,17,27,0.6)
    top:0
    left:0 
    width:100%
    height:100%
    .list-mask
      filter: blur(10px)
    &.fade-enter,&.fade-leave-to
      opacity:0
    &.fade-enter-to,&.fade-leave
      opacity:1
    &.fade-enter-active, &.slide-leave-active
      transition: all 0.5s
      
           
</style>