<template>
<!-- 确认付款弹窗 -->
    <div>
        <van-action-sheet v-model="showAction" title="请输入支付密码" class="action-sheet-password" :close-on-click-overlay="false" @cancel="cancel">
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
                :hide-on-click-outside="false"
                >
                <span slot="delete" class="delete"><img src="@/assets/img/search/detail.svg" alt=""></span>
                </van-number-keyboard>
                
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
export default {
    props: {
        typeLeixing:{
            type:String,
            value:''
        }
    },
    data() {
        return {
            value: '',
            showAction:false,
            showKeyboard:true,
            type:''
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
    },
    watch: {
        typeLeixing:{
            handler:function(newVal){
                this.type = newVal
            }
        }
    },
    methods: {
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
            if(this.value.length==6){
                this.$emit('getPassWord',this.value,this.type)
            }
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        toparrwordOtp(){
            this.$router.push({name:'支付密码输入验证码'})
        },
        cancel(){
            this.value = ''
        }
        
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
                .delete{
                    img{
                        width: 60px;
                    }
                }
            }
        }
        
    }
    
}
</style>
