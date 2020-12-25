Page({
  data:{
    authorizationstatus:false,
    nickName:'',
    avatarUrl:''
  },
  gotoAther(){
    wx.navigateToMiniProgram({
      appId:'wx239dd449dc72d145'
    })
  },
  authorization(){
    wx.showLoading({
      title:'加载中'
    })
    var that=this
    wx.getUserInfo({
        success: function(res) {
            console.log(res)
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country
            that.setData({
              nickName:nickName,
              avatarUrl:avatarUrl,
              authorizationstatus:false
            })
            wx.hideLoading()
            let code=wx.getStorageSync('code')
            wx.setStorageSync('nickName', nickName)
            wx.setStorageSync('avatarUrl', avatarUrl)
            console.log(userInfo,nickName,avatarUrl,gender,province,city,country)
        },
        complete:function(){
          wx.hideLoading()
        }
    })
  },
  onLoad: function (option) {
    
  },
  onShow(e) {
    var that=this
    if (wx.getStorageSync('unionId') == "") {
      that.setData({
        post: 0,
        follow: 0,
        collection: 0,
        fans:0,
        avatarUrl: '../../images/mineTou.png',//用户头像地址
        nickName:  '授权登录',//用户姓名
        score:"0"
      })
    } else {
      wx.getSetting({
        success (res) {
          let data=res.authSetting
          that.setData({
            authorizationstatus:!data['scope.userInfo']
          })
          if(data['scope.userInfo']){
            
            if(wx.getStorageSync('nickName')){
              that.setData({
                nickName:wx.getStorageSync('nickName'),
                avatarUrl:wx.getStorageSync('avatarUrl')
              })
            }else{
              that.authorization()
            }
            
          }
        }
      })
    }
  },
  giveUp:function(e){
    if (wx.getStorageSync('unionId') == "") {
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      wx.navigateTo({
        url: '../dashboard/giveUp/giveUp'
      })
    }
  }, 
  SchoolRecord:function(e){
    if (wx.getStorageSync('unionId') == "") {
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      wx.navigateTo({
        url: '../dashboard/SchoolRecord/SchoolRecord'
      })
    }
  }, 
  materials: function () {
    console.log(wx.getStorageSync('unionId'))
    if (wx.getStorageSync('unionId') == ""){
      wx.navigateTo({
        url: '../login/login',
      }) 
    }else{
      
    }
  }, 
  mineBtn:function(){
    var that = this
    wx.clearStorage({
      success(res) {
        console.log(res)
        wx.showToast({
          title: '已清空缓存',
          icon: 'success',
          duration: 1500
        })
        that.onShow()
      }
    })
  },
})
