<template>
<!-- 我的足迹 未完成-->
    <div>
        <div class="footprint">
            <div class="footprint-header">
                <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
                <span class="header-t1" >我的足迹</span>
                <span class="header-t2" @click="editBj">{{editBjName}}</span>
                <van-icon name="chat-o" class="xiaoxi" info=""  @click="$router.push({name:'消息'})"/>
                
            </div>
            <div class="place"></div>
             <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pullup="pullup" @pullup="_pullup">
                <div>
                    <calendar class="riqizujian" :checkArr="calendarList" @cliDay="cliDay"></calendar>
                    <div class="footprint-goods" v-for="(day,index) in dataList" :key="index">
                        <div class="footprint-goods-header">
                            <van-checkbox v-model="day.checked" icon-size="24px" class="goods-header-checkbox" v-if="showFooter" checked-color="#F83600" @click="productCheckBox(day,'all')"></van-checkbox>
                            <span class="p1">{{timeSubstring(day.browTime)}} {{dateMinus(timeSubstring(day.browTime,))}}</span>
                        </div>
                        <div class="footprint-goods-content" v-for="(product,index) in day.listhistory" :key="index">
                            <div class="good-img">
                                <van-checkbox v-model="product.checked" icon-size="24px" class="img-checkbox" checked-color="#F83600" v-if="showFooter" @click="productCheckBox(product,'',day)"></van-checkbox>
                                <img :src="$webUrl+product.imgUrl" @click="toDetail(product.skuId)">
                            </div>
                            <div class="good-desc">
                                <span class="p1 clamp-2" @click="toDetail(product.skuId)">{{product.supplyTitle}}</span>
                                <span class="p2">已售{{product.skuSalesNum}}件</span>
                                <div class="good-price">
                                    <span class="p1">{{jn}}{{product.discountPrice == null ? product.salePrice:product.discountPrice}}</span>
                                    <div class="fl-right" @click="shoucangProdu(product)">
                                        <van-icon :name="product.isfavorites == 0 ?'star-o':'star' " :class="product.isfavorites == 0?'c-666':''"/>
                                        <span class="c-333">收藏</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="settlement-place"></div>
            </scroll>
            
            <div class="settlement" v-if="showFooter">
                <span class="settlement-text">
                    <van-checkbox v-model="allchecked" icon-size="24px" class="checkbox" checked-color="#F83600" @change="allCheckBox(allchecked)"></van-checkbox>
                    <span class="btn1" @click="delfootprint">删除足迹</span>
                    <span class="p1">全选</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import calendar from '@/multiplexing/calendar'
