// pages/modifyMy.js
Page({
  data: {
    username: '',//邮箱
    password:''
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
  },
  //邮箱
  username: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  //密码
  password: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  //提交用户信息
  submission(){
    if (this.data.username == "") {
      wx.showToast({
        title: "邮箱不能为空",
        icon: 'none',
        duration: 1500,
      })
      return false
    }else{
      if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.data.username))){
        wx.showToast({
          title: "邮箱格式不正确",
          icon: 'none',
          duration: 1500,
        })
        return false
      }
    }
    if (this.data.password == "") {
      wx.showToast({
        title: "密码不能为空",
        icon: 'none',
        duration: 1500,
      })
      return false
    }
    var that = this
    //校验密码是否正确
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/user/login.do',
      data: {
        userName: that.data.username,//邮箱
        passWord: that.data.password,//密码
      },
      method:"POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data)
        if(res.data.code == 0){
          //用户邮箱验证
          wx.request({
            url: 'https://data.xinxueshuo.cn/nsi-1.0/user/wechat_bind_unionid.do',
            data: {
              username: that.data.username,//邮箱
              password: that.data.password,//密码
              unionId: wx.getStorageSync('unionId'),//id
            },
            method:"POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success(res) {
              console.log(res.data)
              if(res.data.code == 0){
                wx.showToast({
                  title: "登录成功",
                  icon: 'success',
                  duration: 1500,
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: "../school/schoolList/schoolList"
                  })
                }, 1500);
              }
            }
          })
        }else{
          wx.showToast({
            title: "密码错误",
            icon: 'none',
            duration: 1500,
          })
        }
      }
    })
  },
  forgetPwd(){
    wx.navigateTo({
      url: '../forgetPwd/forgetPwd'
    })
  }
})
 
