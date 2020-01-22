function validatorUserName(value) {
  if (value) {
    if (/^[\u4E00-\u9FA5A-Za-z0-9]{4,16}$/.test(value)) {
      return {valid: false}
    } else {
      return {valid: true, msg: `Username must consists 6-15 characters, only allow numbers and english letters`}
    }
  } else {
    return {valid: true, msg: `Username Can't Leave Blank`}
  }
}
function validatorPassword(val){
  if (val) {
    if (/^(?=.*\d+)(?=.*[a-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1).{6,20}$/.test(val)) {
      return {valid: false}
    } else {
      return {valid: true, msg: 'Password must consists of 6-20 characters, it must contain numbers and symbols'}
    }
  } else {
    return {valid: true, msg: "Password Can't Leave Blank"}
  }
}
function validatorCode(val){
  if (!val) {
    return {valid: true, msg: "Authentication Code Can't Leave Blank"}
  } else {
    return {valid: false}
  }
}
function validatorTelephoneNum(val){
  if (val) {
    if (/^[0-9]*$/.test(val)) {
      return {valid: false}
    } else {
      return {valid: true, msg: 'Invalid Phone Number, Input Again'}
    }
  } else {
    return {valid: true, msg: "Phone Number Can't Leave Blank"}
  }
}

function validatorEmpty(val, text){
  if (!val) {
    return {valid: true, msg: text + "Can't Leave Blank"}
  } else {
    return {valid: false}
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
  	timeout: 'Request Code',
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
      this.timeout = 'Request Again'
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
            title: 'Prompt Message',
            desc: user.msg || phone.msg || code.msg || password.msg || passwordC.msg
        });
        return
      }
      if (this.password !== this.passwordC) {
      	 this.$Notice.warning({
            title: 'Prompt Message',
            desc: 'Password Not Same'
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
      axios.post('/Index/Reg', formD)
        .then(res => {
          if (res.data.state) {
            document.location.href='/';
          } else {
            this.$Notice.warning({
              title: 'Prompt Message',
              desc: res.data.message
            });
          }
        })
    },
    sendCode(val) {
      let phone = validatorTelephoneNum(val)
      if (phone.valid) {
      	this.$Notice.warning({
            title: 'Prompt Message',
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
            title: 'Promopt Message',
            desc: res.data.message
          })
        } else {
          this.$Notice.warning({
            title: 'Prompt Message',
            desc: res.data.message
          })
        }
      })
    }
  }
})
