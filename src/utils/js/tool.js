// 这里的工具方法挂在在顶层对象window中

// 获取search参数方法
window.getQueryString = (name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (!(window.location.search.split('?')[1])) return null;
    let r = window.location.search.split('?')[1].match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
};
// 获取全部search参数
window.getAllQueryString = () => {
    if (!(window.location.search.split('?')[1])) return {};
    let dataObj = {};
    let searchList = window.location.search.split('?')[1].split('&');
    for (let i = 0; i < searchList.length; i++) dataObj[searchList[i].split('=')[0]] = decodeURIComponent(searchList[i].split('=')[1]);
    return dataObj;
};
// 获取所有cookie
window.getAllCookie = () => {
    let strCookie = document.cookie;
    let arr = strCookie.split(';');
    let obj = {};
    for (let i of arr) obj[i.split('=')[0]] = i.split('=')[1];
    return obj;
};
// 获取全部hash内部仿search参数方法
window.getAllHashQueryString = () => {
    if (!(window.location.hash.split('?')[1])) return {};
    let dataObj = {};
    let searchList = window.location.hash.split('?')[1].split('&');
    for (let i = 0; i < searchList.length; i++) dataObj[searchList[i].split('=')[0]] = decodeURIComponent(searchList[i].split('=')[1]);
    return dataObj;
};

// 设置一个cookie
// 参数依次为参数名,参数值,参数有效时间(单位:秒/不需填写单位/建议填写Number类型)
window.setCookie = (name, value, time) => {
    if (!name) {
        console.error('请输入正确参数名');
        return `无效的参数名`;
    }
    if (!value) {
        console.error('请输入正确参数值');
        return `无效的参数值`;
    }
    if (!time) {
        console.error('请输入正确参数有效时间');
        return `无效的参数有效时间`;
    }
    let exp = new Date();
    exp.setTime(exp.getTime() + time * 1000);
    document.cookie = `${name}=${value};expires=${exp};path=/`;
    return `${name}=${value};expires=${exp};path=/`;
};

// 存储对象内所有数据到cookie, 参数需要给出对象
window.setCookies = (dataObj, time) => {
    let type = Object.prototype.toString.call(dataObj);
    if (type !== '[object Object]') {
        console.error(`请输入正确参数对象`);
        return `第一个参数现为${type}`;
    }
    if (!time) {
        console.error('请输入正确参数有效时间');
        return `无效的参数有效时间`;
    }
    for (let name in dataObj) window.setCookie(name, dataObj[name], time);
    return `参数设置成功`;
};

//获取一个cookie
window.getCookie = (name) => {
    if (!name) {
        console.error('请输入正确参数名');
        return `所需获取的cookie参数名不正确`;
    }
    let strCookie = document.cookie;
    let arr = strCookie.split('; ');
    for (let i = 0; i < arr.length; i++) {
        let t = arr[i].split("=");
        if (t[0] === name) return t[1];
    }
    return null;
};

// 获取所有cookie
window.getAllCookie = () => {
    let strCookie = document.cookie;
    let arr = strCookie.split('; ');
    let obj = {};
    for (let i of arr) obj[i.split('=')[0]] = i.split('=')[1];
    return obj;
};

//删除一个cookie
window.delCookie = (name) => {
    if (!name) {
        console.error('请输入正确参数名字符串');
        return `所需删除的cookie参数名不正确`
    }
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = window.getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString() + ";path=/";
    return `${name}已成功删除`;
};

//删除所有cookie
window.delAllCookie = () => {
    let strCookie = document.cookie;
    let arr = strCookie.split('; ');
    for (let i of arr) {
        window.delCookie(i.split('=')[0])
    }
    return `所有cookie已成功删除`;
};