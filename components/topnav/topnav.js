Component({
    properties: {

        lwFont: {
          type: String,
          value: ''
        },
        lwTitle:{
            type:String,
            value:'李伟初始',
            observer: function(){}
        },

        isShow:{
            type:Boolean,
            value:false
        },
        lwColor:{
            type:String,
            value:'#000'
        },
        
        bgColor:{
            type:String,
            value:'#fff'
        },
        lwTar:{
            type:Boolean,
            value:false
        },
        canhome:{
            type:Boolean,
            value:true
        }
    },
    data: {
        nh:0,
        th:46,
        canback:false
    },
    methods: {
        navTab(){
            tt.reLaunch({
                url: '/pages/home/home'
            });
        },
        navback(){
            tt.navigateBack({
                delta: 1
            });
        },
        can_back(){
            this.setData({
                canback:(getCurrentPages().length>1)
            })
        },
        can_bar(){
            

        }
    },
    created: function(){

    },
    attached: function(){
        //计算顶部导航栏的高度
        tt.getSystemInfo({
            success: res => {
                //导航高度
                this.setData({
                    nh:res.statusBarHeight
                })
                
                this.data.lwTar&&tt.setNavigationBarColor({
                    frontColor: '#ffffff',
                    backgroundColor: '#000000',
                    animation: {
                        duration: 0,
                        timingFunc: 'linear'
                    }
                });

            }, fail(err) {
                console.log(err);
            }
        })

    },
    ready: function(){
        //组件生命周期函数-在组件实例被移动到节点树另一个位置时执行)
        this.can_back();
    },
    moved: function(){
    },
    detached: function(){

    },
});