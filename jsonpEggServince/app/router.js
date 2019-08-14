module.exports=app=>{
    const {router,controller}=app;
    const jsonp = app.jsonp();
    router.get("/api",jsonp,controller.index.api)

    //注意不要写成下面这种
    // const {jsonp}=app;
    // router.get("/api",jsonp(),controller.index.api)
}