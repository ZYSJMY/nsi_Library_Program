// pages/talentAdd/talentAdd.js
var time = require('../../utils/util.js')
const date = new Date()
const startTime = []
const endTime = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  startTime.push(i + "-01")
}
startTime[0] = "开始时间"
for (let i = 1990; i <= date.getFullYear(); i++) {
  endTime.push(i + "-01")
}
endTime[0] = "结束时间"

Page({

  /**
   * 页面的初始数据
   */
 
  data: {
        endTime,
        startTime,
        indexNum:1,
        educationIndex: 1,
        trainingIndex:1,
        showTopTips: false,
        salaryNumber:false,
        radioItems: [
            {name: '男', value: '0', checked: true},
            {name: '女', value: '1'}
        ],
        salaryItems:[
            { name: '面议', value: '0', checked: true },
            { name: '年薪', value: '1' }
        ],
        accounts: ["大专","本科", "硕士", "博士"],
        accountIndex: 0,

        workYears:["应届生","1-3年", "3-5年", "5-10年","10年以上"],
        workYearsIndex:0,

        formData: {
        },
        imageUrl: "http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png",
        getName:"",
        getSex:"男",
        getMobile:"",
        getMail:"",
        getAge:"",
        getProfession:"",
        getworkPlace:"",
        isPublic:1,
        getpositionName:"",
        getpositionCity:"",
        getEntryTime: "",
        getSalary:"面议",
        work_experience_text: [
          //工作经验
          {
            multiIndex: [0, 0],
            company: "",
            jobType: "",
            date: [startTime, endTime],
            textarea: ""
          }
        ],
        education: [
          //教育背景
          {
            schoolIndex: [0, 0],
            schoolName: "",
            schoolMajor: "",
            schoolDate: [startTime, endTime],
            schoolTextarea: ""
          }
        ],
        training: [
          //培训经历
          {
            trainIndex: [0, 0],
            trainName: "",
            trainTextarea: "",
            trainDate: [startTime, endTime],
          }
        ],
        getCertificate:"",
        getOther:"",
        rules: [ {
            name: 'name',
            rules: {required: true, message: '请输入姓名'},
          },{
            name: 'mobile',
            rules: [{required: true, message: '手机号不能为空'},
                    {mobile: true, message: '手机号格式不对'}],
          }, {
            name: 'email',
            rules: [{ required: true, message: '请输入邮箱地址' },
                    { email: true, message: '邮箱格式不对' }]

          },{
            name: 'age',
            rules: { required: true, message: '年龄不能为空' }
          },{
            name: 'Profession',
            rules: { required: true, message: '请输入专业' },
          }, {
            name: 'workPlace',
            rules: { required: true, message: '请输入工作地点' },
          }, {
            name: 'positionName',
            rules: { required: true, message: '请输入职位名称' },
          },{
            name: 'positionCity',
            rules: { required: true, message: '请输入城市' },
          },
          // {
          //   name: 'schoolName',
          //   rules: { required: true, message: '学校名称不能为空' },
          // },{
          //   name: 'majonIn',
          //   rules: { required: true, message: '专业名称不能为空' },
          // },{
          //   name: 'schoolData',
          //   rules: { required: true, message: '在校时间不能为空' },
          // }
        ],
  },
  // 名字
  getInputName(e){
    this.setData({
  			getName: e.detail.value,
        [`formData.name`]: e.detail.value
		})
  },
  sexRadioChange(e) {
    const items = this.data.radioItems
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items,
      getSex: e.detail.value
    })
    console.log(this.data.getSex)
  },
  salaryRadioChange(e){
    const items = this.data.salaryItems
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items,
      getSalary: e.detail.value
    })
    if (this.data.getSalary=="年薪"){
      this.setData({
        salaryNumber:true,
        getSalary: ""
      })
    }else{
      this.setData({
        salaryNumber: false,
        getSalary: e.detail.value
      })
    }
    console.log(this.data.getSalary)
  },
  getInputSalary(e){
    this.setData({
      getSalary: e.detail.value
    })
    console.log(this.data.getSalary)
  },
  // 手机号
  getInputMobile(e){
    this.setData({
        getMobile: e.detail.value,
        [`formData.mobile`]: e.detail.value
    })
  },
  // 邮箱
  getInputMail(e){
    this.setData({
        getMail: e.detail.value,
        [`formData.email`]: e.detail.value
    })
  },
  // 年龄
  getInputAge(e){
    this.setData({
        getAge: e.detail.value,
        [`formData.age`]: e.detail.value
    })
  },
  // 学历
  bindAccountChange: function (e) {
    this.setData({
        accountIndex: e.detail.value,
    })
  },
  // 工作年限
  bindworkYears(e) {
    this.setData({
        workYearsIndex: e.detail.value
    })
  },
  // 专业
  getInputProfession(e){
    this.setData({
        getProfession: e.detail.value,
        [`formData.Profession`]: e.detail.value
    })
  },
  // 工作地点
  getInputWorkPlace(e){
    this.setData({
        getworkPlace: e.detail.value,
        [`formData.workPlace`]: e.detail.value
    })
  },
  // 是否公开简历
  isPublic(e){
    if (e.detail.value){
      this.setData({
        formData: {
          isPublic: 1
        }
      })
    }else{
      this.setData({
        formData: {
          isPublic: 0
        }
      })
    }
    
  },
  // 职位名称
  getInputpositionName(e){
    this.setData({
        getpositionName: e.detail.value,
        [`formData.positionName`]: e.detail.value
    })
  },
  // 工作城市
  getInputpositionCity(e) {
    this.setData({
        getpositionCity: e.detail.value,
        [`formData.positionCity`]: e.detail.value
    })
  },
  // 入职时间
  getInputEntryTime(e){
    this.setData({
       getEntryTime: e.detail.value
    })
  },
  // 工作经历 公司名称
  getInputCompanyName(e){
    var companyValue = e.detail.value
    this.data.work_experience_text[this.data.work_experience_text.length - 1].company = companyValue
    console.log(this.data.work_experience_text)
  },
  getInputJobType(e){
    var jobTypeValue = e.detail.value
    this.data.work_experience_text[this.data.work_experience_text.length - 1].jobType = jobTypeValue
  },
  bindMultiPickerChange(e) {
    this.data.work_experience_text[e.currentTarget.dataset.pickerindex].textarea
    this.data.work_experience_text[e.currentTarget.dataset.pickerindex].company
    this.data.work_experience_text[e.currentTarget.dataset.pickerindex].jobType
    this.data.work_experience_text[e.currentTarget.dataset.pickerindex].date
    this.data.work_experience_text[e.currentTarget.dataset.pickerindex].multiIndex == e.detail.value,
    this.setData({
      work_experience_text: this.data.work_experience_text,
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log(e.currentTarget.dataset.pickerindex)
    this.data.work_experience_text[e.currentTarget.dataset.pickerindex].multiIndex[e.detail.column] = e.detail.value
  },
  getInputTextarea(e){
    var textareaValue = e.detail.value
    this.data.work_experience_text[this.data.work_experience_text.length - 1].textarea = textareaValue
  },
  // 添加工作经历
  addWorkExperience(){
    let that=this
    if (that.data.work_experience_text.length<5){
      that.data.work_experience_text.push({ multiIndex: [0, 0], company: "", jobType: "", date: [startTime, endTime], textarea: "" }),
        that.setData({
          work_experience_text: that.data.work_experience_text,
          indexNum: that.data.work_experience_text.length
        })
    }else{
      wx.showToast({
        title: '最多添加5个',
        icon: "none"
      })
    }
  },
  deleteWorkExperience(e){
    let that = this
    if (that.data.work_experience_text.length>1){
      that.data.work_experience_text.splice(e.currentTarget.dataset.deleteindex, 1)
      that.setData({
        work_experience_text: that.data.work_experience_text,
        indexNum: that.data.work_experience_text.length
      })
    }else{
      wx.showToast({
        title: '当前就一条不允许删除',
        icon: "none"
      })
    }
  },
  // 教育背景
  getInputSchoolName(e){
    var schoolNameValue = e.detail.value
    this.data.education[this.data.education.length - 1].schoolName = schoolNameValue
  },
  getInputMajor(e){
    var schoolMajorValue = e.detail.value
    this.data.education[this.data.education.length - 1].schoolMajor = schoolMajorValue
  },
  bindSchoolDate(e) {
    console.log(e.currentTarget.dataset.pickerschoolindex)
    this.data.education[e.currentTarget.dataset.pickerschoolindex].schoolName
    this.data.education[e.currentTarget.dataset.pickerschoolindex].schoolMajor
    this.data.education[e.currentTarget.dataset.pickerschoolindex].schoolTextarea
    this.data.education[e.currentTarget.dataset.pickerschoolindex].schoolDate
    this.data.education[e.currentTarget.dataset.pickerschoolindex].schoolIndex == e.detail.value,
      this.setData({
        education: this.data.education,
      })
    console.log(this.data.education)
  },
  bindSchoolColumnChange(e) {
    this.data.education[e.currentTarget.dataset.pickerschoolindex].schoolIndex[e.detail.column] = e.detail.value
    console.log(this.data.education[e.currentTarget.dataset.pickerschoolindex].schoolIndex[e.detail.column])
  },
  getInputSchoolExperience(e){
    var schoolTextarea = e.detail.value
    this.data.education[this.data.education.length - 1].schoolTextarea = schoolTextarea
    console.log(this.data.education)
  },
  // 添加教育背景
  addEducation() {
    let that = this
    if (that.data.education.length<5){
      that.data.education.push({ schoolIndex: [0, 0], schoolName: "", schoolMajor: "", schoolDate: [startTime, endTime], schoolTextarea: "" }),
        that.setData({
          education: that.data.education,
          educationIndex: that.data.education.length
        })
    }else{
      wx.showToast({
        title: '最多添加5个',
        icon: "none"
      })
    }
  },
  deleteEducation(e) {
    let that = this
    if (that.data.education.length>1){
      that.data.education.splice(e.currentTarget.dataset.deleteschoolindex, 1)
      that.setData({
        education: that.data.education,
        educationIndex: that.data.education.length
      })
    }else{
      wx.showToast({
        title: '当前就一条不允许删除',
        icon: "none"
      })
    }
   
  },
  // 培训经历
  getInputTrainName(e){
    var trainNameValue = e.detail.value
    this.data.training[this.data.training.length - 1].trainName = trainNameValue
  },
  getInputTrainMajor(e) {
    var trainTextareaValue = e.detail.value
    this.data.training[this.data.training.length - 1].trainTextarea = trainTextareaValue
  },
  bindTrainDate(e) {
    this.data.training[ e.currentTarget.dataset.pickertrainindex].trainName
    this.data.training[ e.currentTarget.dataset.pickertrainindex].trainTextarea
    this.data.training[ e.currentTarget.dataset.pickertrainindex].trainDate
    this.data.training[ e.currentTarget.dataset.pickertrainindex].trainIndex == e.detail.value,
      this.setData({
        training: this.data.training,
      })
    console.log(this.data.training)
  },
  bindTrainColumnChange(e) {
    this.data.training[ e.currentTarget.dataset.pickertrainindex].trainIndex[e.detail.column] = e.detail.value
    console.log(this.data.training[ e.currentTarget.dataset.pickertrainindex].trainIndex[e.detail.column])
  },
  // 添加培训经历
  addTrain() {
    let that = this
    if (that.data.training.length<5){
      that.data.training.push({ trainIndex: [0, 0], trainName: "", trainTextarea: "", trainDate: [startTime, endTime] }),
        that.setData({
          training: that.data.training,
          trainingIndex: that.data.training.length
        })
    }else{
      wx.showToast({
        title: '最多添加5个',
        icon: "none"
      })
    }
   
  },
  deleteTrain(e) {
    console.log(111)
    let that = this
    if (that.data.training.length>1){
      that.data.training.splice(e.currentTarget.dataset.deletetrainindex, 1)
      that.setData({
        training: that.data.training,
        trainingIndex: that.data.training.length
      })
    }else{
      wx.showToast({
        title: '当前就一条不允许删除',
        icon: "none"
      })
    }
    
  },
  getInputcertificate(e){
    this.setData({
        getCertificate: e.detail.value
    })
  },
  getInputOther(e){
    this.setData({
        getOther: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 上传图片
  uploadImg() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
          wx.uploadFile({
            url: "https://data.xinxueshuo.cn/nsi-1.0/CommonApi/upload.do",
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: {
              type: "nsi-pc/ResumePortrait/",
              "file": res.tempFilePaths[0]
            },
            success: function (res) {
              // console.log(JSON.parse(res.data), '图片上传之后的数据')
              var data = JSON.parse(res.data)
              console.log(data.data.url)
              that.setData({
                imageUrl: data.data.url
              })
            }
          })
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

  },
submitForm() {
  // this.selectComponent('#form').validate((valid, errors) => {
  //   console.log('valid', valid, errors)
  //   if (!valid) {
  //     const firstError = Object.keys(errors)
  //     if (firstError.length) {
  //       this.setData({
  //         error: errors[firstError[0]].message
  //       })
  //     }
  //   } else {
        let that = this
        // 工作经历
        for(var i=0;i<that.data.work_experience_text.length;i++){
          if (that.data.work_experience_text[i].company==""){
            that.data.work_experience_text[i].company="0"
            that.data.work_experience_text[i].jobType= "0"
            that.data.work_experience_text[i].textarea= "0"
            that.data.work_experience_text[i].date = ["0","0"]
            that.data.work_experience_text[i].date.join(",")
            that.data.work_experience_text[i].date="0"
            console.log(that.data.work_experience_text[i].date)
          }else{
            that.data.work_experience_text[i].date = [new Date(that.data.work_experience_text[i].date[0][that.data.work_experience_text[i].multiIndex[0]]).getTime(), new Date(that.data.work_experience_text[i].date[0][that.data.work_experience_text[i].multiIndex[1]]).getTime()]
            that.data.work_experience_text[i].company
            that.data.work_experience_text[i].jobType
            that.data.work_experience_text[i].textarea
          }
          
        }
        for (var j = 0; j < that.data.work_experience_text.length; j++){
          delete that.data.work_experience_text[j].multiIndex
        }
        that.setData({
          work_experience_text: that.data.work_experience_text
        })
        console.log(that.data.work_experience_text)

        // 教育背景
        for (var i = 0; i < that.data.education.length; i++) {
          if (that.data.education[i].schoolName == "") {
            that.data.education[i].schoolName = "0"
            that.data.education[i].schoolMajor = "0"
            that.data.education[i].schoolTextarea = "0"
            that.data.education[i].schoolDate = ["0", "0"]
            that.data.education[i].schoolDate.join(",")
            that.data.education[i].schoolDate = "0"
            console.log(that.data.education[i].schoolDate)
          } else {
            that.data.education[i].schoolDate = [new Date(that.data.education[i].schoolDate[0][that.data.education[i].schoolIndex[0]]).getTime(), new Date(that.data.education[i].schoolDate[0][that.data.education[i].schoolIndex[1]]).getTime()]
            that.data.education[i].schoolName
            that.data.education[i].schoolMajor
            that.data.education[i].schoolTextarea
          }
          
        }
        for (var j = 0; j < that.data.education.length; j++) {
          delete that.data.education[j].schoolIndex
        }
        that.setData({
          education: that.data.education
        })
        // 培训经历
        for (var i = 0; i < that.data.training.length; i++) {
          if (that.data.training[i].trainName == "") {
            that.data.training[i].trainName = "0"
            that.data.training[i].trainTextarea = "0"
            that.data.training[i].trainDate = ["0", "0"]
            that.data.training[i].trainDate.join(",")
            that.data.training[i].trainDate = "0"
            console.log(that.data.training[i].trainDate)
          } else {
            that.data.training[i].trainDate = [new Date(that.data.training[i].trainDate[0][that.data.training[i].trainIndex[0]]).getTime(), new Date(that.data.training[i].trainDate[0][that.data.training[i].trainIndex[1]]).getTime()]
            that.data.training[i].trainName
            that.data.training[i].trainTextarea
          }
          
        }
        for (var j = 0; j < that.data.training.length; j++) {
          delete that.data.training[j].trainIndex
        }
        that.setData({
          training: that.data.training
        })
      console.log(that.data.training)
      console.log(that.data.education)
      wx.request({
        url: 'https://data.xinxueshuo.cn/nsi-1.0/newTalent/add.do',
        data: {
          avatar: that.data.imageUrl,
          username: that.data.getName, //姓名
          sex: that.data.getSex, //性别
          telphone: that.data.getMobile, //手机号
          userMail: that.data.getMail, //邮箱
          age: that.data.getAge, //年龄
          highEducation: that.data.accounts[that.data.accountIndex], //学历
          expreience: that.data.workYears[that.data.workYearsIndex], //工作年限
          profession: that.data.getProfession, //专业
          workplace: that.data.getworkPlace, //专业
          isPublic: that.data.isPublic, // 简历公开
          position: that.data.getpositionName, //期望职位
          salary: that.data.getSalary, //薪资要求
          expectedWork: that.data.getpositionCity, //城市
          entryTime: that.data.getEntryTime, //入职时间
          workExperience: JSON.stringify(that.data.work_experience_text), //工作经验
          education: JSON.stringify(that.data.education), //教育背景
          training: JSON.stringify(that.data.training), //培训经历
          certificate: that.data.getCertificate == "" ? "0" : that.data.getCertificate, //资格证书
          other: that.data.getOther == "" ? "0" : that.data.getOther, //其他要求
          // submitter: that.ruleForm.submitter //提交人邮箱
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res)
          wx.redirectTo({
             url:"../../pages/resume/resume?id="+res.data.data
          })
          // wx.showToast({
          //   title: '提交成功'
          // })
        }
      })
  //   }
  // })
},
back(){
  wx.switchTab ({
    url:"../../pages/school/schoolList/schoolList"
  })
}
})