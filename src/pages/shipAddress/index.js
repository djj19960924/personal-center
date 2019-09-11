import React,{Component} from 'react'
import './index.less'
import { Cascader } from 'antd';
import { List, InputItem } from 'antd-mobile';
import expandIcon from '@img/expandIcon.png'
import addressBook from '@img/addressBook.png'
import alipayIcon from '@img/alipayIcon.png'
import wechatIcon from '@img/wechatIcon.png'
import balancePayIcon from '@img/balancePayIcon.png'
import payCancel from '@img/payCancel.png'
import paySelectedIcon from '@img/paySelectedIcon.png'

import areaData from '@js/areaData';

var {areaList} = require('@js/area-list')

var { parseArea , parse } = require('@js/address-parse')
parseArea(areaList);
class ShipAddress extends Component{ 
    constructor(props) {
        document.title = "填写收件地址";
        super(props);
        this.state = {
          uaddress: "",//详细地址
          isPay:false,
          selected:0,
          detailInfo:'',
          name:'',
          mobile:'',
          area:[],
          address:''
        }
        this.pay = this.pay.bind(this);
        this.paste = this.paste.bind(this);
        this.handleArea = this.handleArea.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleMobile = this.handleMobile.bind(this)
        this.handleAddress = this.handleAddress.bind(this)
        
    }

    handleArea(val, selectedOptions) {
        this.setState({area: val})
    }
    handleName(e) {
        this.setState({
            name:e
        })
    }
    handleMobile(e) {
        this.setState({
            mobile:e
        })
    }
    handleAddress(e) {
        this.setState({
            address:e
        })
    }

    paste(e){
        parseArea(areaData);
        var { name,mobile,address,area } = this.state
        var detailInfo = e.target.value
        this.setState({
            detailInfo:e.target.value
        })
        let result = parse(detailInfo)
        name = result.name
        mobile = result.mobile
        address = result.addr
        if(result.province==="北京"||result.province==="上海"||result.province==="重庆"||result.province==="天津"){
            result.province=result.province+"市"
            result.city=result.city+"市"
        }else if(result.province==="新疆"||result.province==="内蒙古"||result.province==="广西"||result.province==="西藏"||result.province==="宁夏"||result.province==="新疆维吾尔"){
            if(result.province==="宁夏"){
                result.province=result.province+"回族"
            }else if(result.province==="广西"){
                result.province=result.province+"壮族"
            }else if(result.province==="新疆"){
                result.province=result.province+"维吾尔"
            }
            result.province=result.province+"自治区"
            result.city=result.city+"市"

        }else if(result.province==="香港"||result.province==="澳门"){
            result.province=result.province+"特别行政区";
            result.city=result.city
        }else{
            result.province=result.province+"省";
            result.city=result.city+"市"
        }
        area = [result.province,result.city,result.area]
        this.setState({
            name,mobile,address,area
        })
    }

    pay(){
        const { isPay } = this.state;
        this.setState({
            isPay:!isPay
        })
    }

    componentDidUpdate(){
        console.log('update')
    }

    render(){
        const {isPay,selected,detailInfo,name,mobile,address,area}=this.state;
        console.log('area:',area)
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
                            <div className="information">
                                <List>
                                    <InputItem
                                        placeholder="请输入姓名"
                                        value={name}
                                        onChange={this.handleName}
                                    >
                                        <span className="star">*</span><span className="starName">姓名</span>
                                    
                                    </InputItem>
                                    <InputItem
                                        placeholder="请输入手机号码"
                                        value={mobile}
                                        onChange={this.handleMobile}
                                    >
                                        <span className="star">*</span><span className="starName">手机号码</span>
                                    </InputItem>
                                    
                                    <div className="area">
                                        <div className="area-title">
                                            <span className="star">*</span><span>地区</span>
                                        </div>
                                        <div className="content-block">
                                            <Cascader options={areaData} placeholder="请选择地区"  
                                                onChange={this.handleArea}
                                                value={area}
                                            />
                                        </div> 
                                    </div>
                                    
                                    <InputItem
                                        placeholder="请输入详细信息"
                                        value={address}
                                        onChange={this.handleAddress}
                                    >
                                        <span className="star">*</span><span className="starName">详细信息</span>
                                    </InputItem>

                                    <div className="addressWrite">
                                        <textarea value={detailInfo} placeholder="粘贴如“南京市鼓楼区赛程国际大赛1216张倩倩13260771839”的信息，我们将为您智能识别填写" onChange={this.paste}></textarea>
                                    </div>
                                </List>
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
                                <div className="pay" onClick={this.pay}>
                                    立即支付
                                </div>
                            </div>
                            
                            
                        
                        </div>
                        
                    </div>
                    
                    {
                        isPay?(
                            <div className='addTips' >
                                <div className="mask" />
                                <div className="bullet-main">
                                    <div className="bullet-content">
                                        <div className="pay-cancel">
                                            <img src={payCancel} onClick={this.pay}/>
                                        </div>
                                        <div className="content-title">
                                            <strong>请选择支付方式</strong>
                                        </div>
                                        <div className="aliPay">
                                            <div className="aliPay-left">
                                                <img src={alipayIcon}/>
                                                支付宝支付
                                            </div>
                                            {
                                                selected === 0 ?(
                                                    <img src={paySelectedIcon} />
                                                ):(
                                                    <div className="pay-selected"></div>
                                                )
                                            }   
                                        </div>
                                        <div className="aliPay">
                                            <div className="aliPay-left">
                                                <img src={wechatIcon}/>
                                                微信支付
                                            </div>
                                            {
                                                selected === 1 ?(
                                                    <img src={paySelectedIcon} />
                                                ):(
                                                    <div className="pay-selected"></div>
                                                )
                                            }  
                                        </div>
                                        <div className="aliPay">
                                            <div className="aliPay-left">
                                                <img src={balancePayIcon}/>
                                                余额支付
                                            </div>
                                            {
                                                selected === 2 ?(
                                                    <img src={paySelectedIcon} />
                                                ):(
                                                    <div className="pay-selected"></div>
                                                )
                                            }  
                                        </div>

                                        <div className="pay-btn">
                                            确定
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        ):(
                            <div />
                        )
                    }
                </div>
            </div>   
        )
    }
}

export default ShipAddress;