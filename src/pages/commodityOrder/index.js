import React, { Component } from 'react'
import './index.less'
import clearIcon from '@img/clearIcon.png'
import searchIcon from '@img/searchIcon.png'
import expandIcon from '@img/expandIcon.png'
class CommodityOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: [1, 1, 1],
            currentPage:1
        }
    }

    render() {
        const { orderList,currentPage } = this.state;
        return (
            <div className="commodityOrder">
                <div className="commodityOrder-main">
                    <div className="search" >
                        <img src={searchIcon} />
                        <input placeholder="请输入关键词搜索" />
                        <img src={clearIcon} className="clearIcon" style={{ display: 'none' }} />
                    </div>

                    <div className="select-features">
                        <div className="waited-address-title title">
                            待填地址
                        </div>
                        <div className="waited-pay-title ">
                            待支付
                        </div>
                        <div className="waited-ship-title">
                            待发货
                        </div>
                        <div className="already-Ship-title">
                            已发货
                        </div>
                    </div>
                    {
                        currentPage === 0 ? orderList.map((item, index) => {
                            return (
                                <div className="shop-order" key={index}>
                                    <div className="shop-info">
                                        <div className="shop-title">商品信息</div>
                                        <div className="shop-number">订单编号：123456789123</div>
                                    </div>

                                    <div className="shop-detail">
                                        <div className="shop-name">黛珂植物韵律洗面奶150ml</div>
                                        <div className="shop-single">
                                            <div className="shop-price">￥168</div>
                                            <div className="shop-num">*1</div>
                                        </div>
                                    </div>
                                    <div className="shop-detail">
                                        <div className="shop-name">黛珂植物韵律洗面奶150ml</div>
                                        <div className="shop-single">
                                            <div className="shop-price">￥168</div>
                                            <div className="shop-num">*2</div>
                                        </div>
                                    </div>
                                    <div className="shop-show">
                                        <img src={expandIcon} />
                                        点击展开
                                    </div>
                                    <div className="shop-show-write">
                                        <div className="shop-write">立即填写</div>
                                    </div>
                                </div>
                            )
                        }):
                        orderList.map((item, index) => {
                            return (
                                <div className="shop-order" key={index}>
                                    <div className="shop-info">
                                        <div className="shop-title">商品信息</div>
                                        <div className="shop-number">订单编号：123456789123</div>
                                    </div>

                                    <div className="shop-detail">
                                        <div className="shop-name">黛珂植物韵律洗面奶150ml</div>
                                        <div className="shop-single">
                                            <div className="shop-price">￥168</div>
                                            <div className="shop-num">*1</div>
                                        </div>
                                    </div>
                                    <div className="shop-detail">
                                        <div className="shop-name">黛珂植物韵律洗面奶150ml</div>
                                        <div className="shop-single">
                                            <div className="shop-price">￥168</div>
                                            <div className="shop-num">*2</div>
                                        </div>
                                    </div>
                                    <div className="shop-show">
                                        <img src={expandIcon} />
                                        点击展开
                                    </div>
                                    <div className="shop-show-waitpay">
                                        <div />
                                        <div className="shop-show-fare">
                                            <div>运费</div>
                                            <div>+￥10</div>
                                        </div>
                                    </div>
                                    <div className="shop-show-waitpay">
                                        <div />
                                        <div className="shop-show-fare">
                                            <div>合计</div>
                                            <div className="actually-pay">￥514</div>
                                        </div>
                                    </div>
                                    <div className="shop-show-write">
                                        <div className="shop-write">立即支付</div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    
                </div>
            </div>
        )
    }
}

export default CommodityOrder;