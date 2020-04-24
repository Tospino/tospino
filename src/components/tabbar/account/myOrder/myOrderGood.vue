<template>
    <div class="my-order-good">
        <search-head @onfocus="onfocus" @getInputVal="getInputVal" @onSearch="onSearch" :searName="searName"></search-head>
        <div>
            <scroll 
                class="bscroll-wrapper"
                ref="wrapper"
                :data="recordGroup"
                :pulldown="pulldown"
                :pullup="pullup"
                @pulldown="_pulldown"
                @pullup="_pullup"
                >
                <div v-show="noSearchStatus">
                    <order-type :dfkList="recordGroup" @closeOverlay="closeOverlay" @showPay="showPay" @showPassWord="showPassWord"></order-type>
                </div>
                <no-search v-show="!noSearchStatus"></no-search>
            </scroll>
        </div>
        <!-- 打开取消订单 -->
        <transition name="canorder">
            <zhezhao v-show="show">
                <cancel-order ref="cancelorder" @closeOverlay="closeOverlay"  :orderId="orderId" @refreshOrder="refreshOrder"></cancel-order>
            </zhezhao>
        </transition>
        <!-- 支付成功弹窗 -->
        <action-sheet-sucess ref="sucess" @showsucess="showsucess"></action-sheet-sucess>
        <!-- 密码弹窗 -->
        <action-sheet-password ref="actionSheetPassword" @getPassWord="getPassWord" :typeLeixing="typeLeixing"></action-sheet-password>
        <!-- 付款方式弹窗 -->
        <action-sheet-paymen ref="actionSheetPaymen" :moeny="moeny" @showPassWord="showPassWord"></action-sheet-paymen>
    </div>
</template>

