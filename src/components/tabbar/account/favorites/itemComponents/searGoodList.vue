<template>
    <div>
        <search-head @onfocus="onfocus" @onSearch="onSearch" @getInputVal="getInputVal" v-if="searchHidden"></search-head>
        <div class="goods-list" v-for="product in dataList" :key="product.skuId">
            <!-- 未失效商品 -->
            <div class="footprint-goods-content">
                <div class="fl-left">
                    <div class="good-img">
                        <van-checkbox v-model="checked" icon-size="24px" class="img-checkbox" v-if="showCheck"></van-checkbox>
                        <img :src="$webUrl+product.locationUrl">
                        <div class="shixiao" v-if="false">已失效</div>
                    </div>
                </div>
                <div class="fl-right clearfix">
                    <div class="good-desc">
                        <span class="p1 clamp-2">{{product.supplyTitle}}</span><br>
                        <span class="p2" v-if="false">{{product.scTotal}}人收藏</span>
                        <span class="p2" v-else>已售{{product.skuSalesNum}}件</span>
                    </div>
                    <div class="good-price">
                        <span class="p1" v-if="false">{{jn}}{{product.discountPrice ? product.discountPrice : product.salePrice}}</span>
                        <span class="p3" v-else>货品已不能购买，如有需求请联系客服</span>
                        <span class="p2 fl-right" @click="toResembleGood">找相似</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import searchHead from '@/multiplexing/searchHead.vue'
import {selectuserfavoritesApi} from '@/api/favorites/index'
export default {
    props: {
        
    },
    data() {
        return {
            checked:false,
            showCheck:false,
            searchHidden:true,
            formData:{
                page:1,
                limit:10,
                seraname:'',
                sort:2
            },
            dataList:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.selectuserfavorites(this.formData)
    },
    watch: {

    },
    methods: {
        toResembleGood(){
            //找相似
            this.$router.push({name:'找相似商品'})
        },
        onShowCheck(){
            this.showCheck = !this.showCheck
        },
        //输入框获得焦点时触发
        onfocus(){
            this.$router.go(-1)
        },
        //点击搜索按钮
        onSearch(){
            // this.$router.push({name:'搜索商品1'})
        },
        //输入框内容变化时触发
        getInputVal(value){},
        //收藏夹列表
        selectuserfavorites(data){
            selectuserfavoritesApi(data).then(res => {
                if(res.code == 0){
                    this.goodsObj = res.Data
                    this.dataList = this.goodsObj.list
                }
            })
        },
    },
    components: {
        searchHead
    },  
};
</script>

<style scoped lang="less">
.goods-list{
    position: relative;
    .footprint-goods-content{
        background-color: #fff;
        position: relative;
        margin-bottom: 20px;
        overflow: hidden;
        padding: 20px 30px;
        .good-img{
            position: relative;
            width: 160px;
            height: 160px;
            .img-checkbox{
                position: absolute;
                left:0px;
                top:0px;
                /deep/ .van-icon{
                    background:rgba(51,51,51,0.5);
                }
            }
            .shixiao{
                position: absolute;
                top:0;
                left:0;
                width: 160px;
                height: 160px;
                line-height: 160px;
                text-align: center;
                font-size: 30px;
                color: #fff;
                background-color: rgba(0,0,0,.5);
            }
        }
        .good-desc{
            // position: absolute;
            // top:39px;
            // left:211px;
            width: 486px;
            font-size:26px;
            color: #333;
            margin-bottom: 50px;
            .p1{
                line-height:39px;
                display: inline-block;
            }
            .p2{
                font-size:20px;
                color:rgba(102,102,102,1);
                margin-top:20px;
                display: inline-block;
            }
        }
        .good-price{
            color: #FA5300;
            font-size:36px;
            .p2{
                width:100px;
                height:38px;
                border:1px solid rgba(102,102,102,1);
                border-radius:19px;
                line-height: 38px;
                text-align: center;
                font-size: 16px;
                color: #666;
            }
            .p3{
                font-size: 18px;
                color: #666;
            }
        }
    }
}
</style>
