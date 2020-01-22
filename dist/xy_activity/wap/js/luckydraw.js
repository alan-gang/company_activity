let rotateData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
let $rotateImg = $('.rotate-img');
let flag = false;
let score;
let userName;
let disabledStr = '<div>剩余次数无法<span id="lastNum"></span>连抽，</div><div>是否抽取剩余全部次数？</div>'
let bearStr = '<div>恭喜您获得'
let nothingStr = '<div>当前投注额不足，请投注后重试~</div>'
let currentNum = 0;
let bearListArr = []
let arr = []
let playBearObj = [
  {
    id: 1,
    angle: 10,
    bear: '现金红包5元'
  },
  {
    id: 2,
    angle: 33,
    bear: '游戏体验券8元'
  },
  {
    id: 3,
    angle: 53,
    bear: '现金红包5888元'
  },
  {
    id: 4,
    angle: 76,
    bear: '现金红包8888元'
  },
  {
    id: 5,
    angle: 99,
    bear: '刮刮卡10张'
  },
  {
    id: 6,
    angle: 120,
    bear: '游戏体验券5888元'
  },
  {
    id: 7,
    angle: 143,
    bear: '游戏体验券1888元'
  },
  {
    id: 8,
    angle: 166,
    bear: '现金红包888元'
  },
  {
    id: 9,
    angle: 191,
    bear: '现金红包8元'
  },
  {
    id: 10,
    angle: 214,
    bear: '游戏体验券1元'
  },
  {
    id: 11,
    angle: 239,
    bear: '游戏体验券5元'
  },
  {
    id: 12,
    angle: 263,
    bear: '继续加油，谢谢参与'
  },
  {
    id: 13,
    angle: 284,
    bear: '游戏体验券888元'
  },
  {
    id: 14,
    angle: 307,
    bear: '游戏体验券1888元'
  },
  {
    id: 15,
    angle: 327,
    bear: '现金红包1元'
  },
  {
    id: 16,
    angle: 350,
    bear: '游戏体验券8888元'
  }
]

// 中奖项匹配
let clickFun = function (id) {

  id.forEach((item) => {
    arr.push(playBearObj[playBearObj.findIndex((list) => list.id == item)])
  })
  arr.forEach(item => {
    bearListArr.push(`<div>${item.id == 12 ? '' : '中奖'}${item.bear}</div>`)
  })

  // 调用旋转方法
  let s = arr.shift();
  rotateFunc(s.id, s.angle, s.bear)
}

// 初始化代码
let init = () => {
  initEvent()
  initData()
  handleSlider()
}

// 事件绑定
let initEvent = () => {
  $('#startBtn').on('click', () => onArrowClick(1))
  $('#tenBtn').on('click', onTenClick)
  $('#hundredBtn').on('click', onHundredClick)
  $('.close')
    .add($('.prompt-close'))
    .add($('.prompt-cancel'))
    .on('click', onCancelClick)
  $('.confirm').on('click', onConfirmClick)
  $('.look').on('click', onShowDetailclick)
}

let onShowDetailclick = () => {
  // this.parent.__go('/promo/', { props: { tabid: '#coupon' } })
  let args = { action: 'goToCoupon' }
  if (parent && parent.closeIFrame) {
    parent.closeIFrame(args)
  } else {
    location.search = args.action
  }
}

// 确认框处理
let onConfirmClick = function () {
  let $this = $(this)
  if ($this.attr('hide')) {
    $('.prompt-cancel').add('.masker-wrapper').trigger('click')
    $this.removeAttr('hide')
    return
  }

  if ($this.attr('continuous')) {
    $('.prompt-masker').hide()
    currentNum = score;
    onArrowClick($this.attr('num'))
  }
}

// 取消抽奖
let onCancelClick = () => {
  $('.prompt-masker').add($('.masker-wrapper')).hide()
}

// 十连抽事件
let onTenClick = () => {
  if (flag) return
  if (score < 1) {
    $('.confirm').attr('hide', true)
    $('.prompt-cancel').hide()
    renderDialog(nothingStr)
    return
  }
  if (score < 10) {
    renderDialog(disabledStr, 10)
  } else {
    currentNum = 10;
    onArrowClick(10)
  }
}

// 一百连抽事件
let onHundredClick = () => {
  if (flag) return
  if (score < 1) {
    $('.confirm').attr('hide', true)
    $('.prompt-cancel').hide()
    renderDialog(nothingStr)
    return
  }
  if (score < 100) {
    renderDialog(disabledStr, 100)
  } else {
    currentNum = 100;
    onArrowClick(100)
  }
}

