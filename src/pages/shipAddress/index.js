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
import collapseIcon from '@img/collapseIcon.png'

var {areaList} = require('@js/area-list')

var { parseArea , parse } = require('@js/address-parse')
parseArea(areaList);
class ShipAddress extends Component{ 
    constructor(props) {
        document.title = "填写收件地址";
        super(props);
        this.state = {
          isPay:false,
          selected:0,
          detailInfo:'',
          name:'',
          mobile:'',
          area:[],
          //详细地址
          address:'',
          senderInfo:{},
          waitAddressDetail:{
            crmGoodsList:[]
          },
          crmOrderId:''
        }
        this.pay = this.pay.bind(this);
        this.paste = this.paste.bind(this);
        this.handleArea = this.handleArea.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleMobile = this.handleMobile.bind(this)
        this.handleAddress = this.handleAddress.bind(this)
        this.submitAddress = this.submitAddress.bind(this)
        this.enterAddressBook = this.enterAddressBook.bind(this)
    }

    componentWillMount() {
        var waitAddressDetail = localStorage.getItem('waitAddressDetail')
        this.setState({
            waitAddressDetail:JSON.parse(waitAddressDetail),
            crmOrderId:waitAddressDetail.id
        })
    }
    
    componentDidMount() {
        this.getReceiveInfo()
        if(localStorage.getItem('addressInfo')){
            var addressInfo = localStorage.getItem('addressInfo')
            addressInfo = JSON.parse(addressInfo)
            var area = [addressInfo.recipientsProvince,addressInfo.recipientsCity,addressInfo.recipientsDistrict]
            this.setState({
                name:addressInfo.recipientsName,
                mobile:addressInfo.recipientsPhone,
                area:area,
                address:addressInfo.recipientsAddress
            })
        }
    }

    //获取寄件人信息
    getReceiveInfo(){
        fetch(window.theUrl+'/crmOrderController/getSenderList',
            {
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                }
            }
        ).then(r=>r.json()).then(r=>{
            if(r.status===10000){
                this.setState({
                    senderInfo:r.data[1]
                })
            }
        })
    }

    submitAddress(){
        var {name,area,mobile,unionId,openId,address,crmOrderId,senderInfo} = this.state;
        if(!name||!area||!mobile||!address){
            this.Tips.alert("请将信息填写完整");
        }else{
            var senderId = senderInfo.senderId;
            var recipientsName = name , 
                recipientsPhone = mobile,
                recipientsAddress = address,
                recipientsProvince = area[0],
                recipientsCity = area[1],
                recipientsDistrict = area[2];
                
            fetch(window.theUrl+'/crmOrderController/insertRecipients',
                {
                    method: 'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        unionId:window.publicData.unionId,
                        openId:window.publicData.openId,
                        senderId:senderId,
                        recipientsName:recipientsName,
                        recipientsPhone:recipientsPhone,
                        recipientsProvince:recipientsProvince,
                        recipientsCity:recipientsCity,
                        recipientsDistrict:recipientsDistrict,
                        recipientsAddress:recipientsAddress,
                        crmOrderId:crmOrderId
                    })
                }

            ).then(r=>r.json()).then(r=>{
                console.log('r111:',r)
                if(r.status===10000){
                    this.props.history.push('/commodityOrder')
                }
            })
        }
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
    showWaitAddress(){
        var { waitAddressDetail } = this.state
        waitAddressDetail.isExpand = !waitAddressDetail.isExpand
        this.setState({
            waitAddressDetail:waitAddressDetail
        })
    }

    enterAddressBook(){
        this.props.history.push('/shipAddress/addressBook')
    }
    render(){
        const {isPay,selected,detailInfo,name,mobile,address,area,waitAddressDetail,senderInfo}=this.state;
        return (
            <div className="shipAddress">
                <div className="ship-main">
                    <div className="main">
                        <div className="send">
                            <div className="sendIcon">寄</div>
                            <div className="send-info">
                                <div className="send-name">{senderInfo.sender} &nbsp;&nbsp;&nbsp; {senderInfo.senderPhone}</div>
                                <div className="send-address">{senderInfo.senderAddress}</div>
                            </div>
                        </div>

                        <div className="receive">
                            <div className="receive-main">
                                <div className="receiveIcon">收</div>
                                <div className="receive-title">填写收件信息</div>
                                <div className="receive-address" onClick={this.enterAddressBook}>
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
                                    <div className="shop-number">订单编号:{waitAddressDetail.orderNo}</div>
                                </div>


                                {
                                    waitAddressDetail.crmGoodsList.map((item,index)=>{
                                        return(
                                            <div className="shop-detail" key={index}>
                                                <div className="shop-name">{item.goodsName}</div>
                                                <div className="shop-single">
                                                    <div className="shop-price">￥{item.goodsPrice}</div>
                                                    <div className="shop-num">*{item.goodsNum}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    waitAddressDetail.hiddenAddressCrmGoodsList && waitAddressDetail.isExpand===true ? (
                                        item.hiddenAddressCrmGoodsList.map((item,index)=>{
                                            return(
                                                <div className="shop-detail" key={index}>
                                                    <div className="shop-name">{item.goodsName}</div>
                                                    <div className="shop-single">
                                                        <div className="shop-price">￥{item.goodsPrice}</div>
                                                        <div className="shop-num">*{item.goodsNum}</div>
                                                    </div>
                                                </div>)
                                        })
                                    ):
                                    (
                                        <div></div>
                                    )
                                }
                                
                                <div className="shop-show">
                                    <div className="expand" onClick={this.showWaitAddress.bind(this)}>
                                        {
                                            !waitAddressDetail.isExpand ? (
                                                <div>
                                                    点击展开
                                                    <img src={expandIcon} />
                                                </div>
                                            ):(
                                                <div>
                                                    收起
                                                    <img src={collapseIcon} />
                                                </div>
                                            )
                                        }
                                            
                                    </div>
                                </div>

                                <div className="shop-column">
                                    <div>商品金额</div>
                                    <div>￥{waitAddressDetail.amount}</div>
                                </div>
                                <div className="shop-column">
                                    <div>运费</div>
                                    <div>+￥{waitAddressDetail.postage}</div>
                                </div>
                                <div className="shop-column">
                                    <div>实际支付</div>
                                    <div className="actually-pay">￥{waitAddressDetail.amount+waitAddressDetail.postage}</div>
                                </div>
                                <div className="pay" onClick={this.pay}>
                                    立即支付
                                </div>
                                <div className="pay" onClick={this.submitAddress}>
                                    提交地址
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