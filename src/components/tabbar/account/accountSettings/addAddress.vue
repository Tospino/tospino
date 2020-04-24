<template>
    <div class="add-address" >
        <div v-show = choiceShow>
            <settings-header :title="title" title2="保存" @rightBtn="rightBtn"></settings-header>
        <div class="cell">
            <input type="search" :class="{'c-333':isBace}" class="input-xt" placeholder="收货人" v-model="form.shr" :maxlength="20">
        </div>
        <div class="cell">
            <input type="search" :class="{'c-333':isBace}" class="input-xt" placeholder="手机号码" v-model="form.sjhm" :maxlength="11" @input="inputFun1">
            <span class="hm c-999">+86</span>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="cell" @click="toChoiceList(1,0)">
            <input type="text" :class="{'c-333':isBace}" class="input-xt" placeholder="请选择国家" v-model="form.lev1" :disabled='true'>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="cell" @click="toChoiceList(2,choiceForm.lev1.id)">
            <input type="text" :class="{'c-333':isBace}" class="input-xt" placeholder="州/省/地区" v-model="form.lev2" :disabled='true'>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="cell " @click="toChoiceList(3,choiceForm.lev2.id)">
            <input type="text" :class="{'c-333':isBace}" class="input-xt" placeholder="城市/县/镇" v-model="form.lev3" :disabled='true'>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="cell" @click="toChoiceList(4,choiceForm.lev3.id)">
            <input type="text" :class="{'c-333':isBace}" class="input-xt" placeholder="县/区/街道" v-model="form.lev4" :disabled='true'>
            <van-icon name="arrow" class="arrow c-999"/>
        </div>
        <div class="top-textarea">
            <textarea placeholder="请输入详细地址" v-model="form.message"></textarea>
        </div>
        <div class="cell">
            <span class="c-333">设为默认地址</span>
            <van-switch v-model="form.checked" class="switch" active-color="#07c160" inactive-color="#999"/>
        </div>
        </div>
        
        <choiceList v-show="!choiceShow" @getchoice="getchoice" @choiceStatus="choiceStatus" ref="choiceList"></choiceList>
    </div>
</template>

