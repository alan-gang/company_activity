// 支付宝
<template>
  <div class="alipay">
    <div class="hint">请使用手机支付宝App扫码支付</div>
    <div class="QRcode">
      <img src="@/assets/QRcode_alipay.png" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.alipay {
  text-align: center;
  .QRcode {
    margin-top: 10px;
  }
  .hint {
    color: #e6a23c;
    font-size: 12px;
    line-height: 2em;
  }
}
</style>
