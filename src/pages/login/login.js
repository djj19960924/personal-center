import React,{Component} from 'react'
import { Button } from 'antd-mobile';
import './login.less'

class Login extends Component{
    render(){
        return (
            <div className="login">
                <div className="main">
                    Login
                    <Button type="primary" className="login">登录</Button>
                </div>  
            </div>
             
        )
    }
}
export default Login;