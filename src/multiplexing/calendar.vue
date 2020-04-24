<template>
<!-- 日历组件 -->
    <div>
        <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" :markDate="checkArr" class="calen-dar"></Calendar>
    <!-- 
        <Calendar
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      // v-on:isToday="clickToday"
      // :markDate=arr // arr=['2018/4/1','2018/4/3'] 标记4月1日和4月3日 简单标记
      //:markDateMore=arr // 多种不同的标记
      // 第一个标记和第二个标记不能同时使用
      // :agoDayHide='1514937600' //某个日期以前的不允许点击  时间戳10位
      // :futureDayHide='1525104000' //某个日期以后的不允许点击  时间戳10位
      // :sundayStart="true" //默认是周一开始 当是true的时候 是周日开始
    ></Calendar>
     -->

<!-- 
    属性	    说明	                     默认	     是否必传
    choseDay	选中某天调用的方法，返回选中的日期 YY-MM-DD	无	                                  否
    changeMonth	切换月份调用的方法，返回切换到某月的日期 YY-MM-DD	无	   否            
    isToday	切换月份的时候，如果切到当前月份，调用这个方法，返回当前月今天	无	否
    markDate	如果需要某月的几天被标注，传当月的日期数组。如["2018/2/2","2018/2/6"]被会标注（相同的标记）	空数组	否
    markDateMore	需要不同的标记如上Usage 最后一行示例代码	空数组	否
    agoDayHide	某个日期以前的不允许点击 时间戳长度是 10 位	0	否
    futureDayHide	某个日期以后的不允许点击 时间戳长度是 10 位	很大	否
    sundayStart	默认是周一开始 当是true的时候 是周日开始	false	否
    textTop	日历头部的文字，默认是 [ '日','一', '二', '三', '四', '五', '六'] ，可以根据自己的需求进行不同的修改。	---	否 -->

    </div>
</template>

<script>
import Calendar from 'vue-calendar-component';
export default {
    props: {
        checkArr:{
            type:Array,
            default: ()=>{
                return ["2019/12/2","2019/12/7"]
            }
        }
    },
    data() {
        return {
            
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
        //选中某天
        clickDay(data) {
            data = data.replace(/-/g,'/')
            this.$emit('cliDay',data)
        },
        changeDate(data) {
            //左右点击切换月份
        },
        clickToday(data) {
            //跳到了本月
        }
    },
    components: {
        Calendar
    },
};
</script>

<style scoped lang="less">
.calen-dar{
    /deep/ .wh_content_all{
        background-color: #fff;
        color: #333;
        .wh_top_changge{
            li{
                .wh_jiantou1{
                    border-top:2px solid #333;
                    border-left:2px solid #333
                }
                .wh_jiantou2{
                    border-top:2px solid #333;
                    border-right:2px solid #333;
                }
            }
            .wh_content_li{
                color: #333;
            }
        }
        .wh_content{
            .wh_content_item{
                color: #333;
                .wh_item_date.wh_isMark.wh_isToday{
                    background-color: #ffbc9b;
                    color: #fff;
                }
                .wh_isMark{
                    position: relative;
                    background-color: #fff;
                    color: #000;
                    &::after{
                        width:6px;
                        height:6px;
                        background:rgba(250,83,0,1);
                        border-radius:50%;
                        content: ' ';
                        position: absolute;
                        bottom:0;
                        left:50%;
                        transform: translateX(-50%)
                    }
                }
                .wh_chose_day{
                    color: #fff;
                    background-color: #FA5300;
                }
            }
        }
    }
}
</style>
