import React,{Component} from 'react'
import { Button } from 'antd';
import './index.less'
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
    constructor(props) {
        document.title = "个人中心";
        super(props);
        this.state = {
            personInfo:{},
            legworkInfoVo:{},
            rebateInfoVo:{},
            transferInfoVo:{},
            crmOrderNum:{}
        }
    }

    componentDidMount() {
        fetch(window.theUrl+'/crmOrderController/getCustomerInfo',
            {
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    unionId:window.publicData.unionId
                })
            }
        ).then(r=>r.json()).then(r=>{
            console.log('r:',r.data)
            if(r.status === 10000){
                if (r.data.nickname) {
                    r.data.userName = r.data.nickname.substring(0, 1) + '*' + r.data.nickname.substring(r.data.nickname.length - 1, r.data.nickname.length)
                  } else {
                    r.data.userName.nickName = "**"
                }
                var {rebateInfoVo,legworkInfoVo,transferInfoVo,crmOrderNum} = r.data
                this.setState({
                    personInfo:r.data,
                    rebateInfoVo:rebateInfoVo,
                    legworkInfoVo:legworkInfoVo,
                    transferInfoVo:transferInfoVo,
                    crmOrderNum:crmOrderNum
                })
            }
        })
    }

    //进入商品订单页
    enterOrder(currentPage){
        console.log('currentPage:',currentPage)
        this.props.history.push({
            pathname:'/commodityOrder',
            query:{
                currentPage:currentPage
            }
        })
    }
    //进入返点二维码页面
    enterRebate(){
        this.props.history.push('/rebate')
    }

    //进入返点二维码页面
    enterGlobalErrands(){
        this.props.history.push('/globalErrands')
    }
    
    render(){
        const { personInfo,rebateInfoVo,legworkInfoVo,transferInfoVo,crmOrderNum } = this.state
        return (
            <div className="home">
                <div className="homeMain">
                    <div className="main">
                        <div className="avatar">
                            <img src={personInfo.headImg} className="avatarImg"></img>
                            <div className="avatarText">{personInfo.userName}</div>
                        </div>
                        <div className="balance">
                            <div className="balance-main">
                                <div className="balance-left">
                                    <div className="balance-num">{rebateInfoVo.balance?rebateInfoVo.balance:'0'}</div>
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
                                    {
                                        crmOrderNum.waitAddressNum ? (
                                            <div className="bubble">{crmOrderNum.waitAddressNum}</div>
                                        ):(
                                            <div></div>
                                        )
                                    }
                                    <img src={waitAddress} className="wait-address-img" onClick={this.enterOrder.bind(this,0)}/>
                                    <div className="wait-address-text">待填地址</div>
                                </div>
                                {
                                    <div className="wait">
                                        {
                                            crmOrderNum.waitPayNum ? (
                                                <div className="bubble">{crmOrderNum.waitPayNum}</div>
                                            ):(
                                                <div></div>
                                            )
                                        }
                                        <img src={waitPay} className="wait-pay-img" onClick={this.enterOrder.bind(this,1)}/>
                                        <div className="wait-pay-text" >待支付</div>
                                    </div>
                                }
                                <div className="wait">
                                    
                                    {
                                        crmOrderNum.waitSendNum ? (
                                            <div className="bubble">{crmOrderNum.waitSendNum}</div>
                                        ):(
                                            <div></div>
                                        )
                                    }
                                    <img src={waitShip} className="wait-ship-img" onClick={this.enterOrder.bind(this,2)}/>
                                    <div className="wait-ship-text">待发货</div>
                                </div>
                                <div className="wait">
                                    {
                                        crmOrderNum.sendedNum ? (
                                            <div className="bubble">{crmOrderNum.sendedNum}</div>
                                        ):(
                                            <div></div>
                                        )
                                    }
                                    <img src={shipped} className="shipped-img" onClick={this.enterOrder.bind(this,3)}/>
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
                                            全球跑腿：&nbsp;{legworkInfoVo.reservationTotal}次
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="otherService-right" onClick={this.enterGlobalErrands.bind(this)}>
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
                                            <span className="rebate-title">待返现&nbsp;{rebateInfoVo.returningMoney}</span>
                                            <img src={balance} className="rebate-img"/>
                                            已返现&nbsp;{rebateInfoVo.returnedMoney}
                                        </div>
                                        <div className="left-content">
                                            <img src={balance} className="rebate-img"/>
                                            余额&nbsp;{rebateInfoVo.balance}
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="rebate-right" onClick={this.enterRebate.bind(this)}>
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