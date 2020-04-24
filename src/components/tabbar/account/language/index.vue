<template >
  <!-- 切换国家语言货币页面 -->
  <div class="toggle c-b-gray">
    <balance-header title="更换国家/地区"></balance-header>
    <div class="lead plr30">请选择您希望购物的国家/地区和语言</div>
    <div class="options plr30">
      <a class="clearfix">
        <div class="fl">国家/地区</div>
        <div class="fr">
          <img :src="nationalFlag" alt class="nationFlagR" />
          <span class="nation">{{countryItem.country}}</span>
          <!-- <span>&gt;</span> -->
        </div>
      </a>
    </div>
    <div class="options plr30">
      <a class="clearfix" @click="toyuyan">
        <div class="fl">语言</div>
        <div class="fr">
          <span class="nation">{{countryItem.language}}</span>
          <span>&gt;</span>
        </div>
      </a>
    </div>
    <div class="options plr30">
      <a class="clearfix">
        <div class="fl">货币</div>
        <div class="fr">
          <span class="nation">{{countryItem.currency}}</span>
          <!-- <span>&gt;</span> -->
        </div>
      </a>
    </div>
    <button class="done" @click="done">完成</button>
  </div>
</template> 

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {getcountryWebUrlApi} from '@/api/login/index'
import china from '@/assets/img/goodsDetails/01@2x.png'
import gana from '@/assets/img/goodsDetails/02@2x.png'
import {Toast} from 'vant'
export default {
	data() {
		return {
			isSelection:true,
			countryItem:{
				country:'',
				language:'',
				currency:'',
				webUrl:''
			},
			china:china,
			gana:gana
		};
  	},
	mounted(){
    this.getcountryWebUrl()
	},
	computed:{
		nationalFlag(){
			let flag = null
			if(this.$route.query.type == 1){
				flag = this.gana
			}else{
				flag = this.china
			}
			return flag
		}
	},
	methods: {
		toyuyan(){
			this.$router.push({name:'语言选择页'})
    },
    //获取站点的国家语言信息
		getcountryWebUrl(){
			getcountryWebUrlApi().then(res => {
				if(res.code == 0){
					try{
						if(this.$route.query.type == 1){
							this.countryItem = res.Data[1]
						}else{
							this.countryItem = res.Data[0]
						}
					}
					catch(err){
						this.countryItem = res.Data[0]
					}
					
				}
			})
		},
		//完成
		done(){
			if(this.$route.query.type == 1){
        window.location.href = this.countryItem.webUrl + '#/control/home?token='+localStorage.token
			}else{
				Toast('The current languagge is English')
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
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(1, 1, 1, 1);
    }
  }
  .lead {
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
  }
  .options {
    width: 750px;
    height: 98px;
    line-height: 98px;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 20px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      .nationFlagR {
        display: inline-block;
        width: 80px;
		height: 48px;
		vertical-align: middle;
      }
      .nation {
        font-weight: bold;
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }
  .done {
    display: block;
    margin: 70px auto;
    width: 690px;
    height: 98px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(102, 102, 102, 1);
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
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
