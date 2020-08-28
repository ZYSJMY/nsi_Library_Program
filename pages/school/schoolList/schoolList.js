//index.js
//获取应用实例
var App = getApp()
const app = getApp()

Page({
  data:{
    list:[],
    height:1000,
    pageNum:1,
    searchKey:'',
    listLength:'',
    liststatus:false,
    totalstatus:false,
    bottomLoading:false,
    bottomisshow:true,
    hideviews:false,
    yongjiu:false,
    status:true,
    condition:false,
    select:false,
    select1:false,
    select2:false,
    selectListArea:['北京','上海','天津','重庆','浙江','江苏','广东','福建','湖南','湖北','辽宁','吉林','河北','河南','山东','陕西','甘肃','新疆','青海','山西','四川','贵州','安徽','江西','云南','西藏','广西','宁夏','海南','香港','澳门','台湾','黑龙江','内蒙古'],
    system:'招生阶段',
    area:'所在城市',
    properties:'学校性质',
  },
  bindSearchEvent: function (e) {
    if(this.data.status){
      return
    }
    this.setData({
      searchKey: e.detail.value,
    })
    this.data.pageNum=1
    this.data.list=[]
    console.log(this.data.list)
    this.ajaxlist()
  },
  
  lower:function(){
    let wxdata=this.data
    if(this.data.pageNum*10>=this.data.listLength){
      wx.showToast({
        title:'没有更多了',
      })
      this.setData({
          bottomisshow: false,
      })
      return
    }
    wx.vibrateShort()
    this.data.pageNum=this.data.pageNum+1
    if(wxdata.system == '招生阶段'&&wxdata.area == '所在城市'&&wxdata.properties == '学校性质'){
      this.ajaxlist()
    }else{
      this.option()
    }
  },
  hideview(){
    wx.setStorageSync('scene', 1089)
    this.setData({
        hideviews: false,
        yongjiu:true,
    })
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
      url: 'https://data.xinxueshuo.cn/nsi-1.0/new/school/list.do',
      data: {
        searchKey: wxdata.searchKey,
        pageNum:wxdata.pageNum,
        pageSize:'10',
        // orderBy: "Load_Time-desc"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].schoolSystem = res.data.data.list[i].schoolSystem.split(";").filter(function (s) { return s && s.trim();})
        }
        let flagdata=wxdata.list.concat(res.data.data.list)
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
            listLength:res.data.data.total,
            select: false,
            select1: false,
            select2: false,
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
    //console.log(wx.getStorageSync('scene'))
    if(wx.getStorageSync('scene')!=1089){
      if(this.data.yongjiu){
        return
      }
      this.setData({
            hideviews:true,
      })
    }
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
        url: '../schoolDetail/schoolDetail?id=' + e.currentTarget.dataset.followerid
      })
    }
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select,
      select1: this.data.select1?false:false,
      select2: this.data.select2?false:false,
    })
  },
  bindShowMsg1() {
    this.setData({
      select: this.data.select?false:false,
      select1: !this.data.select1,
      select2: this.data.select2?false:false,
    })
  },
  bindShowMsg2() {
    this.setData({
      select: this.data.select?false:false,
      select1: this.data.select1?false:false,
      select2: !this.data.select2,
    })
  },
  mySelect(e) {
    this.data.list=[]
    this.setData({
      system:e.currentTarget.dataset.name,
      pageNum:1,
    })
    this.option()
  },
  mySelect1(e) {
    this.data.list=[]
    this.setData({
      area:e.currentTarget.dataset.name,
      pageNum:1,
    })
    this.option()
  },
  mySelect2(e) {
    this.data.list=[]
    this.setData({
      properties:e.currentTarget.dataset.name,
      pageNum:1,
    })
    this.option()
  },
  resetSystem(){
    this.data.list=[]
    this.setData({
      system:this.data.system == "招生阶段"?this.data.system:'招生阶段',
      select: !this.data.select,
    })
    if(this.data.system == "招生阶段" &&this.data.area == "所在城市"&&this.data.properties == "学校性质"){
      this.ajaxlist()
    }else{
      this.option()
    }
  },
  resetArea(){
    this.setData({
      area:this.data.area == "所在城市"?this.data.area:'所在城市',
      select1: !this.data.select1,
    })
    if(this.data.system == "招生阶段" &&this.data.area == "所在城市"&&this.data.properties == "学校性质"){
      this.ajaxlist()
    }else{
      this.option()
    }
  },
  resetProperties(){
    this.setData({
      properties:this.data.properties == "学校性质"?this.data.properties:'学校性质',
      select2: !this.data.select2,
    })
    if(this.data.system == "招生阶段" &&this.data.area == "所在城市"&&this.data.properties == "学校性质"){
      this.ajaxlist()
    }else{
      this.option()
    }
  },
  option(){
    var that=this
    that.data.status=true
    let wxdata=that.data
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/new/school/power_search_list.do',
      data: {
        system: wxdata.system == "招生阶段"?'':wxdata.system,
        area: wxdata.area== "所在城市"?'':wxdata.area,
        properties: wxdata.properties== "学校性质"?'':wxdata.properties,
        pageNum:wxdata.pageNum,
        pageSize:'10',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].schoolSystem = res.data.data.list[i].schoolSystem.split(";").filter(function (s) { return s && s.trim();})
        }
        let flagdata=wxdata.list.concat(res.data.data.list)
        console.log(flagdata)
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
            listLength:res.data.data.total,
            select: false,
            select1: false,
            select2: false,
            list: flagdata,
        })
        that.data.status=false
      }
    })
  }
})
