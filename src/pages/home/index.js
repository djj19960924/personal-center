import React,{Component} from 'react'
import { Button } from 'antd-mobile';
import './index.less'
import avatar from '@img/avatar.png'
import specialOffer from '@img/specialOffer.png'
import detail from '@img/detail.png'

class Home extends Component{
    render(){
        return (
            <div className="home">
                <div className="homeMain">
                    <div className="main">
                        <div className="avatar">
                            <img src={avatar} className="avatarImg"></img>
                            <div className="avatarText">QQZ</div>
                        </div>
                        <div className="balance">
                            <div className="balance-main">
                                <div className="balance-left">
                                    <div className="balance-num">5,421.88</div>
                                    <div className="balance-text">
                                        我的余额
                                        <div className="recharge">
                                            充值
                                            <img src={specialOffer} className="specialOffer"></img>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="balance-right">
                                    <img className="detail" src={detail}></img>
                                    明细
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    
                </div>   
            </div>   
        )
    }
}

export default Home;