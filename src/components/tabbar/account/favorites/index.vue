<template>
<!-- 收藏夹 -->
    <div class="favorites" ref="content">
        <div class="favorites-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$router.go(-1)"/>
            <span class="header-t1">收藏夹({{shoucangTotal}})</span>
            <van-icon name="search"  class="search" @click="toSearch"/>
            <span class="bj" @click="editBj">{{editBjName}}</span>
        </div>
        <!-- 下拉框 -->
        <van-dropdown-menu active-color="#DB9000" class="adropdown">
            <van-dropdown-item v-model="value1" :options="option1" class="scj" @close="timeSort(value1)"/>
            <van-dropdown-item v-model="value2" :options="option2" disabled />
            <van-dropdown-item v-model="value2" :options="option2" disabled />
            <van-icon name="apps-o" class="apps-o " @click="iconView"/>
        </van-dropdown-menu>
        <div class="favorites-place"></div>
        <div v-show="viewOne">
            <!-- 收藏夹收藏商品(失效和未失效) -->
            <good-list ref="goodList" :list="dataList"></good-list>
        </div>
        
        <div class="img-list" v-show="!viewOne">
            <div v-for="(good,index) in twoDataList" :key="index">
                <van-checkbox v-model="good.checked" icon-size="15px" class="img-checkbox" checked-color="#FA5300" v-if="showFooter"></van-checkbox>
                <img :src="$webUrl+good.imgUrl">
            </div>
        </div>
        <!-- 你可能还喜欢,推荐商品页 -->
        <footer-exhibition :footerData="footerData" ref="footer" @clickPro="toDetail"></footer-exhibition>
        
        <div class="settlement" v-if="showFooter">
            <span class="settlement-text" v-if="true">
                <van-checkbox v-model="allChecked" icon-size="24px" class="checkbox" checked-color="#FA5300" @change="allCheck"></van-checkbox>
                <span class="btn1" @click="delet">取消收藏</span>
                <span class="p1">全选</span>
            </span>
        </div>
        <!-- 占位 -->
        <div class="settlement-place" v-if="showFooter"></div>
    </div>
</template>

