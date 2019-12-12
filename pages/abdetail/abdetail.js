const app = getApp()
var that;
Page({
  data: {
    type:0,
    load:false,
    more_d:true,
    ww:'',
    hh:'',
    page:1,
    list:[
    ]
  },
  onLoad: function (opt) {
    that=this;
    that.setData({
      type:opt.id
    })

    console.log(opt,"参数");
    tt.getSystemInfo({
      success(res){
        console.log(res,"系统信息");
        that.setData({
          hh:res.windowHeight,
          ww:res.windowWidth
        })

      }
    })

  },
  onReady(){
    that.addfn();
  },
  ...{
    privfn(e){
      console.log(e);
      tt.previewImage({
        current:e.currentTarget.dataset.src,
        urls: [e.currentTarget.dataset.src]
      });
    },
    addone(){
      if(that.data.page<=2){
        that.addfn();
      }
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
        app.lw.mei_page({type:that.data.type,page:that.data.page}).then((res)=>{
          
          if(res.showapi_res_code===0){
            let result=res.showapi_res_body.pagebean.contentlist;
            if(result.length===0){
              that.setData({
                more_d:false
              })
            }else{
              var list=that.data.list,page=that.data.page+1;
              for(let i=0;i<result.length;i++){
                if(result[i].list.middle){

                    var obj=result[i].list;
                    result[i].list=[obj]
                }else{

                    for(let ii=0;ii<result[i].list.length;ii++){
                      if(/www.zj005.com/.test(result[i].list[ii].middle)){
                        result[i].list[ii].middle=result[i].list[ii].middle.replace("http:","https:");
                      }
                    }
                }
              }
              list=list.concat(result);
              that.setData({
                list,
                page
              })
            }

          }else{
            
            tt.showToast({
              title:res.reason,
              icon:"none"
            })
          }
          clearTimeout(timeout);
          that.setData({
            load:false
          })
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
