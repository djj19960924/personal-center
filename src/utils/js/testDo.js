(function(){
    let lCT = window.location;
    let dataCookies = window.getAllCookie();
    let dataQueryStrings = window.getAllQueryString();
    let dataHashQueryStrings = window.getAllHashQueryString();
    const authorizeUrl = `${lCT.protocol}//api.maishoumiji.com/wechat/authorize?returnUrl=`;
  
    // 返回获得权限链接方法
    let doHref = () => {
      let hashOrigin = lCT.hash;
      let hash = '';
      if (hashOrigin !== '') hash = hashOrigin.split('?')[0];
      // 强制返回api登录界面进行登录
      console.log(window);
      lCT.href = `${authorizeUrl}${encodeURIComponent(`${lCT.origin}/${hash}`)}`;
    };
  
    // 修正链接方法
    let fixHref = () => {
      window.history.replaceState({},'fix url',
        `${lCT.origin}/${lCT.hash.split('?')[0]}`);
    };
  
    // 保存用户数据至数据库方法
    let saveUserData = (dataObj) => {
      fetch(`//testapi.maishoumiji.com/parcelLoginManagement/saveWechatInfo`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataObj)
      }).then(r => r.json()).then(r => {
        if (!r.msg && !r.data) {
          this.Tips.alert(`后端数据错误`);
        } else {
          if (r.status === 10000) {
            console.log(r.msg);
          } else {
            this.Tips.alert(`${r.msg} 错误码:${r.status}`) ;
          }
        }
      }).catch(() => {
        this.Tips.alert(`前端用户数据存储接口调用失败`);
      });
    };
    //判断是否绑定手机号
    let judgeBinding=(unionId)=>{
      let hash=lCT.hash.split('?')[0];
      fetch('//testapi.maishoumiji.com/portal/phoneMessage/queryPhoneNumIsBound',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({unionId:unionId})
      }).then(r=>r.json()).then(res=>{
        if(res.status===10000){
          lCT.replace(`${lCT.origin}/#/verificationnum?url=/${hash}`);
          window.history.replaceState(null,null,`${lCT.origin}/#/verificationnum?url=/${hash}`)
        }
      })
    };
    // 从cookie中取得参数, cookie为缓存项, 如果含有cookie则不调用接口保存当前用户信息
    if (dataCookies.openId && dataCookies.unionId && dataCookies.nickname && dataCookies.headimgurl) {
      console.log('Cookies');
      window.publicData = window.getAllCookie();
      fixHref();
      judgeBinding(dataCookies.unionId );
      return window.publicData;
    }
  
    // 从search中取得参数
    if (dataQueryStrings.openId && dataQueryStrings.unionId
      && dataQueryStrings.nickname && dataQueryStrings.headimgurl) {
      console.log('QueryStrings');
      window.publicData = dataQueryStrings;
      window.setCookies(window.publicData,1800);
      saveUserData(window.publicData);
      fixHref();
      judgeBinding(dataQueryStrings.unionId);
      return window.publicData;
    }
  
  
    // 从hash内部的search中取得参数
    if (dataHashQueryStrings.openId && dataHashQueryStrings.unionId
      && dataHashQueryStrings.nickname && dataHashQueryStrings.headimgurl) {
      console.log('HashQueryStrings');
      window.publicData = dataHashQueryStrings;
      window.setCookies(window.publicData,1800);
      saveUserData(window.publicData);
      fixHref();
      judgeBinding(dataHashQueryStrings.unionId);
      return window.publicData;
    }
  
    // 没有用户信息, 返回获取权限链接
    doHref();
  
  })();