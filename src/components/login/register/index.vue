<template>
<!-- 注册页面 -->
    <div class="register">
        <div v-show="choiceShow">
            <navar title="注册"></navar>
            <div class="item-title">创建用户</div>
            <div class="create-user">
                <van-cell-group>
                    <van-field v-model="formData.nickName" placeholder="用户名称" :maxlength="20"/>
                    <div class="iphone-option">
                        <select name=""> 
                            <option value="0">+86</option> 
                        </select> 
                    </div>
                    <van-field v-model="formData.mobile" placeholder="请输入您的手机号"  class="iphone-input" type="number" :maxlength="11"/>
                    <van-field v-model="formData.smsCode" placeholder="请输入验证码" class="register-otp" :maxlength="6">
                        <div slot="button" class="daojishi" @click="getCode" v-show="countTrue">
                            {{countdown}}
                        </div>
                        <div slot="button" class="daojishi" v-show="!countTrue">
                            {{count}}S
                        </div>

                    </van-field>
                    <van-field v-model="formData.email" placeholder="请输入您的邮箱(可不填）" />
                    <van-field v-model="formData.userPwd" clearable :right-icon="eyeName" placeholder="请设置6至20位字符的登录密码" @click-right-icon="eyeStatus = !eyeStatus" class="password" :type="fieldType" :maxlength="20"/>
                    <van-field v-model="formData.userPwd2" clearable :right-icon="eyeName1" placeholder="确认密码" :maxlength="20" @click-right-icon="eyeStatus1 = !eyeStatus1" class="password" :type="fieldType1"/>
                </van-cell-group>
            </div>
            <div class="item-title">公司信息</div>
            <div class="create-user">
                <van-cell-group class="m-10-b border-0">
                    <van-field v-model="formData.companyName" placeholder="公司名称"/>
                </van-cell-group>
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
                <van-cell-group class="m-10-b border-0 textarea">
                    <van-field
                        v-model="formData.companyAddress"
                        rows="5"
                        autosize
                        type="textarea"
                        placeholder="详细地址"
                    />
                </van-cell-group>
                <van-cell-group class="border-0" @click="show=true">
                    <van-field class="zyyw" v-model="formData.mainBusinessName" clearable right-icon="arrow" placeholder="主营业务" :disabled='true'/>
                </van-cell-group>

                
            </div>
            <div class="item-title">拍照上传</div>
            <div class="create-user">
                <div class="uploader">
                    <van-row type="flex" justify="space-between">
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="公司正面照"></upload-one>
                            <div class="uploader-name">公司正面照</div> 
                        </van-col>
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="公司内部照"></upload-one>
                            <div class="uploader-name">公司内部照</div>
                        </van-col>
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="营业执照"></upload-one>
                            <div class="uploader-name">营业执照</div>
                        </van-col>
                    </van-row>
                    
                </div>
                <div class="uploader">
                    <van-row type="flex" justify="space-between">
                        <van-col span="8">
                        <upload-one @getfilePath="getfilePath" imgName="人像照"></upload-one>
                            <div class="uploader-name">法人/人像照</div>
                        </van-col>
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="法人证件正面照"></upload-one>
                            <div class="uploader-name">法人证件正面照</div>
                        </van-col>
                        <van-col span="8">
                            <upload-one @getfilePath="getfilePath" imgName="法人证件背面照"></upload-one>
                            <div class="uploader-name">法人证件背面照</div>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="agreement">
                <!-- <div class="checkbox"></div> -->
                <input type="checkbox" class="checkbox" v-model="xieyi">
                <span>
                    <span class="c1">我已阅读并同意网站的</span>
                    <span class="c-orange" @click="userStatus=true">使用条件</span>
                    <span>及</span>
                    <span class="c-orange" @click="zhengce=true">隐私声明</span>
                </span>
            </div>
            <div class="confirm-btn" @click="toRevise">
                <div class="btn-zc" :style="{backgroundColor:(disabledSubmit?'#FA5300':'#999')}">
                    注册
                </div>
            </div>
            <div class="to-login fs-20" @click="$router.push({name:'登录'})">
                已有账户,去登录
            </div>
        </div>
        
        <choiceList v-show="!choiceShow" @getchoice="getchoice" @choiceStatus="choiceStatus" ref="choiceList"></choiceList>

        <van-action-sheet v-model="show" :actions="memberList" @select="onSelect" cancel-text="取消" class="my-sheet"/>

        <van-popup v-model="show2">
            <div class="revise-success">
                <img src="@/assets/img/login/icon@3x.png">
                <div class="txt1">恭喜您!</div>
                <div class="txt2">已注册成功</div>
            </div>
        </van-popup>

        <zhezhao v-if="zhengce">
            <div class="tanchuang">
                <div class="tanchuang-header">
                    <span>隐私政策</span>
                    <div class="fl-right">
                        <van-icon name="cross" @click="zhengce=false"/>
                    </div>
                </div>
                <div class="tanchuang-content">
                    <yinsi :showTitle="false"></yinsi>
                </div>
            </div>
        </zhezhao>

        <zhezhao v-if="userStatus">
            <div class="tanchuang">
                <div class="tanchuang-header">
                    <span>用户协议</span>
                    <div class="fl-right">
                        <van-icon name="cross" @click="userStatus=false"/>
                    </div>
                </div>
                <div class="tanchuang-content">
                    <user-agreement :showTitle="false"></user-agreement>
                </div>
            </div>
        </zhezhao>

    </div>
