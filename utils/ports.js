const apiU=require('base');
const http=require('http');
console.log(http,"http");

const lw={
    one:(data)=>{
        if(typeof(data)==="object"){
            var time=Math.floor(new Date().getTime()/1000);
            var obj={
                ...data,
                key:"e0b8a2b3ab42c3360111bfe74dd48d1a",
                time,
                sort:"desc",
                pagesize:20
            }
            return http._get(apiU.joke+"/joke/content/list.php",obj);
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
