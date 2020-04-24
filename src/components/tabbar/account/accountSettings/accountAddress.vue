<template>
    <div class="account-address">
        <settings-header :title="title" :title2="title2" @rightBtn="rightBtn"></settings-header>
        <div v-if="addressStatus">
            <posse-address :posseData="posseData" @deladdress='deladdress' ref="posseaddress" @cliCard="cliCard"></posse-address>
        </div>
        <!-- 无地址的时候 -->
        <div v-else>
            <noAddress></noAddress>
        </div>
    </div>
</template>

<script>
import noAddress from './itemComponents/noAddress'
import posseAddress from './itemComponents/posseAddress'
import settingsHeader from './itemComponents/settingsHeader'
import {useraddresslistApi,deladdressApi} from '@/api/accountSettings/index.js'
export default {
    props: {

    },
    data() {
        return {
            title:'收货地址',
            title2:'添加新地址',
            addressStatus:true,
            formData:{
                limit: 10,
                page: 1,
            },
            addressList:[],
            posseData:{}
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.useraddresslist()
    },
    watch: {
        addressStatus:{
            handler:function(newVal){
                this.title2 = newVal? '添加新地址' : ''
            }
        }
    },
    methods: {
        //用户收货地址列表
        useraddresslist(){
            useraddresslistApi(this.formData).then(res => {
                if(res.code == 0){
                    this.posseData = res.Data
                    this.addressList = res.Data.list
                    this.addressStatus = this.addressList.length > 0
                }
            })
        },

        rightBtn(){
            this.$router.push({name:'新增地址',query:{type:'add'}})
            this.$fn.deepnull(this.$store.state.addreData)
        },
        jumpRouter(name){
            this.$router.push({name})
        },
        //删除地址
        deladdress(addressId){
            deladdressApi({addressId}).then(res => {
                if(res.code == 0){
                    this.useraddresslist()
                    this.$refs.posseaddress.redordshow = false
                }
            })
        },
        cliCard(){}
    },
    components: {
        noAddress,
        posseAddress,
        settingsHeader
    },
};
</script>

<style scoped lang="less">
.account-address{
    
}
</style>
