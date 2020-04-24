<template >
  <!-- 消息订阅 -->
	<div class="details c-b-gray">
		<balance-header :iconShow="true"></balance-header>
		<div class="plr30">
			<h3 class="title">{{detail.announceTitle}}</h3>
			<div class="timeWrap">
				<span>TOSPINO</span>
				<span class="time">{{detail.publishTime}}</span>
			</div>
		<!-- 内容区 -->
			<div class="main">
				<img :src='$webUrl+detail.announceImg'/>
				<div v-html="detail.announceContent" class="announceContent"></div>
			</div>
		</div>
  	</div>
</template> 

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {getsystemmesgmodelApi} from '@/api/information/index.js'
export default {
	data() {
		return {
			detail:{}
		};
	},
	mounted(){
		this.getsystemmesgmodel(this.$route.query.announceId)
	},
  	methods: {
		getsystemmesgmodel(id){
			getsystemmesgmodelApi({announceId:id}).then(res => {
				if(res.code == 0){
					this.detail = res.tpAnnounce
				}
			})
		}
	},
  	components:{
		balanceHeader
	}

};
</script> 

<style scoped lang="less">
.details {
  min-height: 100vh;
  box-sizing: border-box;
  .title {
    font-size: 42px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
	line-height: 1.4;
	padding-top: 30px;
  }
  .timeWrap {
    font-size: 26px;
    font-family: Helvetica;
    font-weight: 400;
    color: rgba(250, 83, 0, 1);
    margin: 20px 0 40px;
    .time {
      font-size: 22px;
      font-family: Helvetica;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-left: 30px;
    }
  }
  .main {
    overflow: hidden;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 39px;
    img{
      margin-bottom: 30px;
    }
    p{
       margin-bottom: 30px;
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
  padding: 0 30px 78px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>
