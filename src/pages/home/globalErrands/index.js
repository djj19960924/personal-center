import React from 'react';
import './index.less';
// import wxShare from '@js/wxShareConfig';

class GlobalErrands extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    document.title = '扫码进入跑腿';
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
      <div className='globalErrands'>
        <img src='http://resource.maishoumiji.com/wuliu/home/globalErrands.png' alt=""/>
        <p>长按识别二维码进入全球跑腿</p>
        <div onClick={this.backToHome.bind(this)}>返回首页</div>
      </div>
    )
  }
}

export default GlobalErrands;