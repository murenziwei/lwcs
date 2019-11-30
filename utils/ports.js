const apiU=require('base');
const http=require('http');
console.log(http,"http");
function formatterDateTime() {
  var date=new Date()
  var month=date.getMonth() + 1
    var datetime = date.getFullYear()
            + ""// "年"
            + (month >= 10 ? month : "0"+ month)
            + ""// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + ""
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ""
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ""
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}
const lw={
    ran_img: () => {
        return http._get(apiU.xjh + "/random_img.php", {return:"json"});
    },
    two1: (data) => {
        //随机生成文本笑话
        if (typeof (data) === "object") {
        var obj = {
            ...data,
            showapi_sign: "f923a02c5627424fb5d23b9bdabb7c3b",
            showapi_appid: "105242",
            len: 20
        }
        return http._get(apiU.xz + "/341-5", obj);
        }
    },
    two1_s: (data) => {
        //随机生成图片笑话
        if (typeof (data) === "object") {
        var obj = {
            ...data,
            showapi_sign: "f923a02c5627424fb5d23b9bdabb7c3b",
            showapi_appid: "105242",
            len: 20
        }
        return http._get(apiU.xz + "/341-4", obj);
        }
    },
    one:(data)=>{
        if(typeof(data)==="object"){
            var obj={
                ...data,
                showapi_sign:"f923a02c5627424fb5d23b9bdabb7c3b",
                showapi_appid:"105242",
                maxResult:20
            }
            return http._get(apiU.xz+"/341-1",obj);
        }
    },
    one_s:(data)=>{
        if(typeof(data)==="object"){
            var obj={
                ...data,
                showapi_sign:"f923a02c5627424fb5d23b9bdabb7c3b",
                showapi_appid:"105242",
                maxResult:20
            }
            return http._get(apiU.xz+"/341-2",obj);
        }
    },
    mei_page:(data)=>{
        if(typeof(data)==="object"){
            var obj={
                ...data,
                showapi_sign:"f923a02c5627424fb5d23b9bdabb7c3b",
                showapi_appid:"105242",
                maxResult:2
            }
            return http._get(apiU.xz+"/852-2",obj);
        }
    },
    mei_list:(data)=>{
        //列出美图类型id
        if(typeof(data)==="object"){
            var obj={
                ...data,
                showapi_sign:"f923a02c5627424fb5d23b9bdabb7c3b",
                showapi_appid:"105242"
            }
            return http._get(apiU.xz+"/852-1",obj);
        }
    },
    two1_gif: (data) => {
        //随机生成动态笑话
        if (typeof (data) === "object") {
        var obj = {
            ...data,
            showapi_sign: "f923a02c5627424fb5d23b9bdabb7c3b",
            showapi_appid: "105242",
            len: 20
        }
        return http._get(apiU.xz + "/341-3", obj);
        }
    },
    ji_page: (data) => {
        //经典语录
        if (typeof (data) === "object") {
        var obj = {
            ...data,
            showapi_sign: "93a62d144ec1437cabcc104a26765806",
            showapi_appid: "118397"
        }
        return http._get(apiU.xz + "/1646-1", obj);
        }
    },
    two:(data)=>{
        if(typeof(data)==="object"){
            var obj={
                ...data,
                showapi_sign:"f923a02c5627424fb5d23b9bdabb7c3b",
                showapi_appid:"105242",
                needWeek:1,
                needTomorrow:1,
                needMonth:1
            }
            return http._get(apiU.xz+"/872-1",obj);
        }
    }
}

module.exports=lw;
