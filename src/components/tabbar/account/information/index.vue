<template >
  	<!-- 消息订阅 -->
	<div class="news c-b-gray">
		<balance-header title="消息"></balance-header>
		<scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup" >
			<div class="bscroll-con">
				<div class="plr30 dy" v-for="(data,index) in dataList" :key="index">
					<div class="time">{{data.publishTime}}</div>
					<div class="list" @click="$router.push({name:'消息详情',query:{announceId:data.announceId}})">
						<img :src="$webUrl+data.announceImg"/>
						<div class="text plr30">
							<p>{{data.typeName}}</p>
							<span>{{data.announceTitle}}</span>
						</div>
					</div>
				</div>
			</div>
		</scroll>
	</div>
</template> 

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {getsystemmesgApi} from '@/api/information/index.js'
export default {
	data() {
		return {
			formData:{
				page:1,
				limit:10
			},
			dataList:[],
			recordGroup:[],
			pulldown:true,
			pullup:true,
			guanmengou:true,//看门狗
		};
	},
	mounted(){
		this.getsystemmesg(this.formData)
	},
	methods: {
		getsystemmesg(data,flag){
			getsystemmesgApi(data).then(res => {
				if(res.code == 0){
					if(flag){
                        this.dataList = res.Data.list
                    }else{
                        this.dataList = this.dataList.concat(res.Data.list);
					}
					this.totalCount = res.Data.totalCount
					this.recordGroup = this.dataList
					if(this.dataList.length > 0){
                        if(this.dataList.length >= this.totalCount){
                            this.pullup = false
                        }
                        
                    }else{
                        this.pulldown = false
                        this.pullup = false
                    }
				}
			})
		},
		//下拉刷新
		_pulldown(){
			setTimeout(()=>{
                this.refreshOrder()
            },500)
		},
		//上拉加载
		_pullup(){
			if(!this.pullup) return
            //不知道为什么触发两次,使用关门狗拦截
            if(this.guanmengou){
                this.formData.page++
                this.getsystemmesg(this.formData,false)
                this.guanmengou = false
            }
            setTimeout(()=>{
                this.guanmengou = true
            },500)
		},
		//刷新页面
        refreshOrder(){
            this.formData.page = 1
            this.formData.limit = 10
            this.getsystemmesg(this.formData,true)
            this.pullup = true
        },
  	},
	components:{
		balanceHeader
	}
};
</script> 

<style scoped lang="less">
.bscroll-wrapper{
	height:calc(100vh - 88px)
}
.news {
  min-height: 100vh;
  text-align: center;
  .time {
    display: inline-block;
    margin: 60px 0 40px;
    padding: 11px 22px;
    background: rgba(220, 220, 220, 1);
    font-size: 26px;
    font-family: Helvetica;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 1;
  }
  .list {
    margin: 0 auto;
    width: 690px;

    background: rgba(255, 255, 255, 1);
    text-align: left;
    img {
      display: block;
	  width: 100%;
	  height: 290px;
    }
    .text {
      height: 110px;
      font-family: PingFang SC;
      font-weight: 500;
      p {
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        line-height: 27px;
        margin-bottom: 20px;
        margin-top: 20px;
      }
      span {
        font-size: 20px;
        color: rgba(153, 153, 153, 1);
        line-height: 27px;
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
.dy{
	&:nth-last-child(1){
	  margin-bottom: 30px;
  }
}

</style>
