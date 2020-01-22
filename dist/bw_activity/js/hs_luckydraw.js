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

let base_url = 'https://ds.xinyou99.com:19999'

function getQueryVariable (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}


// 默认生产
base_url = getQueryVariable('prefix')
if (base_url) {
  base_url = decodeURIComponent(base_url)
}


// 中奖项匹配
let clickFun = function (id) {

  id.forEach((item) => {
    arr.push(playBearObj[playBearObj.findIndex((list) => list.id == item)])
  })
  arr.forEach(item => {
    item.bear = item.bear.replace(/\d+/g, $1 => `<span class="red">${$1}</span>`)
    bearListArr.push(`<div class="bear-list-wp"><div>恭喜您获得</div><div>${item.bear}</div></div>`)
  })

  // 调用旋转方法
  let s = arr.shift();
  rotateFunc(s.id, s.angle, s.bear)
}

// 初始化代码
let init = () => {
  initEvent()
  getUserInfo()
  handleSlider()
}



// 事件绑定
let initEvent = () => {
  $('.controller-wp').on('click', () => onArrowClick(1))
  $('.ten').on('click', onTenClick)
  $('.one-hundred').on('click', onHundredClick)
  $('#cancel').add($('#close')).on('click', onCancelClick)
  $('#confirm').on('click', onConfirmClick)
}


// 确认框处理
let onConfirmClick = function () {
  if (getQueryVariable('uuid') === 'undefined') {
    window.parent.postMessage({
      type: 'action', value: 'goToLogin'
    }, '*')
    return
  }

  let $this = $(this)
  if ($this.attr('hide')) {
    $('#cancel').trigger('click')
    return
  } else if ($this.attr('continuous')) {
    $('.dialog-wrapper').hide()
    currentNum = score;
    let number = $this.attr('num')
    onArrowClick(number)
  } else {
    window.parent.postMessage({
      type: 'action', value: 'goToCoupon'
    }, '*')
    location.search = 'goToCoupon'
  }
}
// 取消抽奖
let onCancelClick = () => {
  $('.dialog-wrapper').hide()
}

// 十连抽事件
let onTenClick = () => {
  if (getQueryVariable('uuid') === 'undefined') {
    window.parent.postMessage({
      type: 'action', value: 'goToLogin'
    }, '*')
    return
  }

  if (flag) return
  if (score < 1) {
    $('#cancel').hide()
    $('#confirm').attr('hide', true).html('确定')
    renderDialog(nothingStr)
    return
  }
  $('.dialog-content').removeClass('rotate-style')
  if (score < 10) {
    renderDialog(disabledStr, 10)
  } else {
    currentNum = 10;
    onArrowClick(10)
  }
}


// 一百连抽事件
let onHundredClick = () => {
  if (getQueryVariable('uuid') === 'undefined') {
    window.parent.postMessage({
      type: 'action', value: 'goToLogin'
    }, '*')
    return
  }


  if (flag) return
  if (score < 1) {
    $('#cancel').hide()
    $('#confirm').attr('hide', true).html('确定')
    renderDialog(nothingStr)
    return
  }

  $('.dialog-content').removeClass('rotate-style')
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
        $('.activity-btn-wp').show()
        if (bearListArr.length > 1) {
          $('#confirm').show().attr('hide', true).html('知道了')
          $('#cancel').hide()
          renderDialog(bearListArr)
          $('.dialog-content > div').length > 5 ? $('.dialog-content').addClass('rotate-style') : $('.dialog-content').removeClass('rotate-style')
        } else {
          if ($('.activity-btn-wp:hidden')) {
            $('.dialog-content').removeClass('rotate-style')
          }
          if (awards == 12) {
            $('#cancel').hide()
            $('#confirm').show().attr('hide', true);
            renderDialog(text)
          } else if (awards == 5) {
            $('.activity-btn-wp').hide()
            renderDialog(bearStr + text + '</div>')
          } else {
            if ($('#cancel:hidden')) {
              $('#cancel').add('#confim').show()
              $('#confirm').html('是').removeAttr('hide')
            }
            renderDialog(bearStr + text + '</div>' + '<div class="show-bear">是否查看奖品？</div>')
          }
        }
        return
      }
      $('.activity-btn-wp').hide()
      let s = arr.length && arr.shift()
      renderDialog(bearStr + text + '</div>' + '<div class="show-bear"></div>')
      setTimeout(() => {
        onCancelClick()
        rotateFunc(s.id, s.angle, s.bear)
      }, 1000);
    }
  })
}