import {selectuserbrowhistoryApi,selectuserbrowhistorydateApi,deleteuserbrowhistoryApi,adduserfavoritesApi} from '@/api/favorites/index'
import { Toast } from 'vant';
export default {
    props: {

    },
    data() {
        return {
            recordGroup:[],
            pullup:true,
            guanmengou:true,//看门狗
            totalCount:0,

            allchecked:false,
            editBjName:'编辑',
            showFooter:false,
            dataList:[],
            formData:{
                page:1,
                limit:10,
                createtime:''
            },
            calendarList:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.refreshOrder(this.formData)
        this.selectuserbrowhistorydate()
    },
    watch: {
        showFooter:{
            handler:function(newVal, oldVal){
                this.editBjName = newVal? '完成':'编辑'
            },
        },
        dataList:{
            handler:function(newVal){
                if(newVal.length == 0) return
                newVal.forEach(ele=>{
                    ele.checked = false
                    ele.listhistory.forEach(item => {
                        item.checked = false
                    })
                })
            }
        }
    },
    methods: {
        //点击编辑
        editBj(){
            this.showFooter = !this.showFooter
        },
        //跳转商品详情
        toDetail(skuid){
            this.$router.push({name:'商品详情',query:{skuId:skuid}})
        },
        selectuserbrowhistory(data,flag){
            selectuserbrowhistoryApi(data).then(res => {
                if(res.code == 0){
                    if(flag){
                        if(res.Data.list == 0){
                            Toast('当天没有浏览记录')
                        }else{
                            this.dataList = res.Data.list
                        }
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
                        this.pullup = false
                    }
                }
            })
        },
        timeSubstring(timer){
            return timer.substring(0,10)
        },
        //上拉加载
        _pullup() {
            if(!this.pullup) return
            //不知道为什么触发两次,使用关门狗拦截
            if(this.guanmengou){
                this.formData.page++
                this.selectuserbrowhistory(this.formData,false)
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
            this.selectuserbrowhistory(this.formData,true)
            this.pullup = true
        },
        //收藏该商品
        shoucangProdu(item){
            if(item.isfavorites == 1) return
            let arr = []
            arr.push(item.skuId)
            this.adduserfavorites(arr,item)
            
        },
        //日期解析
        dateMinus(date1){
            var sdate = new Date(date1); 
            var now = new Date(); 
            var days = now.getTime() - sdate.getTime(); 
            var day = parseInt(days / (1000 * 60 * 60 * 24)); 
            return day == 0 ? '今天': day == 1 ? '昨天' :''
        },
        //浏览足迹日期
        selectuserbrowhistorydate(){
            selectuserbrowhistorydateApi().then(res => {
                if(res.code == 0){
                    res.Data.forEach(ele=> {
                        this.calendarList.push(this.timeSubstring(ele.browTime))
                    });
                }
            })
        },
        //选中某天
        cliDay(day){
            this.formData.createtime = day
            this.refreshOrder()
        },
        //全选复选框
        allCheckBox(checkFlag){
            this.dataList.forEach(item => {
                item.checked = checkFlag
                item.listhistory.forEach(ele => {
                    ele.checked = checkFlag
                })
            })
            this.$forceUpdate()
        },
        //商品复选框
        productCheckBox(productItem,flag,list){
            productItem.checked = !productItem.checked
            if(flag == 'all'){
                productItem.listhistory.forEach(ele => {
                    ele.checked = productItem.checked
                })
            }else{
                //点击订单某一个商品的复选框
                let itemFlag = true //标记
                list.listhistory.forEach(element => {
                    //如果有一个是没选中的
                    if(element.checked == false){
                        itemFlag = false
                    }
                })
                //判断状态
                if(itemFlag){
                    //全部选中
                    list.checked = true
                }else{
                    //有一个没选中
                    list.checked = false
                }
            }
            this.$forceUpdate()
        },
        //删除用户足迹
        deleteuserbrowhistory(data){
            deleteuserbrowhistoryApi(data).then(res => {
                if(res.code == 0){
                    this.refreshOrder(this.formData)
                }
            })
        },
        //删除按钮
        delfootprint(){
            let tableIds = [] 
            this.dataList.forEach(dataItem => {
                dataItem.listhistory.forEach(item => {
                    if(item.checked) tableIds.push(item.dataId)
                })
            })
            this.deleteuserbrowhistory(tableIds)
        },
        //加入收藏夹
        adduserfavorites(data,item){
            adduserfavoritesApi(data).then(res => {
                if(res.code == 0){
                    item.isfavorites = 1
                }
            })
        }

    },
    components: {   
        calendar
    },
};
</script>

<style scoped lang="less">
.bscroll-wrapper{
    height: calc(100vh - 88px);
}
.footprint-header{
    width: 100%;
    height: 88px;
    background-color: #f2f3f5;
    text-align: center;
    position: fixed;
    z-index: 3;
    .arrow-left{
        position: absolute;
        top:20px;
        left:30px;
        font-size: 40px;
    }
    .header-t2{
        position: absolute;
        font-size:30px;
        margin-right:30px;
        top:50%;
        right:60px;
        transform: translateY(-50%)
    }
    .xiaoxi{
        position: absolute;
        font-size: 34px;
        top:50%;
        right:30px;
        transform: translateY(-50%)
    }
    .header-t1{ 
        display: inline-block;
        line-height: 88px;
        font-size: 36px;
        color: #010101;
    }
    
}
.footprint-goods{
    .footprint-goods-header{
        height: 80px;
        line-height: 80px;
        position: relative;
        padding: 0 30px;
        .p1{
            font-size:26px;
            color: #333;
        }
        .goods-header-checkbox{
            display: inline-block;
            vertical-align: middle;
            margin-right:29px;
        }
    }
    .footprint-goods-content{
        background-color: #fff;
        padding: 20px 30px;
        .good-img{
            width: 210px;
            height: 210px;
            display: inline-block;
            position: relative;
            .img-checkbox{
                position: absolute;
                left:0px;
                top:0px;
                /deep/ .van-icon{
                    background-color: #DCDCDC;
                    border: 2px solid #999
                }
            }
        }
        .good-desc{
            width: 460px;
            float: right;
            font-size:26px;
            color: #333;
            .p1{
                line-height:39px;
                height: 78px;
            }
            .p2{
                font-size:20px;
                color:rgba(102,102,102,1);
                margin-top:20px;
                display: inline-block;
            }
            .good-price{
                margin-top:35px;
                color: #FA5300;
                font-size:36px;
                overflow: hidden;
                font-size: 26px;
            }
        }
    }
}
.settlement-place{
    height: 120px;
}
.settlement{
    width: 100%;
    height: 120px;
    background-color:#fff;
    position:fixed;
    bottom:0px;
    z-index:999;
    line-height: 120px;
    border-top:2px solid #DCDCDC;
    border-bottom:2px solid #DCDCDC;
    .checkbox{
        display: inline-block;
        margin:39px 0 0 30px;
    }
    .settlement-text{
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 100%;;
        top:0px;
        left:0px;
        font-size: 32px;
        .p2,.p3{
            float: right;
        }
        .p1{
            position: absolute;
            left:103px;
            color: #999;
        }
        .p3{
            margin-left:18px;
        }
        .btn{
            float: right;
            width:160px;
            height:90px;
            background:linear-gradient(-90deg,rgba(248,54,0,1),rgba(250,83,0,1));
            border-radius:45px;
            color:rgba(255,255,255,1);
            line-height:90px;
            text-align: center;
            margin:16px 30px 0 18px;
        }
        .btn1{
            position: absolute;
            width: 240px;
            height: 100%;
            right:0px;
            border:2px solid rgba(250,83,0,1);
            color: #fff;
            font-size:34px;
            line-height: 120px;
            text-align: center;
            background-color: #FA5300;
        }
    }
    
}
</style>
