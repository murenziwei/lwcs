const app = getApp()
var that;
Page({
  data: {
    load:false,
    more_d:true,
    ww:'',
    hh:'',
    page:1,
    list:[
      {
        content: "今天早上和老弟正玩着呢，突然接到老爸的电话，说他鞋子坏了让我们给他送鞋子去，老弟说可以，不过你要给一百块小费!老爸很爽快的答应了，等到地方，老爸接过鞋子，原本笑眯眯的脸色立马就变了，拿着鞋子冲着老弟就招呼过去了，边招呼边说：“我让你坑爹，我让你坑爹。"
        ,hashId: "90B182FC7F74865B40B1E5807CFEBF41"
        ,unixtime: 1418745227
        ,updatetime: "2019-09-19 18:10:47"
      },
      {      
        content: "有位大爷去人民银行取*，直接走到窗口，保安过来说：“大爷，按号。” 大爷：“啥?” 保安：“按号。” 大爷心想，不愧是大银行呀，取个*还要暗号，于是低声对保安说：“天王盖地虎。” 保安无奈的帮老爷子按出一张排队票，老爷子心想：吓*我了，居然被我蒙对了!!"
        ,hashId: "206F5C52FD2ED94772CBC66C8AC61F2A"
        ,unixtime: 1418745227
        ,updatetime: "2019-09-19 18:11:55"
      },
      {      
        content: "某公司招聘员工，几百名大学生争相自报家门：“我北大”“我交大”“我浙大”突然有一女生喊道：“我胸大!”董事长一拍桌子说：“就是你了!”"
        ,hashId: "B36BF69DC3B622BD8A4F5A7740C31806"
        ,unixtime: 1418745227
        ,updatetime: "2019-09-19 18:12:22"
      },
      {    
        content: "到银行汇款，车临时停路边上。为了怕交警罚就把朋友留下看车，跟他说有查车的过来了告诉我一声，进去几分钟果然有交警来了，那个朋友风风火火地闯进银行大声吼到：大哥，警察来了，快走啊！尼玛，偌大的一个大厅几十号人，顷刻间寂静无声，然后人潮像洪水一样涌出银行，接着我就被五六个保安按在了地上...真他妈冤！不怕神一样的对手，就怕猪一样的队友！"
        ,hashId: "CC93180C3C0BA4C291A2CF88B6A28A3A"
        ,unixtime: 1418745227
        ,updatetime: "2019-09-19 23:53:47"
      }
    ]
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

  },
  ...{
    addone(){
      
      var list=that.data.list;
      list.push(list[0]);
      that.setData({
        list
      })
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
        app.lw.one({page:that.data.page}).then((res)=>{
          clearTimeout(timeout);
          that.setData({
            load:false
          })
          if(res.error_code===0){
            var result=res.result.data;
            if(result.length===0){
              that.setData({
                more_d:false
              })
            }else{
              var list=that.data.list,page=that.data.page+1;
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
          console.log(res,"这个才是关键？");
        })
      }
    }
  }
})
