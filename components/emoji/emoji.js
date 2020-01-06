// components/emoji/emoji.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      data:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  ready(){
    // this.trimfn();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickfn(eve){
      console.log(eve);
      var obj=eve.currentTarget.dataset;
      this.triggerEvent('comsend',obj)
    },
    trimfn(){
      var arr = ["emoticon_001", "emoticon_002", "emoticon_003", "emoticon_004", "emoticon_005", "emoticon_007", "emoticon_008", "emoticon_009"];
      for (var i = 101; i <= 169; i++) {
        arr.push("b_emoticon_"+i);
      }
      for (var ii = 10; ii <= 69; ii++) {
        
        arr.push(("emoticon_0" +ii));
      }
      this.setData({
        list:arr
      })
    }
  }
})
