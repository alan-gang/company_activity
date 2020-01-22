function validatorUserName(value) {
  if (value) {
    if (/^[\u4E00-\u9FA5A-Za-z0-9]{4,16}$/.test(value)) {
      return {valid: false}
    } else {
      return {valid: true, msg: `用户名长度为4-16个字符，只能为数字、英文、中文`}
    }
  } else {
    return {valid: true, msg: `用户名不能为空`}
  }
}
function validatorPassword(val, text = '密码'){
  if (val) {
    if (/^(?=.*\d+)(?=.*[a-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1).{6,20}$/.test(val)) {
      return {valid: false}
    } else {
      return {valid: true, msg: text + '由6-20位字母和数字组成；且必须包含数字和字符'}
    }
  } else {
    return {valid: true, msg: text + '不能为空'}
  }
}
function validatorCode(val){
  if (!val) {
    return {valid: true, msg: '验证码不能为空'}
  } else {
    return {valid: false}
  }
}
function validatorTelephoneNum(val){
  if (val) {
    if (/^[0-9]*$/.test(val)) {
      return {valid: false}
    } else {
      return {valid: true, msg: '手机号码格式不正确，请重新输入'}
    }
  } else {
    return {valid: true, msg: '手机号码不能为空'}
  }
}

function validatorEmpty(val, text){
  if (!val) {
    return {valid: true, msg: text + '不能为空'}
  } else {
    return {valid: false}
  }
}
function validatorPassword (val, text = '密码'){
  if (val) {
    if (/^(?=.*\d+)(?=.*[a-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1).{6,20}$/.test(val)) {
      return {valid: false}
    } else {
      return {valid: true, msg: text + '由6-20位字母和数字组成；且必须包含数字和字符'}
    }
  } else {
    return {valid: true, msg: text + '不能为空'}
  }
}

var app = new Vue({
  el: '#app',
  data: {
    userName: '',
  	passWord: '',
  	passWordC: '',
 	code: '',
  	phone: '',
  	n: n,
  	isDisabled: false,
  	timeout: '发送验证码',
  	time: 60
  },
  methods: {
    countDownFun () {
      this.time--
      this.timeout = this.time + ' S '
      if (this.time > 0) {
        this.isDisabled = true
        setTimeout(() => {
          this.countDownFun()
        }, 1000)
      } else {
      this.time = 60
      this.timeout = '重新获取'
      this.isDisabled = false
      }
    },
    doRegister() {
      let user = validatorUserName(this.userName)
      let phone = validatorTelephoneNum(this.phone)
      let code = validatorCode(this.code)
      let password = validatorPassword(this.passWord)
      let passwordC = validatorPassword(this.passWordC)
      if (user.valid || phone.valid || code.valid || password.valid || passwordC.valid) {
        this.$Notice.warning({
            title: '提示消息',
            desc: user.msg || phone.msg || code.msg || password.msg || passwordC.msg
        });
        return
      }
      if (this.password !== this.passwordC) {
      	 this.$Notice.warning({
            title: '提示消息',
            desc: '两次密码输入不一致'
        });
        return
      }
      let params = {
        UserName: this.userName,
        LoginPassword: this.passWord,
        phone: this.phone,
        code: this.code,
        n: this.n
      }
      var formData = new FormData()
      Object.keys(params).forEach(key => {
        formData.append(key, params[key])
      })
      axios.post('/Index/Reg', formData)
        .then(res => {
          if(res.data.state) {
            document.location.href='/';
          } else {
            this.$Notice.warning({
              title: '提示消息',
              desc: res.data.message
            });
          }
        })
    },
    sendCode(val) {
      let phone = validatorTelephoneNum(val)
      if (phone.valid) {
      	this.$Notice.warning({
            title: '提示消息',
            desc: phone.msg,
        });
        return
      }
      var params = {
        phone: val
      }
      var formData = new FormData()
      Object.keys(params).forEach(key => {
        formData.append(key, params[key])
      })
      axios.post('/Index/Sms', formData)
		.then(res => {
        if (res.data.state) {
          this.countDownFun()
          this.$Notice.success({
            title: '提示消息',
            desc: res.data.message
          })
        } else {
          this.$Notice.warning({
            title: '提示消息',
            desc: res.data.message
          })
        }
      })
    }
  }
})
