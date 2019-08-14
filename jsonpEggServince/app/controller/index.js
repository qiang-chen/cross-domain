const {Controller}=require("egg");

class Index extends Controller{
     api(ctx){
         const query=ctx.request.query;
         //设置跨域处理
         //Access-Control-Allow-Origin
         
        ctx.body={
            code:11,
            type:"egg返回的jsonp请求",
            query
        }
    }
}

module.exports=Index;