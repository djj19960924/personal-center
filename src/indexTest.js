import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';

// 移动端自适应插件, 逻辑上 0.01rem(网页页面) = 1px(设计稿)
import '@js/phone';
// 这里是测试版本路由
import RouterRootTest from "@routes/routerTest"

// 引用各种自定义工具方法
//import '@js/tool';
// 这里进行默认js操作
// import '@js/do';

// antd组件本体按需引入, 具体请使用请查看antd官方文档
import 'antd/dist/antd.css';

console.log(process.env.NODE_ENV)

ReactDOM.render(
    <RouterRootTest />,
    document.getElementById('root')
);

serviceWorker.unregister();