</template>

<script>

import navar from '@/multiplexing/navar'
import {membertypelitApi,userregisterApi} from '@/api/register/index'
import uploadOne from '@/multiplexing/uploadOne'
import choiceList from '@/multiplexing/choiceList.vue'
import {msglistApi} from '@/api/login/index.js'
import {Toast} from 'vant'
import zhezhao from '@/multiplexing/zhezhao'
import yinsi from '@/components/tabbar/account/accountSettings/aboutItem/privacyPolicy.vue'
import userAgreement from '@/components/tabbar/account/accountSettings/aboutItem/userAgreement.vue'
export default {
    props: {

    },
    data() {
        return {
            countdown:'发送验证码',
            count: '',
            timer: null,
            countTrue:true,
            xieyi:false,
            username:'',
            show:false,
            show2:false,
            eyeStatus:false,
            eyeStatus1:false,
            choiceShow:true,
            isBace:true,
            registDisabled:true,
            eyeName:'closed-eye',
            eyeName1:'closed-eye',
            fieldType:'password',
            fieldType1:'password',
            fileList:[],
            formData:{
                nickName:'',//用户名称
                mobile:'',//用户手机号码
                mobileCode:'86',//用户手机号码所在国家的编号
                smsCode:'',//验证码
                email:'',//邮箱
                userPwd:'',//密码
                userPwd2:'',//确认密码
                companyName:'',//公司名称
                companyAreaId:'',//公司地址ID(最小area_id)
                companyAddress:'',//公司详细地址
                mainBusiness:'',//主营业务
                mainBusinessName:'',//主营业务名称
                companyFrontImg:'',//公司正面照
                companyInterImg :'',//公司内部照
                businessLicense:'',//营业执照
                legalPersonImg :'',//法人人像照
                legalPersonBack:'',//法人证件反面照
                legalPersonFront:'',//法人证件正面照
            },
            rules:{
                nickName:{
                    required: true,
                    messages: "用户名称不正确"
                },
                mobile:{
                    required: true,
                    messages: "用户手机号码不正确"
                },
                mobileCode:{
                    required: true,
                    messages: "用户手机号码所在国家的编号不正确"
                },
                smsCode:{
                    required: true,
                    messages: "验证码不正确"
                },
                userPwd:{
                    required: true,
                    messages: "密码不正确"
                },
                userPwd2:{
                    required: true,
                    messages: "确认密码不正确"
                },
            },
            form:{
                lev1:null,
                lev2:null,
                lev3:null,
                lev4:null,
            },
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
            },
            memberList: [],//主营业务列表
            yzmData:{
                msgphone:'',
                types:'1',
                areaCode:'86'
            },
            zhengce:false,
            userStatus:false
        };
    },
    computed: {
        disabledSubmit() {
            return !this.$fn.isDisabled(this.formData,this.rules) && this.xieyi 
        }
    },
    created() {

    },
    mounted() {
        this.membertypelit()
    },
    watch: {
        eyeStatus:{
            handler:function(newVal, oldVal){
                this.eyeStatus ? this.eyeName = 'eye-o':this.eyeName = 'closed-eye'
                this.fieldType =  this.eyeStatus ? 'text' : 'password'
            },
        },
        eyeStatus1:{
            handler:function(newVal, oldVal){
                this.eyeStatus1 ? this.eyeName1 = 'eye-o':this.eyeName1 = 'closed-eye'
                this.fieldType1 =  this.eyeStatus1 ? 'text' : 'password'
            },
        },
    },
    methods: {
        toRevise(){
            if(!this.disabledSubmit) return
            var emReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; //正则表达式
            if(this.formData.email == ''){
                
            }else if(!emReg.test(this.formData.email)){
                Toast("邮箱格式不正确!");
                return
            }
            if(this.formData.userPwd.length < 6){
                Toast("请设置6至20位字符的登录密码!");
                return
            }
            if(this.formData.userPwd != this.formData.userPwd2){
                Toast("密码与确认密码不一致!");
                return
            }
            this.userregister()
        },
        getCode(){
            if(this.formData.mobile == ''){
                Toast('请输入手机号码')
                return
            }
            this.yzmData.msgphone = this.formData.mobile
            this.msglist(this.yzmData)
        } ,
        getfilePath(path,imgName){
            if(imgName == '公司正面照'){
                this.formData.companyFrontImg = path
            }else if(imgName == '公司内部照'){
                this.formData.companyInterImg = path
            }else if(imgName == '营业执照'){
                this.formData.businessLicense = path
            }else if(imgName == '人像照'){
                this.formData.legalPersonImg = path
            }else if(imgName == '法人证件背面照'){
                this.formData.legalPersonBack = path
            }else if(imgName == '法人证件正面照'){
                this.formData.legalPersonFront = path
            }
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
        //选择地址组件返回信息
        getchoice(choicDate){
            this.choiceForm = Object.assign({},this.choiceForm,choicDate)
            this.form.lev1 = this.choiceForm.lev1.name
            this.form.lev2 = this.choiceForm.lev2.name
            this.form.lev3 = this.choiceForm.lev3.name
            this.form.lev4 = this.choiceForm.lev4.name

            let addressAreaId = ''
            if(this.choiceForm.lev4.id != null){
                addressAreaId = this.choiceForm.lev4.id
            }else if(this.choiceForm.lev3.id != null){
                addressAreaId = this.choiceForm.lev3.id
            }else if(this.choiceForm.lev2.id != null){
                addressAreaId = this.choiceForm.lev2.id
            }
            this.formData.companyAreaId = addressAreaId

        },
        //是否显示选择地址组件
        choiceStatus(status){
            this.choiceShow = status
        },
        //主营业务列表
        membertypelit(){
            membertypelitApi().then(res => {
                if(res.code == 0){
                    let arr = res.tpMemberTypeList
                    arr.forEach(e => {
                        let obj = {
                            name:e.typeTitle,
                            id:e.typeId
                        }
                        this.memberList.push(obj)
                    });
                }
            })
        },
        //选择主营业务
        onSelect(item) {
            // 默认情况下，点击选项时不会自动关闭菜单
            // 可以通过 close-on-click-action 属性开启自动关闭
            this.show = false;
            this.formData.mainBusiness = item.id
            this.formData.mainBusinessName = item.name
        },
        //注册
        userregister(){
            userregisterApi(this.formData).then(res => {
                if(res.code == 0){
                    localStorage.mobile = res.user.mobile
                     this.show2 = true
                    setTimeout(()=>{
                        this.$router.push({name:'登录'})
                    },2000)
                }else if(res.code == -110){
                    Toast('验证码不正确')
                }else if(res.code == -25){
                    Toast('手机号已注册')
                }else if(res.code == -26){
                    Toast('该手机号已被冻结，请联系后台客服')
                }else if(res.code == -27){
                    Toast('该手机号已被删，除请联系后台客服')
                }else{
                    Toast('error')
                }
            })
        },
        //验证码
        msglist(data){
            msglistApi(data).then(res => {
                if(res.code == 0){
                    const TIME_COUNT = 120;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.countTrue = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.countTrue = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                }else if(res.code == 1){
                    Toast('手机号一天不能超于20条短信发送请求')
                }else if(res.code == 2){
                    Toast('发送失败')
                }else if(res.code == -130){
                    Toast('该手机号未注册')
                }else if(res.code == -131){
                    Toast('该手机号已被系统冻结,请联系后台客服')
                }else if(res.code == -132){
                    Toast('该手机号已被系统删除,请联系后台客服')
                }else if(res.code == -133){
                    Toast('该手机号还在审核中,请联系后台客服')
                }else if(res.code == -134){
                    Toast('该手机号未通过审核,请联系后台客服')
                }else{
                    Toast('error')
                }
            })
        }
    },
    components: {
        navar,
        uploadOne,
        choiceList,
        zhezhao,
        yinsi,
        userAgreement
    },
};
</script>