// 轮盘滚动
let rotateFunc = (awards, angle, text) => {
  flag = true;
  let timer = !currentNum ? 4000 : currentNum <= 10 ? 1000 : 500

  $rotateImg.rotate({
    angle: 0,
    duration: timer,
    animateTo: angle + 1440,

    callback: function () {
      flag = false;

      if (arr.length == 0) {
        if (bearListArr.length > 1) {
          $('.prompt-masker').hide()
          $('.masker-wrapper').show()
          renderMasker(bearListArr)
        } else {
          if (awards == 12) {
            $('.prompt-cancel').hide()
            $('.btn-group').show()
            $('.prompt-main').css('height', '5.19rem')
            $('.confirm').attr('hide', true).show()
            renderDialog(text)
          } else {
            renderMasker('中奖' + text)
          }
        }
        return
      }
      let s = arr.length && arr.shift()
      $('.prompt-main').css('height', '3rem')
      $('.btn-group').hide()
      renderDialog(text)

      setTimeout(() => {
        onCancelClick()
        rotateFunc(s.id, s.angle, s.bear)
      }, 1000);
    }
  })
}

let renderMasker = (mesage) => {
  $('.masker-wrapper').show()
  $('#playUser').html(userName)
  $('.prize-message-main').html(mesage)
}

/* 对话框每次弹出进行渲染*/
let renderDialog = function (message, n) {
  $('.prompt-masker')
    .show()
    .find('.prompt-content')
    .html(message)
  if (n) {
    console.log(n)
    $('.prompt-masker')
      .show()
      .find('.prompt-content')
      .html(message)
    $('#lastNum').html(n)
    $('.btn-group').show()
    $('.prompt-main').css('height', '5.19rem')
    $('.confirm').attr('continuous', true).attr('num', n).removeAttr('hide')
  }
}


/* 点击开始按钮 */
let onArrowClick = async function (number) {
  if (flag) return
  if (number == 1 && score < 1) {
    $('.confirm').attr('hide', true)
    $('.prompt-cancel').hide()
    renderDialog(nothingStr)
    return
  }
  bearListArr = []
  let res = await getData(`/dscagamesclient/activity.do?method=openTurntable&&type=${number}`);
  if (res.success == 1) {
    score = res.remNum
    $('.last-amount').html(score)
    clickFun(res.id)
  } else {
    $('.prompt-cancel').hide()
    $('.confirm').attr('hide', true).removeAttr('continuous').show()
    $('.btn-group').show()
    $('.prompt-main').css('height', '5.19rem')
    renderDialog(nothingStr)
  }
}

/* 处理数据请求 */
let getData = (url) => {
  return new Promise((resolve) => {
    $.ajax({
      url: url,
      type: 'get',
      success: resolve
    })
  })
}

// 获取用户信息
let initData = async () => {
  let res = await getData('/dscagamesclient/activity.do?method=showTurntableNumber')
  if (!res.success) {
    nothingStr = res.msg
  }
  userName = res.userName;
  score = res.playNumber;
  $('.last-amount').html(score)
}

/* 处理slider数据 */
let handleSlider = async () => {
  let res = (await getData('/dscagamesclient/activity.do?method=showTurntableAward'))
  if (res.success) {
    renderBearListCard(res.array)
  }

  if ($('.turntabe-content-container').children().length > 1) {
    setInterval(() => {
      runAnimate()
    }, 2000);

    setInterval(async () => {
      let res = (await getData('/dscagamesclient/activity.do?method=showTurntableAward'))
      if (res.success) {
        renderBearListCard(res.array)
      }
    }, 30000);
  }
}

let runAnimate = () => {
  $('.turntabe-content-container').animate({
    'margin-top': '-.7rem'
  }, 300, function () {
    $(this).css('marginTop', 0).append($(this).find('div:first'))
  })
}

let renderBearListCard = (list) => {
  let arr = list.map((item, index) => {
    if (item.prizeClassify) {
      item.prizeClassify = item.prizeClassify.replace(/\d+/g, $1 => `<span class="amount">${$1}</span>`)
      return (
        `
        <div>
          <span> 恭喜玩家:</span>
          <span class="xing">${item.userName} </span>
          <span>获得 ${item.prizeClassify}</span>
        </div>
    `
      )
    } else {
      item.data = item.data.replace(/\d+/g, $1 => `<span class="amount">${$1}</span>`)
      return (
        ` <div>${item.data}</div> `
      )
    }
  })
  if (arr.length) $('.turntabe-content-container').html(arr)

}
init()
