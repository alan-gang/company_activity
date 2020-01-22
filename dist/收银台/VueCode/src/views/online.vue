// 在线支付
<template>
  <div class="online">
    <div class="hint">请使用手机云闪付App扫码支付</div>
    <div class="QRcode">
      <img src="@/assets/QRcode_online.png" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.online {
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
