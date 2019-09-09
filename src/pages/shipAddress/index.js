import React,{Component} from 'react'
import './index.less'
import addressBook from '@img/addressBook.png'
import { Cascader } from 'antd';
import { List, InputItem } from 'antd-mobile';
import expandIcon from '@img/expandIcon.png'

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
                            <div className="receive-main">
                                <div className="receiveIcon">收</div>
                                <div className="receive-title">填写收件信息</div>
                                <div className="receive-address">
                                    <img src={addressBook} />
                                    <div className="address-book">地址薄</div>
                                </div>
                            </div>
                            <div className="info">
                                <InputItem
                                    placeholder="请输入姓名"
                                >
                                    <span style={{color:'red',marginRight:'10px'}}>*</span><span style={{fontSize:'14px'}}>姓名</span>
                                
                                </InputItem>
                                <InputItem
                                    placeholder="请输入手机号码"
                                >
                                <span style={{color:'red',marginRight:'10px'}}>*</span><span style={{fontSize:'14px'}}>手机号码</span>
                                </InputItem>
                                {
                                    // <InputItem
                                    //     placeholder="请选择地区"
                                    // >
                                    // <span style={{color:'red',marginRight:'10px'}}>*</span><span style={{fontSize:'14px'}}>地区</span>
                                    // </InputItem> 
                                }
                                <InputItem
                                    placeholder="请输入详细信息"
                                >
                                <span style={{color:'red',marginRight:'10px'}}>*</span><span style={{fontSize:'14px'}}>详细信息</span>
                                </InputItem>

                                <div className="addressWrite" style={{height:'87px',background:'#EEEEEE',marginTop:'15px',marginLeft:'15px'}}>
                                    <textarea placeholder="粘贴如“南京市鼓楼区赛程国际大赛1216 张倩请13260771839”的信息，我们将为您智能识别填写" style={{border:'none',background:'#EEEEEE',width:'90%',height:'82px',resize:'none',marginLeft:'15px',marginTop:'5px',color:'black'}}></textarea>
                                </div>
                                
                            </div>
                        </div>

                        <div className="shop-main">
                            <div className="shop-order">
                                <div className="shop-info">
                                    <div className="shop-title">商品信息</div>
                                    <div className="shop-number">订单编号:123456789123</div>
                                </div>

                                <div className="shop-detail">
                                    <div className="shop-name">黛珂植物韵律洗面奶150ml</div>
                                    <div className="shop-single">
                                        <div className="shop-price">￥168</div>
                                        <div className="shop-num">*10</div>
                                    </div>
                                </div>
                                <div className="shop-detail">
                                    <div className="shop-name">黛珂植物韵律洗面奶150ml</div>
                                    <div className="shop-single">
                                        <div className="shop-price">￥168</div>
                                        <div className="shop-num">*1</div>
                                    </div>
                                </div>

                                <div className="shop-show">
                                    <img src={expandIcon} />
                                    点击展开
                                </div>

                                <div className="shop-column">
                                    <div>商品金额</div>
                                    <div>￥504</div>
                                </div>
                                <div className="shop-column">
                                    <div>运费</div>
                                    <div>+￥10</div>
                                </div>
                                <div className="shop-column">
                                    <div>实际支付</div>
                                    <div className="actually-pay">￥514</div>
                                </div>
                                <div className="pay">
                                    立即支付
                                </div>
                            </div>
                            
                            
                        
                        </div>
                        
                    </div>
                    
                </div>
            </div>   
        )
    }
}

export default ShipAddress;