/* 对话框每次弹出进行渲染*/
let renderDialog = function (message, n) {
  $('.dialog-wrapper')
    .show()
    .find('.dialog-content')
    .html(message)
  if (n) {
    $('#lastNum').html(n)
    $('#confirm').attr('continuous', true).html('是').attr('num', n).removeAttr('hide').siblings('#cancel').show()
  }
}

/* 点击开始按钮 */
let onArrowClick = async function (number) {

  if (getQueryVariable('uuid') === 'undefined') {
    window.parent.postMessage({
      type: 'action', value: 'goToLogin'
    }, '*')
    return
  }

  if (flag) return

  if (number == 1 && score < 1) {
    $('#cancel').hide()
    $('#confirm').attr('hide', true).html('确定')
    renderDialog(nothingStr)
    return
  }
  flag = true
  bearListArr = []
  let res = await getData(`/zuul/api-user/activity/openTurntable?type=${number}`);


  if (res.success == 1) {
    score = res.remNum
    $('#residueNumber').html(score)
    $('.amount').html(score)
    clickFun(res.id)
  } else {
    $('#cancel').hide()
    $('#confirm').attr('hide', true).html('确定')
    renderDialog(nothingStr)
  }
}

/* 处理数据请求 */
let getData = (url) => {
  return new Promise((resolve) => {
    $.ajax({
      url: base_url + url,
      type: 'get',
      success: resolve,
      data: {
        uuid: getQueryVariable('uuid')
      },
      dataType: 'JSON',
    })
  })
}

/* 获取用户信息 */
let getUserInfo = async () => {
  if (getQueryVariable('uuid') !== 'undefined') {
  let res = await getData('/zuul/api-user/activity/showTurntableNumber')

  if (!res.success) {
    nothingStr = res.msg
  }
  userName = res.userName;
  score = res.playNumber;
  $('#userName').html(userName)
  $('#residueNumber').html(score)
  $('.amount').html(score)
  }
}

/* 处理slider数据 */
let handleSlider = async () => {
  if (getQueryVariable('uuid') !== 'undefined') {
  let res = (await getData('/zuul/api-user/activity/showTurntableAward'))

  if (res.success) {
    renderBearListCard(res.array)
  }

  if ($('.bear-list-wrapper').children().length > 5) {
    setInterval(() => {
      runAnimate()
    }, 2000);

    setInterval(async () => {
      let res = (await getData('/zuul/api-user/activity/showTurntableAward'))

      if (res.success) {
        renderBearListCard(res.array)
      }
    }, 30000);
  }
  }
}

let runAnimate = () => {
  $('.bear-list-wrapper').animate({
    'margin-top': '-.63rem'
  }, 300, function () {
    $(this).css('marginTop', 0).append($(this).find('li:first'))
  })
}
let renderBearListCard = (list) => {
  let arr = list.map((item, index) => {
    if (item.prizeClassify) {
      return (
        `
        <li class="flex">
         <span>恭喜玩家：</span>
          <span class="user"> ${item.userName}</span>
          <span class="get">获得</span>
          <span>${item.prizeClassify}</span>
        </li>
    `
      )
    } else {
      item.data = item.data.replace(/(\w+\*+)/g, $1 => `<span class="user">${$1}</span>`)
      return (`<li class="flex"> <span>${item.data}</span> </li>`)
    }

  })
  if (arr.length) $('.bear-list-wrapper').html(arr)

}

init()
