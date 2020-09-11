//index.js
//获取应用实例
const app = getApp()

Page({
  scroll(e) {
    // console.log(e)
  },
  data: {
    showBanner:[],
    oneFee:false,
    twoFee: false,
    threeFee: false,
    fourFee: false,
    outfitdetail:'',
    outfitid:'',
    select:false,
    tihuoWay:"在读年级",
    inputName:"",
    inputPhone:"",
    inputRemark:"",
    inputGrade:"",
    schoolSystemList:[],
    studeAbroadCountriesList:[],
    courseList:[],
    authenticationList:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    giveUP:false,
    cId:''
  },
  bindShowMsg() {
    let that=this
    that.setData({
      select: !that.data.select
    })
    console.log(that.data.select)
    
  },
  mySelect(e) {
    let that=this
    var name = e.currentTarget.dataset.name
    that.setData({
      tihuoWay: name,
      select: false,
    })
    console.log(that.data.select)

  },
  tapName(data){
    console.log(data)
  },
  lower:function(){
    this.data.pageNum=this.data.pageNum+1
    this.ajaxlist()
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickMe:function(){
    wx.reLaunch({
      url:'../schoolList/schoolList'
    })
  },
  giveUP:function(){
    var that = this
    if(that.data.giveUP ==false){
      that.setData({
        giveUP: true
      })
      wx.request({
        url: 'https://data.xinxueshuo.cn/nsi-1.0/myCollect/add.do',
        data: {
          'openId': wx.getStorageSync('unionId'),
          'cId': that.data.cId,
          'collectType': 1
        },
        method:"POST",
        header: {
          // 'content-type': 'application/json' // GET默认值
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: "收藏成功！",
              icon: 'success',
              duration: 1500,
            })
          }
        }
      })
    }else{
      that.setData({
        giveUP: false
      })
      wx.request({
        url: 'https://data.xinxueshuo.cn/nsi-1.0/myCollect/remove.do',
        data: {
          'openId': wx.getStorageSync('unionId'),
          'cId': that.data.cId,
          'collectType': 1
        },
        method:"get",
        header: {
          'content-type': 'application/json' // GET默认值
          // "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
            wx.showToast({
              title: "取消收藏成功！",
              icon: 'success',
              duration: 1500,
            })
          }
        }
      })
    }
  },
  check(id){
    var that = this
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/myCollect/check.do',
      data: {
        'openId': wx.getStorageSync('unionId'),
        'cId': id,
        'collectType': 1
      },
      method:"get",
      header: {
        'content-type': 'application/json' // GET默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            giveUP: false
          })
        } else {
          that.setData({
            giveUP: true
          })
        }
      }
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
      url: 'https://data.xinxueshuo.cn/nsi-1.0/new/school/detail.do?schoolId='+wxdata.outfitid,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.check(res.data.data.id)
        that.setData({
          cId: res.data.data.id
        })
        for (var value in res.data.data) {
          if (res.data.data[value] == 0 || res.data.data[value] == '0' || res.data.data[value] == null){
            res.data.data[value]='暂无'
          }
        };
        if(res.data.data.schoolShowOne == '暂无'||res.data.data.schoolShowOne=='0'||res.data.data.schoolShowOne==null){
        }else{
          that.data.showBanner.push(res.data.data.schoolShowOne)
        }
        if(res.data.data.schoolShowTwo == '暂无'||res.data.data.schoolShowTwo=='0'||res.data.data.schoolShowTwo==null){
        }else{
          that.data.showBanner.push(res.data.data.schoolShowTwo)
        }
        if(res.data.data.schoolShowThird == '暂无'||res.data.data.schoolShowThird=='0'||res.data.data.schoolShowThird==null){
        }else{
          that.data.showBanner.push(res.data.data.schoolShowThird)
        }
        if(res.data.data.schoolShowFour == '暂无'||res.data.data.schoolShowFour=='0'||res.data.data.schoolShowFour==null){
        }else{
          that.data.showBanner.push(res.data.data.schoolShowFour)
        }
        if(res.data.data.schoolShowFive == '暂无'||res.data.data.schoolShowFive =='0'||res.data.data.schoolShowFive==null){
        }else{
          that.data.showBanner.push(res.data.data.schoolShowFive)
        }
        if (res.data.data.schoolSystem.indexOf("幼儿园")!=-1){
          that.setData({
            oneFee:true
          })
          if (res.data.data.oneTuition=='暂无'){
            that.setData({
              oneFee: false
            })
          }
        }
        if (res.data.data.schoolSystem.indexOf("小学") != -1) {
          that.setData({
            twoFee: true
          })
          if (res.data.data.twoTuition == '暂无') {
            that.setData({
              twoFee: false
            })
          }
        }
        if (res.data.data.schoolSystem.indexOf("初中") != -1) {
          that.setData({
            threeFee: true
          })
          if (res.data.data.thirdTuition == '暂无') {
            that.setData({
              threeFee: false
            })
          }
        }
        if (res.data.data.schoolSystem.indexOf("高中") != -1) {
          that.setData({
            fourFee: true
          })
          if (res.data.data.fourTuition == '暂无') {
            that.setData({
              fourFee: false
            })
          }
        }
        that.setData({
            outfitdetail: res.data.data,
            schoolSystemList: res.data.data.schoolSystem.split(";").filter(function (s) { return s && s.trim();}),
            courseList: res.data.data.course.split(";").filter(function (s) { return s && s.trim();}),
            authenticationList: res.data.data.authentication.split(";").filter(function (s) { return s && s.trim();}),
            showBanner: that.data.showBanner,
        })
        console.log(that.data.studeAbroadCountriesList,that.data.authenticationList)
        wx.setNavigationBarTitle({
          title: res.data.data.schoolName
        })
        wx.hideLoading();
      }
    })
  },
  inputName(e){
    this.setData({
      inputName: e.detail.value
    })
  },
  inputPhone(e){
    this.setData({
      inputPhone: e.detail.value
    })
  },
  inputRemark(e){
    this.setData({
      inputRemark: e.detail.value
    })
  },
  submit() {
    let that=this
    let wxdata = this.data
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/visit/school/save.do',
      data: {
        'name': that.data.inputName,
        'attend': that.data.tihuoWay,
        'telphone': that.data.inputPhone,
        'remark': that.data.inputRemark,
        'schoolId': wxdata.outfitid,
        'fillDesc':1,
        'openId':wx.getStorageSync('unionId')
      },
      method:"POST",
      header: {
        // 'content-type': 'application/json' // GET默认值
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: "提交申请成功",
            icon: 'success',
            duration: 1500,
          })
        } else {
          wx.showToast({
            title: "失败,请重新填写",
            icon: 'warn',
            duration: 1500,
          })
        }
      }
    })
  },
  onLoad: function (options) {
    this.data.outfitid=options.id
    this.ajaxlist()
  },
  onShareAppMessage:function(){
    let flagname=this.data.outfitdetail.schoolName
    let outfitid=this.data.outfitid
      return {
        title:flagname,
        path: 'pages/school/schoolDetail/schoolDetail?id='+outfitid
      }
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
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  getUserInfo: function(e) {
    
  }
})
