var express = require('express');

const url = require("url")

var router = express.Router();

const bodyParser=require("body-parser")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


router.get("/api", (req, res, next) => {
  
  //将script标签的src的URL请求转成对象
  const opj = url.parse(req.url, true).query;
  //然后原理就是调用这个回调函数来进行传参
  let {
    callback
  } = opj;
  //如果这个回调函数存在证明是jsonp请求
  if (callback) {
    //只能和end返回搭配使用  send不可以
    // res.writeHead(200, {
    //   'Content-Type': 'text/javascript'
    // });
    let resault = JSON.stringify({
      code: 1,
      msg: "express框架传回去jsonp的参数",
      query:req.query
    });
    res.send(`${callback}(${resault})`)
  }else{
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*'
    })
    res.end(JSON.stringify({
      code:1,
      msg: "express框架传回去egg的参数",
      query:req.query
    }))
  }
})


router.post("/apipost",bodyParser.urlencoded({extended:false}),(req,res)=>{
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })
  console.log(req.body);
  res.end(JSON.stringify({
    code:1,
    body:req.body
  }))
})



module.exports = router;