
let lw = require('../../utils/ports');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    src:'http://65.ierge.cn/14/215/431474.mp3?v=0524',
    duration:0,
    dText:'--:--',
    cText:'00:00',
    slv:0,
    slmax:0,
    isopen:false,
    conopen:false,
    mucS:true,
    muc: {
      artistsname: "Olly Murs",
      name: "That Girl",
      picurl: "http://p1.music.126.net/5HEwV-KwHoazXJ2CAHy1XA==/18259589602949147.jpg",
      url: "https://music.163.com/song/media/outer/url?id=440208476.mp3"
    },
    show:false
  },

  ready(){
    var that=this;
    var nowda = new Date().getTime(), onda = new Date("2019/12/25").getTime();
      if (nowda > onda) {
        this.setData({
          show: true
        })
        
        this.innerAudioContext = tt.createInnerAudioContext()
        // 循环播放
        this.innerAudioContext.loop = true;

        // 自动播放
        this.innerAudioContext.autoplay = false;
        this.innerAudioContext.src=this.data.muc.url;
        this.que_muc();
        this.innerAudioContext.onCanplay((data) => {
          console.log(that.innerAudioContext.duration);
        })
        
        this.innerAudioContext.onTimeUpdate(() => {
          
          var currentTime = that.innerAudioContext.currentTime, duration = that.innerAudioContext.duration;
          // console.log(currentTime,"我能拿到吗？", duration);
          
          
          var intT=Math.floor(currentTime);

          var min=(Math.floor(intT/60));
          var sce=intT-(60*min);
          if(min<10){
            min="0"+min;
          }
          if(sce<10){
            sce="0"+sce
          }
          var cText=min+":"+sce;
          this.setData({
            currentTime,cText,slv:intT
          })
          // if(that.data.duration!=duration){
          //   that.setData({
          //     duration
          //   })
          // }
          
        })
        this.innerAudioContext.onPlay((res)=>{
          console.log(res,"开始播放");
          that.setData({
            isopen:true
          })
          
          
        })
        this.innerAudioContext.onPause((res) => {
          console.log(res, "暂停播放");
          that.setData({
            isopen: false
          })


        })
        this.innerAudioContext.onError(()=>{
          tt.showToast({
            title:"亲！歌曲坏掉了，切歌吧~~",
            icon:'none'
          })
        })
      }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    que_muc() {
      tt.showLoading({
        title: '请稍候~~',
      })
      let timeout=setTimeout(()=>{
        tt.hideLoading();
        clearTimeout(timeout);
      },10000)
      var that=this;
      // 切歌
      lw.uomg_music().then((res) => {
        
        tt.hideLoading();
        clearTimeout(timeout);
        console.log(res, "获取音乐");
        if (res.code == 1) {
          this.innerAudioContext.pause();
          var muc=res.data;
          this.setData({
            muc,isopen:false
          })
          this.innerAudioContext.src=muc.url.replace("http:","https:");
          console.log(muc.url.replace("http:","https:"));
        } else {
          
          tt.showToast({
            title:"亲！歌曲坏掉了，切歌吧~~",
            icon:'none'
          })
        }
      })
    },
    showMuc() {
      this.setData({
        mucS: !this.data.mucS
      })
    },
    //开始音频
    playfn(){
      this.innerAudioContext.play();
    },
    //暂停音频
    pausefn(){
      this.innerAudioContext.pause();
    },
    
    drawfn(e){
      console.log(this.data.isopen);
      this.setData({
        currentTime:e.detail.value
      })
      if(this.data.isopen){
        this.innerAudioContext.pause();
        this.setData({
          conopen:true
        })
      }
    },
    drawEnd(e) {
      this.innerAudioContext.seek(e.detail.value);
      this.setData({
        currentTime: e.detail.value
      })
      if(this.data.conopen){
        this.innerAudioContext.play();
        this.setData({
          
          conopen: false
        })
      }else{
        this.innerAudioContext.pause();
      }
    }

  }
})
