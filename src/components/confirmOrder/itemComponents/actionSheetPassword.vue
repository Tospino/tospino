<template>
<!-- 确认付款弹窗 -->
    <div>
        <van-action-sheet v-model="showAction" title="请输入支付密码" class="action-sheet-password">
            <div class="paymen-content">
                <van-password-input
                :value="value"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
                />
                <span class="c-orange" @click='toparrwordOtp'>忘记密码?</span>
                <!-- 数字键盘 -->
                <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = false"
                delete-button-text =' '
                :hide-on-click-outside="false"
                />
                
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            showAction:false,
            value: '',
            showKeyboard: true
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
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        toparrwordOtp(){
            this.$router.push({name:'支付密码输入验证码'})
        },
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.action-sheet-password{
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
        height: 800px;
        background-color: #fff;
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
        /deep/ .van-number-keyboard__body{
            height: 440px;
            .van-hairline{
                height: 110px;
                line-height: 109px;
                font-size: 60px;

            }
        }
        
    }
    
}
</style>
