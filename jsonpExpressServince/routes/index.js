var express = require('express');

const url = require("url")

var router = express.Router();



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
    let resault = JSON.stringify({
      code: 1,
      msg: "express框架传回去的参数"
    });
    res.send(`${callback}(${resault})`)
  }
})



module.exports = router;