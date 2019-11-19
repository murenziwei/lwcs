// pages/ad/ad.js
Page({
  data: {
    adarr:[
      {
        id:"14glac803bnkf3f96f"
      },
      {
        id:"7q8l5q4f0qh8splse6"
      },
      {
        id:"39aobo0qn87cfkhh3c"
      },
      {
        id:"52f4f7s7nvq16agbea"
      }
    ]
  },
  onLoad: function (options) {

  },
  ...{
    loadfn(e){
      console.log(e,"加载完成");
    },
    errorfn(e){
      console.log(e,"插入广告失败");
    }
  }
})