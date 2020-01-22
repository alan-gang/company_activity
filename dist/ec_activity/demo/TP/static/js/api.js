// 默认生产
let prefix = 'https://ec01.ds-proxy.com:19999/zuul'
// 内网
if (location.host.match(/^(127\.0\.0|192\.168\.169|localhost)/)) prefix = 'http://192.168.169.75:8081/zuul'
// 预发布
if (location.host.indexOf('ds-activity') !== -1) prefix = 'https://ds.xinyou99.com:19999/zuul'
window.api = {
  activityRuleById: prefix + '/api-user/activityRuleAction/activityRuleById'
}
// export default {
//   activityRuleById: prefix + '/api-user/activityRuleAction/activityRuleById'
// }