<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <!-- 路由出口 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header'
const ERR_OK = 0
export default {
  data() {
    return {
      seller:{},
      num:1
    };
  },
  created(){
    this.$http.get('/api/seller').then((res) => {
      res = res.data;
      if(res.errno === ERR_OK){
        this.seller = res.data;
        localStorage.setItem("seller",JSON.stringify(this.seller));
      }
    });
  },
  components:{
    'v-header':header
  },
}
</script>

<style>
  #app .tab{
    display: flex;
    width:100%;
    height:40px;
    line-height: 40px;
    position: relative;
  }
  #app .tab:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7,17,27,0.1);
    content:'';
  }
  #app .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  #app .tab .tab-item a{
    display: block;
    font-size:14px;
    color:rgb(77,85,93);
  }
  #app .tab .tab-item a.active{
    color:rgb(240,20,20);
  }
</style>
