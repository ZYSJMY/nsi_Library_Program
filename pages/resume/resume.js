// pages/resume/resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    talentId:"",
    fileName:"",
    fileHttp:"",
    inputVisible:false,
    dynamicTags:[],
    tag1: "幼儿园老师",
    tag2: "小学老师",
    tag3: "初中老师",
    tag4: "高中老师",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      talentId:e.id,
    })
  },
  // 上传文件 
  uploadFile() {
    var that = this
    wx.showToast({
      title: '您可以从微信聊天中选取文件，支持PDF、JPG、PNG文件，文件大小8MB以内',
      icon: 'none',
      duration: 3000
    })
    setTimeout(function () {
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success(res) {
          console.log(res)
          var index = res.tempFiles[0].path.lastIndexOf("\.");
          var fileType = res.tempFiles[0].path.substring(index + 1, res.tempFiles[0].path.length)
          if ((fileType == 'pdf' || fileType == 'jpg' || fileType == 'png') && res.tempFiles[0].size < 10500000) {
            wx.uploadFile({
              url: 'https://data.xinxueshuo.cn/nsi-1.0/manager/talent/upResume.do',
              filePath: res.tempFiles[0].path,
              name: 'file',
              formData: {
                "type": "nsi-pc/TalentAttachment/",
                "talentId": that.data.talentId,
                "userMail": "3064063267@qq.com",
                "file": res.tempFiles[0].path
              },
              success(msg) {
                var data = JSON.parse(msg.data)
                console.log(data.data.url)
                that.setData({
                  fileName: res.tempFiles[0].name,
                  fileHttp: data.data.url
                })
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 1500
                })
              }
            })
          } else if (res.tempFiles[0].size > 10500000) {
            wx.showToast({
              title: '支持文件大小8MB以内',
              icon: 'none',
              duration: 3000
            })
          } else {
            wx.showToast({
              title: '仅支持PDF、JPG、PNG文件',
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    }, 3500);
  },
  //添加标签
  add_tag(e) {
    let that=this
    console.log(that.data.dynamicTags.length)
    if (that.data.dynamicTags.length < 5) {
      that.setData({
        dynamicTags:that.data.dynamicTags.concat(e.currentTarget.dataset.tag)
      })
      console.log(that.data.dynamicTags)
      console.log(that.data.dynamicTags.length)
    } else {
      wx.showToast({
        title: '最多添加5个标签',
        icon: "none"
      })
    }
  },
  // 删除标签
  closeTag(e){
    let that=this
    that.data.dynamicTags.splice(e.currentTarget.dataset.tagindex, 1)
    that.setData({
      dynamicTags: that.data.dynamicTags
    })
  },
  // 添加input标签
  addInput(){
    this.setData({
      inputVisible:true
    })
  },
  addInputTag(e){
    if (this.data.dynamicTags.length < 5) {
      this.setData({
        dynamicTags: this.data.dynamicTags.concat(e.detail.value),
        inputVisible: false
      })
    }else{
      wx.showToast({
        title: '最多添加5个标签',
        icon:"none"
      })
    }
    console.log(this.data.dynamicTags)
  },
  sumbit(){
    wx.request({
      url: 'https://data.xinxueshuo.cn/nsi-1.0/newTalent/update.do',
      data: {
        id: this.data.talentId, //id
        resume: this.data.fileHttp, //文件
        tag: JSON.stringify(this.data.dynamicTags), //标签
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '提交成功'
          })
          setTimeout(function () {
            wx.switchTab({
              url: "../../pages/school/schoolList/schoolList"
            })
          },3000)
        } else {
          wx.showToast({
            title: '提交失败'
          })
        }
        
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})