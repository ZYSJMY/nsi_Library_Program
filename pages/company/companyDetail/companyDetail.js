//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showBanner:[],
    outfitdetail:'',
    outfitid:'',
  },
  tapName(data){
    console.log(data)
  },


  lower:function(){
    this.data.pageNum=this.data.pageNum+1
    this.ajaxlist()
  },
  clickMe:function(){
    wx.reLaunch({
      url:'../companyList/companyList'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  ajaxlist(){
    var that=this
    let wxdata=this.data
    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
        title: '加载中',
        icon: 'loading',
    });
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/institution/detail.do?institutionId='+wxdata.outfitid, //仅为示例，并非真实的接口地址
      // data: {
      //   searchKey:wxdata.searchKey,
      //   pageNum:wxdata.pageNum,
      //   pageSize:'10',
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        console.log(res.data.data)
        for (var value in res.data.data) {
          if (res.data.data[value] == 0 || res.data.data[value] == '0' || res.data.data[value] == null  ||  res.data.data[value] =="其他"){
            res.data.data[value]='暂无'
          }
        };
        if(res.data.data.img02 == '暂无'||res.data.data.img02=='0'||res.data.data.img02==null){
        }else{
          that.data.showBanner.push(res.data.data.img02)
        }
        if(res.data.data.img03 == '暂无'||res.data.data.img03=='0'||res.data.data.img03==null){
        }else{
          that.data.showBanner.push(res.data.data.img03)
        }
        if(res.data.data.img04 == '暂无'||res.data.data.img04=='0'||res.data.data.img04==null){
        }else{
          that.data.showBanner.push(res.data.data.img04)
        }
        if(res.data.data.img05 == '暂无'||res.data.data.img05=='0'||res.data.data.img05==null){
        }else{
          that.data.showBanner.push(res.data.data.img05)
        }
        wx.setNavigationBarTitle({
          title: res.data.data.name
        })
        that.setData({
            outfitdetail: res.data.data,
        })
        wx.hideLoading();
      }
    })
  },
  onLoad: function (options) {
    console.log(options)
    this.data.outfitid=options.id
    this.ajaxlist()
    // var that=this
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
  onShareAppMessage:function(){
    let flagname=this.data.outfitdetail.name
    let outfitid=this.data.outfitid
      return {
        title:flagname,
        path: 'pages/company/companyDetail/companyDetail?id='+outfitid
      }
  },
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getUserInfo: function(e) {
    
  }
})
