import React, {Component} from 'react'
//BrowserRouter,HashRouter路由器,路由器里面配置路由Route,每个路由都是一个标签
//一个前台路由是一个映射关系,Route路由里面配置key->path,value->组件
//Switch代表在某个时间点只去匹配某一个路由，匹配上了不再看其他路由
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import './router.less'


import Home from '@pages/home'
import ShipAddress from '@pages/shipAddress'
import PaySuccess from '@pages/paySuccess'
import CommodityOrder from '@pages/commodityOrder'


class RouterRootTest extends Component{
    render(){
        return(
            <BrowserRouter>
                <div className='RouterRoot'>
                    {/*Switch只匹配其中一个 */}
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/shipAddress' component={ShipAddress} />
                        <Route exact path='/paySuccess' component={PaySuccess} />
                        <Route exact path='/commodityOrder' component={CommodityOrder} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default RouterRootTest;