<script>
import settingsHeader from './itemComponents/settingsHeader'
import {adduseraddressApi,updateaddressApi} from '@/api/accountSettings/index.js'
import { Toast } from 'vant';
import choiceList from '@/multiplexing/choiceList.vue'
export default {
    props: {

    },
    data() {
        return {
            title:'添加收货地址',
            isBace:true,
            choiceShow:true,
            form:{
                shr:"",
                sjhm:"",
                lev1:null,
                lev2:null,
                lev3:null,
                lev4:null,
                message:'',
                checked:true,
            },
            areaId:'',
            areaName:'',
            areaCode:'',
            choiceForm:{
                lev1:{
                    id:'',
                    name:'',
                    areaCode:''
                },
                lev2:{
                    id:'',
                    name:'',
                    areaCode:''
                },
                lev3:{
                    id:'',
                    name:'',
                    areaCode:""
                },
                lev4:{
                    id:'',
                    name:'',
                    areaCode:''
                }
            }
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.isEdit()
    },
    watch: {

    },
    methods: {
        //选择地址组件返回信息
        getchoice(choicDate){
            this.choiceForm = Object.assign({},this.choiceForm,choicDate)
            this.form.lev1 = this.choiceForm.lev1.name
            this.form.lev2 = this.choiceForm.lev2.name
            this.form.lev3 = this.choiceForm.lev3.name
            this.form.lev4 = this.choiceForm.lev4.name
        },
        //是否显示选择地址组件
        choiceStatus(status){
            this.choiceShow = status
        },
        //点击选择地址
        toChoiceList(level,parent){
            this.choiceShow = false
            let obj = {
                area_level:level,
                parent_id:parent
            }
            this.$refs.choiceList.formData.area_level = obj.area_level
            this.$refs.choiceList.formData.parent_id = obj.parent_id
            this.$refs.choiceList.basearealist(obj)            
        },
        //点击保存
        rightBtn(){
            if(this.form.message == ''){
                Toast('请填写详细地址')
                return
            }
            if(this.form.shr == ''){
                Toast('请填写收货人')
                return
            }
            if(this.form.sjhm == ''){
                Toast('请填写手机号码')
                return
            }
            this.axiosAddress()
        },
        //判断是否编辑状态
        isEdit(){
            if(this.$route.query.type == 'edit'){
                let posseObj = this.$store.state.posseObj
                posseObj.allParentids = posseObj.allParentids+posseObj.addressAreaId+','
                if(JSON.stringify(posseObj) == "{}") return
                let nameArr = posseObj.addreCitys.split('-')
                //后台返回数据前面前后各有一个多余逗号
                let parenArr = posseObj.allParentids.split(',')
                
                parenArr.pop()
                parenArr.shift()

                //父级ID
                this.choiceForm.lev1.id = parenArr[0]
                this.choiceForm.lev2.id = parenArr[1]
                this.choiceForm.lev3.id = parenArr[2]
                //当前城市名字
                this.form.lev1 = nameArr[0]
                this.form.lev2 = nameArr[1]
                this.form.lev3 = nameArr[2]
                this.form.lev4 = nameArr[3]
                this.form.shr = posseObj.name
                this.form.sjhm = posseObj.phoneNumber
                this.form.message = posseObj.userAddress
                this.form.checked = posseObj.isDefault == 1 ? true : false
                //给选择城市列表当前城市名字,不给的话每个选择完就没有名字了
                this.$refs.choiceList.addreData.lev1.name = this.form.lev1
                this.$refs.choiceList.addreData.lev2.name = this.form.lev2
                this.$refs.choiceList.addreData.lev3.name = this.form.lev3
                this.$refs.choiceList.addreData.lev4.name = this.form.lev4
                this.title = '编辑收货地址'
            }
        },
        axiosAddress(){
            let addressAreaId = null
            let areaCode = null
            if(this.choiceForm.lev4.id != null){
                addressAreaId = this.choiceForm.lev4.id
                areaCode = this.choiceForm.lev4.areaCode
            }else if(this.choiceForm.lev3.id != null){
                addressAreaId = this.choiceForm.lev3.id
                areaCode = this.choiceForm.lev3.areaCode
            }else if(this.choiceForm.lev2.id != null){
                addressAreaId = this.choiceForm.lev2.id
                areaCode = this.choiceForm.lev2.areaCode
            }
            let obj = {
                addressAreaId:addressAreaId,
                phoneCode:'+86',
                isDefault:this.form.checked ? 1 : 2,
                name:this.form.shr,
                phoneNumber:this.form.sjhm,
                userAddress:this.form.message,
                addreCitys:this.form.lev1+'-'+this.form.lev2+ (this.form.lev3?'-'+this.form.lev3:'')+(this.form.lev4?'-'+this.form.lev4:''),
                areaCode:areaCode,
                country:this.form.lev1,
                province:this.form.lev2,
                city:this.form.lev3,
                district:this.form.lev4,
            }
            if(this.$route.query.type == 'edit'){
                this.updateaddress(obj)
            }else{
                this.adduseraddress(obj)
            }
        },
        //新增地址
        adduseraddress(data){
            adduseraddressApi(data).then(res => {
                if(res.code == 0){
                    Toast('success');
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1000)
                }
            })
        },
        //编辑地址  
        updateaddress(data){
            data.addressId = this.$store.state.posseObj.addressId
            updateaddressApi(data).then(res => {
                if(res.code == 0){
                    Toast('success');
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1000)
                }
            })
        },
        inputFun1(e){
            this.form.sjhm=e.target.value.replace(/[^\d]/g,'');
        },
    },
    components: {
        settingsHeader,
        choiceList
    },
};
</script>

<style scoped lang="less">
.add-address{
    .cell{
        height: 88px;
        line-height: 88px;
        padding: 0 30px;
        background-color: #fff;
        color: #999;
        position: relative;
        font-size: 26px;
        border-bottom: 1px solid #DCDCDC;
        &:nth-last-child(1){
            border:0
        }
        .arrow{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
            
        }
        .text{
            position: absolute;
            right:60px;
        }
        .text-tk{
            position: absolute;
            right:30px;
        }
        .input-xt{
            height: 80px;
            border: 0;
            width: 80%;
            background-color: #fff;
        }
        .hm{
            position: absolute;
            right:80px;
            top:50%;
            transform: translateY(-50%);
        }
        .switch{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right:57px;
        }
    }
    .top-textarea{
        padding:36px 30px 0;
        background-color: #fff;
        margin-bottom: 40px;
        textarea{
            width: 100%;
            border:0;
            font-size: 26px;
            min-height: 199px;
        }
    }
}

</style>
