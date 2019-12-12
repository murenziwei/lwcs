// pages/xzdata/xzdata.js
var that;
Page({
  data: {
    title:"运势",
    load:false,
    day:{

    },
    tom:{},
    mon:{},
    user:{
      "name": "狮子座",/*星座名称*/
      "datetime": "2014年06月27日",/*日期*/
      "date": 20140627,
      "all": "89%", /*综合指数*/
      "color": "古铜色", /*幸运色*/
      "health": "95%", /*健康指数*/
      "love": "80%",/*爱情指数*/
      "money": "84%",/*财运指数*/
      "number": 8,/*幸运数字*/
      "QFriend": "处女座",/*速配星座*/
      "summary": "有些思考的小漩涡，可能让你忽然的放空，生活中许多的细节让你感触良多，五味杂陈，常常有时候就慢动作定格，想法在某处冻结停留，陷入一阵自我对话的沉思之中，这个时候你不喜欢被打扰或询问，也不想让某些想法曝光，个性变得有些隐晦。",/*今日概述*/
      "work": "80%"/*工作指数*/
    },
    ww:'',
    hh:'',
    imgw:0,imgh:0,imgx:0,imgy:0,
    imgsrc:'',
    consName:'',
    imgload:false,isget:false,
    nh:'',
    th:46
  },
  onLoad: function (options) {

    that=this;
    
    that.setData({
      imgsrc:options.img,
      consName:options.consName,
      title:(options.name||'暂无')
    })
    
    tt.getSystemInfo({
      success(res){
        console.log(res,"不得了");
        var ww=res.screenWidth,hh=res.screenHeight;
        that.setData({
          ww,
          hh,
          nh: res.statusBarHeight
        })
        
        

        var bili = 1024 / 768;
        var imgh = hh, imgw = hh * bili;
        var imgx = (ww - imgw) / 2, imgy = (hh - imgh) / 2;
        that.setData({
          imgh, imgw, imgx, imgy, isget: true
        })
        if (that.data.imgload) {
          that.setData({
            load: true
          })
        }
        
        setInterval(()=>{
          that.setData({
            ani:that.data.ani?false:true
          })
        },11000)
      }
    });

  },
  ...{
    loadfn(){
      getApp().lw.two({star:that.data.consName}).then((res)=>{
        
      
        console.log(res,"我们的永远");
        that.setData({
          imgload:true
        })
        if(that.data.isget){
          that.setData({
            load:true
          })
        }
        if(res.showapi_res_code===0){
          var result=res.showapi_res_body;      
          that.setData({
            user:result.week,
            day:result.day,
            tom:result.tomorrow,
            mon:result.month
          })
            
        }else{
          
          tt.showToast({
            title:"请求错误！",
            icon:"none"
          })
        }
        console.log(res,"这个才是关键？");
      })
    },
    backnav(){
      tt.navigateBack({
        delta:1
      })
    }
  }
})