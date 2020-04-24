<template>
<!-- 取消订单遮罩 -->
    <transition name="updown">
        <div class="cancel-order" v-show="anima">
            <div class="cancel-list" >
                <div class="cancel-title">
                    <span>取消订单</span>
                    <van-icon name="cross" class="cross" @click="closeCancel"/>
                </div>
                <div class="yuanyin">
                    请选择取消订单的原因
                </div>
                <div class="yuanyin-list" v-for="(reason,index) in reasonList" :key="index">
                    <span>{{reason.name}}</span>
                    <div class="yuan" v-if="reason.istrue" @click="checkyuan(reason)"></div>
                    <div class="yuan-img" v-else>
                        <img src="@/assets/img/confirmOrder/icon-02@2x.png">
                    </div>
                </div>
                <div class="btns">
                    <div class="btn-zbqx" @click="closeCancel">
                        暂不取消
                    </div>
                    <div class="btn-qdqx" @click="submitOrder">
                        确定取消
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {revokeorderApi} from '@/api/myOrder/index'
import { Toast } from 'vant';
export default {
    props: {
        orderId:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            reasonList:[
                {
                    name:'我不想买了',
                    istrue:true
                },
                {
                    name:'信息填写错误，重新拍',
                    istrue:true
                },
                {
                    name:'卖家缺货',
                    istrue:true
                },
                {
                    name:'其他原因',
                    istrue:true
                },
            ],
            anima:false,
            id:0,
            remark:''
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {
        orderId:{
            handler:function(newVal){
                this.id = newVal
                this.reasonList.forEach(item => {
                    item.istrue = true
                })
                this.remark = ''
            }
        }
    },
    methods: {
        //关闭弹窗
        closeCancel(){
            this.$emit('closeOverlay',false)
            this.anima = false
        },
        checkyuan(item){
            this.reasonList.forEach(ele => {
                ele.istrue = true
            })
            item.istrue = false
            this.remark = item.name
        },
        revokeorder(data){
            revokeorderApi(data).then(res => {
                if(res.code == 0){
                    this.closeCancel()
                    this.$emit('refreshOrder')
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('订单Id必须大于0')
                }else if(res.code == 21){
                    Toast('该订单不存在')
                }else if(res.code == 22){
                    Toast('该订单不属于当前用户，不能进行操作')
                }else if(res.code == 23){
                    Toast('该订单支付方式是在线支付，状态不是待付款，无法进行取消')
                }else if(res.code == 24){
                    Toast('该订单支付方式是货到付款，后台已执行发货操作，无法进行取消')
                }else if(res.code == 25){
                    Toast('该订单已经取消，无需重复取消')
                }
            })
        },
        //确定提交
        submitOrder(){
            let data = {
                orderId:this.id,
                remark:this.remark
            }
            Toast('请选择取消订单原因')
            if(!this.remark) return
            this.revokeorder(data)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.cancel-order{
    position: fixed;
    bottom: 0;
    background-color: #fff;
    height: 850px;
    width: 100vw;
    padding: 0 30px;
    box-sizing: border-box;
    .cancel-list{
        position: relative;
        height: 100%;
    }
    .cancel-title{
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size:36px;
        color: #333;
        position: relative;
    }
    .cross{
        position: absolute;
        right:45px;
        top:34px
    }
    .yuanyin{
        font-size:26px;
        color: #999;
        margin-bottom: 30px;
    }
    .yuanyin-list{
        height: 100px;
        line-height: 100px;
        font-size:30px;
        color: #333;
        border-bottom: 1px solid #DCDCDC;
        position: relative;
    }
    .yuan{
        width:40px;
        height:40px;
        position: absolute;
        border-radius: 50%;
        border:2px solid rgba(153,153,153,1);
        top:50%;
        transform: translateY(-50%);
        right:30px;
    }
    .yuan-img{
        width:40px;
        height:40px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right:30px;
        img{
            position: absolute;
            top:0;
            left:0
        }
    }
    .btns{
        position: absolute;
        bottom: 30px;
        width: 100%;
        .btn-zbqx{
            width:300px;
            height:100px;
            background:rgba(153,153,153,1);
            font-size:40px;
            color: #fff;
            line-height: 100px;
            text-align: center;
            float: left;
        }
        .btn-qdqx{
            width:300px;
            height:100px;
            background-color: #FA5300;
            font-size:40px;
            color: #fff;
            line-height: 100px;
            text-align: center;
            float: right;
        }
    }
}
</style>
