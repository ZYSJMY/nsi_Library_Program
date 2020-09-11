Page({
  data: {
    icon:'',
    schoolname:'',
    name:'',
    attend:'',
    telphone:'',
    remark:'',
    remark1:'',
    id:'',
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['幼儿园','一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','十年级','十一年级','十二年级',],//下拉列表的数据
    index: 0,//选择的下拉列表下标
  },
  onLoad: function(options) {
    for (var i = 0; i < this.data.selectData.length; i++){
      if (this.data.selectData[i] === options.attend){ //表示数组里面有这个元素
         this.setData({
          index:i
         })
      }
    }
    this.setData({
      name:options.name,
      telphone:options.telphone,
      remark:options.remark,
      schoolname:options.schoolname,
      icon:options.icon,
      id:options.id,
    })
  },
  onShow:function(){

  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  telphone: function (e) {
    this.setData({
      telphone: e.detail.value
    });
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    });
  },
  callback:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  modify:function(e){
    var that=this
    if (that.data.name == "") {
      wx.showToast({
        title: "学生姓名不能为空",
        icon: 'none',
        duration: 1500,
      })
      return false
    }
    if (that.data.telphone == "") {
      wx.showToast({
        title: "手机号码不能为空",
        icon: 'none',
        duration: 1500,
      })
      return false
    }
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/visit/school/update.do',
      data: {
        id: that.data.id,
        remark: that.data.remark,
        telphone: that.data.telphone,
        attend: e.currentTarget.dataset.selectdata,
        name: that.data.name,
        openId: wx.getStorageSync('unionId'),
      },
      method:"POST",
      header: {
        // 'content-type': 'application/json' // GET默认值
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
          console.log(res.data)
          if(res.data.code == 0){
          wx.showToast({
            title: "修改成功",
            icon: 'success',
            duration: 1500,
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000);
          }
      }
    })
  },
   // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  }
})