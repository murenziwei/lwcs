// pages/tx/tx.js
import Lwconect from './im/im.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[],
    msgList:[],
    comeList:[],
    ww:320,
    hh:568,
    oemo:false,
    strval:'',
    cur:-1,
    my:{img:''},
    emoarr:[],
    newList:[],
    lact:-1,
    ract:-1,
    status:false,
    userstatus:false,

    bgtest: ["//murenziwei.github.io/images/lwcs/tz/p0.jpg", "//murenziwei.github.io/images/lwcs/tz/p1.jpg", "//murenziwei.github.io/images/lwcs/tz/p2.jpg", "//murenziwei.github.io/images/lwcs/tz/p3.jpg", "//murenziwei.github.io/images/lwcs/tz/p4.jpg"],
    bgua: [],
    bgu: '//img.xjh.me//desktop//img//62062343_p0.jpg'
  },
  ...{
    opensco(){
      var that=this;
      tt.login({
        success(res) {
          tt.getSetting({
            success(res){
              if(!res.authSetting["scope.userInfo"]){
                tt.authorize({
                  scope: "scope.userInfo",
                  success(res) {
                    // 用户同意授权用户信息
                    if(res.data["scope.userInfo"]=="ok"){
                      that.usemyfn();
                    }
                  }
                });
              }else{
                that.usemyfn();
              }
            }
          })
        },
        fail(res) {
          console.log(`login调用失败`);
        }
      });
    },
    privfn(e) {
      console.log(e);
      tt.previewImage({
        current: e.currentTarget.dataset.src,
        urls: [e.currentTarget.dataset.src]
      });
    },
    openuser(){
      this.con._sendSocketMessage({ typ: "userlist" });
    },
    deluser(){
      this.con._sendSocketMessage({ typ: "userdel" });
    },
    bgfn(){

      let bgua = this.data.bgua, len = bgua.length;
      if (len >= 3) {
        var count = Math.floor(Math.random() * len);
        this.setData({
          bgu: bgua[count]
        })
      } else {
          app.lw.ran_img().then((res) => {
            console.log(res, "不敢当no");
            if (res.img) {
              bgua.push(res.img);
              this.setData({
                bgu: res.img
              })
            } else {
              var na = this.data.bgtest;

              var num = Math.floor(Math.random() * na.length);
              this.setData({
                bgua: na,
                bgu: na[num]
              })
            }
          })
      }
    },

    usemyfn(){
      var that=this;
      tt.getUserInfo({
        success(res){
          console.log(res,"获取用户信息");
          that.bgufn({
            detail:{
              userInfo:res.userInfo
            }
          })
        },
        fail(){
          that.setData({
            status:false
          })
        }
      })
    },

    trimadd(my){

      var nl = this.data.newList, nlen = nl.length;
      nl.push(my)
      this.setData({
        newList: nl,
        ract: nlen
      })

      setTimeout(() => {
        this.setData({ ract: nlen })
        setTimeout(()=>{
          this.testdel();
        },4000)
      }, 500)
    },
    testdel(){
      var nl = this.data.newList;
      if(nl.length){
        var nl = this.data.newList;
        this.setData({
          lact:0
        })
        setTimeout(()=>{

          nl.shift();
          this.setData({ newList: nl,lact:-1})
        },500)
      }

    },
    testadd(){
      var nl=this.data.newList,nlen=nl.length;
      nl.push(2)
      this.setData({
        newList:nl,
        ract:nlen
      })

      setTimeout(() => {
        this.setData({ ract: nlen })
      }, 500)
    },
    trimfn() {
      var arr = ["emoticon_001", "emoticon_002", "emoticon_003", "emoticon_004", "emoticon_005", "emoticon_007", "emoticon_008", "emoticon_009"];
      for (var i = 101; i <= 169; i++) {
        arr.push("b_emoticon_" + i);
      }
      for (var ii = 10; ii <= 69; ii++) {

        arr.push(("emoticon_0" + ii));
      }
      
      this.setData({
        emoarr:arr
      })
    },
    addemo(dat){
      console.log(dat,"请求");
      var cur=this.data.cur,str=this.data.strval,obj=dat.detail;
      if(cur>-1){
        var one = str.substring(0, cur), two = str.substring(cur);
        str = (one + obj.src + two)
      }else{
        str+=obj.src;
      }
      this.setData({
        strval: str
        
      })
    },
    closeuser(){
      this.setData({
        userstatus:false
      })
    },
    stopfn(){},
    openemo(){
      this.setData({
        oemo:!this.data.oemo
      })
    },
    inputfn(re) {
      this.data.strval = re.detail.value;
    },
    blurfn(re) {
      this.data.cur = re.detail.cursor;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    tt.getSystemInfo({
      success(res) {
        console.log(res,"加急");
        that.setData({
          ww:res.windowWidth,
          hh:res.windowHeight
        })
      },
    })

    //设置表情
    this.trimfn();

    //连接wss
    this.usemyfn();
  },
  bgufn(user){
    
    var data = user.detail.userInfo,narr=[]
    
    for(let i of data.nickName){
      narr.push(String(i).charCodeAt())
    }
    data.nickName=JSON.stringify(narr);
    // free.idcfengye.com:10293
    // www.naluoxiu.com:29150
    this.con = new Lwconect("wss://www.naluoxiu.com:8001",data,this);
  },
  sendfn(res){
    var str=this.data.strval;
    if(str){

      this.con._sendSocketMessage({ val: this.setContent(str), typ: ("sendMsg") });
    }else{
      tt.showToast({
        title:"亲！消息不能为空~",
        icon:'none'
      })
    }
  },

  setContent(str) {
    var arr = this.data.emoarr, newS = str;
    console.log(arr,"为什么不起作用？");
    arr.forEach((v, i) => {
      if(str.indexOf("["+v+"]")>-1){

        var reg = new RegExp(("\\[" + v + "\\]"), "g");
        console.log(reg);
        newS = newS.replace(reg, "<img class='cb_img' src='http://mrzw_bk.naluoxiu.com/img/emo/" + v + ".png' />")
      }
    })
    console.log(newS, "这是？");
    return newS;
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
    this.bgfn();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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