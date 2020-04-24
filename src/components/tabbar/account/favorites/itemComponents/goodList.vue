<template>
    <div>
        <div class="goods-list" v-for="(product,index) in dataList" :key="index">
            <!-- 未失效商品 -->
            <div class="footprint-goods-content">
                <div class="fl-left">
                    <div class="good-img">
                        <van-checkbox v-model="product.checked" icon-size="24px" class="img-checkbox" v-if="showCheck"></van-checkbox>
                        <img :src="$webUrl+product.imgUrl" @click="toDetail(product.skuId)">
                        <div class="shixiao" v-if="false">已失效</div>
                    </div>
                </div>
                <div class="fl-right clearfix">
                    <div class="good-desc">
                        <span class="p1 clamp-2">{{product.supplyTitle}}</span>
                        <span class="p2">{{product.scTotal}}人收藏</span>
                    </div>
                    <div class="good-price">
                        <span class="p1" v-if="true">{{jn}}{{product.discountPrice ? product.discountPrice : product.salePrice}}</span>
                        <span class="p3" v-else>货品已不能购买，如有需求请联系客服</span>
                        <span class="p2 fl-right" @click="toResembleGood">找相似</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // goodsObj:{
        //     type:Object,
        //     default: ()=>{
        //         return {}
        //     }
        // },
        list:{
            type:Array,
            default: ()=>{
                return []
            }
        }
    },
    data() {
        return {
            checked:false,
            showCheck:false,
            dataObj:{},
            dataList:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        
    },
    watch: {
        // goodsObj:{
        //     handler:function(newVal, oldVal){
        //         this.getData()
        //     },
        // },
        list:{
            handler:function(newVal, oldVal){
                this.getList()
            },
        }
    },
    methods: {
         //找相似按钮
        toResembleGood(){
            this.$router.push({name:'找相似商品'})
        },
        //checkbox状态
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
        // getData(){
        //     this.dataObj = Object.assign({},this.dataObj,this.goodsObj)
        //     if(!this.dataObj.list) return
        //     this.dataList = this.dataObj.list
        // },
        //列表数据
        getList(){
            this.dataList = this.list.map(o => Object.assign({}, o));
        },
        //跳转商品详情
        toDetail(skuid){
            this.$router.push({name:'商品详情',query:{skuId:skuid}})
        },
    },
    components: {
        
    },  
};
</script>

<style scoped lang="less">
.goods-list{
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
            width: 486px;
            font-size:26px;
            color: #333;
            margin-bottom: 20px;
            .p1{
                width: 486px;
                line-height:39px;
                height: 76px;
            }
            .p2{
                font-size:20px;
                color:rgba(102,102,102,1);
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
