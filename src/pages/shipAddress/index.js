import React,{Component} from 'react'
import { Button } from 'antd-mobile';
import './index.less'

class ShipAddress extends Component{
    render(){
        return (
            <div className="main">
                Login
                <Button type="primary" className="login">登录</Button>
            </div>   
        )
    }
}

export default ShipAddress;