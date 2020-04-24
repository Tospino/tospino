<template>
<!-- 地址列表 -->
    <div class="address-list">
        <balance-header title="修改地址"></balance-header>
        <div class="address" @click="toEditAddress" v-for="(address,index) in addressList" :key="index">
            <div class="address-text">
                <div class="address-text-top">
                    <span>收货人：{{address.name}}</span>
                    <span class="fl-right">{{address.phoneNumber}}</span>
                </div>
                <div class="address-text-bottom">
                    <span>收货地址：{{address.addreCitys}}{{address.userAddress}}</span>
                </div>
            </div>
            <div class="yuan" v-if="istrue" @click="istrue =!istrue"></div>
            <div class="yuan-img" v-else @click="istrue =!istrue">
                <img src="@/assets/img/confirmOrder/icon@2x.png">
            </div>
        </div>
        <div class="footer" @click="toAddAddress">
            新增地址
        </div>
    </div>
</template>

<script>
import {useraddresslistApi} from '@/api/accountSettings/index.js'
import balanceHeader from './itemComponents/balanceHeader'
export default {
    props: {

    },
    data() {
        return {
            istrue:true,
            formData:{
                limit: 10,
                page: 1,
            },
            addressList:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.useraddresslist(this.formData)
    },
    watch: {

    },
    methods: {
        toEditAddress(){
            this.$router.push({name:'我的订单修改地址'})
        },
        toAddAddress(){
            this.$router.push({name:'新增地址'})
        },
        //用户收货地址列表
        useraddresslist(data){
            useraddresslistApi(data).then(res => {
                if(res.code == 0){
                    this.addressList = res.Data.list
                }
            })
        },
    },
    components: {
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.address-list{
    .address{
        height: 200px;
        background-color: #FFF;
        position: relative;
        padding:50px 30px 0;
        box-sizing: border-box;
        margin-bottom: 20px;
        .address-text{
            width:597px;
            color: #333;
            .address-text-top{
                margin-bottom: 14px;
                font-size: 30px;
            }
            .address-text-bottom{
                line-height:33px;
                font-size: 22px;
            }
        }
        .yuan{
            width:40px;
            height:40px;
            border-radius: 50%;
            border:1px solid rgba(153,153,153,1);
            position: absolute;
            top:50%;
            right:30px;
        }
        .yuan-img{
            width:40px;
            height:40px;
            position: absolute;
            top:50%;
            right:30px;
            img{
                position: absolute;
                top:0;
                left:0
            }
        }
    }
    .footer{
        position: fixed;
        bottom: 0;
        width: 100vw;
        height: 100px;
        background-color: #FA5300;
        font-size: 36px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }
}
</style>
