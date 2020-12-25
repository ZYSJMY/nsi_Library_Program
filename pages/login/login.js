// login.js
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wechatNickname:'',
    unionId:'',
    wechatPortrait:'',
    gender:''
  },
  onShow:function(){
    wx.login({
      success: res => {
        console.log(res.code)
        wx.setStorageSync('code', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  login(){
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.encryptedData = res.encryptedData,
              that.iv =  res.iv,
              that.getInfo()
            }
          })
        }else{
          wx.navigateBack({
            delta: 1
          })
        }
      },
    })
  },
  noLogin(){
    wx.navigateBack({
      delta: 1
    })
  },
  //获取微信用户信息
  getInfo() {
    wx.showLoading({
      title: '正在加载中',
      mask: true
    })
    var that = this
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/user/decodeUserInfo.do',
      data: {
        "code": wx.getStorageSync('code'),
        "encryptedData": that.encryptedData,
        "iv": that.iv,
        "type":1
      },
      method:"POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        console.log(res.data.data.nickName)
        wx.setStorageSync('unionId', res.data.data.unionId)
        wx.setStorageSync('avatarUrl', res.data.data.avatarUrl)
        wx.setStorageSync('nickName', res.data.data.nickName)
        that.setData({
          wechatNickname: res.data.data.nickName,
          unionId: res.data.data.unionId,
          wechatPortrait: res.data.data.avatarUrl,
          gender: res.data.data.gender
        })
        if (res.data.code == 0){
          that.userregister()
        }
      }
    })
  },
  //用户登陆和注册
  userregister() {
    var that = this
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/user/find_siku_by_unionId.do',
      data: {
        "unionId": that.data.unionId
      },
      success(res) {
        console.log(res.data.code)
        if(res.data.code == 0){
          wx.showToast({
            title: "登录成功",
            icon: 'success',
            duration: 1500,
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        }else{
          wx.navigateTo({
            url: '../modifyMy/modifyMy'
          })
        }
      }
    })
  },
})