<script>
import orderType from './itemComponents/orderType'
import searchHead from '@/multiplexing/searchHead.vue'
import {orderlistApi,orderlaunchpayApi,completeorderApi} from '@/api/myOrder/index.js'
import noSearch from './itemComponents/noSearch'
import {mapState,mapActions} from 'vuex'
import actionSheetPassword from '@/multiplexing/actionSheetPassword'
import actionSheetPaymen from '@/multiplexing/actionSheetPaymen'
import actionSheetSucess from '@/multiplexing/actionSheetSucess'
import cancelOrder from './itemComponents/cancelOrder'
import { Toast } from 'vant';
export default {
    props: {

    },
    data() {
        return {
            moeny:0,
            totalCount:0,
            recordGroup: [],
            pulldown: true,
            pullup: true,
            noSearchStatus:true,
            guanmengou : true,
            formData:{
                product_key_name:'',
                order_status_app:null,
                page:1,
                limit:10
            },
            dataList:[],
            searName:'',
            show:false,
            orderId:0,
            typeLeixing:'',
            payTypeDetail:201,//余额支付ID,暂时写死
            orderData:{},
        };
    },
    computed: {
        ...mapState({
            searchOrderFormData:state=>state.searchOrderFormData
        })
    },
    created() {

    },
    mounted() {
        this.formData = Object.assign({},this.formData,this.searchOrderFormData)
        this.orderlist(this.formData,true)
        this.searName = this.$route.query.keyName
        if(this.searName != null) {
            this.formData. product_key_name = this.searName
        }
        this.refreshOrder()
    },
    watch: {

    },
    methods: {
        ...mapActions( 
            ['setorderformdata'] 
        ),
        //下拉刷新
        _pulldown() {
            setTimeout(()=>{
                this.refreshOrder()
            },500)
        },
        //上拉加载
        _pullup(otherData) {
            if(!this.pullup) return
            //不知道为什么触发两次,使用关门狗拦截
            if(this.guanmengou){
                this.formData.page++
                this.orderlist(this.formData,false)
                this.guanmengou = false
            }
            setTimeout(()=>{
                this.guanmengou = true
            },500)
        },
         //输入框获得焦点时触发
        onfocus(){
            
        },
        //点击搜索按钮
        onSearch(){
            this.formData.page = 1
            this.orderlist(this.formData,true)
        },
        //输入框内容变化时触发
        getInputVal(value){
            this.formData.product_key_name = value
        },
        //我的订单列表
        orderlist(data,flag){
            orderlistApi(data).then(res => {
                if(res.code == 0){
                    if(flag){
                        this.dataList = res.Data.list
                    }else{
                        this.dataList = this.dataList.concat(res.Data.list);
                    }
                    this.totalCount = res.Data.totalCount
                    this.recordGroup = this.dataList
                    if(this.dataList.length > 0){
                        this.noSearchStatus = true
                        if(this.dataList.length >= this.totalCount){
                            this.pullup = false
                        }
                    }else{
                        this.noSearchStatus = false
                    }
                }
            })
        },
        //控制取消订单弹窗
        closeOverlay(falg,orderId){
            this.show = falg
            this.$refs.cancelorder.anima = true
            if(!orderId) return
            this.orderId = orderId
        },
        //弹出付款方式弹窗
        showPay(flag,alldata){
            this.$refs.actionSheetPaymen.showAction = flag
            if(!alldata) return
            this.moeny = alldata.orderAmountWebsite
            this.orderData = alldata
        },
        //弹出支付成功
        showsucess(){
            this.$refs.sucess.showAction = true
            setTimeout(()=>{
                this.$refs.sucess.showAction = false
                this.showPay(false)
                this.showPassWord(false)
                this.refreshOrder()
            },1000)
        },
        //刷新页面
        refreshOrder(){
            this.formData.page = 1
            this.formData.limit = 10
            this.orderlist(this.formData,true)
            this.pullup = true
        },
        //确认收货
        completeorder(data){
            completeorderApi(data).then(res => {
                if(res.code == 0){
                    this.showPassWord(false)
                    this.refreshOrder()
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('订单Id必须大于0')
                }else if(res.code == 3){
                    Toast('支付密码不能为空')
                }else if(res.code == 21){
                    Toast('请先设置支付密码')
                    setTimeout(()=>{this.$router.push({name:'设置支付密码'})},1000)
                }else if(res.code == 22){
                    Toast('支付密码不正确')
                }else if(res.code == 23){
                    Toast('该订单不存在')
                }else if(res.code == 24){
                    Toast('该订单不属于当前用户，不能进行操作')
                }else if(res.code == 25){
                    Toast('该订单未支付，不能确认收货')
                }else if(res.code == 26){
                    Toast('该订单已完成，无需重复确认收货')
                }else if(res.code == 27){
                    Toast('该订单不是待收货状态，不能确认收货')
                }
            })
        },
        //获取到密码,请求接口
        getPassWord(value,type){
            if(type == '支付'){
                let orderList = []
                orderList.push({orderId:this.orderData.orderId})
                let obj = {
                    payTypeDetail:this.payTypeDetail,
                    payPwd:value,
                    orderList:orderList
                }
                this.orderlaunchpay(obj)
            }else if(type == '确认收货'){
                let obj = {
                    orderId:this.orderData.orderId,
                    payPwd:value,
                }

                this.completeorder(obj)
            }
        },
        //订单发起支付
        orderlaunchpay(data){
            orderlaunchpayApi(data).then(res => {
                if(res.code == 0){
                    this.showsucess()
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('参数支付方式不能为空')
                }else if(res.code == 3){
                    Toast('余额支付支付密码不能为空')
                }else if(res.code == 4){
                    Toast('参数订单列表orderList不能为空')
                }else if(res.code == 5){
                    Toast('参数订单Id必须大于0')
                }else if(res.code == 21){
                    Toast('请先设置支付密码')
                    setTimeout(()=>{this.$router.push({name:'设置支付密码'})},1000)
                }else if(res.code == 22){
                    Toast('支付密码不正确')
                }else if(res.code == 23){
                    Toast('余额不足')
                }else if(res.code == 31){
                    Toast('提交的订单列表不能为空')
                }else if(res.code == 32){
                    Toast('存在订单不属于当前用户，不能进行操作')
                }else if(res.code == 33){
                    Toast('存在订单已经支付，不能重复支付')
                }else if(res.code == 34){
                    Toast('提交的订单列表包含状态不为待付款的订单')
                }else if(res.code == 35){
                    Toast('提交的订单列表包含已过支付有效期的订单')
                }
            })
        },
        //密码弹窗
        showPassWord(flag,typeLeixing,alldata){
            this.$refs.actionSheetPassword.showAction = flag
            this.typeLeixing = typeLeixing
            if(!alldata) return
            this.orderData = alldata
        },
    },
    components: {
        orderType,
        searchHead,
        noSearch,
        actionSheetPassword,
        actionSheetPaymen,
        actionSheetSucess,
        cancelOrder,
    },
};
</script>

<style scoped lang="less">
.my-order-good{
    padding: 20px 30px;
}
.bscroll-wrapper{
    height: calc(100vh - 100px);
}
</style>
