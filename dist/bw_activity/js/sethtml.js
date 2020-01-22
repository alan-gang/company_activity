// 默认生产
let temp = getQueryVariable('prefix')
if (temp) {
  temp = decodeURIComponent(temp)
}
let prefix = temp || 'https://ec01.ds-proxy.com:19999/zuul'
// 预发布
if (location.host.indexOf('localhost') !== -1) prefix = 'https://ds.xinyou99.com:19999/zuul'
//本地开发
if (['192.168.169.122'].includes(location.hostname)) prefix = 'http://192.168.169.75:8083/zuul'
window.api = {
  addDividend: prefix + '/api-user/activity/addDividend',
  activityRuleById: prefix + '/api-user/activityRuleAction/activityRuleById'
}

function getTime(date) {
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

function getQueryVariable(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

function initHtml(func) {
  $.ajax({
    data: {
      activiTytype: getQueryVariable("activiTytype"), //活动ID
      entry: getQueryVariable("entry") //活动ID
    },
    type: "GET",
    url: window.api.activityRuleById,
    dataType: "json",
    success: (data) => {
      window.document.title = data.activityInfo.activityName
      func(data.activityInfo, data.ruleDetails)
      setTimeout(function () {
        sendMesageHeight()
      }, 200)
      setTimeout(function () {
        sendMesageHeight()
      }, 3000)
    }
  })
}

function sendMesageHeight() {
  let h = document.documentElement.scrollHeight || this.document.body.scrollHeight
  if (window.parent) {
    window.parent.postMessage(h, '*')
  }
}
