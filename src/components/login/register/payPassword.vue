<template>
<!-- 设置支付密码 -->
    <div class="parrwordOtp">
        <balance-header :title='title'></balance-header>
        <div class="paymen-content">
            <van-password-input
            :value="value"
            :focused="showKeyboard"
            :length="6"
            info="请输入6位支付密码用于手机支付"
            @focus="showKeyboard = true"
            />
            <!-- 数字键盘 -->
            <van-number-keyboard
            :show="showKeyboard"
            @input="onInput"
            @delete="onDelete"
            @blur="showKeyboard = false"
            :hide-on-click-outside="false"
            >
            <span slot="delete" class="delete"><img src="@/assets/img/search/detail.svg" alt=""></span>
            </van-number-keyboard>
        </div>
        
    </div>
</template>

<script>
import balanceHeader from './itemComponents/balanceHeader'
import {mapActions} from 'vuex'
export default {
    props: {

    },
    data() {
        return {
            value: '',
            showKeyboard: true,
            title:'设置支付密码'
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        
    },
    watch: {

    },
    methods: {
        ...mapActions(['setpaypassword']),
        //输入密码
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
            if(this.value.length == 6){
                this.setpaypassword(this.value)
                this.$router.push({name:'确定支付密码'})
            }
        },
        //删除键
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },

        setuserpaypassword(){}
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
