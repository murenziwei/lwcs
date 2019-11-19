// pages/allbut/allbut.js
const app=getApp();
var that;
Page({
  data: {
    con:[
      {
        "name": "生活趣味",
        "list": [
          {
            "id": 6006,
            "name": "植物花卉"
          }
        ]
      }
    ]
  },
  onLoad: function (options) {
    that=this;
    that.get_data();
    // that.go_list();
  },
  ...{
    get_data(){
      var nowda=new Date().getTime(),onda=new Date("2019/11/21").getTime();
      if(nowda>onda){
        let con=[
          {
            "name": "社会百态",
            "list": [
              {
                "id": 1001,
                "name": "社会新闻"
              },
              {
                "id": 1002,
                "name": "国内新闻"
              },
              {
                "id": 1003,
                "name": "环球动态"
              },
              {
                "id": 1004,
                "name": "摄影收藏"
              }
            ]
          },
          {
            "name": "明星写真",
            "list": [
              {
                "id": 2001,
                "name": "中国明星"
              },
              {
                "id": 2002,
                "name": "欧美明星"
              },
              {
                "id": 2003,
                "name": "中国女明星"
              },
              {
                "id": 2004,
                "name": "中国男明星"
              },
              {
                "id": 2005,
                "name": "韩国明星"
              },
              {
                "id": 2006,
                "name": "欧美女明星"
              },
              {
                "id": 2007,
                "name": "欧美男明星"
              }
            ]
          },
          {
            "name": "美女图片",
            "list": [
              {
                "id": 4001,
                "name": "清纯"
              },
              {
                "id": 4002,
                "name": "气质"
              },
              {
                "id": 4003,
                "name": "萌女"
              },
              {
                "id": 4004,
                "name": "校花"
              },
              {
                "id": 4005,
                "name": "婚纱"
              },
              {
                "id": 4006,
                "name": "街拍"
              },
              {
                "id": 4007,
                "name": "非主流"
              },
              {
                "id": 4008,
                "name": "美腿"
              },
              {
                "id": 4009,
                "name": "性感"
              },
              {
                "id": 4010,
                "name": "车模"
              },
              {
                "id": 4011,
                "name": "男色图片"
              },
              {
                "id": 4012,
                "name": "模特美女"
              },
              {
                "id": 4013,
                "name": "美女魅惑"
              },
              {
                "id": 4014,
                "name": "日韩美女"
              }
            ]
          },
          {
            "name": "时尚伊人",
            "list": [
              {
                "id": 5001,
                "name": "秀场"
              },
              {
                "id": 5002,
                "name": "霓裳"
              },
              {
                "id": 5003,
                "name": "鞋包"
              },
              {
                "id": 5004,
                "name": "婚嫁"
              },
              {
                "id": 5005,
                "name": "妆容"
              },
              {
                "id": 5006,
                "name": "广告大片"
              }
            ]
          },
          {
            "name": "生活趣味",
            "list": [
              {
                "id": 6001,
                "name": "居家"
              },
              {
                "id": 6002,
                "name": "萌宠"
              },
              {
                "id": 6003,
                "name": "美食图片"
              },
              {
                "id": 6005,
                "name": "奇趣自然"
              },
              {
                "id": 6006,
                "name": "植物花卉"
              }
            ]
          }
        ];
        that.setData({
          con:con
        })
      }
    },
    go_list(){
      
        tt.showLoading({
          title: '加载中···'
        });
        let timeout=setTimeout(()=>{
          tt.showToast({
            title:"请求超时",
            icon:"none"
          })
          tt.hideLoading();
        },10000)
        app.lw.mei_list({}).then((res)=>{
          clearTimeout(timeout);
          tt.hideLoading();
          if(res.showapi_res_code===0){
            var result=res.showapi_res_body.list;
            that.setData({
              con:result
            })
          }else{
            
            tt.showToast({
              title:res.reason,
              icon:"none"
            })
          }
          console.log(res,"这个才是关键？");
        })
    }
  },
  onShow(){
    
     this.setData({
       changes:Math.random()
     })
  }
})