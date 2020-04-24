<template>
<!--付款方式弹窗 -->
    <div>
        <van-action-sheet v-model="showAction" title="确认付款" class="action-sheet-paymen" :close-on-click-overlay="false">
            <div class="paymen-content">
                <div class="paymen-content-top" @click="showyinhang">
                    <span>付款方式</span>
                    <van-icon name="arrow" />
                    <span>{{oneTypeName}}</span>
                </div>
                <div class="paymen-content-top">
                    <span>付款金额</span>
                    <span class="c-orange">{{jn}}{{paymoeny}}</span>
                </div>
                
            </div>
            <div class="upload">
                <van-button type="info" size="large" class="load-btn" @click="confirm">立即付款</van-button>
            </div>
        </van-action-sheet>
        <action-sheet-yinhang ref="actionSheetYinhang"></action-sheet-yinhang>
    </div>
</template>

<script>
import {getonlinepaytypelistApi} from '@/api/myOrder/index'
import actionSheetYinhang from '@/multiplexing/actionSheetYinhang'
export default {
    props: {    
        moeny:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            showAction:false,
            payTypeList:[
                {
                    type: 201,
                    name: "余额支付"
                }
            ],
            list:[],
        };
    },
    computed: {
        oneTypeName(){
            let name = ''
            if(this.list.length == 0) return
            name = this.orderStatus(this.list[0].payTypeDetail,'payTypeList')
            return name
        },
        paymoeny(){
            return this.moeny
        }
    },
    created() {

    },
    mounted() {
        this.getonlinepaytypelist()
    },
    watch: {

    },
    methods: {
        confirm(){
            this.$emit('showPassWord',true,'支付')
        },
        getonlinepaytypelist(){
            getonlinepaytypelistApi({}).then(res => {
                if(res.code == 0){
                    this.list = res.Data
                }
            })
        },
        //编译状态
        orderStatus(type,list){
            let name = ''
            this[list].forEach(statu => {
                if(statu.type == type){
                    name = statu.name
                }
            })
            return name
        },
        //展示支付方式列表
        showyinhang(){
            this.$refs.actionSheetYinhang.showAction = true
        }
    },
    components: {
        actionSheetYinhang
    },
};
</script>

<style scoped lang="less">
.action-sheet-paymen{
    border-radius: 0;
    /deep/ .van-action-sheet__header{
        height: 109px;
        font-size: 40px;
        font-weight:bold;
        line-height: 109px;
        .van-icon{
            font-size: 34px;
        }
    }
    .paymen-content{
        width: 100%;
        height: 590px;
        background-color: #fff;
        box-sizing: border-box;
        padding:80px 30px 0;
        position: relative;
        font-size:34px;
        color: #333;
        .paymen-content-top{
            position: relative;
            width: 100%;
            height: 80px;
            .van-icon-arrow{
                float: right;
            }
            span{
                &:nth-child(2){
                    float: right;
                    font-size: 30px;
                }
                &:nth-child(3){
                    float: right;
                    padding-right:29px;
                }
            }
            
        }
        
    }
    .upload{
        overflow: hidden;
        .load-btn{
            display: inline-block;
            height:88px;
            background-color: #FA5300;
            font-size: 40px;
        }
    }
}
</style>
