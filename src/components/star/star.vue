<template>
  <div class="star" :class="starSize">
    <span v-for="(item,index) in ClassMap" :class="item" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default{
    props:{
      size:Number,
      score:Number
    },
    computed:{
      starSize(){
        return "star-"+this.size;
      },
      ClassMap(){
        let classArr=[];
        let score = Math.floor(this.score * 2) / 2;
        for(let i=0;i<Math.floor(score);i++){
          classArr.push(CLS_ON);
        }
        if(score%1!=0){
          classArr.push(CLS_HALF);
        }
        while(classArr.length<LENGTH){
          classArr.push(CLS_OFF);
        }
        return classArr;
      },
    }
  }
</script>

<style>
  .detail-main .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
}
.star {
    font-size: 0;
}
.star .star-item {
    display: inline-block;
    background-repeat: no-repeat;
}
.star.star-48 .star-item {
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
}
.star.star-48 .star-item.on {
    background-image: url('star48_on@2x.png');
}
.star.star-48 .star-item.off {
    background-image: url('star48_off@2x.png');
}
.star.star-48 .star-item.half {
    background-image: url('star48_half@2x.png');
}
.star.star-48 .star-item:last-child {
    margin-right: 0;
}
.star.star-36 .star-item {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
}
.star.star-36 .star-item.on {
    background-image: url('star36_on@2x.png');
}
.star.star-36 .star-item.off {
    background-image: url('star36_off@2x.png');
}
.star.star-36 .star-item.half {
    background-image: url('star36_half@2x.png');
}
.star.star-36 .star-item:last-child {
    margin-right: 0;
}

</style>