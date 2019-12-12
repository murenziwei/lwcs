// pages/xingz/xingz.js
var that;
Page({
  data: {
    ww:'',
    hh:'',
    list: [
      {
        name: "白羊座",
        cn: "baiyang",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041036388432807_1.jpg"
      },
      {
        name: "金牛座",
        cn: "jinniu",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041038218432807_2.jpg"
      },
      {
        name: "双子座",
        cn: "shuangzi",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041043398432807_3.jpg"
      },
      {
        name: "巨蟹座",
        cn: "juxie",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041043578432807_4.jpg"
      },
      {
        name: "狮子座",
        cn: "shizi",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041044118432807_5.jpg"
      },
      {
        name: "处女座",
        cn: "chunv",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041044238432807_6.jpg"
      },
      {
        name: "天秤座",
        cn: "tiancheng",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041044408432807_7.jpg"
      },
      {
        name: "天蝎座",
        cn: "tianxie",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041044538432807_8.jpg"
      },
      {
        name: "射手座",
        cn: "sheshou",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041045108432807_9.jpg"
      },
      {
        name: "摩羯座",
        cn: "mojie",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041045368432807_10.jpg"
      },
      {
        name: "水瓶座",
        cn: "shuiping",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041046008432807_11.jpg"
      },
      {
        name: "双鱼座",
        cn: "shuangyu",
        url: "https://images.cnblogs.com/cnblogs_com/murenziwei/1605443/o_1912041046238432807_12.jpg"
      }
    ]
  },
  onLoad: function (options) {
    that=this;
    tt.getSystemInfo({
      success(res){
        console.log(res,"不得了");
        that.setData({
          ww:res.windowWidth,
          hh:res.windowHeight
        })
      }
    });
  },
  
  onShow(){
    
     this.setData({
       changes:Math.random()
     })
  }
})