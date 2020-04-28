<template>
  <!-- 选择付款方式弹窗 -->
  <div>
    <van-action-sheet
      v-model="showAction"
      :title="title"
      class="action-sheet-yinhang"
      :close-on-click-overlay="false"
    >
      <div class="paymen-content">
        <div class="paymen-content-top" v-for="i in list" :key="i.num" @click="paymen(i)">
          <span class="yh-icon czjz">
            <img src="@/assets/img/confirmOrder/zhongguoyinhang@2x.png" />
          </span>
          <span class="c-999"></span>
          <span :class="{'c-orange':i.a}">{{i.msg}}</span>
        </div>
        <div class="paymen-content-top" @click="toaddBankcar">
          <span></span>
          <!-- <span class="c-999">></span> -->
          <van-icon name="arrow" class="arrow c-999" />
          <span>添加银行卡</span>
        </div>
        <div class="paymen-content-top" @click="pay">
          <span></span>
          <span class="c-999"></span>
          <span>第三方付款</span>
        </div>
        <!-- <div class="btn-ljzf" @click="showpaymen">立即付款</div> -->
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "请选择付款方式"
    },
    orderSn: {
      type: String
    }
  },
  data() {
    return {
      list: [
        {
          a: false,
          num: 1,
          msg: "中国银行"
        },
        {
          a: false,
          num: 2,
          msg: "建设银行"
        },
        {
          a: true,
          num: 3,
          msg: "招商银行"
        }
      ],
      showAction: false
    };
  },
  //   methods: {
  //
  //   },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    paymen(item) {
      this.list.forEach(element => {
        element.a = false;
        if (item.num == element.num) {
          element.a = true;
        }
      });

      this.showAction = false;
      this.$emit("change", item);
    },
    //显示支付弹窗
    showpaymen() {
      this.$emit("showpassword");
      // this.$emit('showsucess')
    },
    //添加银行卡
    toaddBankcar() {
      this.$router.push({ name: "添加银行卡" });
    },
    pay() {
      this.showAction = false;
      this.$emit("toParnet", { name: "第三方支付", type: 203 });
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.action-sheet-yinhang {
  border-radius: 0;
  /deep/ .van-action-sheet__header {
    height: 109px;
    font-size: 40px;
    font-weight: bold;
    line-height: 109px;
    .van-icon {
      font-size: 34px;
    }
  }
  .paymen-content {
    width: 100%;
    height: 590px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0px 0px 0;
    position: relative;
    font-size: 34px;
    color: #333;
    .paymen-content-top {
      position: relative;
      width: 100%;
      height: 97px;
      line-height: 97px;
      border-top: 1px solid #dcdcdc;
      padding: 0 30px;
      box-sizing: border-box;
      &:nth-last-child(2) {
        border-bottom: 1px solid #dcdcdc;
      }
      &:nth-last-child(4) {
        border-bottom: none;
      }
      .yh-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
      }
      span {
        &:nth-child(2) {
          float: right;
          font-size: 30px;
          .van-icon {
            color: #fa5300;
          }
        }
        &:nth-child(3) {
          padding-left: 119px;
        }
      }
      .arrow {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .btn-ljzf {
    width: 100%;
    height: 100px;
    background: rgba(250, 83, 0, 1);
    line-height: 100px;
    text-align: center;
    color: #fff;
    font-size: 38px;
    position: absolute;
    bottom: 0;
  }
}
</style>
