import React, { Component } from 'react';
import {Icon} from 'antd';
import './loading.less';

class Loading extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    return(
      <div className='loading' >
        <img src='http://resource.maishoumiji.com/wuliu/loading.gif' alt=""/>
        <p>加载中</p>
      </div>
    )
  }
}
export default Loading;