<style scoped lang="less">
.register{
    /deep/ .van-cell,.van-field{
        height: 88px;
        font-size: 30px;
        .van-cell__value{
            position: relative;
            border-bottom: 1px solid #DCDCDC;
            .van-field__body{
                position: absolute;
                top:20px;
            }
        }
        
        
    }
    .iphone-option{
        width: 78px;
        height: 52px;
        position: absolute;
        top:115px;
        left:15px;
        z-index: 2;
    }
    .create-user{
        padding: 0 30px;
        .iphone-input{
            /deep/ .van-cell__value{
                .van-field__body{
                    margin-left: 100px;
                }
            }
        }
    }
    /deep/ .register-otp{
        position: relative;
        .daojishi{
            width: 180px;
            height: 60px;
            background-color: #F2F3F5;
            color: #333333;
            line-height: 60px;
            text-align: center;
            position: absolute;
            top:-20px;
            left: 470px;
        }
    }
    .password,.zyyw{
        /deep/ .van-cell__value{
            .van-field__body{
                width: 95%;
                .van-field__right-icon{
                    .van-icon{
                        font-size: 36px;
                    }
                    .van-icon-arrow{
                        font-size: 26px;
                    }
                }
            }
        }
    }
    .m-10-b{
        margin-bottom: 10px;
    }
    .border-0{
        /deep/ .van-cell{
            .van-cell__value{
                border:0;
                .van-field__body{
                    width: 95%;
                }
            }
        }
    }
    .textarea{
        /deep/ .van-cell{
            height: 140px;
        }
    }
    .uploader{
        height: 220px;
        width: 100%;
        position: relative;
        /deep/ .van-uploader{
            transform: scale(2) translate(20px,30px);
            .van-uploader__upload{
                margin-left: 8px;
            }
        }
        /deep/ .van-row{
            .van-col{
                position: relative;
                .uploader-name{
                    position: absolute;
                    bottom: -125px;
                    width: 172px;
                    text-align: center;
                    font-size: 24px;
                    color: #666;
                }
            }
        }
    }
    .agreement{
        margin: 99px 0 29px;
        padding-left: 30px;
        font-size: 20px;
    }
    .checkbox{
        display: inline-block;
        vertical-align: middle;
    }
    .confirm-btn{
        padding: 0 30px;
        height:88px;
        font-size:40px;
        text-align: center;
        line-height: 88px;
        .btn-zc{
            color: #fff;
        }
    }
    .item-title{
        background-color: #666666;
        width:200px;
        height:60px;
        color: #fff;
        font-size: 36px;
        text-align: center;
        line-height: 60px;
        margin: 39px 0 20px 30px;
        &:nth-child(2){
            margin-top:0
        }
    }
    .to-login{
        width: 100%;
        text-align: center;
        color: #FA5300;
        margin: 29px 0 88px 0;
    }
    .revise-success{
        width: 600px;
        height: 500px;
        background-color: #fff;
        text-align: center;
        img{
            width: 220px;
            height: 220px;
            margin-top:80px;
            // transform: translateY(-50%)
        }
        .txt1,.txt2{
            font-size:36px;
            font-weight:bold;
        }
        .txt1{
            margin-top: 49px;
        }
        .txt2{
            margin-top: 16px;
        }
    }
    .cell{
        height: 88px;
        line-height: 88px;
        padding: 0 16px;
        background-color: #fff;
        color: #999;
        position: relative;
        font-size: 26px;
        margin-bottom: 10px;
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
    .tanchuang{
        height: 80%;
        margin: 80px 30px;
        background-color: #fff;
        .tanchuang-header{
            height: 109px;
            line-height: 109px;
            font-size:36px;
            text-align: center;
            color: #333;
            font-weight:bold;
            padding: 0 40px;
            border-bottom: 1px solid #C9C9C9;
            div{
                display: inline-block;
            }
        }
        .tanchuang-content{
            max-height: 85%;
            overflow: auto;
            padding-top: 29px;
        }
    }
}
</style>
