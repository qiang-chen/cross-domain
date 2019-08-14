const {Controller}=require("egg");

class Index extends Controller{
     api(ctx){
        ctx.body={
            code:11,
            type:"egg返回的jsonp请求"
        }
    }
}

module.exports=Index;