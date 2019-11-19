const app = getApp()
var that;
Page({
  data: {
    tabArr:[
      "文本"
    ],
    tab:0,
    load:false,
    more_d:true,
    ww:'',
    hh:'',
    page:1,
    list:[
        [
      ],
      [
      ]
    ],
    pArr:[1,1],
    jkArr: ['two1', 'two1_s']
  },
  onLoad: function () {
    that=this;
    
    tt.getSystemInfo({
      success(res){
        console.log(res,"系统信息");
        that.setData({
          hh:res.windowHeight,
          ww:res.windowWidth
        })
      }
    })

    that.get_data();
  },
  ...{
    
    copyTBL(e) {
      var data = e.currentTarget.dataset.str;
      console.log(e, "这是？");
      tt.setClipboardData({
        data,
        success: function (res) {

          tt.showToast({
            title: '笑话已复制',
          })
        }
      });
    },
    updateOne(){
      var arr=that.data.list[that.data.tab]
      if(arr){
        if(arr.length==0){
          that.addfn();
        }
      }
    },
    get_data(){
      var nowda=new Date().getTime(),onda=new Date("2019/11/21").getTime();
      if(nowda>onda){
        let tabA=["文本","图片"];
        that.setData({
          tabArr:tabA
        })
      }
      
      that.updateOne();
    },
    addone(){
      if(that.data.pArr[that.data.tab]<=2){
        that.addfn();
      }
    },
    privfn(e){
      console.log(e);
      tt.previewImage({
        current:e.currentTarget.dataset.src,
        urls: [e.currentTarget.dataset.src]
      });
    },
    tabsfn(e){
      that.setData({
        tab:e.currentTarget.dataset.ind
      })
      
      this.updateOne();
    },
    addfn(){
      if(that.data.more_d){
        that.setData({
          load:true
        })
        let timeout=setTimeout(()=>{
          tt.showToast({
            title:"请求超时",
            icon:"none"
          })
          that.setData({
            load:false
          })
        },10000)
        let tab=that.data.tab;
        app.lw[that.data.jkArr[tab]]({page:that.data.pArr[tab]}).then((res)=>{
          clearTimeout(timeout);
          that.setData({
            load:false
          })
          if(res.showapi_res_code===0){
            var result=res.showapi_res_body.list;
            if(result.length===0){
              that.setData({
                more_d:false
              })
            }else{
              var list=that.data.list;
              that.data.pArr[tab]++;
              list[tab]=list[tab].concat(result);
              that.setData({
                list
              })
            }
          }else{
            
            tt.showToast({
              title:res.reason,
              icon:"none"
            })
          }
          console.log(res,"这个才是关键？");
        })
      }
    }
  },
  onShow(){
     this.setData({
       changes:Math.random()
     })
  }
})
