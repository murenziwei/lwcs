function _get(url,data){
    return new Promise((succ,error)=>{
        tt.request({
            url, // 目标服务器url
            data,
            success: (res) => {
                res.statusCode===200?succ(res.data):error(res);
            },
            fail(err){
                error(err);
            }
        });
    })
}
function _post(url,data){
    return new Promise((succ,error)=>{
        tt.request({
            url, // 目标服务器url
            data,
            success: (res) => {
                res.statusCode===200?succ(res.data):error(res);
            },
            fail(err){
                error(err);
            }
        });
    })
}

module.exports={
    _get,_post
}