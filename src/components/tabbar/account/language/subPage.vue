<template >
  <!-- 切换国家语言货币页面 -->
  <div class="toggle c-b-gray">
    <balance-header title="语言" title2="保存" @submit="submit"></balance-header>
    <div class="options history plr30" v-for="i in 1" :key="i">
      <a  class="clearfix">
        <div class="fl clearfix">
          <div class="nationName">
            <span>英语</span>
          </div>
        </div>
        <div class="fr">
          <!-- 选中状态用背景图来做  或者icon都行 -->
          <div :class="isSelection?'pitchOn':'pitchOn2'" @click="isSelection = !isSelection"></div>
        </div>
      </a>
    </div>
  </div>
</template> 

<script>
import balanceHeader from './itemComponents/balanceHeader'
export default {
	data() {
		return {
			isSelection:true,
		};
	},
	methods: {
		submit(){
			if(!this.isSelection){
				this.$router.push({name:'语言',query:{type:1}})
			}
		}
	},
	components:{
		balanceHeader
	}
};
</script> 

<style scoped lang="less">
.toggle {
  position: relative;
  min-height: 100vh;
  .search-header {
    width: 100%;
    height: 88px;
    position: relative;
    border-bottom: 1px solid #dcdcdc;
    .logo {
      position: absolute;
      left: 30px;
      top: 50%;
      width: 120px;
      height: 31px;
      transform: translateY(-50%);
    }
    .title {
      position: absolute;
      left: 60px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(1, 1, 1, 1);
    }
    .preserve {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(250, 83, 0, 1);
    }
  }

  .options {
    width: 750px;
    height: 98px;
    line-height: 98px;
    background: rgba(255, 255, 255, 1);
   border-bottom: 1px solid #DCDCDC;
    a {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);

      .nationFlagl {
        display: inline-block;
        width: 60px;
        height: 36px;
      }
      .nation {
        font-weight: bold;
        margin-right: 20px;
        margin-left: 20px;
      }
      .nationName {
        display: inline-block;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 27px;
        text-align: left;
        padding-top: 20px;
        margin-left: 20px;
        span {
          display: block;
          &:nth-of-type(1) {
            font-size: 30px;
          }
        }
      }
      .pitchOn {
        width: 40px;
        height: 40px;
		margin-top: 30px;
		border:2px solid rgba(102,102,102,1);
		border-radius:50%;
		box-sizing: border-box;
	  }
	  .pitchOn2{
		width: 40px;
        height: 40px;
		margin-top: 30px;
		border-radius:50%;
		background: url('~@/assets/img/goodsDetails/icon@2x.png') 100% 100%;
	  }
    }
  }
}
// 清除浮动
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: "";
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}
.plr30 {
  box-sizing: border-box;
  padding: 0 30px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>
