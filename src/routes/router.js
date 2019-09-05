import React, {Component} from 'react'
//BrowserRouter,HashRouter路由器,路由器里面配置路由Route,每个路由都是一个标签
import { BrowserRouter,Route,Switch } from 'react-router-dom'
//一个前台路由是一个映射关系,Route路由里面配置key->path,value->组件
//Switch代表在某个时间点只去匹配某一个路由，匹配上了不再看其他路由
import './router.less'

import Login from '@pages/login/login'
import Admin from '@pages/admin/admin'

class RouterRoot extends Component{
    render(){
        return(
            <BrowserRouter>
                <div className='RouterRoot'>
                    {/*Switch只匹配其中一个 */}
                    <Switch>
                        <Route path='/' component={Login}></Route>
                        <Route path='/admin' component={Admin}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default RouterRoot;