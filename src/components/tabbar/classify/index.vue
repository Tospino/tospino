<template>
<!-- 分类 -->
    <div class="classify">
        <search-header></search-header>
        <div class="classify-con">
            <van-sidebar v-model="activeKey" @change="changeSidebar">
                <van-sidebar-item :title="leftGoods.categoryName" v-for="leftGoods in leftList" :key="leftGoods.categoryId"/>
            </van-sidebar>
            <div class="classify-right">
                <div class="banner">
                    <img :src="$webUrl+leftImgSrc">
                </div>
                <div class="recommend" v-for="rightGoods in rightList" :key="rightGoods.categoryId">
                    <span class="title">{{rightGoods.categoryName}}</span>
                    <div>
                        <van-row gutter="40">
                            <van-col span="7" v-for="product in rightGoods.productCategory" :key="product.categoryId">
                                <div class="sanji" @click="toSearOne(product.categoryId)">
                                    <img :src="$webUrl+product.categoryImg">
                                    <div class="parent">
                                        <span class="name">{{product.categoryName}}</span>
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
import searchHeader from '@/multiplexing/searchHeader'
import {procategorylistApi} from '@/api/classify/index'
import {mapState,mapActions} from 'vuex'
export default {
    props: {

    },
    data() {
        return {
            activeKey:0,
            formData:{
                category_level: 1,
                parent_id:0
            },
            leftList:[],
            rightList:[],
            leftImgSrc:'',
            classifyData:{}
        };
    },
    computed: {
        ...mapState({
            classifyKeep:state=>state.classifyKeep
        }),
    },
    activated(){
        if(this.classifyKeep){
            this.activeKey = 0
            if(localStorage.classifyData){
                this.classifyData = this.$fn.MyLocalStorage.Cache.get('classifyData')
                if(!this.classifyData){
                    this.procategorylist()
                }else{
                    this.leftList = this.classifyData.leftdataList
                    this.rightList = this.classifyData.righdataList
                    this.leftImgSrc = this.classifyData.leftdataList[0].categoryImg
                }
            }else{
                this.procategorylist()
            }
            this.classifykeep(false)
        }
    },
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        if(to.name == '搜索商品1'){
            to.meta.isBack = true;
        }
        next()
    },
    mounted() { 
        if(localStorage.classifyData){
            this.classifyData = this.$fn.MyLocalStorage.Cache.get('classifyData')
            if(!this.classifyData){
                this.procategorylist()
            }else{
                this.leftList = this.classifyData.leftdataList
                this.rightList = this.classifyData.righdataList
                this.leftImgSrc = this.classifyData.leftdataList[0].categoryImg
            }
        }else{
            this.procategorylist()
        }
    },
    watch: {

    },
    methods: {
        ...mapActions(['classifykeep']),
        procategorylist(){
            procategorylistApi(this.formData).then(res => {
                if(res.code == 0){
                    this.leftList = res.leftdataList
                    this.rightList = res.righdataList
                    this.leftImgSrc = res.leftdataList[0].categoryImg
                    if(this.formData.parent_id == 0){
                        let time = 60*60*24*2 //2天
                        this.$fn.MyLocalStorage.Cache.put('classifyData',res,time)
                    }
                }
            })
        },
        //更改侧边导航
        changeSidebar(index){
            this.leftImgSrc = this.leftList[index].categoryImg
            this.formData.category_level = 2
            this.formData.parent_id = this.leftList[index].categoryId
            procategorylistApi(this.formData).then(res => {
                if(res.code == 0){
                    this.rightList = res.righdataList
                    this.leftList = res.leftdataList
                    this.classifyData.leftdataList = res.leftdataList
                    let time = 60*60*24 //2天
                    this.$fn.MyLocalStorage.Cache.put('classifyData',this.classifyData,time)
                }
            })
        },
        //去到搜索里面
        toSearOne(categoryId){
            this.$router.push({name:'搜索商品1',query:{categoryId:categoryId}})
        }
    },
    components: {
        searchHeader
    },
};
</script>

<style scoped lang="less">
.classify-con{
    position: relative;
    .van-sidebar{
        width: 176px;
        // margin: 15px 0 0 0;
        display: inline-block;
        max-height: 1139px;
        overflow: auto;
        .van-sidebar-item{
            min-height: 110px;
            line-height: 40px;
            text-align: center;
            margin-bottom: 2px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .van-sidebar-item--select{
            border-left:15px solid red;
        }
    }
    .classify-right{
        width: 524px;
        height: 100%;
        float: right;
        max-height: 1139px;
        overflow-x: hidden;
        overflow-y: auto;
        padding-right:30px;
        margin: 15px 0 0 0;
        .banner{
            // width: 524px;
            height: 180px;
        }
        .recommend{
            margin-top: 40px;
            .title{
                font-size: 20px;
                color: #666666;
                display: inline-block;
                margin-bottom: 19px;
            }
            .sanji{
                width: 160px;
                height: 190px;
                margin-bottom: 17px;
                img{
                    width: 160px;
                    height: 140px;
                }
                .parent{
                    width: 100%;
                    height: 50px;
                    background-color: #fff;
                    display:flex;
                    text-align: center;
                    .name{
                        display:flex;
                        width: 100%;
                        align-items:center;/*垂直居中*/
                        justify-content: center;/*水平居中*/
                        color: #333333;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    .margin-b-0{
        margin-bottom: 0
    }
}


</style>
