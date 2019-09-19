(function() {
    let wx = window.wx;
    let protocol = window.location.protocol;
    // 这里获取微信浏览器附加操作项的权限所需参数
    fetch(
      `${protocol}//testapi.maishoumiji.com/pay/getshare?url=${encodeURIComponent(window.location.href.split('#')[0])}`,
      {method: 'GET'}).then(r => r.json()).then(r => {
        // 这里配置微信浏览器操作权限
        wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数
          // 可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          debug: true,
          appId: r.appId,
          timestamp: r.timeStamp,
          nonceStr: r.nonceStr,
          signature: r.signature,
          jsApiList: [
            // 必填，需要使用的JS接口列表
            "checkJsApi",
            "scanQRCode",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "hideMenuItems",
            "chooseWXPay"
          ]
        });
        // 这里修改微信浏览器分享内容等
        wx.ready(function () {
          // 隐藏菜单内多余按钮
          wx.hideMenuItems({
            menuList: [
              'menuItem:share:qq', //分享到QQ
              'menuItem:share:weiboApp', // 分享到Weibo
              'menuItem:favorite', // 收藏
              'menuItem:share:QZone', // 分享到 QQ 空间
              'menuItem:copyUrl', // 复制链接
              'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
              'menuItem:openWithSafari', // 在Safari中打开
              'menuItem:share:email', // 邮件
              'menuItem:readMode', // 阅读模式
              'menuItem:originPage' // 原网页
            ],
            success: function (res) {
              // 静默成功
              // alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
            },
            fail: function (res) {
              alert(JSON.stringify(res));
            }
          });
        })
      }
    ).catch(()=>{
      alert(`wxconfig所需权限接口调取失败`)
    });
  
  })();