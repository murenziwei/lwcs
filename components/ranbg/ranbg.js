// components/ranbg/ranbg.js
let lw = require('../../utils/ports');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    changeS:{
      
      // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      type: String,

      // 属性初始值（可选），如果未指定则会根据类型选择一个
      value: '',

      // 属性被改变时执行的函数（可选），也可以写成在 methods 段中定义的方法名字符串, 如：'_propertyChange'
      observer: function(newVal, oldVal, changedPath) {
         // 通常 newVal 就是新设置的数据， oldVal 是旧数据
         console.log("会触发吗？");
         this.go_update();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    strtime:'',
    count:0,
    str:`
    李伟初始在QQ、微信、支付宝、头条小程序已经上线，俺再也不用担心你找不到我了
    `,
    strArr: ["李伟初始在QQ、微信、支付宝、头条小程序已经上线，俺再也不用担心你找不到我了"],
    strSt:false,
    listS:false,
    rSta:false,

    bgtest:["//murenziwei.github.io/images/lwcs/tz/p0.jpg","//murenziwei.github.io/images/lwcs/tz/p1.jpg","//murenziwei.github.io/images/lwcs/tz/p2.jpg","//murenziwei.github.io/images/lwcs/tz/p3.jpg","//murenziwei.github.io/images/lwcs/tz/p4.jpg"],
    
    menu:[
      {
        icon:"/style/qq-o.png",
        text:"‘2309485575’猛点俺可复制",
        val:"2309485575"
      },

      {
        icon: "/style/wx-o.png",
        text: "‘murenziweiyirichen’猛点俺可复制",
        val: "murenziweiyirichen"
      },
    ],
    bgua: [],
    bgu:'//murenziwei.github.io/images/lwcs/tz/p0.jpg'
  },
  attached(){
    
      var nowda=new Date().getTime(),onda=new Date("2020/1/5").getTime();
      if(nowda>onda){
        tt.request({
          url: 'https://murenziwei.github.io/images/lwcs/tong.text', // 目标服务器url
          success: (res) => {
            if(res.statusCode==200){
              var arr=res.data,str='';
              for(var i of arr){
                str+=String.fromCharCode(i);
              }
              if(str){
                var strArr=JSON.parse(str);
                this.setData({
                  strArr
                })
              }
            }
          }
        });
      }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    bgufn() {
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
                      
                      tt.navigateTo({
                        url: '/pages/tx/tx',
                      })
                    }
                  }
                });
              }else{

                tt.navigateTo({
                  url: '/pages/tx/tx',
                })
              }
            }
          })
        },
        fail(res) {
          console.log(`login调用失败`);
        }
      });
    },
    go_update(){

      // 页面被展示
      var nowda = new Date().getTime(), onda = new Date("2020/1/5").getTime();
      if (nowda > onda) {
        this.setData({
          show: true
        })
        
      }
      let bgua = this.data.bgua,len=bgua.length;
      if(len>=3){
        var count=Math.floor(Math.random()*len);
        this.setData({
          bgu:bgua[count]
        })
      }else{
        if(nowda > onda){
          lw.ran_img().then((res) => {
            console.log(res, "不敢当no");
            if (res.img) {
              bgua.push(res.img);
              this.setData({
                bgu: res.img
              })
            }else{
              var na=this.data.bgtest;
              
              var num=Math.floor(Math.random()*na.length);
              this.setData({
                bgua:na,
                bgu:na[num]
              })
            }
          })
        }else{
          
              var na=this.data.bgtest;
              
              var num=Math.floor(Math.random()*na.length);
              this.setData({
                bgua:na,
                bgu:na[num]
              })
        }
      }
      clearInterval(this.data.strtime);
      this.data.strtime=setInterval(()=>{
        if(this.data.strSt){

          var len = this.data.strArr.length;
          this.setData({
            str: this.data.strArr[Math.floor(Math.random() * len)]
          });
        }
      },3000)


        if(nowda > onda){
          lw.ran_img().then((res) => {
            console.log(res, "不敢当no");
            if (res.img) {
              bgua.push(res.img);
              this.setData({
                bgu: res.img
              })
            }else{
              var na=this.data.bgtest;
              
              var num=Math.floor(Math.random()*na.length);
              this.setData({
                bgua:na,
                bgu:na[num]
              })
            }
          })
        }else{
          
              var na=this.data.bgtest;
              
              var num=Math.floor(Math.random()*na.length);
              this.setData({
                bgua:na,
                bgu:na[num]
              })
        }
    },
    openStr(){
      this.setData({
        strSt:!this.data.strSt
      })
    },
    getdata(){
      tt.request({
        url: '',
      })
    },
    zhefn(){
      //阻止事件
    },
    ropfn(e){
      var bol=e.currentTarget.dataset.val;
      this.setData({
        rSta:bol
      })
    },
    copyTBL(e) {
      console.log(e,"买妈咪");
      var data = e.currentTarget.dataset.str;
      console.log(data,"这是？");
      tt.setClipboardData({
        data,
        success: function (res) {
          
          tt.showToast({
            title: '复制成功',
          })
        }
      });
    },

    menuOp(e){
      var menu=this.data.menu,ind=e.currentTarget.dataset.ind;
      console.log(menu,ind);
      menu[ind].ishid=!menu[ind].ishid;
      this.setData({
        menu
      })
    },
    listOp(){
      this.setData({
        listS:!this.data.listS
      })
    },

    codesave(e) {
      var bg = e.currentTarget.dataset.bg;
      console.log(bg);
      tt.previewImage({
        urls: [bg]
      })
    },
    bgsave(e){
      var bg = 'https:' +e.currentTarget.dataset.bg;
      console.log(bg);
      tt.previewImage({
        urls: [bg]
      })
    }
  }
})
