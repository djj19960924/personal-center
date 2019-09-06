import React,{Component} from 'react'
import { Button } from 'antd-mobile';
import './index.less'
import addressBook from '@img/addressBook.png'

class ShipAddress extends Component{
    render(){
        return (
            <div className="shipAddress">
                <div className="ship-main">
                    <div className="main">
                        <div className="send">
                            <div className="sendIcon">寄</div>
                            <div className="send-info">
                                <div className="send-name">张三 &nbsp;&nbsp;&nbsp; 13260771839</div>
                                <div className="send-address">南京赛城国际大厦</div>
                            </div>
                        </div>

                        <div className="receive">
                            <div className="receiveIcon">收</div>
                            <div className="receive-title">
                               填写收件信息
                            </div>
                            <div className="receive-address">
                               <img src={addressBook} />
                               <div className="address-book">地址薄</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
}

export default ShipAddress;