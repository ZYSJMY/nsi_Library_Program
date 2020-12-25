var time = require('../../utils/util.js')
Page({
  data: {
  score:0,
  id:'',
  textareaVal:'',
	flag:[0, 0, 0],  //每行标记变量 改变显示的五角星
  startext: ['', '', ''],   //各个下标对应每行显示  5个评价中的一个 非常不满意/不满意
  stardata: [1, 2, 3, 4, 5],  //每颗星星对应的数值  决定了渲染出几颗五角星
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  bindTextAreaBlur: function(e) {
    this.setData({
      textareaVal :e.detail.value
    })
  },
  // 五星评价事件
  changeColor: function (e) {
    var index = e.currentTarget.dataset.index;  //判断选中了哪个评价 在前端页面写死的索引
    var num = e.currentTarget.dataset.no; //前端页面的 item 传来选择了多少个
    var a = 'flag[' + index + ']';
    var b = 'startext[' + index + ']';
    var that = this;
    that.setData({
      score: num
    })
    if(num == 1) {
      that.setData({
        [a]: 1,
        [b]: '非常不满意'
      });
    } else if (num == 2){
      that.setData({
        [a]: 2,
        [b]: '不满意'
      });
    } else if (num == 3) {
      that.setData({
        [a]: 3,
        [b]: '一般'
      });
    } else if (num == 4) {
      that.setData({
        [a]: 4,
        [b]: '满意'
      });
    } else if (num == 5) {
      that.setData({
        [a]: 5,
        [b]: '非常满意'
      });
    }
    
  },
  //一级评论的内容提交接口
  getcontent(e){
    var that = this
    if (wx.getStorageSync('unionId') == "") {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      if (that.data.textareaVal == "" || that.data.score == 0) {
        wx.showToast({
          title: "请填写评价或对学校进行评分",
          icon: 'none',
          duration: 1500,
        })
      } else {
        wx.request({
          url: 'https://data.xinxueshuo.cn/nsi-1.0/postItem/msg_sec_check.do',
          // url: 'http://192.168.0.102:8080/nsi-1.0/postItem/msg_sec_check.do',
          data: {
            content: time.utf16toEntities(that.data.textareaVal),
            commentType:2
          },
          header: {
            'content-type': 'application/json' // GET默认值
          },
          success(res) {
            console.log(res.data.code)
            if (res.data.code == 0) {
              wx.request({
                url: 'https://data.xinxueshuo.cn/nsi-1.0/communityComment/insert',
                // url: 'http://192.168.0.102:8080/nsi-1.0/communityComment/insert',
                data: {
                  content: time.utf16toEntities(that.data.textareaVal),
                  wechatId: wx.getStorageSync('unionId'),
                  portrait: wx.getStorageSync('avatarUrl'),
                  nickname: time.utf16toEntities(wx.getStorageSync('nickName')),
                  objectId: that.data.id,
                  score:that.data.score,
                  commentType:2
                },
                method:"POST",
                header: {
                  // 'content-type': 'application/json' // GET默认值
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success(res) {
                  console.log(res.data)
                  if (res.data.code == 0) {
                    wx.showToast({
                      title: "回复成功",
                      icon: 'success',
                      duration: 1500,
                    })
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 1500);
                  }
                }
              })
            }else {
              wx.showToast({
                title: "内容包含敏感信息，请重新输入",
                icon: 'none',
                duration: 1500,
              })
            }
          }
        })
      }
    }
  },
})