<script>
import footerExhibition from '@/multiplexing/footerExhibition'
import goodList from './itemComponents/goodList'
import {selectuserfavoritesApi,deleteuserfavoritesApi} from '@/api/favorites/index'
import {guessyoulikeApi} from '@/api/search/index'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            value1: 0,
            value2: 'a',
            option1: [
                { text: '收藏时间', value: 0 },
                { text: '从远到近', value: 1 },
                { text: '从近到远', value: 2 }
            ],
            option2: [
                { text: '', value: '' },
                { text: '', value: '' },
                { text: '', value: '' },
            ],
            checked:true,
            showFooter:false,
            editBjName:'编辑',
            viewOne:true,
            formData:{
                page:1,
                limit:10,
                seraname:'',
                sort:2
            },
            footerData:{},
            footerFromData:{
                page:1,
                limit:6,
                seraname:''
            },
            shoucangTotal:0,
            pullUp:true,
            kanmengou:true,
            allChecked:false,
            dataList:[],
            twoDataList:[],
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        // 收藏夹搜索商品组件搜索头隐藏
        this.$refs.goodList.searchHidden = false
        this.selectuserfavorites(this.formData)
        this.guessyoulike(this.footerFromData)

        window.addEventListener('scroll', this.menu,true)
    },
    beforeDestroy(){
        window.removeEventListener("scroll",this.menu,true);
    },
    watch: {
        showFooter:{
            handler:function(newVal, oldVal){
                this.editBjName = newVal? '完成':'编辑'
            },
        },
    },
    methods: {
        //获取滚动条距离底部距离
        menu() {
            let footerHeight = this.$refs.footer.$el.clientHeight
            let componentsHeight = this.$refs.content.clientHeight
            let pingmu = document.body.clientHeight
            let dibujuli = pingmu+footerHeight
            let cha = componentsHeight - dibujuli
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
            if(this.pullUp && this.scroll>=cha){
                if(this.kanmengou){
                    this.formData.page ++
                    this.selectuserfavorites(this.formData,true)
                    this.kanmengou = false
                }
            }
        },
        //点击搜索页面
        toSearch(){
            return
            this.$router.push({name:'收藏夹历史记录'})
        },
        //点击编辑
        editBj(){
            this.showFooter = !this.showFooter
            if(this.$refs.goodList){
                this.$refs.goodList.onShowCheck()
            }
        },
        //点击视图图标
        iconView(){
            this.viewOne = !this.viewOne
        },
        //收藏夹列表
        selectuserfavorites(data,flag){
            selectuserfavoritesApi(data).then(res => {
                if(res.code == 0){
                    if(flag){
                        this.dataList = this.dataList.concat(res.Data.list)
                    }else{
                        this.dataList = res.Data.list
                    }
                    this.kanmengou = true
                    this.shoucangTotal = res.Data.totalCount
                    if(this.dataList.length >= this.shoucangTotal){
                        this.pullUp = false
                    }
                    this.dataList.forEach(item => {
                        item.checked = false
                    })

                    this.twoDataList = this.dataList.map(o => Object.assign({}, o));
                }
            })
        },
        //找相似商品
        guessyoulike(data){
            guessyoulikeApi(data).then(res => {
                if(res.code == 0){
                    this.footerData = res.Data
                    this.footerData.list.forEach(item => {
                        if(item.discountPrice == null){
                            item.discountPrice = item.salePrice
                        }
                    });
                }
            })
        },
        //跳转详情页
        toDetail(skuId){
            this.$router.push({name:'商品详情',query:{skuId}})
        },
        //排序
        timeSort(sort){
            if(sort == 0) return
            this.formData.sort = sort
            this.selectuserfavorites(this.formData)
        },
        //全选
        allCheck(){
            if(this.viewOne){
                let arr = this.dataList.map(o => Object.assign({}, o));
                arr.forEach(item => {
                    item.checked = this.allChecked
                })
                this.dataList = arr
            }else{
                let arr = this.twoDataList.map(o => Object.assign({}, o));
                arr.forEach(item => {
                    item.checked = this.allChecked
                })
                this.twoDataList = arr
            }
        },
        //删除
        delet(){
            let arr = []
            if(this.viewOne){
                this.$refs.goodList.dataList.forEach(item => {
                    if(item.checked){
                        arr.push(item.dataId)
                    }
                })
            }else{
                this.twoDataList.forEach(item => {
                    if(item.checked){
                        arr.push(item.dataId)
                    }
                })
            }
            this.deleteuserfavorites(arr)
        },
        //删除收藏夹
        deleteuserfavorites(data){
            deleteuserfavoritesApi(data).then(res => {
                if(res.code == 0){
                    Toast('操作成功')
                    this.selectuserfavorites(this.formData)
                }
            })
        },
    },
    components: {
        footerExhibition,
        goodList
    },
};
</script>

<style scoped lang="less">
.favorites{
    position: relative;
    .favorites-header{
        width: 100%;
        height: 88px;
        background-color: #f2f3f5;
        text-align: center;
        position: fixed;
        top:0;
        line-height: 88px;
        z-index: 3;
        .arrow-left{
            position: absolute;
            top:20px;
            left:30px;
            font-size: 40px;
            
        }
        .header-t1{ 
            display: inline-block;
            line-height: 88px;
            font-size: 36px;
            color: #010101;
        }
        .search{
            position: absolute;
            right:110px;
            font-size:30px;
            top:24px;
        }
        .bj{
            position: absolute;
            font-size:30px;
            color: #333333;
            right:30px;
            // padding-right:30px;
        }
        
    }
    /deep/ .van-dropdown-menu{
        width: 100%;
        height: 70px;
        font-size: 26px;
        background-color: #F2F3F5;
        position: fixed;
        top:88px;
        z-index: 3;
         .van-dropdown-menu__title{
            height: 60px;
            line-height: 60px;
            color: #DB9000;
        }
        /deep/ .van-dropdown-menu__item--disabled{
            span{
                display: none
            }
        }
    }
    .apps-o{
        position: relative;
        top:100%;
        transform: translateY(-70%);
        right:30px;
        font-size: 24px;
    }
    .scj{
        /deep/ .van-dropdown-item__option{
            font-size:24px;
            height: 69px;
            line-height: 50px;
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
            /deep/ .van-icon-success{
                border: 2px solid #999
            }
        }
        
    }
    .img-list{
        position: relative;
        padding: 0 30px;
        margin-bottom: 10px;
        div{
            display: inline-block;
            position: relative;
            width: 23%;
            height: 165px;
            margin:0 0px 10px 10px;
            // background-color: red;
        }
        .img-checkbox{
            display: inline-block;
            position: absolute;
        }
        /deep/ .van-icon-success{
            border: 2px solid #999
        }
    }
    .favorites-place{
        height: 160px;
    }
}
</style>
