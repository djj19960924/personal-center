import React, { Component } from 'react'
import './index.less'
import clearIcon from '@img/clearIcon.png'
import searchIcon from '@img/searchIcon.png'
import expandIcon from '@img/expandIcon.png'
import collapseIcon from '@img/collapseIcon.png'
class CommodityOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: [1, 1, 1],
            currentPage:0,
            waitAddressList:[],
            waitPayList:[],
            waitShipList:[],
            alreadyShipList:[],
            isExpand:false,
        }
    }

    componentDidMount() {
        if(this.props.location.query){
            if(this.props.location.query.currentPage!=0){
                var currentPage = this.props.location.query.currentPage
                this.changeCurrentPage(currentPage)
                this.setState({
                    currentPage:currentPage
                })
            }
            
        }
        console.log('currentPage:',currentPage)
        fetch(window.theUrl+'/crmOrderController/selectCrmOrderWaitAddressList',
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
            
            if (r.status === 10000) {
                if(r.data.length===0){
                    console.log("暂无待填地址商品")
                }else{
                    r.data.forEach(element=>{
                        var crmGoodsList = element.crmGoodsList
                        if(element.crmGoodsList.length > 2){
                            element.crmGoodsList = crmGoodsList.slice(0,2)
                            element.hiddenAddressCrmGoodsList = crmGoodsList.slice(2)
                        }
                        element.isExpand = false
                    })
                }
                this.setState({
                    waitAddressList:r.data
                })
            }
        })
    }

    showWaitAddress(id){
        var { waitAddressList } = this.state
        waitAddressList[id].isExpand = !waitAddressList[id].isExpand
        this.setState({
            waitAddressList:waitAddressList
        })
    }
    showWaitPay(id){
        var { waitPayList } = this.state
        waitPayList[id].isExpand = !waitPayList[id].isExpand
        this.setState({
            waitPayList:waitPayList
        })
    }
    showWaitShip(id){
        var { waitShipList } = this.state
        waitShipList[id].isExpand = !waitShipList[id].isExpand
        this.setState({
            waitShipList:waitShipList
        })
    }
    showAlreadyShip(id){
        var { alreadyShipList } = this.state
        alreadyShipList[id].isExpand = !alreadyShipList[id].isExpand
        this.setState({
            alreadyShipList:alreadyShipList
        })
    }

    changeCurrentPage(currentPage){
        var status = currentPage-1
        if(currentPage != 0){
            fetch(window.theUrl+'/crmOrderController/selectCrmOrderList',
                {
                    method: 'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        unionId:window.publicData.unionId,
                        status:status
                    })
                }
            ).then(r=>r.json()).then(r=>{
                console.log(r)
                if (r.status === 10000) {
                    if(r.data.length===0){
                        console.log("暂无待支付商品")
                    }else{
                        r.data.forEach(element=>{
                            var crmGoodsList = element.crmGoodsList
                            if(element.crmGoodsList.length > 2){
                                element.crmGoodsList = crmGoodsList.slice(0,2)
                                element.hiddenAddressCrmGoodsList = crmGoodsList.slice(2)
                            }
                            element.isExpand = false
                        })
                    }
                    if(currentPage===1){
                        this.setState({
                            waitPayList:r.data
                        })
                    }else if(currentPage===2){
                        this.setState({
                            waitShipList:r.data
                        })
                    }else{
                        this.setState({
                            alreadyShipList:r.data
                        })
                    }
                }
            })
        }
        this.setState({
            currentPage:currentPage
        })
    }

    enterAddress(id){
        var { waitAddressList } = this.state
        localStorage.setItem('waitAddressDetail',JSON.stringify(waitAddressList[id]))
        this.props.history.push('/shipAddress')
    }

    pay(orderInfo){
        console.log('orderInfo:',orderInfo)
        var orderNo = orderInfo.orderNo ,
            payMoney = orderInfo.postage+orderInfo.amount,
            crmOrderId = orderInfo.id
        fetch(window.theUrl+'/crmOrderController/payAmount',
            {
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    unionId:window.publicData.unionId,
                    openId:window.publicData.openId,
                    payType:1,
                    payMoney:payMoney,
                    orderNo:orderNo,
                    crmOrderId:crmOrderId
                })     
            }
        ).then(r=>r.json()).then(r=>{
            console.log('r:',r)
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                   "appId":r.data.appId,     //公众号名称，由商户传入     
                   "timeStamp":''+r.data.paytimestamp,         //时间戳，自1970年以来的秒数     
                   "nonceStr":r.data.nonceStr, //随机串     
                   "package":r.data.package,     
                   "signType":"MD5",         //微信签名方式：     
                   "paySign":r.data.paySign//微信签名 
                },
                function(res){
                    console.log('res:',res)
                    alert(res)
                }
            )
        })
    }

    render() {
        const { currentPage,waitAddressList,waitPayList,waitShipList,alreadyShipList } = this.state;
        return (
            <div className="commodityOrder">
                <div className="commodityOrder-main">
                    <div className="search" >
                        <img src={searchIcon} />
                        <input placeholder="请输入关键词搜索" />
                        <img src={clearIcon} className="clearIcon" style={{ display: 'none' }} />
                    </div>

                    <div className="select-features">
                        <div className={currentPage===0 ? 'waited-titleSelected title':'waited-address-title'} onClick={this.changeCurrentPage.bind(this,0)}>
                            待填地址
                        </div>
                        <div className={currentPage===1 ? 'waited-titleSelected other':'waited-address-title'} onClick={this.changeCurrentPage.bind(this,1)}>
                            待支付
                        </div>
                        <div className={currentPage===2 ? 'waited-titleSelected other':'waited-ship-title'} onClick={this.changeCurrentPage.bind(this,2)}>
                            待发货
                        </div>
                        <div className={currentPage===3 ? 'waited-titleSelected other':'already-Ship-title'} onClick={this.changeCurrentPage.bind(this,3)}>
                            已发货
                        </div>
                    </div>
                    {
                        currentPage === 0 ? waitAddressList.map((item, index) => {
                            return (
                                <div className="shop-order" key={index}>
                                    <div className="shop-info">
                                        <div className="shop-title">商品信息</div>
                                        <div className="shop-number">订单编号：{item.orderNo}</div>
                                    </div>
                                    
                                    {
                                        item.crmGoodsList.map((item,index)=>{
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
                                        item.hiddenAddressCrmGoodsList && item.isExpand===true ? (
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
                                        <div className="expand" onClick={this.showWaitAddress.bind(this,index)}>
                                            {
                                                !item.isExpand ? (
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
                                    
                                    <div className="shop-show-write">
                                        <div className="shop-write" onClick={this.enterAddress.bind(this,index)}>立即填写</div>
                                    </div>
                                </div>
                            )
                        }):
                        (
                            currentPage === 1  ? waitPayList.map((item, index) => {
                                return (
                                    <div className="shop-order" key={index}>
                                        <div className="shop-info">
                                            <div className="shop-title">商品信息</div>
                                            <div className="shop-number">订单编号：{item.orderNo}</div>
                                        </div>
    
                                        {
                                            item.crmGoodsList.map((item,index)=>{
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
                                            item.hiddenAddressCrmGoodsList && item.isExpand===true ? (
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
                                            <div className="expand" onClick={this.showWaitPay.bind(this,index)}>
                                                {
                                                    !item.isExpand ? (
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
                                        <div className="shop-show-waitpay">
                                            <div />
                                            <div className="shop-show-fare">
                                                <div>运费</div>
                                                <div>+￥{item.postage}</div>
                                            </div>
                                        </div>
                                        <div className="shop-show-waitpay">
                                            <div />
                                            <div className="shop-show-fare">
                                                <div>合计</div>
                                                <div className="actually-pay">￥{item.amount+item.postage}</div>
                                            </div>
                                        </div>
                                        <div className="shop-show-write">
                                            <div className="shop-write" onClick={this.pay.bind(this,item)}>立即支付</div>
                                        </div>
                                    </div>
                                )
                            }):
                            (
                                currentPage === 2 ? waitShipList.map((item, index) => {
                                    return (
                                        <div className="shop-order" key={index}>
                                            <div className="shop-info">
                                                <div className="shop-title">商品信息</div>
                                                <div className="shop-number">订单编号：{item.orderNo}</div>
                                            </div>
        
                                            {
                                                item.crmGoodsList.map((item,index)=>{
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
                                                item.hiddenAddressCrmGoodsList && item.isExpand===true ? (
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
                                                <div className="expand" onClick={this.showWaitShip.bind(this,index)}>
                                                    {
                                                        !item.isExpand ? (
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
                                            <div className="shop-show-waitpay">
                                                <div />
                                                <div className="shop-show-fare">
                                                    <div>运费</div>
                                                    <div>+￥{item.postage}</div>
                                                </div>
                                            </div>
                                            <div className="shop-show-waitpay waitpayBorder">
                                                <div />
                                                <div className="shop-show-fare">
                                                    <div>合计</div>
                                                    <div className="actually-pay">￥{item.amount}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }):
                                alreadyShipList.map((item, index) => {
                                    return (
                                        <div className="shop-order" key={index}>
                                            <div className="shop-info">
                                                <div className="shop-title">商品信息</div>
                                                <div className="shop-number">订单编号：{item.orderNo}</div>
                                            </div>
        
                                            {
                                                item.crmGoodsList.map((item,index)=>{
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
                                                item.hiddenAddressCrmGoodsList && item.isExpand===true ? (
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
                                                <div className="expand" onClick={this.showAlreadyShip.bind(this,index)}>
                                                    {
                                                        !item.isExpand ? (
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
                                            <div className="shop-show-waitpay">
                                                <div />
                                                <div className="shop-show-fare">
                                                    <div>运费</div>
                                                    <div>+￥{item.postage}</div>
                                                </div>
                                            </div>
                                            <div className="shop-show-waitpay">
                                                <div />
                                                <div className="shop-show-fare">
                                                    <div>合计</div>
                                                    <div className="actually-pay">￥{item.amount+item.postage}</div>
                                                </div>
                                            </div>
                                            <div className="shop-show-write">
                                                <div className="shop-write">查看物流</div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

export default CommodityOrder;