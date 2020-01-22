// 网银转账
<template>
  <div class="ebank">
    <el-form label-width="90px" :model="forms" label-position="left">
      <el-form-item label="充值金额:">
        <div class="rows">
          {{forms.money}}
          <el-button
            round
            class="copy"
            size="mini"
            type="primary"
            plain
            @click="copy"
            :data-clipboard-text="forms.money"
          >复制</el-button>
        </div>
      </el-form-item>
      <el-form-item label="订单号:">
        <div class="rows">
          {{forms.ordernumber}}
          <el-button
            round
            class="copy"
            size="mini"
            type="primary"
            plain
            @click="copy"
            :data-clipboard-text="forms.ordernumber"
          >复制</el-button>
        </div>
      </el-form-item>
      <el-form-item label="收款人:">
        <div class="rows">
          {{forms.payee}}
          <el-button
            round
            class="copy"
            size="mini"
            type="primary"
            plain
            @click="copy"
            :data-clipboard-text="forms.payee"
          >复制</el-button>
        </div>
      </el-form-item>
      <el-form-item label="收款银行:">
        <div class="rows">
          {{forms.bankname}}
          <el-button
            round
            class="copy"
            size="mini"
            type="primary"
            plain
            @click="copy"
            :data-clipboard-text="forms.bankname"
          >复制</el-button>
        </div>
      </el-form-item>
      <el-form-item label="收款卡号:">
        <div class="rows">
          {{forms.banknumber}}
          <el-button
            round
            class="copy"
            size="mini"
            type="primary"
            plain
            @click="copy"
            :data-clipboard-text="forms.banknumber"
          >复制</el-button>
        </div>
      </el-form-item>
      <el-form-item label="附言:">
        <div class="rows">
          {{forms.message}}
          <el-button
            round
            class="copy"
            size="mini"
            type="primary"
            plain
            @click="copy"
            :data-clipboard-text="forms.message"
          >复制</el-button>
        </div>
      </el-form-item>
      <el-form-item label="付款倒计时:" style="border-bottom:0 none;">
        <div class="counttime">{{10 > m ? '0' : ''}}{{m}} : {{10 > s ? '0' : ''}}{{s}}</div>
      </el-form-item>
    </el-form>
    <div class="QRcode">
      <img v-if="!QRcode_past" src="@/assets/QRcode_ebank.png" />
      <img v-if="QRcode_past" src="@/assets/QRcode_past.png" />
    </div>
    <div class="hint">
      <p>
        注意:
        <br />1、请不要保存存收款账号,每次转账前请仔细核对卡号信息
        <br />2、请勿重复转账,每次充值前需要重新提交充值订单
        <br />3、超过5分钟不到账请联系客服处理
      </p>
    </div>
    <div class="sub">
      <el-button type="primary">进入网上银行</el-button>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      forms: {
        money: "500.00", //充值金额
        ordernumber: "123456789123456789", //订单号
        payee: "张三", //收款人
        bankname: "工商银行", //银行信息
        banknumber: "8888 8888 8888 8888 88", //银行卡号
        message: "阿拉蕾" //附言
      },
      d: null,
      h: null,
      m: null,
      s: null,
      endDate: new Date(new Date().getTime() + 1000 * 60 * 10) //倒计时  默认  十分钟
    };
  },
  computed: {
    QRcode_past() {
      return this.d == 0 && this.h == 0 && this.m == 0 && this.s == 0 ? !0 : !1;
    }
  },
  mounted() {
    this.countTime();
  },
  methods: {
    //倒计时
    countTime() {
      //获取当前时间
      let now = new Date();
      //设置截止时间
      let end = this.endDate.getTime();
      //时间差
      let leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.m = Math.floor((leftTime / 1000 / 60) % 60);
        this.s = Math.floor((leftTime / 1000) % 60);
      }
      // console.log(this.s);
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    },
    //复制
    copy() {
      let clipboard = new Clipboard(".copy");
      clipboard.on("success", e => {
        //复制成功
        this.$message({
          duration: 1000, //显示时间, 毫秒。设为 0 则不会自动关闭
          message: "复制成功",
          type: "success"
        });
        clipboard.destroy(); // 释放内存
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$message({
          message: "当前环境不支持自动复制",
          type: "warning"
        });
        clipboard.destroy(); // 释放内存
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ebank {
  .rows {
    width: 100%;
    position: relative;
    .copy {
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -14px;
    }
  }
  .el-form-item {
    margin-bottom: 10px;
    border-bottom: 1px solid #dcdfe6;
  }
  .counttime {
    font-size: 38px;
    font-weight: bold;
    color: #f66055;
    text-align: center;
    margin: 40px 0 0 -90px; // 负数 label-width
  }
  .QRcode {
    text-align: center;
    position: relative;
  }
  .hint {
    p {
      color: #d5d5d5;
      font-size: 12px;
      line-height: 2em;
    }
  }
  .sub {
    .el-button--primary {
      width: 100%;
      background-color: #21b193;
      border-color: #21b193;
    }
  }
}
</style>
