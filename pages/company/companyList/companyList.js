//index.js
//获取应用实例
const app = getApp()
var App = getApp()
Page({
  data: {
    selectOutfit: '',
    list:[],
    height:1000,
    pageNum:1,
    searchKey:'',
    listLength:'',
    liststatus:false,
    totalstatus:false,
    bottomLoading:false,
    bottomisshow:true,
    status:true,
  },
  bindSearchEvent: function (e) {
    if(this.data.status){
      return
    }
    this.setData({
      searchKey: e.detail.value,
    })
    this.data.pageNum=1
    this.data.list.length=0
    this.ajaxlist()
  },
  lower:function(){
    if(this.data.pageNum*10>=this.data.listLength){
      wx.showToast({
        title:'没有更多了'
      })
      this.setData({
          bottomisshow: false,
      })
      return
    }
    wx.vibrateShort()
    this.data.pageNum=this.data.pageNum+1
    this.ajaxlist()
  },
  refresh(){
    this.setData({
      navH: App.globalData.navHeight,//顶部导航高度
      searchKey: "",
      contentValue: "",
      list:[],
    })
    this.ajaxlist()
  },
  ajaxlist(){
    var that=this
    that.data.status=true
    let wxdata=this.data
    that.setData({
        bottomLoading: true,
    })
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/institution/list.do?searchKey='+wxdata.searchKey+'&pageNum='+wxdata.pageNum+'&pageSize=10',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        let flagdata=wxdata.list.concat(res.data.data)
        if(flagdata.length==0){
          that.setData({
            liststatus: true,
            bottomLoading: false,
            bottomisshow: false,
          })
        }else if(flagdata.length<10){
          that.setData({
            liststatus: false,
            bottomLoading: false,
            bottomisshow: false,
          })
        }else{
          that.setData({
            liststatus: false,
            bottomisshow: true,
          })
        }
        that.setData({
            totalstatus:true,
            listLength:res.data.count,
            list: flagdata,
        })
        that.data.status=false
      }
    })
  },
  onLoad: function () {
    this.setData({
      navH: App.globalData.navHeight,//顶部导航高度
    })
    this.ajaxlist()
  },
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onReady(){
     wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
  },
  enterHomePage:function(e){
    if (wx.getStorageSync('unionId') == "") {
      wx.navigateTo({
        url: '../../login/login'
      })
    } else {
      wx.navigateTo({
        url: '../companyDetail/companyDetail?id=' + e.currentTarget.dataset.followerid
      })
    }
  },
})
