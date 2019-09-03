import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Test from './Test';
import * as serviceWorker from './serviceWorker';

// 引用各种自定义工具方法
//import '@js/tool';
// 这里进行默认js操作
// import '@js/do';

console.log(process.env.NODE_ENV)

ReactDOM.render(<Test />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();