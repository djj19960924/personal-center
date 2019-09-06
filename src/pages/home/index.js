import React,{Component} from 'react'
import { Button } from 'antd-mobile';
import './index.less'
import avatar from '@img/avatar.png'
import specialOffer from '@img/specialOffer.png'
import detail from '@img/detail.png'
import shipped from '@img/shipped.png'
import waitPay from '@img/waitPay.png'
import waitShip from '@img/waitShip.png'
import waitAddress from '@img/waitAddress.png'
import globalErrandIcon from '@img/globalErrandIcon.png'
import balance from '@img/balance.png'
import transfer from '@img/transfer.png'

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

                        <div className="shopOrder">
                            <div className="shopOrder-title">商品订单</div>
                            <div className="shopOrder-features addBoxShadow">
                                <div className="wait-address">
                                    <div className="bubble">1</div>
                                    <img src={waitAddress} className="wait-address-img" />
                                    <div className="wait-address-text">待填地址</div>
                                </div>
                                <div className="wait">
                                    <div className="bubble">3</div>
                                    <img src={waitPay} className="wait-pay-img"/>
                                    <div className="wait-pay-text">待支付</div>
                                </div>
                                <div className="wait">
                                    <div className="bubble">1</div>
                                    <img src={waitShip} className="wait-ship-img"/>
                                    <div className="wait-ship-text">待发货</div>
                                </div>
                                <div className="wait">
                                    <div className="bubble">4</div>
                                    <img src={shipped} className="shipped-img"/>
                                    <div className="shipped-text">已发货</div>
                                </div>
                            </div>
                        </div> 
                        
                        
                        <div className="otherService">
                            <div className="otherService-title">其他服务</div>
                            <div className="otherService-main addBoxShadow">
                                <div className="otherService-features">
                                    <div className="otherService-left">
                                        <div className="left-title">全球跑腿</div>
                                        <div className="left-content">
                                            <img src={globalErrandIcon} />
                                            全球跑腿：&nbsp;20次
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="otherService-right">
                                        点击进入
                                    </div>
                                </div>
                            </div>

                            <div className="otherService-main addBoxShadow">
                                <div className="otherService-features">
                                    <div className="otherService-left rebate">
                                        <div className="left-title">宇宙返点社</div>
                                        <div className="left-content">
                                            <img src={balance} className="rebate-img"/>
                                            <span className="rebate-title">待返现&nbsp;2286.37</span>
                                            <img src={balance} className="rebate-img"/>
                                            待返现&nbsp;2286.37
                                        </div>
                                        <div className="left-content">
                                            <img src={balance} className="rebate-img"/>
                                            余额&nbsp;2286.37
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="rebate-right">
                                        点击进入
                                    </div>
                                </div>
                            </div>

                            <div className="otherService-main addBoxShadow">
                                <div className="otherService-features">
                                    <div className="otherService-left">
                                        <div className="left-title">接送机</div>
                                        <div className="left-content">
                                            <img src={transfer} className="transfer-img"/>
                                            接送机：&nbsp;20次
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="otherService-right transfer">
                                        点击进入
                                    </div>
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