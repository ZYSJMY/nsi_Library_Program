// login.js
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    list:[],
    listshow:true
  },

  onLoad: function() {
    var that = this;
    wx.getSystemInfo( {
        success: function( res ) {
            that.setData( {
                winWidth: res.windowWidth,
                winHeight: res.windowHeight
            });
        }
    });
    this.setData({
        slideButtons: [{
          type: 'warn',
          text: '删除',
          extClass: 'test',
        },{
          text: '取消',
        }],
    });
    that.ajaxlist(1)
  },
  ajaxlist(num){
    var that=this
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/myCollect/list.do',
      data: {
        openId: wx.getStorageSync('unionId'),
        collectType:num,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
         console.log(res.data.data.list)
         if(res.data.data.list == ''){
            that.setData({
              listshow:false
            }) 
         }else{
            that.setData({
              listshow:true
            })
         }
         if(num != 2){
          for (var i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].system = res.data.data.list[i].system.split(";").filter(function (s) { return s && s.trim();})
           }
         }
         that.setData({
          list:res.data.data.list
         })
      }
    })
  },
  schoolDetail:function(e){
    if (wx.getStorageSync('unionId') == "") {
      wx.navigateTo({
        url: '../../login/login'
      })
    } else {
      wx.navigateTo({
        url: '../../school/schoolDetail/schoolDetail?id=' + e.currentTarget.dataset.followerid
      })
    }
  },
  companyDetail:function(e){
    if (wx.getStorageSync('unionId') == "") {
      wx.navigateTo({
        url: '../../login/login'
      })
    } else {
      wx.navigateTo({
        url: '../../company/companyDetail/companyDetail?id=' + e.currentTarget.dataset.followerid
      })
    }
  },
  //  tab切换逻辑
  swichNav: function( e ) {
      var that = this;
      if( this.data.currentTab === e.target.dataset.current ) {
          return false;
      } else {
          that.setData( {
              currentTab: e.target.dataset.current
          })
      }
      if(that.data.currentTab == 0){
          that.ajaxlist(1)
      }else{
          that.ajaxlist(2)
      }
  },
  stopTouchMove: function() {
    return false;
  },
  slideButtonTap:function(e){
    console.log(e)
  },
  slideButtonTap(e) {
    var that = this;
    if(e.detail.index == 0){
      wx.request({
        url: 'https://data.xinxueshuo.cn/nsi-1.0/myCollect/my_collect_remove.do',
        data: {
          collectId:e.currentTarget.dataset.followerid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
           console.log(res.data.code)
           if(res.data.code == 0){
            wx.showToast({
              title: "删除成功！",
              icon: 'success',
              duration: 1500,
            })
           }
           if(that.data.currentTab == 0){
              that.ajaxlist(1)
            }else{
              that.ajaxlist(2)
            }
        }
      })
    }else{
      wx.showToast({
        title: "已取消！",
        icon: 'success',
        duration: 1500,
      })
    }
  }
})