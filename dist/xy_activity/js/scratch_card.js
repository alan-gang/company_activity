let giftTxt = '系统忙'
let giftNum
let gitfClassify = {
  1: '1张8元棋牌体验券，刮刮卡翻倍',
  2: '1张8元老虎机体验券，刮刮卡翻倍奖励',
  3: '1张老虎机8元体验券，1张棋牌8元体验券，刮刮卡翻倍'
}


let init = () => {
  initEvent()
}

let initEvent = () => {
  $('.close').add('.footer-right').on('click', onCloseClick)
  $('.action-button').one('click', onSelectGiftClick)
  $('.footer-left').one('click', goCoupon)
}

let goCoupon = () => {
  let args = { action: 'goToCoupon' }
  if (parent && parent.closeIFrame) {
    parent.closeIFrame(args)
  } else {
    location.search = args.action
  }
}

let onCloseClick = () => {
  $('.stratch-card-wrapper').hide()
}


let onSelectGiftClick = () => {

  $('.gift-wrapper').addClass('rotate')
  getGift()

}

let getGift = async () => {
  let res = await initData('/dscagamesclient/activity.do?method=getDoubleScrach');
  if (res.success == 0) {
    $('.action-button').hide()
    setTimeout(() => {
      $('.prompt-txt').show().html(res.msg)
    }, 1000);
  } else {
    // $('.select-before-container').hide()
    $('.action-button').show()
    $('.prompt-txt').hide()
    giftNum = res.msg
    setTimeout(() => {
      $('.gift-wrapper').removeClass('rotate')
      $('.gift').find('.select_before').addClass('select_after').removeClass('select_before')
      $('.action-button').hide()
      $('.prompt-txt').show().html(
        `
      <div class="gray">恭喜您！</div>
      <div class="content">
        <span class="get">获得</span>
        <span class="get-gift">${gitfClassify[giftNum]}</span>
        <span class="award">奖励</span>
      </div>
      `
      )
      $('.confirm-btn').add('.footer-left').show()
    }, 1000);
    let args = { action: 'IncreaseBadge' }
    if (parent && parent.closeIFrame) {
      parent.closeIFrame(args)
    } else {
      location.search = args.action
    }
  }
}

/* 处理数据请求 */
let initData = (url) => {
  return new Promise((resolve) => {
    $.ajax({
      url: url,
      dataType: 'JSON',
      type: 'get',
      success: resolve
    })
  })
}

init()
