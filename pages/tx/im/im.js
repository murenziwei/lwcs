export default class Lwconect{
  constructor(url,user,scope){
    this.url=url
    this.user=user;
    this.scope=scope;
    this._msglist=[];
    //连接ws
    this.wsTask = this._connectSocket();
    //监听ws连接打开
    this._socketOpen(scope);
    //监听ws接收
    this._socketMessage(scope);
    //监听ws打开失败
    this._socketError();

    //设置表情包
    this._trimfn();
  }
  _trimfn() {
    var arr = ["emoticon_001", "emoticon_002", "emoticon_003", "emoticon_004", "emoticon_005", "emoticon_007", "emoticon_008", "emoticon_009"];
    for (var i = 101; i <= 169; i++) {
      arr.push("b_emoticon_" + i);
    }
    for (var ii = 10; ii <= 69; ii++) {

      arr.push(("emoticon_0" + ii));
    }
    this.emoarr=arr;
  }
  _connectSocket(){
    return tt.connectSocket({
      url: this.url,
      header: {
        'content-type': 'application/json',
        'userid':this.user.avatarUrl,
        'nickname':this.user.nickName,
        'rejectUnauthorized':false
      },
      success:(res)=>{
        let dat = this.user;
        dat.nickname = this._fromCharCode(JSON.parse(dat.nickName));

        let my = { name: dat.nickname, img: dat.userid }

        this.scope.setData({
          status: true,my
        })
      },
      fail(){
        tt.showToast({
          title: '开启失败',
          icon:'none'
        })
        this.scope.setData({
          status:false
        })
      }
    })
  }
  _fromCharCode(arr){
    let str='';
    arr.forEach((v,i)=>{
      str+=String.fromCharCode(v)
    })
    return str;
  }
  _socketOpen(){
    //监听 WebSocket 连接打开事件
    this.wsTask.onOpen((res)=>{
      console.log(res,"onSocketOpen");
    })
  }

  _socketMessage(that){
    let msg,dat;
    this.wsTask.onMessage((res) => {
      //监听 WebSocket 接受到服务器的消息事件
      console.log(res, "onSocketMessage");
      msg=JSON.parse(res.data);
      dat=msg.data;
      switch (msg.type){
        case "login":
        //用户队列
        let cl=that.data.comeList;

        dat.nickname = this._fromCharCode(JSON.parse(dat.nickname));
        var my={
          img:dat.userid,
          name:dat.nickname
        }
        cl.push(my)
        that.setData({
          comeList:cl
        }); that.trimadd(my);break;
        case "myself":
        //消息队列
        that.setData({
          msgList:dat
        })
        ;break;
        case "sendMsg":
        //发送消息
        let msgList=that.data.msgList;
        msgList.push(dat);
        that.setData({
          msgList,
          strval:''
        })
            ; break;
        case "userlist":
          for(let i in dat){
            dat[i].nickname = this._fromCharCode(JSON.parse(dat[i].nickname))
          }
          that.setData({
            userstatus:true,
            users:dat
          })
            ; break;

      }
      
    })
  }

  _socketError() {
    this.wsTask.onError((res) => {
      //监听 WebSocket 连接打开失败
      console.log(res, "onSocketError");
      this.scope.setData({
        status:false
      })
    })
  }
  _sendSocketMessage(obj) {
    var dat;
    switch(obj.typ){
      case "userlist":
        var us=this.user;
        dat=us.avatarUrl
      ;break;
      default:

        this.user.content = obj.val;
        dat=this.user;
      ;
    }
    
    this.wsTask.send({
      data: JSON.stringify({type:obj.typ,data:dat}),
      success(res){

        console.log(res,"信息发送成功！");
      },
      fail(){

        switch (obj.typ) {
          case "userdel":
              ; break;
          default:

            tt.showToast({
              title: '发送失败',
              icon: 'none'
            })
            ;
        }
      }
    })
  }
}