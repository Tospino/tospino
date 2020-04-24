<script>
import balanceHeader from './itemComponents/balanceHeader'
import payPassword from './payPassword.vue'
import {setuserpaypasswordApi} from '@/api/login/index'
import {mapState,mapActions} from 'vuex'
import {Toast} from 'vant'
export default {
    props: {

    },
    extends:payPassword,
    data() {
        return {
            title:'确认支付密码',
            userinfoShop:{}
        };
    },
    computed: {
        ...mapState({
            payPassword:state=>state.payPassword
        }),
    },
    created() {

    },
    mounted() {
        if(localStorage.userinfoShop){
            this.userinfoShop = JSON.parse(localStorage.userinfoShop)
        }
        
    },
    beforeDestroy(){
        this.clearpaypassword()
    },
    watch: {

    },
    methods: {
        ...mapActions(['clearpaypassword']),
       //输入密码
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
            if(this.value.length == 6){
                if(this.payPassword != this.value){
                    this.value = ''
                    Toast('两次密码不一致')
                }else{
                    let data = {
                        userPwd:this.payPassword,
                        userPwd2:this.value
                    }
                    this.setuserpaypassword(data)
                }
            }
        },
        //设置支付密码
        setuserpaypassword(data){
            setuserpaypasswordApi(data).then(res => {
                if(res.code == 0){
                    Toast('设置成功')
                    this.userinfoShop.payPwd = true
                    localStorage.userinfoShop = JSON.stringify(this.userinfoShop) 
                    setTimeout(()=>{
                        this.$router.go(-2)
                    },1000)
                }
            })
        }
    },
    components: {
        balanceHeader
    },
};
</script>

<style scoped lang="less">
.parrwordOtp{
    border-radius: 0;
    .paymen-content{
        width: 100%;
        height: 800px;
        box-sizing: border-box;
        padding:80px 30px 0;
        position: relative;
        font-size:34px;
        color: #333;
        text-align: center;
        span{
            &:nth-child(2){
                display: inline-block;
                margin-top:39px;
                font-size:30px;
            }
            
        }
        /deep/ .van-password-input__security{
            height: 90px;
            li{
                border:1px solid #999999;
                line-height: 90px;
                font-size: 60px;
            }
        }
        /deep/ .van-password-input__info{
            margin-top:60px;
        }
        /deep/ .van-number-keyboard__body{
            height: 600px;
            .van-hairline{
                height: 148px;
                line-height: 109px;
                font-size: 60px;
                .delete{
                    img{
                        width: 60px;
                    }
                }
            }
            .van-key--extra{
                background-color: #F2F3F5;
            }
        }
        /deep/ .van-number-keyboard__sidebar{
            .van-hairline{
                height: 300px;
                width: 195px;
                top:-386px;
                line-height: 300px;
                font-size: 60px;
           }
            .van-key--delete{
               background-color: #DCDCDC;
               color: #fff;
            }
            .van-key--close{
                background-color: #fff;
                color: #000;

            }
        }
    }
    
}
</style>
