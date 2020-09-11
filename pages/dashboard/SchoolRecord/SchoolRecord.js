// login.js
var time = require('../../../utils/util')
Page({
  data: {
    list:[],
    listshow:true
  },
  onLoad: function() {
    this.ajaxlist()
  },
  onShow:function(){
    this.ajaxlist()
  },
  ajaxlist(){
    var that=this
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/visit/school/list.do',
      // url:'http://192.168.0.102:8080/nsi-1.0/visit/school/list.do',
      data: {
        openId: wx.getStorageSync('unionId'),
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
         for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].createTime = time.formatTimeTwo(res.data.data.list[i].createTime, "Y-M-D")
         }
         that.setData({
          list:res.data.data.list
         })
      }
    })
  },
  SchoolRecord:function(e){
    wx.navigateTo({
      url: '../recordDetail/recordDetail?icon='+e.currentTarget.dataset.icon +
                                        '&schoolname='+e.currentTarget.dataset.schoolname+
                                        '&name='+e.currentTarget.dataset.name+
                                        '&attend='+e.currentTarget.dataset.attend+
                                        '&telphone='+e.currentTarget.dataset.telphone+
                                        '&remark='+e.currentTarget.dataset.remark+
                                        '&id='+e.currentTarget.dataset.id
    })
  }
})