<template>
    <!-- 点击搜索框弹出的历史记录 -->
    <div class="search-record" >
        <search-head @onfocus="onfocus" @getInputVal="getInputVal" @onSearch="onSearch" :searName="searName"></search-head>
        <div v-if="lishiShow" class="record">
            <div class="m-b-60" v-if="historyList.length>0">
                <div class="search-title" >
                    <span class="title-p1">历史搜索</span>
                    <van-icon name="delete" @click="deleteRecord"/>
                </div>
                <div class="search-labels">
                    <span class="label" v-for="history in historyList" :key="history.tableId" @click="toSearchGood(history.keyWord)">{{history.keyWord}}</span>
                </div>
            </div>
            
            <div v-if="findList.length>0">
                <div class="search-title">
                    <span class="title-p1">搜索发现</span>
                    <van-icon name="eye-o" v-if='iconShow' @click="iconShow = !iconShow"/>
                    <van-icon name="closed-eye" v-else @click="iconShow = !iconShow"/>
                </div>
                <div class="search-labels" v-show="iconShow">
                    <span class="label" v-for="find in findList" :key="find.productId" @click="toSearchGood(find.productName)">{{find.productName}}</span>
                </div>
            </div>
            
        </div>
        <div class="sousuo" v-else>
            <ul>
                <li v-for="product in searGoodList" :key="product.productId" @click="toGoodsOne(product.productName)">
                    <span class="search-good-name">{{product.productName}}</span>
                    <span class="icon">
                        <img src="@/assets/img/search/enter@3x.png" alt="">
                    </span>
                </li>
            </ul>
        </div>

        <van-overlay :show="redordshow" @click="redordshow = false" >
            <!-- 删除历史记录 -->
            <div class="overlay-wrapper" @click.stop>
                <div class="overlay-wrapper-p1">
                    确认删除全部历史记录？
                </div>
                <div class="overlay-wrapper-btns">
                    <span @click="redordshow = false">取消</span>
                    <span @click="delHistory">确定</span>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import searchHead from '@/multiplexing/searchHead.vue'
import {searchGoodApi,searchHistoryApi,searchFindApi,delHistoryApi} from '@/api/search/index';
export default {
    props: {
        
    },
    data() {
        return {
            iconShow:true,
            redordshow:false,
            lishiShow:true,
            flag:true,
            goodName:'',
            searName:'',
            searGoodList:[],//搜索商品列表
            historyList:[],//历史记录列表
            findList:[],//搜索发现列表
        };
    },
    computed: {

    },
    created() {

    },
    
    mounted() {
        this.searchHistory();
        this.searchFind();
        this.searName = this.$store.state.serchName
        
    },
    beforeDestroy(){
        this.$store.state.serchName = ''
    },
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        if(to.name == '搜索商品1'){
            to.meta.isBack = true;
        }
        next()
    },
    watch: {
        goodName:{
            handler:function(newVal, oldVal){
                this.lishiShow = newVal ?  false : true
            },
        },
        searName:{
            handler:function(newVal, oldVal){
                this.lishiShow = newVal ?  false : true
                this.goodName = newVal
                if(newVal == undefined) return
                this.searchGood(newVal)
            },
        }
    },
    methods: {
        deleteRecord(){
            this.redordshow = true;
        },
        toGoodsOne(seraname){
            this.$router.push({name:'搜索商品1',query:{seraname}})
        },
        //输入框获得焦点时触发
        onfocus(){
            // this.lishiShow = false
            // if(this.$route.name == '历史记录' || this.$route.name == '收藏夹历史记录' || this.$route.name == '我的订单历史记录') return
            // this.$router.push({name:'历史记录'})
        },
        //输入框内容变化时触发
        getInputVal(value){
            this.goodName = value
            if(this.flag && value != ''){
                this.flag = false
                this.searchGood(value)
                setTimeout(()=>{
                    this.flag = true
                },500)
            }
        },
        //搜索商品
        searchGood(value){
            searchGoodApi({keyname:value}).then(res => {
                if(res.code == 0){
                    this.searGoodList = res.datalist
                }
            })
        },
        //历史记录
        searchHistory(){
            searchHistoryApi().then(res => {
                if(res.code == 0){
                    this.historyList = res.dataList
                }
            })
        },
        //点击搜索按钮
        onSearch(){
            this.$router.push({name:'搜索商品1',query:{seraname:this.goodName}})
            this.$store.state.serchName = this.goodName
        },
        toSearchGood(goodName){
            this.$router.push({name:'搜索商品1',query:{seraname:goodName}})
        },
        //搜索发现
        searchFind(){
            searchFindApi().then(res => {
                if(res.code == 0){
                    this.findList = res.Data
                }
            })
        },
        //删除所有历史记录
        delHistory(){
            delHistoryApi().then(res => {
                if(res.code == 0){
                    this.redordshow = false
                    this.searchHistory();
                    this.searchFind();
                }
            })
        }
    },
    components: {
        searchHead
    },
};
</script>

<style scoped lang="less">
.search-record{
    position: relative;
    background-color: #fff;
    height: 100vh;
    box-sizing: border-box;
    .record{
        padding: 39px 30px 0;
    }
    .search-title{
        // height: 60px;
        .title-p1{
            font-size: 30px;
            color: #333;
        }
        .van-icon{
            float: right;
            font-size: 40px;
        }
    }
    
    .search-labels{
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-align-content: center;
        align-content: flex-start;
        .label{
            display: inline-block;
            background-color: #F2F3F5;
            border-radius:25px;
            padding: 12px 26px;
            font-size: 26px;
            color: #333;
            margin:20px 20px 0px 0;
        }
    }
    .sousuo{
        ul{
            li{
                height: 87px;
                line-height: 87px;
                font-size:24px;
                color: #333;
                border-bottom:1px solid #DCDCDC;
                padding:0 30px;
                .icon{
                    float: right;
                    width: 30px;
                    height: 30px;
                    
                }
            }
        }
        .search-good-name{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            display: inline-block;
            width: 90%;
        }
    }
    .van-overlay{
        .overlay-wrapper{
            width: 500px;
            height: 200px;
            background-color: #fff;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-50%,-50%);
            .overlay-wrapper-p1{    
                margin:49px 0 39px 40px;
                font-size:36px;
                color: #333
            }
            .overlay-wrapper-btns{
                padding-left:267px;
                font-size:30px;
                color: #FA5300;
                span{
                    &:nth-child(1){
                        margin-right: 65px
                    }
                }
            }
        }
    }
}

</style>
