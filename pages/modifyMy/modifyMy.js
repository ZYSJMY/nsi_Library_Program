// pages/modifyMy.js
Page({
  data: {
    userTurename: '',//真实姓名
    userOrganization: '',//公司
    userPosition: '',//职位
    userPhone: '',//电话
    username: '',//邮箱
    userPortrait: '',//头像
    unionId:'',//ID
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
  },
  //真实姓名
  userTurename: function (e) {
    this.setData({
      userTurename: e.detail.value
    });
  },
  //公司
  userOrganization: function (e) {
    this.setData({
      userOrganization: e.detail.value
    });
  },
  //职位
  userPosition: function (e) {
    this.setData({
      userPosition: e.detail.value
    });
  },
  //电话
  userPhone: function (e) {
    this.setData({
      userPhone: e.detail.value
    });
  },
  //邮箱
  username: function (e) {
    var that =this
    that.setData({
      username: e.detail.value
    });
    if (!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(that.data.username))){
      wx.showToast({
        title: "邮箱格式不正确",
        icon: 'none',
        duration: 1500,
      })
      return false
    }else{
      wx.request({
        url: 'https://data.xinxueshuo.cn/nsi-1.0/user/UserMailCheck.do',
        data: {
          UserMail: that.data.username,//邮箱
        },
        method:"POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res.data)
          if(res.data.code == 1){
            that.setData({
              username: ''
            });
            wx.showToast({
              title: "邮箱已注册，请前往登录",
              icon: 'none',
              duration: 1500,
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '../wechatBind/wechatBind'
              })
            }, 1500);
          }
        }
      })
    }
    
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
    if (this.data.userTurename == ""){
      wx.showToast({
        title: "姓名不能为空",
        icon: 'none',
        duration: 1500,
      })
      return false
    }
    if (this.data.userOrganization == ""){
      wx.showToast({
        title: "公司不能为空",
        icon: 'none',
        duration: 1500,
      })
      return false
    }
    if (this.data.userPosition == ""){
      wx.showToast({
        title: "职位不能为空",
        icon: 'none',
        duration: 1500,
      })
      return false
    }
    if (this.data.userPhone == "") {
      wx.showToast({
        title: "手机号不能为空",
        icon: 'none',
        duration: 1500,
      })
      return false
    }else{
      if (!(/^[1][3,4,5,7,8,6,1,2,9][0-9]{9}$/.test(this.data.userPhone))){
        wx.showToast({
          title: "手机号格式不正确",
          icon: 'none',
          duration: 1500,
        })
        return false
      }
    }
    var that = this
    //用户邮箱验证
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/user/register_by_siku.do',
      data: {
        userTurename: that.data.userTurename,//真实姓名
        userOrganization: that.data.userOrganization,//公司
        userPosition: that.data.userPosition,//职位
        userPhone: that.data.userPhone,//电话
        username: that.data.username,//邮箱
        userPortrait: wx.getStorageSync('avatarUrl'),//头像
        unionId:wx.getStorageSync('unionId')//ID
      },
      method:"POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res.data)
        if(res.data.code == 0){
          wx.showToast({
            title: "注册成功",
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
  },
})
 
