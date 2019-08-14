  //封装一个jsonp请求的函数
  function query(opt) {
      let str = ""
      for (let key in opt) {
          str += key + "=" + opt[key] + "&"
      }
      return str
  }
  //设置默认回调函数的名字
  const defaultOptions = {
      callbackName: "callback"
  }



  function jsonp(url, opt, options = defaultOptions) {
      //参数解析  URL为访问的接口 opt为传播的数据  option 为接受参数的回调函数
      return new Promise((resolve, reject) => {
          //判断下这个？是不是存在
          let index = url.indexOf("?");
          url += index != -1 ? query(opt) : "?" + query(opt);
          url = url + `${options.callbackName}=${options.callbackName}`;
          //首先创造一个标签 带有src的
          const scriptDom = document.createElement("script");
          //设置其src属性
          scriptDom.setAttribute("src", url);
          scriptDom.setAttribute("type","text/javascript")
          //在window系统上创建一个回调函数用来接受数据
          window[options.callbackName] = (res) => {
              //在接受到了参数动态删除这个script节点和window上面的方法
              delete window[options.callbackName];
              document.body.removeChild(scriptDom)
              //接受成功后调用resolve
              if (res) {
                  resolve(res)
              } else {
                  reject("服务器暂没有获取到数据")
              }
          }
          //动态创建script标记，错误的监听
          scriptDom.addEventListener('error', () => {
              delete window['jsonpCallback'];
              document.body.removeChild(scriptDom);
              reject('服务器加载失败！');
          });
          document.body.append(scriptDom)
      })
  }