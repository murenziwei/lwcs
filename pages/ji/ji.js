const app = getApp()
var that;
Page({
  onShareAppMessage() { },
  data: {
    inputs:false,
    nh: 0,
    th: 46,
    type: 0,
    load: false,
    more_d: true,
    ww: '',
    hh: '',
    page: 1,
    list: [],
    name:''
  },
  onLoad: function (opt) {
    that = this;
    // that.setData({
    //   type: opt.id
    // })

    console.log(opt, "参数");
    tt.getSystemInfo({
      success(res) {
        console.log(res, "系统信息");
        that.setData({
          hh: res.windowHeight,
          ww: res.windowWidth,
          nh: res.statusBarHeight
        })

      }
    })
    
    that.addfn();
  },
  ...{
    searchfn(){
      if(this.data.name){
        this.setData({
          load:true,
          page:1,
          list:[],
          more_d:true
        })
        this.addfn();
      }else{
        tt.showToast({
          title:"搜索名字不能为空哦~",
          icon:"none"
        })
      }
    },
    inputfn(e){
      this.setData({
        name:e.detail.value
      })
    },
    focusfn(){
      this.setData({
        inputs:true
      })
    },
    blurfn() {
      this.setData({
        inputs: false
      })
    },
    copyTBL(e) {
      var data = e.currentTarget.dataset.str;
      tt.setClipboardData({
        data,
        success: function (res) {

          tt.showToast({
            title: '这一句已复制',
          })
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
    addone() {

      var list = that.data.list;
      list.push(list[0]);
      that.setData({
        list
      })
    },
    addfn() {
      if (that.data.more_d) {
        that.setData({
          load: true
        })
        let timeout = setTimeout(() => {
          tt.showToast({
            title: "请求超时",
            icon: "none"
          })
          that.setData({
            load: false
          })
        }, 10000)
        app.lw.ji_page({ name: that.data.name, page: that.data.page }).then((res) => {

          if (res.showapi_res_code === 0) {
            let result = res.showapi_res_body.result.contentlist;
            if (result.length === 0) {
              that.setData({
                more_d: false
              })
            } else {
              var list = that.data.list, page = that.data.page + 1;
              
              list = list.concat(result);
              that.setData({
                list,
                page
              })
            }

          } else {

            tt.showToast({
              title: res.reason,
              icon: "none"
            })
          }
          clearTimeout(timeout);
          that.setData({
            load: false
          })
          console.log(res, "这个才是关键？");
        })
      }
    }
  },
  onShow() {

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  }
})
