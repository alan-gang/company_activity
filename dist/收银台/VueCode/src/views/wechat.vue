// 微信扫码
<template>
  <div class="wechat">
    <div class="hint">请使用手机微信App扫码支付</div>
    <div class="QRcode">
      <img src="@/assets/QRcode_wechat.png" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.wechat {
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
