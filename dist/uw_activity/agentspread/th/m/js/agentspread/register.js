function validatorUserName(value) {
  if (value) {
    if (/^[\u4E00-\u9FA5A-Za-z0-9]{4,16}$/.test(value)) {
      return {valid: false}
    } else {
      return {valid: true, msg: `ชื่่อผู้ใช้ต้องมีตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น รวมกัน 6-15 ตัวอักษร`}
    }
  } else {
    return {valid: true, msg: `ชื่อผูู้ใช้ไม่สามารถเว้นว่างได้`}
  }
}
function validatorPassword(val){
  if (val) {
    if (/^(?=.*\d+)(?=.*[a-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1).{6,20}$/.test(val)) {
      return {valid: false}
    } else {
      return {valid: true, msg: 'รหัสผ่่านต้องเป็นตัวเลขและสัญลักษณ์ 6-20 ตัว'}
    }
  } else {
    return {valid: true, msg: 'รหัสผ่านไม่สามารถเว้นว่างได้'}
  }
}
function validatorCode(val){
  if (!val) {
    return {valid: true, msg: 'รหัสยืนยันไม่สามารถเว้นว่างได้'}
  } else {
    return {valid: false}
  }
}
function validatorTelephoneNum(val){
  if (val) {
    if (/^[0-9]*$/.test(val)) {
      return {valid: false}
    } else {
      return {valid: true, msg: 'เบอร์์โทรศัพท์ไม่ถูกต้อง กรุณากรอกใหม่'}
    }
  } else {
    return {valid: true, msg: 'เบอร์โทรศัพท์ไม่สามารถเว้นว่างได้'}
  }
}

function validatorEmpty(val, text){
  if (!val) {
    return {valid: true, msg: text + 'ไม่สามารถเว้นว่างได้'}
  } else {
    return {valid: false}
  }
}
function validatorPassword (val){
  if (val) {
    if (/^(?=.*\d+)(?=.*[a-zA-Z]+)(?!.*?([a-zA-Z0-9]+?)\1\1).{6,20}$/.test(val)) {
      return {valid: false}
    } else {
      return {valid: true, msg: 'รหัสผ่่านต้องเป็นตัวเลขและสัญลักษณ์ 6-20 ตัว'}
    }
  } else {
    return {valid: true, msg: 'หัสผ่านไม่สามารถเว้นว่างได้'}
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
  	timeout: 'ขอรหัสยืนยัน',
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
      this.timeout = 'ขอรหัสอีกครั้ง'
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
            title: 'ข้อความแจ้งเตือน',
            desc: user.msg || phone.msg || code.msg || password.msg || passwordC.msg
        });
        return
      }
      if (this.password !== this.passwordC) {
      	 this.$Notice.warning({
            title: 'ข้อความแจ้งเตือน',
            desc: 'รหัสผ่านไม่่ตรงกัน'
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
          if (res.data.state) {
            document.location.href='/';
          } else {
            this.$Notice.warning({
              title: 'ข้อความแจ้งเตือน',
              desc: res.data.message
            });
          }
        })
    },
    sendCode(val) {
      let phone = validatorTelephoneNum(val)
      if (phone.valid) {
      	this.$Notice.warning({
            title: 'ข้อความแจ้งเตือน',
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
            title: 'ข้อความแจ้งเตือน',
            desc: res.data.message
          })
        } else {
          this.$Notice.warning({
            title: 'ข้อความแจ้งเตือน',
            desc: res.data.message
          })
        }
      })
    }
  }
})
