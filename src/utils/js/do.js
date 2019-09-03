(function () {
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
        lCT.href = `${authorizeUrl}${encodeURIComponent(`${lCT.origin}/${hash}`)}`;
    };

    // 修正链接方法
    let fixHref = () => {
        window.history.replaceState({}, 'fix url',
            `${lCT.origin}/${lCT.hash.split('?')[0]}`);
    };

    // 保存用户数据至数据库方法
    let saveUserData = (dataObj) => {
        fetch(`//api.maishoumiji.com/parcelLoginManagement/saveWechatInfo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        }).then(r => r.json()).then(r => {
            if (!r.msg && !r.data) {
                alert(`后端数据错误`);
            } else {
                if (r.status === 10000) {
                    console.log(r.msg);
                } else {
                    alert(`${r.msg} 错误码:${r.status}`);
                }
            }
        }).catch(() => {
            alert(`前端用户数据存储接口调用失败`);
        });
    };
    //判断是否绑定手机号
    let judgeBinding = (unionId) => {
        let hash = lCT.hash.split('?')[0];
        console.log(window.fandianUrl);
        fetch('//fandian.maishoumiji.com/portal/phoneMessage/queryPhoneNumIsBound', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                unionId: unionId
            })
        }).then(r => r.json()).then(res => {
            if (res.status === 10000) {
                lCT.replace(`${lCT.origin}/#/verificationnum?url=/${hash}`);
                window.history.replaceState(null, null, `${lCT.origin}/#/verificationnum?url=/${hash}`)
            }
        })
    };
    // 从cookie中取得参数, cookie为缓存项, 如果含有cookie则不调用接口保存当前用户信息
    if (dataCookies.openId && dataCookies.unionId && dataCookies.nickname && dataCookies.headimgurl) {
        window.publicData = window.getAllCookie();
        window.publicData.nickname = decodeURIComponent(window.getCookie('nickname'));
        fixHref();
        judgeBinding(dataCookies.unionId);
        return window.publicData;
    }

    // 从search中取得参数
    if (dataQueryStrings.openId && dataQueryStrings.unionId &&
        dataQueryStrings.nickname && dataQueryStrings.headimgurl) {
        window.publicData = dataQueryStrings;
        window.setCookies(window.publicData, 1800);
        window.setCookie('nickname', encodeURIComponent(window.publicData.nickname), 1800);
        saveUserData(window.publicData);
        fixHref();
        judgeBinding(dataQueryStrings.unionId);
        return window.publicData;
    }

    // 从hash内部的search中取得参数
    if (dataHashQueryStrings.openId && dataHashQueryStrings.unionId &&
        dataHashQueryStrings.nickname && dataHashQueryStrings.headimgurl) {
        window.publicData = dataHashQueryStrings;
        window.setCookies(window.publicData, 1800);
        window.setCookie('nickname', encodeURIComponent(window.publicData.nickname), 1800);
        saveUserData(window.publicData);
        fixHref();
        judgeBinding(dataHashQueryStrings.unionId);
        return window.publicData;
    }

    // 没有用户信息, 返回获取权限链接
    doHref();

})();