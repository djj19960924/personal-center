import React,{Component} from 'react'
import { Button } from 'antd';
import './index.less'
import paySuccess from '@img/paySuccess.png'

class PaySuccess extends Component{
    render(){
        return (
            <div className="paySuccess">
                <div className="paySuccess-main">
                    <img src={paySuccess}/>
                    <div className="pay-result"><strong>您的订单已支付成功!</strong></div>
                    <div className="look-order">
                        查看订单
                    </div>
                </div>
            </div>
        )
    }
}

export default PaySuccess;