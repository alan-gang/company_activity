<template>
  <div id="app">
    <div class="payment">
      <el-radio-group v-model="payment" @change="to_router">
        <el-radio-button v-for="v in payment_list" :key="v.label" :label="v.label">{{v.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="paymentcon">
      <router-view />
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      payment: "",
      payment_list: [
        {
          name: "网银转账",
          label: "/"
        },
        {
          name: "支付宝",
          label: "/alipay"
        },
        {
          name: "微信扫码",
          label: "/wechat"
        },
        {
          name: "在线支付",
          label: "/online"
        }
      ]
    };
  },
  mounted() {
    setTimeout(v => {
      this.focus_payment();
    }, 100);
  },
  watch: {
    $route({ path }) {
      this.focus_payment();
    }
  },
  methods: {
    focus_payment() {
      this.payment = this.$route.path;
    },
    to_router(val) {
      this.$router.push(val);
    }
  }
};
</script>
<style lang="less">
body {
  padding: 0;
  margin: 0;
}
@green: #21b193;
#app {
  .el-radio-button__inner:hover {
    color: @green;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #fff;
    background-color: @green;
    border-color: @green;
    -webkit-box-shadow: -1px 0 0 0 @green;
    box-shadow: -1px 0 0 0 @green;
  }
  .el-radio-button__inner {
    background: #fafafa;
    padding: 17px 40px;
  }
}
</style>

<style lang="less" scoped>
#app {
  width: 640px;
  margin: 0 auto;
  .payment {
    text-align: center;
    margin: 10px 0 20px 0;
  }
  .paymentcon {
    max-width: 536px;
    margin: 0 auto;
  }
}
</style>
