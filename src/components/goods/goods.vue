<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu($event,index)" ref="menuList">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list" v-for="item in goods" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="list in item.foods" @click="selectFood(list,$event)">
              <div class="icon">
                <img :src="list.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{list.name}}</h2>
                <p class="desc">{{list.description}}</p>
                <div class="extra">
                  <span class="count">月售{{list.sellCount}}份</span>
                  <span>好评率{{list.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{list.price}}</span>
                  <span class="old" v-show="list.oldPrice">￥{{list.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="list" @add="addFood"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" 
     :selectFoods="selectFoods" ></shopcart>
  </div>
  <food @add="addFood" :food="selectedFood" ref="food"></food>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from "@/components/shopcart/shopcart";
import cartcontrol from "@/components/cartcontrol/cartcontrol";
import food from "@/components/food/food";
const ERR_OK=0;
  export default{
      components:{
          shopcart,
          cartcontrol,
          food
      },
      data(){
          return{
              goods:[],
              listHeight:[],
              scrollY:0,
              seller:{},
              selectedFood:{},
              showFlag:false
          };
      },
      created(){
          this.$http.get("/api/goods").then((res)=>{
              res=res.body;
              if(res.errno === ERR_OK){
                  this.goods=res.data;
                  this.$nextTick(() => {
                      this._initScroll();
                      this._calculateHeight();
                      
                  });
              }
          });
          this.classMap=['decrease','discount','guarantee','invoice','special'];
          this.seller=JSON.parse(localStorage.getItem("seller"));
      },
      computed:{
          currentIndex(){
              for(let i=0;i<this.listHeight.length;i++){
                  let height1=this.listHeight[i];
                  let height2=this.listHeight[i+1];

                  if(this.scrollY<this.listHeight[0])
                      return 0;
                  else if(this.scrollY<height2 && this.scrollY>=height1){
                      this._followScroll(i+1);
                      return i+1;
                  }
              }
          },
          selectFoods() {
              let foods = [];
              this.goods.forEach((good) => {
                  good.foods.forEach((food) => {
                    if (food.count) {
                          foods.push(food);
                      }
                  });
              });
              return foods;
          }
      },
      methods:{
          _initScroll(){
              this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                  click: true  //会派发一个 click 事件
              });
              this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                  click: true,  //会派发一个 click 事件
                  probeType: 3  //0:不派发 scroll 事件 1:非实时派发 2:屏幕滑动过程中派发 3：动画也派发
              });
              this.foodsScroll.on('scroll',(pos)=>{
                  this.scrollY = -1*Math.round(pos.y);
              });
          },
           addFood(target) {
            this._drop(target);
          },
          _drop(target) {
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
              this.$refs.shopcart.drop(target);
            });
          },
          selectMenu(event, index) {
              if (!event._constructed) {
                  return;
              }
              let el = this.$refs.foodList[index];
              this.foodsScroll.scrollToElement(el, 300);
          },
          selectFood(food, event) {
            if (!event._constructed) {
              return;
            }
            this.selectedFood = food;
            this.$refs.food.show();
          },
          _calculateHeight(){
              let el=this.$refs.foodList;
              let height=0;
              for(let i=0;i<el.length;i++){
                  height+=el[i].clientHeight;
                  this.listHeight.push(height);
              }
          },
          _followScroll(index){
              let el=this.$refs.menuList[index];
              this.menuScroll.scrollToElement(el, 300, 0, -100);
          }
      },
      
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
      display: flex
      position: absolute
      top: 174px
      bottom: 46px
      width: 100%
      overflow: hidden
      .menu-wrapper
          flex: 0 0 80px
          width: 80px
          background: #f3f5f7
          .menu-item
              display: table
              height: 54px
              width: 56px
              padding: 0 12px
              line-height: 14px
              &.current
                  position: relative
                  z-index: 10
                  margin-top: -1px
                  background: #fff
                  font-weight: 700
                  .text
                      border-none()
              .icon
                  display: inline-block
                  vertical-align: top
                  width: 12px
                  height: 12px
                  margin-right: 2px
                  background-size: 12px 12px
                  background-repeat: no-repeat
                  &.decrease
                      bg-image('decrease_3')
                  &.discount
                      bg-image('discount_3')
                  &.guarantee
                      bg-image('guarantee_3')
                  &.invoice
                      bg-image('invoice_3')
                  &.special
                      bg-image('special_3')
              .text
                  display: table-cell
                  width: 56px
                  vertical-align: middle
                  border-1px(rgba(7, 17, 27, 0.1))
                  font-size: 12px
                  
      .foods-wrapper
          flex: 1
          .title
              font-size:12px
              color:rgb(147,153,159)
              line-height:26px
              background:#f3f5f7
              border-left:2px solid #d9dde1
              padding-left:14px
          .food-item
              display:flex
              margin:18px
              padding-bottom:18px    
              border-1px(rgba(7, 17, 27, 0.1))
              &:last-child
                  border-none()
                  margin-bottom: 0;
              .icon
                  flex:0 0 57px
                  margin-right:10px
                  img
                      width:57px
                      height:57px
              .content
                  flex:1
                  padding:0;
                  .name
                      font-size:14px
                      color:rgb(7,17,27)
                      line-height:14px
                      margin: 2px 0 8px
                      height:14px;
                  .desc,.extra
                      font-size:10px
                      color:rgb(147,153,159)
                      line-height:12px
                      margin-bottom:8px
                  .extra
                      margin-bottom:0
                      .count
                          margin-right:12px
                  
                  .price
                      margin-right:8px
                      .now
                          font-size:14px
                          color:rgb(240,20,20)
                          font-weight:400
                          line-height:24px
                      .old
                          font-size:10px
                          color:rgb(147,153,159)
                          font-weight:400
                          line-height:24px
                          text-decoration: line-through
                  .cartcontrol-wrapper 
                      position: absolute
                      right: 0
                      bottom: 12px
</style>
