import React from 'react';
import './index.less';
//import wxShare from '@js/wxShareConfig';

class Rebate extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {};
    document.title = '宇宙返点社';
  }

  // componentWillMount() {
  //   wxShare('首页');
  // }

  componentWillUnmount() {
    this.setState = () => null;
  }

  backToHome() {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='rebateCode'>
        <img src='http://resource.maishoumiji.com/wuliu/rebateCode.png' alt=""/>
        <p>长按识别二维码进入宇宙返点社</p>
        <div onClick={this.backToHome.bind(this)}>返回首页</div>
      </div>
    )
  }
}


export default Rebate;